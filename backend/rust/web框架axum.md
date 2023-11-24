# Axum简介

## 1、简介
`Axum`是`tokio`官方出品的一个非常优秀的`web开发框架`, 以`tower`库的`Service trait`为基石, 它支持异步操作、消息传递、并行循环等，并且提供了一组丰富的库来处理常见的并发任务。Axum提供了一套机制来监视和管理系统的状态，并在出现错误或故障时采取适当的措施。

## 2、安装
```shell
cargo add axum
```
```js
[dependencies]
axum = "0.6.1"
```

## 3、使用
### 3.1、服务配置
```js
use std::net::SocketAddr;

use axum::{Router, routing::get, Server};

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }));
    println!("listening on {}", addr);
    
    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
```

### 3.2、请求方式
#### 3.2.1、GET
```js
let app = Router::new()
    .route("/", get(|| async { "Hello, index!" }))
    .route("/hello", get(hello_handler))
```

#### 3.2.2、POST
```js
#[derive(Debug, Serialize, Deserialize)]
struct Todo {
    id: i32,
    title: String,
    completed: bool
}

#[derive(Debug, Serialize, Deserialize)]
struct CrateTodo {
    title: String,
}

let app = Router::new()
    .route("/todos", get(todos_handler).post(create_todos_handler));

// get /todos list
async fn todos_handler() -> Json<Vec<Todo>> {
    Json(vec![
        Todo {
            id: 1,
            title: "Todo 1".into(),
            completed: false
        }
    ])
}

// post /todos json
async fn create_todos_handler(create_todo: Json<CrateTodo>) -> StatusCode {
    println!("{:?}", create_todo);
    StatusCode::CREATED
} 
```

### 3.3、路由
#### 3.3.1、route
```js
#[tokio::main]
async fn main() {
    ...
    let app = Router::new()
        .route("/", get(|| async { "Hello, index!" }))
        .route("/hello", get(hello_handler));
    ...
}

async fn hello_handler() -> Html<String> {
    Html("<h1>Hello, World!</h1>".into())
}  
```

### 3.4、中间件
#### 3.4.1、登录授权
```js
// secret key
const SECRET_KEY: &[u8] = b"deadbeer";

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    id: usize,
    name: String,
    exp: usize,
}

#[async_trait]
impl<S> FromRequestParts<S> for Claims
where
    S: Send + Sync,
{
    type Rejection = HttpError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) =
            TypedHeader::<Authorization<Bearer>>::from_request_parts(parts, state)
                .await
                .map_err(|_| HttpError::UnAuthorized)?;
        let key = jwt::DecodingKey::from_secret(SECRET_KEY);
        let token = jwt::decode::<Claims>(bearer.token(), &key, &jwt::Validation::default())
            .map_err(|_| HttpError::UnAuthorized)?;

        Ok(token.claims)
    }
}

#[derive(Debug)]
enum HttpError {
    UnAuthorized,
    InternalServerError,
}

impl IntoResponse for HttpError {
    fn into_response(self) -> axum::response::Response {
        let (code, msg) = match self {
            HttpError::UnAuthorized => (StatusCode::UNAUTHORIZED, "unauthorized"),
            HttpError::InternalServerError => {
                (StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
            }
        };
        (code, msg).into_response()
    }
}

let app = Router::new()
    .route("/login", post(login_handler))
    .route("/todos", get(todos_handler).post(create_todos_handler));

// post login json
async fn login_handler(login: Json<LoginRequest>) -> Json<LoginResponse> {
    let claims = Claims {
        id: 1,
        name: login.email.clone()
    };
    let key = jwt::EncodingKey::from_secret(SECRET_KEY);
    let token: String = jwt::encode(&jwt::Header::default(), &claims, &key).unwrap();
    Json(LoginResponse {
        token
    })
}

// get /todos list
async fn todos_handler() -> Json<Vec<Todo>> {
    Json(vec![Todo {
        id: 1,
        title: "Todo 1".into(),
        completed: false,
    }])
}

// post /todos json
async fn create_todos_handler(claims: Claims, _create_todo: Json<CrateTodo>) -> StatusCode {
    println!("claims{:?}", claims);
    StatusCode::CREATED
}
```

