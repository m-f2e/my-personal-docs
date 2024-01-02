# WebAssembly简介

## 1、Yew（Github 20k star）
### 1.1、官网
https://yew.rs/zh-Hans

### 1.2、安装
```js
cargo install --locked trunk
```

### 1.3、使用
`Cargo.toml`
```js
[dependencies]
yew = "0.21"
```
#### 1.3.1、csr(客户端渲染)
`Cargo.toml`
```js
[dependencies]
yew = { version = "0.21", features = ["csr"] }

[serve]
address = "127.0.0.1"
port = 8000
```
根目录创建`index.html`
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link data-trunk rel="css" href="/tailwind.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="./tailwind.css">
    <title>URL</title>
</head>
<body>
    
</body>
</html>
```

main.rs
```js
use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    html! {
        <>
            <h1>{ "RustConf Explorer" }</h1>
            <div>
                <h3>{"Videos to watch"}</h3>
                <p>{ "John Doe: Building and breaking things" }</p>
                <p>{ "Jane Smith: The development process" }</p>
                <p>{ "Matt Miller: The Web 7.0" }</p>
                <p>{ "Tom Jerry: Mouseless development" }</p>
            </div>
            <div>
                <h3>{ "John Doe: Building and breaking things" }</h3>
                <img src="https://via.placeholder.com/640x360.png?text=Video+Player+Placeholder" alt="video thumbnail" />
            </div>
        </>
      }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
```

启动服务
```js
trunk serve --open 
```

#### 1.3.2、组件调用
```js
use yew::prelude::*;

#[derive(Debug, PartialEq)]
struct Video {
   id: usize,
   title: String,
   speaker: String,
   url: String,
}

#[derive(Properties, PartialEq)]
struct VideoListProps {
    videos: Vec<Video>
}

fn main() {
    yew::Renderer::<App>::new().render();
}

#[function_component(VideosList)]
fn video_list(VideoListProps { videos }: &VideoListProps) -> Html {
    videos.iter().map(|v| html!{
        <p>{format!("{}: {}", v.speaker, v.title)}</p>
    }).collect()
}

#[function_component(App)]
fn app() -> Html {
    let videos = vec![
        Video {
            id: 1,
            title: "Building and breaking things".to_string(),
            speaker: "John Doe".to_string(),
            url: "https://youtu.be/PsaFVLr8t4E".to_string(),
        },
        Video {
            id: 2,
            title: "The development process".to_string(),
            speaker: "Jane Smith".to_string(),
            url: "https://youtu.be/PsaFVLr8t4E".to_string(),
        },
        Video {
            id: 3,
            title: "The Web 7.0".to_string(),
            speaker: "Matt Miller".to_string(),
            url: "https://youtu.be/PsaFVLr8t4E".to_string(),
        },
        Video {
            id: 4,
            title: "Mouseless development".to_string(),
            speaker: "Tom Jerry".to_string(),
            url: "https://youtu.be/PsaFVLr8t4E".to_string(),
        },
    ];
    html! {
        <>
            <h1>{ "RustConf Explorer" }</h1>
            <div>
                <h3>{"Videos to watch"}</h3>
                <VideosList videos={videos} />
            </div>
            <div>
                <h3>{ "John Doe: Building and breaking things" }</h3>
                <img src="https://via.placeholder.com/640x360.png?text=Video+Player+Placeholder" alt="video thumbnail" />
            </div>
        </>
      }
}
```

#### 1.3.3、请求示例
`Cargo.toml`
```js
[dependencies]
yew = { version = "0.21", features = ["csr"] }
gloo-net = "0.4"
serde = { version = "1.0", features = ["derive"] }
wasm-bindgen-futures = "0.4"
```
main.rs
```js
use gloo_net::http::Request;
use serde::Deserialize;
use yew::prelude::*;

fn main() {
    yew::Renderer::<App>::new().render();
}

#[derive(Debug, PartialEq, Clone, Deserialize)]
struct Video {
    id: usize,
    title: String,
    speaker: String,
    url: String,
}

#[derive(Properties, PartialEq)]
struct VideoListProps {
    videos: Vec<Video>,
    on_click: Callback<Video>,
}

