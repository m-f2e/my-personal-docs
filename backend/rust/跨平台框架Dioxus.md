# Dioxus
## 1、简介
`Dioxus`是一个`Rust`库，用于构建在`桌面`、`Web`、`移动设备`等上运行的应用程序。

## 2、官网
官网：https://dioxuslabs.com
GitHub：https://github.com/dioxuslabs/dioxus
文档：https://dioxuslabs.com/docs

## 3、特点
- 基于`Rust`语言开发，性能优异
- 跨平台：支持`WebAssembly`、`桌面`、`移动设备`等
- 组件化：支持`组件`、`路由`、`状态管理`等
- 高效：支持`SSR`、`SSG`、`预渲染`等
- 易用：支持`TypeScript`、`Rust`、`JSX`等

## 4、使用
### 1. 安装
```bash
cargo install dioxus-cli

# 没有安装wasm32-unknown-unknown工具链，则需要先安装
rustup target add wasm32-unknown-unknown
```

### 2. 创建项目
#### 2.1 创建项目
```bash
cargo new --bin dioxus-app
cd dioxus-app
```
#### 2.2 添加依赖
```bash
cargo add dioxus
cargo add dioxus-web
```
Cargo.toml
```js
[dependencies]
console_error_panic_hook = "0.1.6"
dioxus = "0.4.0"
dioxus-web = "0.4.0"
tracing = "0.1"
tracing-wasm = "0.2"
wasm-bindgen = "0.2"
chrono = { version = "0.4", features = ["serde"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
reqwest = { version = "0.11", features = ["json"] }
futures = "0.3"
```

#### 2.3、 编写代码
```rust
// main.rs
use dioxus::prelude::*;

fn main() {
    console_error_panic_hook::set_once();
    tracing_wasm::set_as_global_default();
    dioxus_web::launch(app)
}

fn app(cx: Scope) -> Element {
    cx.render(rsx! {
        div {
            "Hello, world!"
        }
    })
}
```

#### 2.4、 运行项目
```bash
dx serve
```

#### 2.5、 构建项目
```bash
dx build
```

### 3、dioxus-cli
#### 3.1、热更新
```bash
dx serve --hot-reload
```
#### 3.2、启动服务
```bash
dx serve
```

#### 3.3、指定平台特性
```bash
dx serve --hot-reload --platform=web --no-default-features --features=web
```

#### 3.4、构建项目
```bash
```

### 4、dioxus模版语法
#### 4.1、cx.render render! rsx! 渲染模板
```js
fn app(cx: Scope) -> Element {
    cx.render(rsx! {
        div {
            "Hello, world!"
        }
    })
}
```
```js
fn app(cx: Scope) -> Element {
    render!(
        div {
            "Hello, world!!!"
        }
    )
    render!{
        div {
            "Hello, world!!!"
        }
    }
}
```
```js
fn app(cx: Scope) -> Element {
    rsx!{
        title_component {}
    }
    rsx!(title_component {})
}
```

#### 4.2、模版参数
```js
fn app(cx: Scope) -> Element {
    let title = "title";
    let by = "author";
    let score = 0;
    let comments = "comments";
    info
    render!(
        div {
          "{title} by {by} ({score}) {comments}"
        }
    )
}
```

#### 4.3、样式attribute
```js
fn app(cx: Scope) -> Element {
    let title = "title";
    let by = "author";
    let score = 0;
    let comments = "comments";
  
    render!(
        div {
          padding: "0.5rem", // style="padding: 0.5rem;"
          position: "relative",
          "{title} by {by} ({score}) {comments}"
        }
    )
}
```
class
```js
fn app(cx: Scope) -> Element {
    let title = "title";
    let by = "author";
    let score = 0;
    let comments = "comments";
  
    render!(
        div {
          class="item-wrapper"
          "{title} by {by} ({score}) {comments}"
        }
    )
}
```
style
```js
fn app(cx: Scope) -> Element {
    let item_wrapper = r#"
        padding: 0.5rem;
        position: relative;
    "
  
    render!(
        div {
          style="{item_wrapper}"
        }
    )
}


fn app(cx: Scope) -> Element {
    render! {
        div {
            style: "height: 20px; background-color: red;",
            "hello world" 
        }
    }
}
```

