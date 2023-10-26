# Rust简介
## 1、简介
`Rust`是一门系统编程语言，专注于安全，尤其是并发安全，支持函数式和命令式以及泛型等编程范式的多范式语言。

## 2、官网
### 2.1、官网地址
https://www.rust-lang.org 

### 2.2、本地开发文档
```shell
rustup doc
```

## 3、环境配置
### 3.1、在线体验
https://play.rust-lang.org/?version=stable&mode=debug&edition=2021

### 3.2、安装
#### 3.2.1、安装管理工具
```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
#### 3.2.2、更新rust版本
```shell
rustup update
```
#### 3.2.3、Cargo
:::tip
`Rust`的构建工具和包管理器
- cargo build: 可以构建项目， 默认以debug模式编译，可以指定release `cargo build/run --release`
- cargo run: 可以运行项目
- cargo test: 可以测试项目
- cargo doc: 可以为项目构建文档
- cargo publish: 可以将库发布到 crates.io
- cargo install: 可以安装库
- rustc src/main.rs: 编译项目
:::
#### 3.2.4、平台编译
##### 3.2.4.1、配置环境
Cargo.toml配置
```js
[package]
name = "todo-list"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[target.x86_64-unknown-linux-gnu]
os = "linux"
cpu = "x86_64"
features = ["lzma", "zlib"]

[target.x86_64-pc-windows-msvc]
os = "windows"
cpu = "x86_64"
features = ["windows-crt"]

[target.x86_64-apple-darwin]
os = "macos"
cpu = "x86_64"
features = ["apple-security"]

[dependencies]
clap = { version = "3.0", features = ["derive"] }
dirs = "5.0.1"
```
执行
```shell
cargo build --all-targets
```
##### 3.2.4.2、命令方式
```shell
rustup target add x86_64-unknown-linux-gnu x86_64-pc-windows-msvc x86_64-apple-darwin

cargo build --target x86_64-unknown-linux-gnu x86_64-pc-windows-msvc x86_64-apple-darwin
```

### 3.3、创建项目
#### 3.3.1、创建项目
```shell
cargo new hello-rust
```
创建完成后目录结构
```js
hello-rust
|- Cargo.toml // 项目配置，包含项目的元数据和依赖库
|- src
  |- main.rs // 项目代码入口
```

入口文件
```js
fn main() {
  println!("Hello, world!");
}
```
#### 3.3.2、运行项目
```shell
cargo run
```
#### 3.3.3、三方库
crate.io: https://crates.io/

引入三方库
```shell
[dependencies]
ferris-says = "0.3.1"
```

使用三方库
```js
// main.rs
use ferris_says::say;
```
#### 3.3.4、VSCode调试项目
```shell
// .vscode/launch.json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(lldb) 启动",
      "type": "lldb",
      // "preLaunchTask": "build",
      "request": "launch",
      "program": "${workspaceFolder}/target/debug/${workspaceFolderBasename}",
      "args": [],
      "stopOnEntry": false,
      "cwd": "${workspaceFolder}",
      "env": {},
      "exitCommands": ["exit 0"],
    }
  ]
}
```


## 4、基础
### 4.1、println打印
```js
// 不换行打印
print!("------");
// 换行打印
println!("------");

// 多行字符串
println!("a is {0}, b is {1}", 12, 13);

let str = r#"{"key":"value"}"#;
println!("str: {}", str);
```
打印变量
```js
let a = 12;
let b = 13;
println!("a is {}, b is {}", a, b);
println!("a is {0}, b is {1}", a, b);
```

### 4.2、命令行打印
```js
rustc src/main.rs
```

### 4.3、变量
声明变量使用`let`关键字
#### 4.3.1、定义变量
```js
let a = 123;
a = 456; // 报错
```
#### 4.3.2、可变变量
:::tip
可变数据需要使用`mut`关键词
:::
```js
let mut a = 123;
a = 456;
```
#### 4.3.3、多重赋值
```js
let a = 123, b = 456;
```

#### 4.3.4、重影
```js
let x = 5;
let x = x + 1;
let x = x * 2;
println!("The value of x is: {}", x); // 12
```

### 4.4、数据类型
#### 4.4.1、类型
```js
let x = 5; // integer
let y = 10.0; // floating point
let sum = true; // bool
let difference = "x - y"; // string

