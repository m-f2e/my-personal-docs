# Rocket简介
:::tip
大而全的web开发框架
:::
## 1、简介
`Rocket`是一个基于`Rust`编写的`上层网络框架`，它使编写快速、安全的web应用程序变得简单，而不会牺牲灵活性、可用性或类型安全性，是目前Rust主流的网络框架之一。

## 2、官网
https://rocket.rs/

## 3、入门
### 3.1、安装依赖
```js
[dependencies]
rocket = "=0.5.0-rc.3"
```

### 3.2、入口文件
#### 3.2.1、launch(官网推荐)
```js
// 引入所有rocket
#[macro_use]
extern crate rocket;

#[get("/")]
fn get_index() -> String {
    "get rocket".to_string()
}

#[post("/")]
fn post_index() -> &'static str {
    "post rocket"
}

#[launch]
fn rocket() -> _ {
    rocket::build()
    .mount("/", routes![get_index, post_index])
    .mount("/he", routes![get_index, post_index])
}
```
#### 3.2.2、rocket::main(传统写法)
```js
// 自行引入
use rocket::{get, post, routes};

#[get("/")]
fn get_index() -> String {
    "get rocket".to_string()
}

#[post("/")]
fn post_index() -> &'static str {
    "post rocket"
}

#[rocket::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    rocket::build()
    .mount("/", routes![get_index, post_index])
    .mount("/he", routes![get_index, post_index])
    .launch().await?;
    Ok(())
}

// rocket::Error
#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let _rocket = rocket::build()
        .mount("/hello", routes![world])
        .launch()
        .await?;

    Ok(())
}
```

### 3.3、Restful api
```js
// 引入所有rocket
#[macro_use]
extern crate rocket;

#[get("/ex")]
fn get_exs() -> String {
    "get exs".to_string()
}

#[get("/ex/<id>")]
fn get_ex(id: usize) -> String {
    format!("get ex id={}", id).to_string()
}

#[post("/ex")]
fn post_es() -> &'static str {
    "post ex"
}

#[put("/ex/<id>")]
fn put_es(id: usize) -> String {
    format!("put ex id={}", id).to_string()
}

#[delete("/ex/<id>")]
fn delete_es(id: usize) -> String {
    format!("delete ex id={}", id).to_string()
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount(
        "/base",
        routes![get_exs, get_ex, post_es, put_es, delete_es],
    )
}
```

### 3.4、路由
#### 3.4.1、注册路由
```js
#[get("/ex/<id>")]
fn get_ex(id: usize) -> String {
    format!("get ex id={}", id).to_string()
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount(
        "/base",
        routes![get_ex],
    )
}
```
#### 3.4.2、动态参数
```js
#[get("/ex/<id>")]
fn get_ex(id: usize) -> String {
    format!("get ex id={}", id).to_string()
}
```
#### 3.4.3、异步路由
```js
use rocket::tokio::time::{sleep, Duration};

// 引入所有rocket
#[macro_use]
extern crate rocket;

#[get("/delay/<seconds>")]
async fn delay(seconds: u64) -> String {
    sleep(Duration::from_secs(seconds)).await;
    format!("Waited for {} seconds", seconds)
}
```
#### 3.4.4、路径保护Option
成功使用Some则响应为200，若出现错误则是404 Not Found
```js
use std::path::{Path, PathBuf};
use rocket::fs::NamedFile;

#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).await.ok()
}
```
无论成功还是失败都有返回
```js
use rocket::fs::NamedFile;
use rocket::response::status::NotFound;

#[get("/<file..>")]
async fn files(file: PathBuf) -> Result<NamedFile, NotFound<String>> {
    let path = Path::new("static/").join(file);
    NamedFile::open(&path).await.map_err(|e| NotFound(e.to_string()))
}
```
#### 3.4.5、忽略路径
```js
// 忽略一级路径
#[get("/foo/<_>/bar")]
fn foo_bar() -> &'static str {
    "foo_bar"
}
``` 
#### 3.4.6、路由重定向
```js
use rocket::response::Redirect;

// 重定向
#[get("/dir")]
fn dir() -> Redirect {
  Redirect::to(uri!("/foo/1/bar"))
}
```
#### 3.4.7、捕捉异常
```js
//404的错误处理器
#[catch(404)]
fn not_found() -> String {
    String::from("Error: Not Found")
}
//构建默认错误处理
#[catch(default)]
fn default_catch() -> String {
    String::from("Error:Default catch")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount(
            "/base",
            routes![get_exs, get_ex, post_es, put_es, delete_es, delay],
        )
        .mount("/pub", routes![files])
        .mount("/", routes![foo_bar, dir, upload, query])
        .register("/", catchers![not_found, default_catch])
}

```

### 3.4、serde::json
#### 3.4.1、安装依赖
```js
[dependencies]
rocket = {version="=0.5.0-rc.3", features=["json"]}
```

#### 3.4.2、json! Value
```js
use rocket::serde::json::{json, Value};

#[get("/ex")]
fn get_exs() -> Value {
    // json! -> Value
    json!({"res": "mz"})
}
```

#### 3.4.3、Json结构体
```js
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
struct Task {
    id: usize,
    name: String,
}

#[get("/ex/<id>")]
fn get_ex(id: usize) -> Option<Json<Task>> {
    Some(Json(Task {
        id,
        name: "mz".to_string(),
    }))
}
```

#### 3.4.4、请求体json
```js
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
struct Task {
    id: usize,
    name: String,
}

#[post("/ex", format="json", data="<task>")]
fn post_es(task: Json<Task>) -> Value {
    let task = task.into_inner();
    json!({"res": format!("{} {}", task.id, task.name)})
}
```

####  3.4.5、临时文件
```js
use rocket::fs::{NamedFile, TempFile};

#[post("/upload", format="plain", data="<file>")]
async fn upload(mut file: TempFile<'_>) -> std::io::Result<()> {
  file.persist_to(Path::new("static/tmp.txt")).await
}
```

### 3.5、Responder
:::tip
作为Rocket的响应返回，包装我们的消息体数据，一个Response 包括HTTP状态、报头和正文。

- Created: 201
- Accepted: 202
- NoContent: 204
- BadRequest: 400
- Unauthorized: 401
- Forbidden: 403
- NotFound: 404
- Conflict: 409
- Custom: 根据code和内容自定义返回
:::

#### 3.5.1、Accepted
```js
#[get("/acc")]
fn acc() -> Accepted<String> {
  // code 202
  Accepted(Some("acc test".to_string()))
}
```

#### 3.5.2、Custom
```js
#[get("/cus")]
fn cus() -> Custom<Value> {
  Custom(Status::Accepted, json!({"res": "mz"}))
}
```

#### 3.5.3、自定义响应体
```js
#[derive(Debug, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
struct User {
    username: String,
    password: String,
}

#[derive(Responder)]
#[response(status=200, content_type="json")]
struct MyResponse {
  data: Json<User>,
  // headers: ContentType,
}

#[get("/login")]
fn login() -> MyResponse {
  MyResponse { 
    data: Json(User { username: "mz".to_string(), password: "123".to_string() }), 
    // headers: ContentType::JSON
  }
}
```