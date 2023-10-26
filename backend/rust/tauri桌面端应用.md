# Tauri桌面端应用

## 1、简介

## 2、官网
https://tauri.app/zh-cn/

tauri配置:
https://tauri.app/zh-cn/v1/references/configuration-files

## 3、安装
### 3.1、创建项目
https://tauri.app/zh-cn/v1/guides/getting-started/setup/

<TabCodeGroup v-model="tab">
  <TabCodeItem title="npm" name="0">
    $ npm create tauri-app@latest
  </TabCodeItem>
  <TabCodeItem title="pnpm" name="1">
    $ pnpm create tauri-app
  </TabCodeItem>
</TabCodeGroup>

### 3.3、启动项目
```shell
pnpm tauri dev
```

### 3.4、构建项目
```shell
pnpm tauri build
```

## 4、使用
### 4.1、Rust原生
#### 4.1.1、给h5提供方法
main.rs
```js
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

index.js
```js
import { invoke } from "@tauri-apps/api/tauri";

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}
```

#### 4.1.2、窗口菜单
```js
fn menu() -> Menu {
    // File -> Quit & Close
    let sub_menu_item = Menu::new()
        .add_item(CustomMenuItem::new("quite", "Quite"))
        .add_item(CustomMenuItem::new("close", "Close"));
    let sub_menu = Submenu::new("File", sub_menu_item);

    Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("learn_more", "Learn More"))
        .add_submenu(sub_menu)

    // 方式二
    let sub_menu = Menu::with_items([
      MenuItem::SelectAll.into(),
      #[cfg(target_os = "macos")]
      MenuItem::Redo.into(),
      CustomMenuItem::new("toggle", "Toggle visibility").into(),
    ]);
    Menu::with_items([
      MenuItem::Minimize.into(),
      Submenu::new("View", sub_menu).into(),
    ])
}

fn menu_handler(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "quite" => {
            std::process::exit(0);
        }
        "close" => {
            event.window().close().unwrap()
        }
        _ => {}
    }
}

fn main() {
    tauri::Builder::default()
        .menu(menu())
        .on_menu_event(menu_handler)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 4.1.3、window监听事件
```js
fn window_handler(event: GlobalWindowEvent) {
    match event.event() {
        WindowEvent::CloseRequested { api, .. } => {
            // 阻止window默认事件
            api.prevent_close();
            // 打开弹窗
            let window = event.window().clone();
            dialog::confirm(Some(&event.window()), "关闭窗口", "确定您要关闭窗口吗", move |answer| {
                if answer {
                    window.close().unwrap();
                }
            })
        },
        _ => {}
    }
}

fn main() {
    tauri::Builder::default()
        .on_window_event(window_handler)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 4.1.4、dialog(需要开启权限)
Cargo.toml
```js
[dependencies]
tauri = { version = "1.5", features = ["dialog-all", "shell-open"] }
```
tauri.conf.json
```js
"tauri": {
    "allowlist": {
      "all": false,
      "dialog": { // 打开对话框
        "all": true
      },
      "shell": {
        "all": false,
        "open": true
      }
    },
}
```
使用
```js
use tauri::api::{dialog};

// 打开弹窗
let window = event.window().clone();
dialog::confirm(Some(&event.window()), "关闭窗口", "确定您要关闭窗口吗", move |answer| {
    if answer {
        window.close().unwrap();
    }
})
```

#### 4.1.5、打开新窗口
```js
fn menu_handler(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "quite" => {
            std::process::exit(0);
        },
        "close" => {
            event.window().close().unwrap()
        },
        "js" => {
          WindowBuilder::new(&event.window().app_handle(), "jsPage", WindowUrl::App("#/".into())).build().unwrap();
        }, 
        "baidu" => {
          WindowBuilder::new(&event.window().app_handle(), "百度", WindowUrl::External("https://www.baidu.com".parse().unwrap())).build().unwrap().set_title("百度").unwrap();
        },
        _ => {}
    }
}
```

#### 4.1.6、系统托盘
Cargo.toml
```js
[dependencies]
tauri = { version = "1.5", features = ["dialog-confirm", "shell-open", "system-tray"] }
```
tauri.conf.json
```js
"tauri": {
    "security": {
      "csp": null
    },
    "systemTray": {
      "iconPath": "icons/icon.png",
      "iconAsTemplate": true
    },
}
```

main.rs
```js
fn system_tray_handler(handler: &AppHandle, event: SystemTrayEvent) {
  match event {
    SystemTrayEvent::MenuItemClick { id, .. } => {
      let item_handle = handler.tray_handle().get_item(&id);
      match id.as_str() {
        "quit" => handler.get_window("main").unwrap().close().unwrap(),
        "hide" => {
          if let Some(visible) = handler.get_window("main").unwrap().is_visible().ok() {
            if visible { // 展示
              handler.get_window("main").unwrap().hide().unwrap();
              item_handle.set_title("Show").unwrap();
            } else { // 隐藏
              handler.get_window("main").unwrap().show().unwrap();
              item_handle.set_title("Hide").unwrap();
            }
          }
        }
        _ => {}
      }
    },
    _ => {}
  }
}