let tup: (i32, f64, u8) = (500, 6.4, 1); // 复合类型

let a = [1, 2, 3, 4, 5];
let b = ["1", "2", "3", "4", "5"];

// 数组
let array = [1, 2, 3, 4, 5];
println!("{:?}", array);

// 5个3的数组
let c = [3; 5];
println!("{:?}", c);
```
#### 4.4.2、遍历
写法1
```js
let arr = [1, 2, 3, 4, 5];
let part = &arr[1..3];
for i in part {
  println!("{}", i);
}
```

写法2
```js
let arr = [1, 2, 3, 4, 5];
let part = &arr[1..3];
for i in part.iter() {
  println!("{}", i);
}
```

写法3
```js
let arr = [1, 2, 3, 4, 5];
let part = &arr[1..3];
for (i, item) in part.iter().enumerate() {
  println!("{} - {}", i, item);
}
```

### 4.5、注释
```js
// 单行注释

/* 多行注释 */

/*
 *多行注释
 *多行注释
 */
```

### 4.6、函数
#### 4.6.1、定义函数
```js
fn say() {
  println!("Hello, world!");
}

fn main() {
  say();
}
```
#### 4.6.2、函数参数
无返回值
```js
fn say(x: i32, y: i32) {
  println!("{}-{}", x, y);
}
```
有返回值
```js
fn add(x: i32, y: i32) -> i32 {
  x + y
}
```
#### 4.6.3、嵌套函数
```js
fn main() {

  fn five() -> i32 {
    // return 5;
    5
  }
  println!("The value of five is: {}", five());
}
```

### 4.7、条件语句
```js
let num = 3;
if num < 5 {
  println!("condition was true");
} else {
  println!("condition was false");
}

// rust没有三目，可用if-else
let a = 3;
let num = if a > 0 {1} else {2};
println!("{}", num);
```

### 4.8、循环语句
#### 4.8.1、while循环
```js
let mut num = 1;
while num < 10 {
  println!("{}", num);
  num += 1;
}
```
#### 4.8.2、for循环
```js
// 方式1
for num in 1..10 {
  println!("{}", num);
}

// 方式2
let a = [1, 2, 3, 4, 5];
for i in a.iter() {
  println!("{}", i);
}

// 方式3
let a = [1, 2, 3, 4, 5];
for i in a {
  println!("{}", i);
}
```
#### 4.8.3、loop循环
```js
let s = ['R', 'U', 'N', 'O', 'O', 'B'];
let mut i = 0;
loop {
    let ch = s[i];
    if ch == 'O' {
        break;
    }
    println!("\'{}\'", ch);
    i += 1;
}
```

### 4.9、所有权
#### 4.9.1、所有权转移
```js
let s = String::from("hello");
let s2 = s; // 所有权转移，s2拥有s的所有权, 访问s会报错
```
####  4.9.2、克隆
```js
let s = String::from("hello");
let s2 = s.clone();
```
#### 4.9.3、引用
:::tip
- 一个变量可以用不限个不可变引用，只能有一个可变引用
- 可变引用和不可变引用不能同时存在
:::
```js
let s = String::from("hello");
let s2 = &s;
```

### 4.10、结构体
#### 4.10.1、定义结构体
```js
struct Point {
  x: i32,
  y: i32,
}
let point = Point { x: 1, y: 2 };
```

```js
struct Color(u8, u8, u8);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
println!("black = ({}, {}, {})", black.0, black.1, black.2);
println!("origin = ({}, {})", origin.0, origin.1);
```
#### 4.10.2、打印结构体
:::tip
打印结构体需要使用`#[derive(Debug)]`修饰
:::
```js
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let rect = Rectangle{ width: 30, height: 50 };
  println!("rect is {:?}--{}--{}", rect, rect.width, rect.height);
}
```
#### 4.10.3、结构体方法
```js
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }
}

fn main() {
  let rect = Rectangle{ width: 30, height: 50 };
  println!("rect is {:?}--{}--{}", rect, rect.width, rect.height);
  println!("area is {}", rect.area());
}
```
#### 4.10.4、结构体关联函数
```js
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn create(width: u32, height: u32) -> Rectangle {
    Rectangle {
      width,
      height,
    }
  }
}

fn main() {
  Rectangle::create(30, 40);
}
```
#### 4.10.5、结构体更新
```js
#[derive(Debug)]
struct Person {
  name: String,
  age: u8
}

fn main() {
    let p1 = Person {
        name: String::from("John"),
        age: 20
    };
    let p2 = Person {
        name: String::from("Jane"),
        ..p1
    };
    println!("{:#?}", p2);
}
```