#### 4.4、创建组件
```js
use dioxus::prelude::*;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use tracing::info;

#[derive(Debug, Serialize, Deserialize)]
struct StoryPageData {
    #[serde(flatten)]
    pub item: StoryItem,
    #[serde(default)]
    pub comments: Vec<Comment>,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
struct StoryItem {
    pub id: i64,
    pub title: String,
    pub url: Option<String>,
    pub text: Option<String>,
    #[serde(default)]
    pub by: String,
    #[serde(default)]
    pub score: i64,
    #[serde(default)]
    pub descendants: i64,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub time: DateTime<Utc>,
    #[serde(default)]
    pub kids: Vec<i64>,
    pub r#type: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Comment {
    pub id: i64,
    pub title: String,
    pub url: Option<String>,
    pub text: Option<String>,
    #[serde(default)]
    pub by: String,
    #[serde(default)]
    pub score: i64,
    #[serde(default)]
    pub descendants: i64,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub time: DateTime<Utc>,
    #[serde(default)]
    pub kids: Vec<i64>,
    pub r#type: String,
}

fn main() {
    console_error_panic_hook::set_once();
    tracing_wasm::set_as_global_default();
    dioxus_web::launch(app);
}

fn app(cx: Scope) -> Element {
    info!("hello world");
    render! {
        story_listing {
            story: StoryItem {
                id: 0,
                title: "hello hackernews".to_string(),
                url: None,
                text: None,
                by: "Author".to_string(),
                score: 0,
                descendants: 0,
                time: Utc::now(),
                kids: vec![],
                r#type: "".to_string(),
            }
        }
        title_component {}
        rsx!{
            title_component {}
        }
        rsx!(title_component {})
    }
}

fn title_component(cx: Scope) -> Element {
    render! {
        h1 {
            "title"
        }
    }
}

#[inline_props]
fn story_listing(cx: Scope, story: StoryItem) -> Element {
    let StoryItem {
        title,
        url,
        by,
        score,
        time,
        kids,
        id,
        ..
    } = story;
    let url = url.as_deref().unwrap_or_default();
    let hostname = url.trim_start_matches("https://")
        .trim_start_matches("http://")
        .trim_start_matches("www.");
    let score = format!("{score} {}", if *score == 1 { "point" } else { "points" });
    let comments = format!("{} {}", kids.len(), if kids.len() == 1 { "comment" } else { "comments" });
    let time = time.format("%Y-%m-%d %H:%M:%S");
    
    let caption_container_style = r#"
        font_size: "1.25rem",
        color: "gray",
    "#;

    render! {
        div {
          padding: "0.5rem",
          position: "relative",
          div {
              font_size: "1.5rem",
              a {
                  href: url,
                  "{title}"
              }
              a {
                  color: "gray",
                  href: "https://news.ycombinator.com/from?site={hostname}",
                  text_decoration: "none",
                  " {hostname}"
              }
          }
          div {
              class: "cl",
              style: "{caption_container_style}",
              div {
                  "{score}"
              }
              div {
                  padding_left: "0.5rem",
                  "by {by}"
              }
              div {
                  padding_left: "0.5rem",
                  "{time}"
              }
              div {
                  padding_left: "0.5rem",
                  "{comments}"
              }
          }
        }
    }
}
```

#### 4.5、状态展示
```js
fn preview_component(cx: Scope) -> Element {
    let preview_state = PreviewState::Loaded(StoryPageData {
        item: StoryItem {
            id: 0,
            title: "hello hackernews".to_string(),
            url: None,
            text: Some("hello world".into()),
            by: "Author".to_string(),
            score: 0,
            descendants: 0,
            time: chrono::Utc::now(),
            kids: vec![],
            r#type: "".to_string(),
          },
        comments: vec![],
    });
    match preview_state {
      PreviewState::Unset => render! {
          "Hover over a story to preview it here"
      },
      PreviewState::Loading => render! {
          "Loading..."
      },
      PreviewState::Loaded(story) => {
          let title = &story.item.title;
          let url = story.item.url.as_deref().unwrap_or_default();
          let text = story.item.text.as_deref().unwrap_or_default();
          render! {
              div {
                  padding: "0.5rem",
                  div {
                      font_size: "1.5rem",
                      a {
                          href: "{url}",
                          "{title}"
                      }
                  }
                  div {
                      dangerous_inner_html: "{text}",
                  }
                  for comment in &story.comments {
                      comment_component { comment: comment.clone() }
                  }
              }
          }
      }
  }
}
```

