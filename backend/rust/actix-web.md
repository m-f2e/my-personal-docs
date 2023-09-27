# actix-web简介
## 1.1、官网
https://actix.rs

## 1.2、安装
`Cargo.toml`
```js
[dependencies]
actix-web = "4"
```

## 1.3、简单示例
```js
use std::io;

use actix_web::{Responder, get, HttpResponse, post, HttpServer, App, web};

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("hello index!")  
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```
运行
```shell
cargo run
```

### 1.4、scope
```js
async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    println!("Server running at http://127.0.0.1:8080/");
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(echo)
            .service(
              web::scope("/app")
              .route("/say", web::get().to(manual_hello))
            )
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```