### 4.11、枚举
#### 4.11.1、定义枚举
```js
#[derive(Debug)]
enum Book {
  Papery, Electronic
}

fn main() {
  let book = Book::Papery;
  let book2 = Book::Electronic;
  println!("{:?}--{:?}", book, book2);
}
```
#### 4.11.2、嵌套枚举
```js
#[derive(Debug)]
enum Book {
  Papery(u32),
  Electronic(String)
}

fn main() {
  let book = Book::Papery(1000);
  let ebook = Book::Electronic(String::from("1000")); 
  println!("{:?}--{:?}", book, ebook);
}
```
#### 4.11.3、匹配枚举
```js
#[derive(Debug)]
#[allow(dead_code)]
enum Book {
  Papery { index: u32 },
  Electronic { url: String }
}

fn main() {
  let book = Book::Papery { index: 1000 };
  // let ebook = Book::Electronic { url: String::from("1000") }; 

  match book {
      Book::Papery { index } => {
          println!("{}", index);
      },
      Book::Electronic { url } => {
          println!("ebook: {}", url);
      }
  }
}
```

### 4.12、包-模块-方法
#### 4.12.1、包
```js
mod nation {
  pub mod gov {
    pub fn gov() {
      println!("gov");
    }
  }
  pub mod people {
    pub fn people() {
      println!("people");
    }
  }
}

fn main() {
  nation::gov::gov();
  nation::people::people();
}
```
#### 4.12.2、模块
second.rs
```js
pub fn message() -> String {
  String::from("Hello, world!")
}
```

main.rs
```js
mod second;

fn main() {
  println!("{}", second::message());
}
```
#### 4.12.3、use引入模块作用域
```js
mod second;
use second::message;

fn main() {
  println!("{}", message());
}
```
#### 4.12.4、别名
```js
mod second;
use second::message as secondMessage;

secondMessage()
```

###  4.13、错误处理
```js
use std::fs::File;

fn main() {
  let f = File::open("src/nation.rs");

  // 方式1
  if let Ok(file) = f {
    println!("success-{:?}", file);
  } else {
    println!("error");
  }

  // 方式2
  match f {
    Ok(file) => {
      println!("success-{:?}", file);
    },
    Err(e) => {
      println!("error: {}", e);
    }
  }
}
```

示例：
```js

fn f(i: i32) -> Result<i32, bool> {
  if i >= 0 {
    Ok(i)
  } else {
    Err(false)
  }
}

fn g(i: i32) -> Result<i32, bool> {
  // 方式1
  let t = f(i)?;
  Ok(t)
  
  // 方式2
  // let t = f(i);
  // return match t {
  //   Ok(i) => Ok(i),
  //   Err(b) => Err(b)
  // }
}

fn main() {
  let r = g(10000);
  match r {
    Ok(i) => {
      println!("{}", i);
    },
    Err(b) => {
      println!("{}", b);
    }
  }
}
```