#[function_component(VideosList)]
fn videos_list(VideoListProps { videos, on_click }: &VideoListProps) -> Html {
    let on_click = on_click.clone();
    videos
        .iter()
        .map(|v| {
            let on_video_select = {
                let on_click = on_click.clone();
                let video: Video = v.clone();
                Callback::from(move |_| on_click.emit(video.clone()))
            };
            html! {
              <p key={v.id} onclick={on_video_select}>{format!("{}: {}", v.speaker, v.title)}</p>
            }
        })
        .collect::<Html>()
}

#[derive(Properties, PartialEq)]
struct VideosDetailsProps {
    video: Video,
}

#[function_component(VideoDetails)]
fn video_details(VideosDetailsProps { video }: &VideosDetailsProps) -> Html {
    html! {
        <div>
            <h3>{ video.title.clone() }</h3>
            <img src="https://via.placeholder.com/640x360.png?text=Video+Player+Placeholder" alt="video thumbnail" />
        </div>
    }
}

#[function_component(App)]
fn app() -> Html {
    // let videos = vec![
    //     Video {
    //         id: 1,
    //         title: "Building and breaking things".to_string(),
    //         speaker: "John Doe".to_string(),
    //         url: "https://youtu.be/PsaFVLr8t4E".to_string(),
    //     },
    //     Video {
    //         id: 2,
    //         title: "The development process".to_string(),
    //         speaker: "Jane Smith".to_string(),
    //         url: "https://youtu.be/PsaFVLr8t4E".to_string(),
    //     },
    //     Video {
    //         id: 3,
    //         title: "The Web 7.0".to_string(),
    //         speaker: "Matt Miller".to_string(),
    //         url: "https://youtu.be/PsaFVLr8t4E".to_string(),
    //     },
    //     Video {
    //         id: 4,
    //         title: "Mouseless development".to_string(),
    //         speaker: "Tom Jerry".to_string(),
    //         url: "https://youtu.be/PsaFVLr8t4E".to_string(),
    //     },
    // ];

    let videos = use_state(|| vec![]);
    {
        let videos = videos.clone();
        use_effect_with((), move |_| {
            let videos = videos.clone();
            wasm_bindgen_futures::spawn_local(async move {
                let fetched_videos: Vec<Video> = Request::get("https://yew.rs/tutorial/data.json")
                    .send()
                    .await
                    .unwrap()
                    .json()
                    .await
                    .unwrap();
                println!("Fetched {} videos", fetched_videos.len());
                videos.set(fetched_videos);
            });
            || ()
        });
    }

    let selected_video = use_state(|| None);

    let on_video_select = {
        let selected_video = selected_video.clone();
        Callback::from(move |video: Video| {
            selected_video.set(Some(video));
        })
    };

    let details = selected_video.as_ref().map(|video| {
        html! {
          <VideoDetails video={video.clone()} />
        }
    });
    html! {
      <>
          <h1>{ "RustConf Explorer" }</h1>
          <div>
              <h3>{"Videos to watch"}</h3>
              <VideosList videos={(*videos).clone()} on_click={on_video_select.clone()} />
          </div>
          { for details }
      </>
    }
}
```

#### 1.3.4、Component
```js
use gloo::console;
use js_sys::Date;
use yew::{html, Component, Context, Html, function_component};

enum Msg {
    Increment,
    Decrement,
}

struct App {
    value: i64,
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(_ctx: &Context<Self>) -> Self {
        Self { value: 0 }
    }

    fn update(&mut self, _ctx: &Context<Self>, msg: Self::Message) -> bool {
        match msg {
            Msg::Increment => {
                self.value += 1;
                console::log!("Increment value: {}", self.value);
                true
            }
            Msg::Decrement => {
                self.value -= 1;
                console::log!("Decrement value: {}", self.value);
                true
            }
        }
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        html! {
            <div>
                <div class="panel">
                    <button class="button" onclick={ctx.link().callback(|_| Msg::Increment)}>
                        { "+1" }
                    </button>
                    <button onclick={ctx.link().callback(|_| Msg::Decrement)}>
                        { "-1" }
                    </button>
                    <button onclick={ctx.link().batch_callback(|_| vec![Msg::Increment, Msg::Increment])}>
                        { "+1, +1" }
                    </button>
                </div>

                <p class="counter">
                    { self.value }
                </p>

                <p class="footer">
                    { "Rendered: " }
                    { String::from(Date::new_0().to_string()) }
                </p>

                <ToDoList />
            </div>
        }
    }
}