#### 4.6、事件
```js
render! {
    div {
        padding: "0.5rem",
        position: "relative",
        onmouseenter: move |_| {
            info!("div onMouseEnter");
        },
        div {
            font_size: "1.5rem",
            a {
                href: url,
                onfocus: move |e| {
                    info!("focus {e:?}");
                },
                "{title}"
            }
        }
    }
}
```
#### 4.7、state状态共享
```js
use dioxus::prelude::*;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use tracing::info;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct StoryPageData {
    #[serde(flatten)]
    pub item: StoryItem,
    #[serde(default)]
    pub comments: Vec<Comment>,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
struct StoryItem {
    pub id: i64,
    pub title: String,
    pub url: Option<String>,
    pub text: Option<String>,
    #[serde(default)]
    pub by: String,
    #[serde(default)]
    pub score: i64,
    #[serde(default)]
    pub descendants: i64,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub time: DateTime<Utc>,
    #[serde(default)]
    pub kids: Vec<i64>,
    pub r#type: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq)]
struct Comment {
    pub id: i64,
    pub title: String,
    pub url: Option<String>,
    pub text: Option<String>,
    #[serde(default)]
    pub by: String,
    #[serde(default)]
    pub score: i64,
    #[serde(default)]
    pub descendants: i64,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub time: DateTime<Utc>,
    #[serde(default)]
    pub kids: Vec<i64>,
    pub r#type: String,
}

// New
#[derive(Clone, Debug)]
enum PreviewState {
    Unset,
    Loading,
    Loaded(StoryPageData),
}


fn main() {
    console_error_panic_hook::set_once();
    tracing_wasm::set_as_global_default();
    dioxus_web::launch(app);
}

fn app(cx: Scope) -> Element {
    use_shared_state_provider(cx, || PreviewState::Unset);

    render! {
        div {
          display: "flex",
          flex_direction: "row",
          width: "100%",
          div {
              width: "50%",
              stories_component {}
          }
          div {
              width: "50%",
              preview_component {}
          }
      }
    }
}

// New
fn stories_component(cx: Scope) -> Element {
    render! {
        story_listing {
            story: StoryItem {
                id: 0,
                title: "hello hackernews".to_string(),
                url: None,
                text: None,
                by: "Author".to_string(),
                score: 0,
                descendants: 0,
                time: chrono::Utc::now(),
                kids: vec![],
                r#type: "".to_string(),
            }
        }
    }
}

fn preview_component(cx: Scope) -> Element {
    let preview_state = use_shared_state::<PreviewState>(cx)?;
    match &*preview_state.read() {
      PreviewState::Unset => render! {
          "Hover over a story to preview it here"
      },
      PreviewState::Loading => render! {
          "Loading..."
      },
      PreviewState::Loaded(story) => {
          let title = &story.item.title;
          let url = story.item.url.as_deref().unwrap_or_default();
          let text = story.item.text.as_deref().unwrap_or_default();
          render! {
              div {
                  padding: "0.5rem",
                  div {
                      font_size: "1.5rem",
                      a {
                          href: "{url}",
                          "{title}"
                      }
                  }
                  div {
                      dangerous_inner_html: "{text}",
                  }
                  for comment in &story.comments {
                      comment_component { comment: comment.clone() }
                  }
              }
          }
      }
  }
}

#[inline_props]
fn comment_component(cx: Scope, comment: Comment) -> Element<'a> {
    let text = comment.text.as_deref().unwrap_or_default();
    render! {
        div {
            padding: "0.5rem",
            div {
                color: "gray",
                "by {comment.by}"
            }
            div {
                dangerous_inner_html: "{text}"
            }
        }
    }
}

#[inline_props]
fn story_listing(cx: Scope, story: StoryItem) -> Element {
    let preview_state = use_shared_state::<PreviewState>(cx)?;
    let StoryItem {
        title,
        url,
        by,
        score,
        time,
        kids,
        id,
        ..
    } = story;
    let url = url.as_deref().unwrap_or_default();
    let hostname = url.trim_start_matches("https://")
        .trim_start_matches("http://")
        .trim_start_matches("www.");
    let score = format!("{score} {}", if *score == 1 { "point" } else { "points" });
    let comments = format!("{} {}", kids.len(), if kids.len() == 1 { "comment" } else { "comments" });
    let time = time.format("%Y-%m-%d %H:%M:%S");
    
    let caption_container_style = r#"
        font_size: "1.25rem",
        color: "gray",
    "#;

    render! {
        div {
          padding: "0.5rem",
          position: "relative",
          onmouseenter: move |_| {
              info!("div onMouseEnter");
              *preview_state.write() = PreviewState::Loaded(StoryPageData {
                  item: story.clone(),
                  comments: vec![],
            });
          },
          div {
              font_size: "1.5rem",
              a {
                  href: url,
                  onfocus: move |e| {
                      info!("focus {e:?}");
                      *preview_state.write() = PreviewState::Loaded(StoryPageData {
                          item: story.clone(),
                          comments: vec![],
                      });
                  },
                  "{title}"
              }
              a {
                  color: "gray",
                  href: "https://news.ycombinator.com/from?site={hostname}",
                  text_decoration: "none",
                  " {hostname}"
              }
          }
          div {
              class: "cl",
              style: "{caption_container_style}",
              div {
                  "{score}"
              }
              div {
                  padding_left: "0.5rem",
                  "by {by}"
              }
              div {
                  padding_left: "0.5rem",
                  "{time}"
              }
              div {
                  padding_left: "0.5rem",
                  "{comments}"
              }
          }
        }
    }
}
```