kind方法
```js
use std::io;
use std::io::Read;
use std::fs::File;

fn read_text_from_file(path: &str) -> Result<String, io::Error> {
  let mut f = File::open(path)?;
  let mut s = String::new();
  f.read_to_string(&mut s)?;
  Ok(s)
}

fn main() {
  let str_file = read_text_from_file("src/nation.rs");
  match str_file {
    Ok(s) => {
      println!("{}", s);
    },
    Err(e) => {
      match e.kind() {
        io::ErrorKind::NotFound => {
          println!("not found");
        },
        _ => {
          println!("error");
        }
      }
    }
  }
}
```

### 4.14、生命周期
#### 4.14.1、函数生命周期
```js
fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
  if s2.len() > s1.len() {
    s2
  } else {
    s1
  }
}

fn main() {
  let r;
  {
    let s1 = "rust";
    let s2 = "ddd";
    r = longer(s1, s2)
  }  
  println!("{} is longer", r);
}
```
#### 4.14.2、结构体生命周期
```js
#[derive(Debug)]
struct Str<'a> {
  content: &'a str,
}

fn main() {
  let s = Str {
    content: "hello",
  };
  println!("{:#?}--{}", s, s.content);
}
```
#### 4.14.3、静态生命周期
```js
fn longest_with_an_anno<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str where T: Display {
    println!("Display: {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

### 4.15、切片
#### 4.15.1、字符串切片
写法1
```js
let s = String::from("12345");
let s1 = &s[0..1];
let s2 = &s[4..5];
println!("{} {}", s1, s2);
```
写法2
```js
let s = String::from("12345");
let s1 = &s[..1];
let s2 = &s[4..];
println!("{} {}", s1, s2);
```
写法3
```js
let s = String::from("12345");
let ss = &s[..];
println!("{:?}", ss);
```
写法4
```js
let s = String::from("hello world");
let s2 = "hello world";
println!("{}", &s[..2]);
println!("{}", &s2[..2]);
```
#### 4.15.2、数组切片
```js
let arr = [1, 2, 3, 4, 5];
let part = &arr[1..3];
for i in part {
  println!("{}", i);
}
```

### 4.16、泛型
#### 4.16.1、泛型函数
```js
fn max(arr: &[i32]) -> i32 {
  let mut max_index = 0;
  let mut i = 1;
  while i < arr.len() {
      if arr[i] > arr[max_index] {
          max_index = i;
      }
      i += 1;
  }
  arr[max_index]
}

let arr = [1, 2, 3, 4, 5];
println!("max is {}, arr is {:?}", max(&arr), arr);
```
#### 4.16.2、泛型结构体
```js
#[allow(dead_code)]
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
      &self.x
    }
}

let p = Point { x: 1, y: 2 };
println!("x is {}", p.x());
```

### 4.17、trait(特性)
#### 4.17.1、trait定义
```js
trait Descriptive {
    fn describe(&self) -> String;
}

struct Person {
  name: String,
  age: u8,
}

impl Descriptive for Person {
    fn describe(&self) -> String {
        format!("name: {}, age: {}", self.name, self.age)
    }
}

fn main() {
    let p = Person {
        name: String::from("zhang"),
        age: 24,
    };
    println!("{}", p.describe());
}
```
#### 4.17.2、trait实现泛型
```js
trait Comparable {
    fn compare(&self, other: &Self) -> bool;
}

fn max<T: Comparable>(arr: &[T]) -> &T {
    let mut max_index = 0;
    let mut i = 1;
    while i < arr.len() {
      if arr[i].compare(&arr[max_index]) {
          max_index = i;
      }
      i += 1;
    }
    &arr[max_index]
}

impl Comparable for i32 {
    fn compare(&self, other: &Self) -> bool {
        self > other
    }
}