### 3.5、状态管理
#### 3.5.1、状态管理
```js
#[derive(Debug, Default, Clone)]
struct TodoStore {
    items: Arc<RwLock<Vec<Todo>>>,
}

let store = TodoStore::default();

let app = Router::new()
    .route(
        "/todos",
        get(todos_handler)
        .post(create_todos_handler)
        .layer(Extension(store)),
    );

// get /todos list
async fn todos_handler(
    store: Extension<TodoStore>,
    claims: Claims,
) -> Result<Json<Vec<Todo>>, HttpError> {
    let user_id = claims.id;
    match store.items.read() {
        Ok(items) => Ok(Json(
            items
                .iter()
                .filter(|todo| todo.user_id == user_id)
                .cloned()
                .collect(),
        )),
        Err(_) => Err(HttpError::InternalServerError),
    }
}

// post /todos json
async fn create_todos_handler(
    store: Extension<TodoStore>,
    claims: Claims,
    create_todo: Json<CrateTodo>,
) -> Result<StatusCode, HttpError> {
    println!("claims: {:?}", claims);
    match store.items.write() {
        Ok(mut guard) => {
            let todo = Todo {
                id: get_next_id(),
                user_id: claims.id,
                title: create_todo.title.clone(),
                completed: false,
            };
            guard.push(todo);
            Ok(StatusCode::CREATED)
        }
        Err(_) => Err(HttpError::InternalServerError),
    }
}
```

### 3.6、响应数据
#### 3.6.1、Html
```js
async fn hello_handler() -> Html<String> {
    Html("<h1>Hello, World!</h1>".into())
}
```

#### 3.6.2、Json
```js
async fn hello_handler() -> Json<Todo> {
    Json(Todo{})
}
```
### 3.7、请求参数
#### 3.7.1、Json
```js
async fn login_handler(login: Json<LoginRequest>) -> Json<LoginResponse> {
  
}
```

## 4、示例
### 4.1、打包静态资源
[dependencies]
```js
rust-embed = "8.0.0" // 打包静态资源到二进制文件
mime_guess = "2.0.4" // 获取资源mime type
```

main.rs
```js
use axum::{
    async_trait,
    extract::{FromRequestParts, Query},
    headers::{authorization::Bearer, Authorization},
    http::{request::Parts, StatusCode, header, Uri},
    response::{IntoResponse, Response},
    routing::{get, post},
    Extension, Json, Router, Server, TypedHeader, body::{Full, boxed},
};

#[derive(RustEmbed)]
#[folder = "example/public/"]
struct Assets;

struct StaticFile<T>(T);

impl <T> IntoResponse for StaticFile<T>
where
    T: Into<String>,
{
    fn into_response(self) -> Response {
        let path = self.0.into();
        match Assets::get(path.as_str()) {
            Some(content) => {
                let body = boxed(Full::from(content.data));
                let mine = mime_guess::from_path(path.as_str()).first_or_octet_stream();
                Response::builder()
                    .header(header::CONTENT_TYPE, mine.as_ref())
                    .body(body)
                    .unwrap()
            },
            None => {
                Response::builder()
                    .status(StatusCode::NOT_FOUND)
                    .body(boxed(Full::from(format!("File {} not found", path))))
                    .unwrap()
            },
        }
    }
}

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let store = TodoStore::default();

    let app = Router::new()
        .route("/hello", get(hello_handler))
        .fallback(get(static_handler));
    println!("listening on {}", addr);

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn hello_handler() -> impl IntoResponse {
    StaticFile("index.html")
}

async fn static_handler(url: Uri) -> impl IntoResponse {
    let path = url.path().trim_start_matches('/').to_string();
    StaticFile(path)
}
```