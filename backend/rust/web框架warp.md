# Wrap
## 1、简介
`Warp`是一个基于`Rust`语言开发的`Web框架`，用于构建`高性能的Web应用程序`。

Warp具有以下特点：

- 基于Rust语言，具有高性能和安全性。
- 提供了丰富的中间件和功能，例如路由、参数提取、请求处理、响应处理等。
- 支持异步编程，可以利用异步IO的优势提高性能。
- 易于使用和学习。

## 2、官网
文档：https://docs.rs/warp/latest/warp

示例：https://github.com/seanmonstar/warp/tree/master/examples

## 3、安装依赖
```js
[dependencies]
tokio = { version = "1.0", features = ["full"] }
warp = "0.3.6"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
log = "0.4"
pretty_env_logger = "0.4.0"
```

## 4、入门
### 4.1、路由
#### 4.1.1、hello
:::tip
这种路由不支持异步， 所有请求方式都可以触发
:::

```js
use warp::Filter;

#[tokio::main]
async fn main() {
  let hello = warp::path!("hello"/String).map(|name| format!("Hello, {}!", name));
  warp::serve(hello).run(([127, 0, 0, 1], 3030)).await;
}
```

#### 4.1.2、参数提取
接收限定类型
```js
use warp::Filter;

#[tokio::main]
async fn main() {
  let hi = warp::path!("hi")
  .and(warp::path::param())
  .and(warp::header::<String>("user-agent"))
  .map(|name: String, agent| format!("Hi, {}! {}", name, agent));

  warp::serve(hi).run(([127, 0, 0, 1], 3030)).await;
}
```
入参限定参数类型
```js
use warp::Filter;

#[tokio::main]
async fn main() {
  let hi = warp::path!("hi")
  .and(warp::path::param::<String>())
  .and(warp::header("user-agent"))
  .map(|name, agent: String| format!("Hi, {}! {}", name, agent));

  warp::serve(hi).run(([127, 0, 0, 1], 3030)).await;
}
```

#### 4.1.3、日志打印
全局日志
```js
async fn main() {
  std::env::set_var("RUST_LOG", "debug");
  pretty_env_logger::init_custom_env("RUST_LOG");
}
```
自定义日志
```js
let hi_log = warp::log("hi");

let hi = warp::path("hi")
.and(warp::path::param::<String>())
.and(warp::header::<String>("user-agent"))
.map(|name, agent| format!("Hi, {}! {}", name, agent))
.with(hi_log);
```

#### 4.1.4、请求方式
```js
 // get post put delete
let base = warp::path("base");
let base_get = base.and(warp::get()).map(|| "Hello, get!");
let base_post = base.and(warp::post()).map(|| "Hello, post!");
let base_put = base.and(warp::put()).map(|| "Hello, put!");
let base_delete = base.and(warp::delete()).map(|| "Hello, delete!");

let apis = base_get.or(base_post).or(base_put).or(base_delete);
```

#### 4.1.5、多路由
```js
use warp::Filter;

#[tokio::main]
async fn main() {
  std::env::set_var("RUST_LOG", "debug");
  pretty_env_logger::init_custom_env("RUST_LOG");

  let hi_log = warp::log("hi");

  let hello = warp::path!("hello"/String).map(|name| format!("Hello, {}!", name));

  let hi = warp::path("hi")
  .and(warp::path::param::<String>())
  .and(warp::header::<String>("user-agent"))
  .map(|name, agent| format!("Hi, {}! {}", name, agent))
  .with(hi_log);

  // get /
  let get = warp::path::end().map(|| "Hello, World!");
  // get /he(优先级高)
  let get2 = warp::path("he").map(|| "Hello, he!");
  // get /he/:name
  let get3 = warp::path!("he" / String).map(|name| format!("Hello, {}!", name));

  let apis = hello.or(hi).or(get).or(get3).or(get2);
  warp::serve(apis).run(([127, 0, 0, 1], 3030)).await;
}
```

#### 4.1.6、同步、异步
map同步请求
```js
let get = warp::path::end().map(|| "Hello, World!");
```