let arr = [1, 2, 3, 4, 5];
println!("max is {}", max(&arr));
```
#### 4.17.3、trait动态方法指定
```js
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
      Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T>  {
    fn cmp_display(&self) {
        if self.x > self.y {
            println!("The largest is x = {}", self.x);
        } else {
            println!("The largest is y = {}", self.y);
        }
    }
}
```
#### 4.17.4、拟多态
示例1
```js
trait Drawable {
    fn draw(&self);
}

struct Circle {}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing a cicle");
    }
}

fn main() {
    let circle = Circle{};
    let drawable: &dyn Drawable = &circle;
    drawable.draw();
}
```
示例2
```js
trait Drawable {
    fn draw(&self);
}

struct Circle {}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing a circle");
    }
}

struct Square {}

impl Drawable for Square {
    fn draw(&self) {
        println!("Drawing a square");
    }
}

fn main() {
    let circle = Circle{};
    let square = Square{};
    let shapes: Vec<Box<dyn Drawable>> = vec![Box::new(circle), Box::new(square)];

    for shape in shapes {
        shape.draw();
    }
}
```
示例3
```js
trait Animal {
  fn make_sound(&self);
}

struct Dog;
struct Cat;

impl Animal for Dog {
  fn make_sound(&self) {
      println!("Dog barks!");
  }
}

impl Animal for Cat {
  fn make_sound(&self) {
      println!("Cat meows!");
  }
}
fn main() {
  let dog = Dog;
  let cat = Cat;
  let animals:Vec<&dyn Animal> = vec![&dog, &cat];
  for animal in animals {
    animal.make_sound();
  }
}
```

#### 4.17.5、trait继承
```js
trait Printable {
    fn print(&self);
}

trait Debuggable: Printable {
    fn debug(&self);
}
```
#### 4.17.6、trait组合
```js
trait A {
    fn a(&self);
}

trait B {
    fn b(&self);
}

trait C: A + B {
    fn c(&self);
}

struct MyStruct {

}

impl A for MyStruct {
    fn a(&self) {
        
    }
}

impl B for MyStruct {
  fn b(&self) {
      
  }
}

impl C for MyStruct {
  fn c(&self) {
      
  }
}
```

### 4.18、IO
#### 4.18.1、命令行参数
```js
let args = std::env::args();
for arg in args {
  println!("{:?}", arg);
}
```
#### 4.18.2、命令行输入
```js
let mut str_buf = String::new();
stdin().read_line(&mut str_buf).expect("failed to read line.");
println!("{}", str_buf);
```
#### 4.18.3、读取文件
```js
let text = fs::read_to_string("src/hello.txt").unwrap();
println!("text is {:?}", text);
```
#### 4.18.4、写入文件
```js
fs::write("src/hello2.txt", "ddddddd").unwrap();
```
#### 4.18.5、创建文件
```js
let mut file = File::create("src/hello3.txt").unwrap();
file.write(b"FROM RUST PROGRAM").unwrap();
```
#### 4.18.6、OpenOptios
```js
use std::io::Write;
use fs::OpenOptions;
#[allow(unused_imports)]
use std::{io::stdin, fs};