#### 4.8、异步请求
```js
use tracing::{info, warn};
use futures::future::join_all;

async fn get_story_preview(id: i64) -> Result<StoryItem, reqwest::Error> {
    let url = format!("{}item/{}.json", BASE_API_URL, id);
    reqwest::get(&url)
       .await?
       .json()
       .await
}

async fn get_stories(count: usize) -> Result<Vec<StoryItem>, reqwest::Error> {
    let url = format!("{}topstories.json", BASE_API_URL);
    let stories_ids = &reqwest::get(&url)
        .await?
        .json::<Vec<i64>>()
        .await?[..count];

    let story_futures = stories_ids[..usize::min(stories_ids.len(), count)]
        .iter()
        .map(|&story_id| get_story_preview(story_id));

    let stories = join_all(story_futures)
        .await
        .into_iter()
        .filter_map(|story| story.ok())
        .collect();
    Ok(stories)
}

fn stories_component(cx: Scope) -> Element {
    let stories: &UseFuture<Result<Vec<StoryItem>, reqwest::Error>> = use_future(cx, (), |_e|get_stories(10));

    match stories.value() {
        Some(Ok(list)) => {
            render! {
                div {
                    for story in list {
                        story_listing {
                            story: story.clone()
                        }
                    }
                }              
            }
        },
        Some(Err(e)) => {
            warn!("An error occurred while fetching stories {e}");
            render! {
                "An error occurred while fetching stories"
            }
        },
        None => {
            info!("loading stories");
            render! {
                "Loading stories..."
            }
        }
    }
}
```

#### 4.9、渲染html
```js
fn app(cx: Scope) -> Element {
    render! {
        div {
            style: "height: 20px; background-color: red;",
            dangerous_inner_html: "<div>hello world!!!</div>" 
        }
    }
}
```

```js
fn app(cx: Scope) -> Element {
    let contents = "live <b>dangerously</b>";
    cx.render(rsx! {
        div {
            dangerous_inner_html: "{contents}",
        }
    })
}
```

#### 4.10、{}表达式
```js
fn app(cx: Scope) -> Element {
    let name = "mz";
    render! {
        div {
            "hello world!!!! {name.to_uppercase()}" 
        }
        div {
            "{7*6}"
        }
    }
}
```

```js
fn app(cx: Scope) -> Element {
    let name = "mz";
    render! {
        span {
            name.to_uppercase(),
            // create a list of text from 0 to 9
            (0..10).map(|i| rsx!{ i.to_string() })
        }
    }
}
```

```js
fn app(cx: Scope) -> Element {
    render! {
        div {
            for i in 0..3 {
                div {
                   "div-{i}"
                }
            }
        }
        div {
            (0..3).map(|i| rsx! {
                div {
                    "div-{i}"
                }
              }
            )
            if true {
                rsx!{div { "true" }}
            }
        }
    }
}
```
#### 4.11、行样式处理
```js
fn app(cx: Scope) -> Element {
    render! {
        p {
            b {"Dioxus Labs"}
            " An Open Source project dedicated to making Rust UI wonderful."
        }
    }
}
```