and_then异步请求
```js
let sleep = warp::path("sleep")
.and(warp::get())
.and(warp::path::param::<u64>())
.and_then(sleep);

async fn sleep(seconds: u64) -> Result<impl warp::Reply, Infallible> {
  tokio::time::sleep(Duration::from_secs(seconds)).await;
  Ok(format!("I waited {} seconds!", seconds))
}
```

#### 4.1.7、方法路由
```js
async fn rest_get(id: u32) -> Result<Json, warp::Rejection> {
  let some_thing = json!({
    "id": id,
    "name": format!("warp{}", id),
  });
  let some_thing_warp = warp::reply::json(&some_thing);
  Ok(some_thing_warp)
}

async fn rest_list() -> Result<Json, warp::Rejection> {
  let res = json!([
    {
      "id": 1,
      "name": "warp1",
    },
    {
      "id": 2,
      "name": "warp2",
    },
  ]);
  let some_thing_warp = warp::reply::json(&res);
  Ok(some_thing_warp)
}

async fn rest_create(val: Value) -> Result<Json, warp::Rejection> {
  let some_thing_warp = warp::reply::json(&val);
  Ok(some_thing_warp)
}

fn rest_api() -> impl Filter<Extract = (impl warp::Reply,), Error = warp::Rejection> + Clone {
  let rest_base = warp::path("rest");
  let get = rest_base
    .and(warp::get())
    .and(warp::path::param())
    .and_then(rest_get);
  let list = rest_base
    .and(warp::get())
    .and_then(rest_list);
  let create = rest_base
    .and(warp::post())
    .and(warp::body::json())
    .and_then(rest_create);
  get.or(list).or(create)
}

let routes = index.or(rest_api());
warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
```

### 4.2、数据处理
#### 4.2.1、json
```js
let json = warp::path("json")
.and(warp::get())
.and(warp::path::end())
.map(|| {
  warp::reply::json(&Employee{
    name: "warp".to_string(),
    rate: 100
  })
});
```

#### 4.2.2、body
```js
use serde_derive::{Deserialize, Serialize};
use warp::Filter;

#[derive(Deserialize, Serialize)]
struct Employee {
    name: String,
    rate: u32,
}

// post body
let promote = warp::path("employees")
.and(warp::post())
.and(warp::path::param::<u32>())
.and(warp::body::content_length_limit(1024 * 1024))
.and(warp::body::json())
.map(|rate: u32, mut employee: Employee| {
  employee.rate = rate;
  warp::reply::json(&employee)
});
```

#### 4.2.3、params、query
```js
async fn get_items(param: String, query: HashMap<String, String>) -> Result<impl warp::Reply, Infallible> {
  tokio::time::sleep(Duration::from_secs(1)).await;
  Ok(format!("get path: {} items: {:?}", param, query))
}

let items = warp::path("items")
  .and(warp::get())
  .and(warp::path::param::<String>())
  .and(warp::query::<HashMap<String, String>>())
  .and(warp::path::end())
  .and_then(get_items);
```

#### 4.2.4、文件服务
```js
let web_dir = warp::fs::dir(WEB_DIR);

let apis = web_dir;
warp::serve(apis).run(([127, 0, 0, 1], 3030)).await;
```

```js
let index = warp::get()
  .and(warp::path::end())
  .and(warp::fs::file(format!("{}/index.html", WEB_DIR)));

let apis = index;
warp::serve(apis).run(([127, 0, 0, 1], 3030)).await;
```

```js
let readme = warp::get()
  .and(warp::path::end())
  .and(warp::fs::file("./README.md"));

  let examples = warp::path("ex")
  .and(warp::fs::dir("./examples"));
```