fn open_file() -> std::io::Result<()> {
  let mut file = OpenOptions::new().write(true).append(true).open("src/hello.txt").unwrap();
    file.write(b"FROM RUST PROGRAM")?;
    Ok(())
}
```

### 4.19、Vector(集合)
#### 4.19.1、Vector定义
```js
let mut vector = vec![1,2,3,4];
vector.push(3);
println!("vector is {:?}", vector);
```

```js
let mut vector = Vec::new();
vector.push(1);
println!("vector is {:?}", vector);
```
#### 4.19.2、Vector append
```js
let mut vector1 = vec![1,2,3,4];
let mut vector2 = vec![5,6];
vector1.append(&mut vector2);
println!("vector is {:?}", vector1);
```
#### 4.19.3、获取变量
```js
let vector1 = vec![1,2,3,4];
println!("{}", match vector1.get(0) {
    Some(x) => x.to_string(),
    None => "None".to_string()
});
println!("{}", vector1[0]);
```
#### 4.19.4、遍历
写法1
```js
let vector1 = vec![1,2,3,4];
for x in &vector1 {
    println!("{}", x);
}
```

写法2
```js
let vector1 = vec![1,2,3,4];
for x in &vector1.iter() {
    println!("{}", x);
}
```

写法3
```js
let mut vector1 = vec![1,2,3,4];
for x in &mut vector1 {
    *x += 50;
    println!("{}", x);
}
```

### Map(映射表)
#### 4.19.5、Map定义
```js
let mut map = HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);
println!("{:?}", map.get("a").unwrap());
println!("{:?}", map.get("b").unwrap());
println!("{:?}", map.get("c").unwrap());
```
#### 4.19.6、Map遍历
```js
let mut map = HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);

for p in map.iter() {
    println!("{:?}", p);
}
```

```js
let mut map = HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);

for p in map {
    println!("{:?}", p);
}
```

### 4.20、class
#### 4.20.1、class定义
first.rs
```js
pub struct ClassName {
  pub field: i32,
}

impl ClassName {
  pub fn new(value: i32) -> ClassName {
    ClassName { field: value }
  }

  pub fn public_method(&self) {
    self.private_method();
  }

  fn private_method(&self) {
    println!("private");
  }
}
```

main.rs
```js
mod first;
use first::ClassName;

fn main() {
    let object = ClassName::new(1);
    object.public_method();
}
```

### 4.21、thread(多线程)
#### 4.21.1、创建线程
```js
use std::{thread, time::Duration};

fn spawn_function() {
    for i in 0..5 {
        println!("spawned thread print {}", i);
        thread::sleep(Duration::from_millis(1))
    }
}

fn main() {
    thread::spawn(spawn_function);
    for i in 0..5 {
        println!("main thread print {}", i);
        thread::sleep(Duration::from_millis(1))
    }
    println!("Hello, world!");
}
```
#### 4.21.2、join方法
:::tip
`join`方法可以使子线程运行结束后再停止运行程序
:::
```js
use std::{thread, time::Duration};

fn main() {
    let handler = thread::spawn(|| {
        for i in 0..5 {
          println!("spawned thread print {}", i);
          thread::sleep(Duration::from_millis(1))
        }
    });

    for i in 0..3 {
      println!("main thread print {}", i);
      thread::sleep(Duration::from_millis(1))
    }
    
    handler.join().unwrap();
}
```
#### 4.21.3、move(强制所有权迁移)
```js
let s = "hello";
let handler = thread::spawn(move || {
    println!("spawned thread print {}", s);
});
handler.join().unwrap();
println!("Hello, world!, {}", s);
```
#### 4.21.4、消息传递
```js
use std::{sync::mpsc, thread};

fn main() {
    let (tx, rs) = mpsc::channel();

    thread::spawn(move || {
        let s = String::from("hello");
        tx.send(s).unwrap();
    });

    let received = rs.recv().unwrap();
    println!("{}", received);
}
```

### 4.22、闭包
```js
let inc = |num: i32| -> i32 { num + 1 };

let inc = |num| {
    num + 1
};

let inc = |num| num + 1;

println!("inc(1) = {}", inc(1));
```

### 4.23、异常处理
#### 4.23.1、unwrap
:::tip
- 如果没有报错，从返回值中提取内容
- 如果有错，直接panic
:::
```js
fs::read_to_string("path.txt").unwrap();
```

#### 4.23.2、unwrap_or_default
:::tip
- 如果没有报错，从返回值中提取内容
- 如果有错返回一个默认值
:::
```js
fs::read_to_string("path.txt").unwrap_or_default();
```

#### 4.23.3、unwrap_or_else
:::tip
- 如果没有报错，从返回值中提取内容
- 如果有错执行一个闭包
:::
```js
fs::read_to_string("path.txt").unwrap_or_else(|_| String::from("default"));
```
### 4.24、File
#### 4.24.1、Create
:::tip
std::fs::File::create()只读模式打开文件
- 文件存在清空
- 文件不存在创建
- 返回一个文件句柄
- std::fs::OpenOptions可设置读写模式
:::
```js
use std::{fs::File, io::Write};