#### 4.12、props
##### 4.12.1、props
```js
#[derive(Props, PartialEq)]
struct LikesProps {
    score: i32,
}

fn likes_component(cx: Scope<LikesProps>) -> Element {
    render! {
      div {
          "This post has ",
          b { "{cx.props.score}" },
          " likes"
      }
    }  
}
```
##### 4.12.2、props option
```js
#[derive(Props)]
struct LikesProps<'a> {
    score: i32,
    #[props(!optional)]
    title: Option<&'a str>,
}

fn likes_component<'a>(cx: Scope<'a, LikesProps<'a>>) -> Element {
    cx.render(rsx! {
        div {
            "This post has ",
            b { "{cx.props.score}" },
            " likes"
        }
    })
}

likes_component { 
    score: 100,
    title: Some("hello"),
}
```
##### 4.12.3、props handler
```js
#[derive(Props)]
struct ClickComponentProps<'a> {
    on_click: EventHandler<'a, MouseEvent>,
}

fn click_component<'a>(cx: Scope<'a, ClickComponentProps<'a>>) -> Element {
    cx.render(rsx! {
        div {
            onclick: move |_| {
                info!("div clicked");
            },
            "This is a clickable component"
            button {
                onclick: move |event| {
                    info!("button clicked");
                    event.stop_propagation();
                    cx.props.on_click.call(event);
                },
                "Click me"
            }
        }
    })
}

click_component {
    on_click: move |_| {
        info!("======== div clicked");
    },
}
```
##### 4.12.4、props handler 自定义数据
```js

#[derive(Debug)]
struct CustomData(i32);

#[derive(Props)]
struct ClickComponentProps<'a> {
    on_click: EventHandler<'a, CustomData>,
}

fn click_component<'a>(cx: Scope<'a, ClickComponentProps<'a>>) -> Element {
    cx.render(rsx! {
        div {
            onclick: move |_| {
                info!("div clicked");
            },
            "This is a clickable component"
            button {
                onclick: move |event| {
                    info!("button clicked");
                    event.stop_propagation();
                    cx.props.on_click.call(CustomData(10));
                },
                "Click me"
            }
        }
    })
}

click_component {
    on_click: move |data| {
        info!("======== div clicked== {data:?}");
    },
}
```


#### 4.13、数据结构借用
```js
#[derive(Props, PartialEq)]
struct LikesProps<'a> {
    score: i32,
    title: Option<&'a str>,
}

fn likes_component<'a>(cx: Scope<'a, LikesProps<'a>>) -> Element {
    render! {
      div {
          "This post has ",
          b { "{cx.props.score}" },
          " likes"
      }
    }  
}
```

```js
struct LikesProps<'a> {
    score: i32,
    title: Option<&'a str>,
}

likes_component { 
    props: LikesProps { score: 10, title: None }
}

#[inline_props]
fn likes_component<'a>(cx: Scope, props: LikesProps<'a>) -> Element {
    cx.render(rsx! {
        div {
            "This post has ",
            b { "{props.score}" },
            " likes"
        }
    })
}
```

#### 4.14、children
```js
#[derive(Debug, Props)]
struct ClickableProps<'a> {
    href: &'a str,
    children: Element<'a>,
}

fn clickable_component<'a>(cx: Scope<'a, ClickableProps<'a>>) -> Element {
    cx.render(rsx! {
        a {
            href: "{cx.props.href}",
            &cx.props.children
        }
    })
}

clickable_component { 
    href: "https://github.com/athifr/dioxus", 
    div {
      p {
        "Dioxus is a React-like Rust framework, but with a different API"
      }
      button {
        "Click me"
      }
    }
}
```
#### 4.15、use_state
```js
fn app(cx: Scope) -> Element {
    let count = use_state(cx, || 0);
    render! {
         h1 {
             "counter: {count}"
         }
         button {
             onclick: move |_| count.set(*count.current() + 1),
             "+"
         }
         button {
             onclick: move |_| count.set(*count.current() - 1),
             "-"
         }
    }
    // let count = use_state(cx, || 0);
    // render! {
    //      h1 {
    //          "counter: {count}"
    //      }
    //      button {
    //          onclick: move |_| count.set(**count + 1),
    //          "+"
    //      }
    //      button {
    //          onclick: move |_| count.set(**count - 1),
    //          "-"
    //      }
    // }
    
    // let mut count = use_state(cx, || 0);
    // render! {
    //     h1 {
    //         "counter: {count}"
    //     }
    //     button {
    //         onclick: move |_| count += 1,
    //         "+"
    //     }
    //     button {
    //         onclick: move |_| count -= 1,
    //         "-"
    //     }
    // }
}
```