#[function_component(ToDoList)]
fn to_do_list() -> Html {
    html! {
        <div class="to-do-list">
            <h1>{ "To Do List" }</h1>
        </div>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
```

#### 1.3.5、functional
```js
#[function_component(App)]
fn app() -> Html {
    let state = use_state(|| 0);
    let inc_counter = {
        let state = state.clone();
        Callback::from(move |_| {
            state.set(*state + 1);
        })
    };
    let dec_counter = {
        let state = state.clone();
        Callback::from(move |_| {
            state.set(*state - 1);
        })
    };

    html! {
        <div class="panel center">
            <p>{format!("current count: {}", *state)}</p>
            <button onclick={inc_counter}>{"+1"}</button>
            <button onclick={dec_counter}>{"-1"}</button>
        </div>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
```

#### 1.3.6、引入tailwind
在项目根目录下新建`tailwind.config.js`,内容如下
```js
module.exports = {
  content: ["./src/**/*.{html,rs}"],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
```
新建`index.css`,内容如下
```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```
新建`Trunk.toml`,内容如下
```js
[[hooks]]
stage = "build"
command = "tailwindcss"
command_arguments = [
  "build",
  "-i", 
  "index.css", 
  "-o", 
  "dist/.stage/tailwind.css"
]

[build]
target = "index.html"
dist = "dist"

[[proxy]]
rewrite = "/api/"
backend = "http://0.0.0.0:8000/"
```

## 2、wasm-bindgen（Github 5k star）
### 2.1、官网
https://github.com/rustwasm/wasm-bindgen

https://rustwasm.github.io/docs/book/

https://rustwasm.github.io/docs/wasm-bindgen/

https://rustwasm.github.io/docs/wasm-bindgen/reference/cli.html?highlight=wasm-bindgen-cli#options

### 2.2、安装
```shell
// 依赖环境
rustup target add wasm32-unknown-unknown

// 安装wasm-pack打包工具
cargo install wasm-pack --no-default-features # 忽略 OpenSSL

// wasm-pack打包失败可以尝试安装
cargo install wasm-bindgen-cli
```

### 2.3、使用

#### 2.3.1、创建项目
```js
cargo new bingen-demo --lib
```
Cargo.toml
```js
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.74"
```

#### 2.3.2、编译打包
```shell
wasm-pack build --target web
```

#### 2.3.3、调用js方法
##### 2.3.3.1、alert
```js
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" { // 遵从C语言的调用方式
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}
```
使用
```js
import init, {greet} from "./pkg/bindgen_demo.js";
init().then(() => {
  greet("WebAssembly")
});
```

##### 2.3.3.2、log
```js
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C"{
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn run() {
  log("Hello from Rust");
}
```

#### 2.3.4、向js暴漏方法
##### 2.3.4.1、greet
```js
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}
```

#### 2.3.5、bingen生命周期
##### 2.3.5.1、start启动
```js
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn run() {
  log("Hello from Rust");
}
```

## 3、wasm-pack（Github 4.1k star）

## 4、sycamore (Github 2.5k star)
### 4.1、官网
https://sycamore-rs.netlify.app

### 4.2、安装
```shell
cargo install --locked trunk
```
`Cargo.toml`
```js
[dependencies]
sycamore = { version = "0.8", features = ["serde", "futures"] }
```

### 4.3、使用
#### 4.3.1、基本使用
```js
use sycamore::prelude::*;

fn main() {
    console_error_panic_hook::set_once();
    tracing_wasm::set_as_global_default();

    sycamore::render(|ctx|{
        view! { ctx, 
            p(class="bg-red-500", id="11") { "Hello, World!" }
        }
    })
}
```

#### 4.3.2、多个元素
```js
sycamore::render(|ctx|{
    view! { ctx, 
        p(class="bg-red-500", id="11") { "Hello, World!" }
        button(on:click=|_| { 
            info!("button click");
        }) {
            "Click me"
        }
    }
})
```

#### 4.3.3、组件封装
```js
use sycamore::prelude::*;
use tracing::info;

#[component]
fn MyComponent<G:Html>(ctx: Scope) -> View<G> {
    view! { ctx,
        div(class="bg-green-500") {
            "Value: "          
        }
    }
}

fn main() {
    console_error_panic_hook::set_once();
    tracing_wasm::set_as_global_default();

    info!("Hello, World! {}", 11);
    
    sycamore::render(|ctx|{
        view! { ctx, 
            p(class="bg-red-500", id="11") { "Hello, World!" }
            button(on:click=|_| { 
                info!("button click");
            }) {
                "Click me"
            }
            MyComponent()
        }
    })
}
```