fn main() -> std::io::Result<()> {
  let mut file = File::create("red.txt")?;
  file.write_all(b"hello")?;
  // writeln!(&mut file, "This is a red text")?;  
  Ok(())
}
```

```js
use std::{fs, io::Write};

fn main() -> std::io::Result<()> {
    let mut file = fs::OpenOptions::new()
        .append(true)
        .create(true)
        .open("red.txt")?;
    file.write("buf\n".as_bytes())?;

    Ok(())
}
```

#### 4.24.2、Open
:::tip
std::fs::File::open()只读模式打开一个已存在的文件
- 文件存在打开
- 文件不存在抛出错误
- 返回一个文件句柄
:::

```js
use std::fs::File;

fn main() -> std::io::Result<()> {
    let file = File::open("red.txt")?;
    // 打印文件内容长度
    println!("file: {}", file.metadata()?.len());

    Ok(())
}
```

```js
use std::fs;

fn main() -> std::io::Result<()> {
    let file = fs::OpenOptions::new()
        .append(true)
        .open("red.txt")?;
    // 打印文件内容长度
    println!("file: {}", file.metadata()?.len());

    Ok(())
}
```

#### 4.24.3、Read
以vec形式返回
```js
use std::{fs::File, io::Read};

fn main() -> std::io::Result<()> {
    let mut file = File::open("red.txt")?;
    let mut data = Vec::new();
    file.read_to_end(&mut data)?;
    // 打印内容
    println!("data: {}", String::from_utf8_lossy(&data));

    Ok(())
}
```

以字符串形式返回
```js
use std::{fs::File, io::Read};

fn main() -> std::io::Result<()> {
    let mut file = File::open("red.txt")?;
    let mut buf = String::new();
    file.read_to_string(&mut buf)?;
    println!("buf: {}", buf);

    Ok(())
}
```

按行读取
```js
use std::{fs::File, io::{BufReader, BufRead}};

fn main() -> std::io::Result<()> {
    let file = File::open("red.txt")?;

    let reader = BufReader::new(file);
    for (index, line) in reader.lines().enumerate() {
        println!("{} {}", index+1, line?);
    }

    Ok(())
}
```

## 5、示例
### 5.1、ferris-says库
```js
// main.rs
use ferris_says::say;
use std::io::{ stdout, BufWriter };

fn main() {
  let message = String::from("Hello, world!");
  let width = message.chars().count();
  
  let stdout = stdout();
  let mut writer = BufWriter::new(stdout.lock());
  say(&message, width, &mut writer).unwrap();
}
```

### 5.2、获取第一个单词
```js
fn first_world(s: &str) -> &str {
  let bytes = s.as_bytes();
  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
      return &s[0..i];
    }
  }
  s
}

println!("{}", first_world("hello world!"));
```

### 5.3、猜数游戏
```js
use std::{io::stdin, cmp::Ordering};
use rand::{thread_rng, Rng};

fn main() {
    println!("猜数游戏！！");
    let secret_number = thread_rng().gen_range(1..101);

    loop {
        println!("请猜一个数字：");
        let mut guess = String::new();
        stdin().read_line(&mut guess).expect("failed to read line.");
        // 转数字
        let guess: u32 = match guess.trim().parse() {
          Ok(num) => num,
          Err(_) => {
            continue;
          }
        };
        println!("你猜的数字是：{}", guess);
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("猜小了"),
            Ordering::Greater => println!("猜大了"),
            Ordering::Equal => {
                println!("猜对了");
                break;
            }
        }
    }
}
```