fn main() {
    tauri::Builder::default()
        .menu(menu())
        .on_menu_event(menu_handler)
        .on_window_event(window_handler)
        .system_tray(system_tray())
        .on_system_tray_event(system_tray_handler)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 4.1.7、Splashscreen（闪屏）
tauri.conf.json
```js
"windows": [
  {
    "fullscreen": false,
    "resizable": true,
    "title": "tauri-app",
    "width": 800,
    "height": 600,
    "visible": false
  },
  {
    "width": 400,
    "height": 200,
    "decorations": false,
    "url": "splashscreen.html",
    "label": "splashscreen"
  }
]
```
main.rs
```js
#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```
index.js
跟项目新建`splashscreen.html`，主页面添加
```js
import { invoke } from "@tauri-apps/api/tauri";
onMounted(() => {
  invoke('close_splashscreen')
})
```

#### 4.1.8、启动打开调试
```js
fn main() {
    tauri::Builder::default()
        .setup(|app| {
              let window = app.get_window("main").unwrap();
              window.open_devtools();
              Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 4.1.9、插件
在`src-tauri`目录下，新建一个`plugin`文件夹，里面放一个`demo-plugin.rs`文件
```js
use std::{sync::Mutex, collections::HashMap};

use tauri::{
  plugin::{Builder, TauriPlugin},
  Runtime, Manager, State, AppHandle,
};

#[derive(Default)]
struct MyState(Mutex<HashMap<String, String>>);

// #[tauri::command]
// fn initialize() {
//   println!("initialize command called");
// }

// #[tauri::command]
// fn do_something() {}

#[tauri::command]
fn initialize<R: Runtime>(_app: AppHandle<R>, state: State<'_, MyState>) {
  // you can access `MyState` here!
  state.0.lock().unwrap().insert("a".to_string(), "b".to_string());
}

#[tauri::command]
// this will be accessible with `invoke('plugin:awesome|do_something')`.
fn do_something<R: Runtime>(_app: AppHandle<R>, state: State<'_, MyState>) {
  let tmp_state = state.0.lock().unwrap();
  if let Some(val) = tmp_state.get("a") {
    println!("{}", val);
  }
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("awesome")
    .setup(|app_handle| {
      app_handle.manage(MyState::default());
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![initialize, do_something])
    .build()
}
```

main.rs
```js
mod plugins;
use plugins::demo_plugin;

fn main() {
    tauri::Builder::default()
        .plugin(demo_plugin::init())
        .invoke_handler(tauri::generate_handler![greet, close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 4.2、js使用
#### 4.2.1、打开webview
直接打开
```js
import { WebviewWindow } from '@tauri-apps/api/window'

new WebviewWindow('main', {
  title: 'Hello Tauri',
  url: 'http://localhost:3000',
  center: true
})
```
监听回调
```js
import { WebviewWindow } from '@tauri-apps/api/window'

const webview = new WebviewWindow('main', {
  title: 'Hello Tauri',
  url: 'http://localhost:3000',
  center: true
})

webview.once('tauri://created', function () {
  // webview window successfully created
})
webview.once('tauri://error', function (e) {
  // an error occurred during webview window creation
})
```
#### 4.2.2、获取window
```js
import { WebviewWindow } from '@tauri-apps/api/window'
const mainWindow = WebviewWindow.getByLabel('main')
```

<script setup>
import { ref } from 'vue'
const tab = ref('0') 
</script>