### 4.2、中间件
#### 4.2.1、登录授权
header_handler.rs
```js
use warp::Filter;

const XAUTH: &str = "x-auth";

pub struct ContextUser {
  id: u32,
}

pub fn auth() -> impl Filter<Extract = (ContextUser,), Error = warp::Rejection> + Clone {
  warp::any()
    .and(warp::header::<String>(XAUTH))
    .and_then(|auth: String| async move {
      if !auth.starts_with("ok:") {
        panic!("invalid auth");
      }
      if let Some(id) = auth.split(":").skip(1).next().and_then(|v| v.parse::<u32>().ok()) {
        Ok::<ContextUser, warp::Rejection>(ContextUser { id })
      } else {
        panic!("invalid auth, need number");
      }
    })
}
```
main.rs
```js
mod header_handler;
use header_handler::{auth, ContextUser};

async fn rest_create(val: Value, user: ContextUser) -> Result<Json, warp::Rejection> {
    let some_thing_warp = warp::reply::json(&val);
    Ok(some_thing_warp)
}

let create = rest_base
  .and(warp::post())
  .and(warp::body::json())
  .and(auth())
  .and_then(rest_create);
```

#### 4.2.2、登录授权完整示例
header_handler.rs
```js
use warp::Filter;

const XAUTH: &str = "x-auth";

pub struct ContextUser {
  id: u32,
}

#[derive(Debug)]
pub struct AuthError;

impl warp::reject::Reject for AuthError {}

#[derive(Debug)]
pub struct AuthErrorNeedsId;

impl warp::reject::Reject for AuthErrorNeedsId {}

pub fn auth() -> impl Filter<Extract = (ContextUser,), Error = warp::Rejection> + Clone {
  warp::any()
    .and(warp::header::<String>(XAUTH))
    .and_then(|auth: String| async move {
      if !auth.starts_with("ok:") {
        return Err(warp::reject::custom(AuthError));
      }
      if let Some(id) = auth.split(":").skip(1).next().and_then(|v| v.parse::<u32>().ok()) {
        Ok::<ContextUser, warp::Rejection>(ContextUser { id })
      } else {
        return Err(warp::reject::custom(AuthErrorNeedsId));
      }
    })
}
```
main.rs
```js
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::{collections::HashMap, convert::Infallible, time::Duration};
use warp::{reply::Json, Filter};

mod header_handler;
use header_handler::{auth, ContextUser};

const WEB_DIR: &str = "public";

async fn rest_get(id: u32) -> Result<Json, warp::Rejection> {
    let some_thing = json!({
      "id": id,
      "name": format!("warp{}", id),
    });
    let some_thing_warp = warp::reply::json(&some_thing);
    Ok(some_thing_warp)
}

async fn rest_list() -> Result<Json, warp::Rejection> {
    let res = json!([
      {
        "id": 1,
        "name": "warp1",
      },
      {
        "id": 2,
        "name": "warp2",
      },
    ]);
    let some_thing_warp = warp::reply::json(&res);
    Ok(some_thing_warp)
}

async fn rest_create(val: Value, user: ContextUser) -> Result<Json, warp::Rejection> {
    let some_thing_warp = warp::reply::json(&val);
    Ok(some_thing_warp)
}

fn rest_api() -> impl Filter<Extract = (impl warp::Reply,), Error = warp::Rejection> + Clone {
    let rest_base = warp::path("rest");
    let get = rest_base
        .and(warp::get())
        .and(warp::path::param())
        .and_then(rest_get);
    let list = rest_base.and(warp::get()).and_then(rest_list);
    let create = rest_base
        .and(warp::post())
        .and(warp::body::json())
        .and(auth())
        .and_then(rest_create);
    get.or(list).or(create)
}

#[tokio::main]
async fn main() {
    std::env::set_var("RUST_LOG", "debug");
    pretty_env_logger::init_custom_env("RUST_LOG");

    let index = warp::fs::dir(WEB_DIR);

    let routes = index.or(rest_api());
    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
```

#### 4.2.3、线程池
```js
let db_pool = Arc::new(DbPool{});
let routes = rest_api(db_pool.clone());

struct DbPool {}

fn with_pool(pool: Arc<DbPool>) -> impl Filter<Extract = (Arc<DbPool>,), Error = Infallible> + Clone  {
  warp::any().map(move || pool.clone())
}

fn rest_api(db_pool: Arc<DbPool>) -> impl Filter<Extract = (impl warp::Reply,), Error = warp::Rejection> + Clone {
    let rest_base = warp::path("rest");
    let get = rest_base
        .and(warp::get())
        .and(warp::path::param())
        .and(with_pool(db_pool))
        .and_then(rest_get);
    get
}
```

#### 4.2.4、