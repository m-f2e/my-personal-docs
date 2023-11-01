# WebAssembly简介

## 1、Yew（Github 20k star）

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