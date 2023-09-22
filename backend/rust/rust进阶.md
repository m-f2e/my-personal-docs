# Rust进阶
## 1、collect
:::tip
- collect将一个数据转换成一个新的集合
:::
### 1.1、定义
```js
let numbers = vec![1, 2, 3, 4, 5];
let sum: Vec<i32> = numbers.iter().map(|x| x * x).collect(); 
println!("{:?}", sum);
```

### 1.2、zip + collect
```js
let teams = vec![String::from("blue"), String::from("red")];
let inial = vec![1, 2];
let scores: HashMap<_, _> = teams.iter().zip(inial.iter()).collect();
println!("{:?}", scores);

// {"blue": 1, "red": 2}
```

## 2、HashMap
### 2.1、定义
```js
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
```

### 2.2、entry
```js
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

// entry: 有key返回，无key创建
// or_insert: 有值返回，无值创建
scores.entry(String::from("Yellow")).or_insert(50);
```

### 2.3、动态创建
```js
let text = "hello world from rust";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}
println!("map: {:?}", map);
```

## 3、测试
### 3.1、单元测试
```js
fn main() {

}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

### 3.2、断言类型
#### 3.2.1、assert(相等)
```js
assert!(true); // ok
assert!(false); // false
// 测试失败提示
assert!(false, "测试结果true");
```
#### 3.2.2、assert_eq(相等+表达式)
```js
assert_eq!(1 + 2, 4, "测试结果1 + 2 = 3");
assert_eq!(1 + 2, 3, "测试结果{} + {} = {}", 1, 2, 3);
```

#### 3.2.3、assert_ne(不等)
```js
assert_ne!(1 + 2, 4, "测试结果1 + 2 = 3"); // ok
```

### 3.3、使用外部方法
:::tip
使用`use super::*;`引入外部模块
:::
```js
fn eq(x: i32, y: i32, r: i32) -> bool {
    x + y == r
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert!(eq(1, 2, 3));
    }
}
```

### 3.4、集成测试
:::tip
项目中必须同时包含`lib.rs`和`main.rs`, 否则会报错
:::
```js

```

## 4、结果输出
### 4.1、将结果输出到文件，错误打印
:::tip
- `eprintln`输出到标准错误
- `println`输出到标准输出
:::
```js
use std::{fs, process};

fn main() {
  let result = fs::read_to_string("path.txt").unwrap_or_else(|err| {
    eprintln!("Failed to read file: {:?}", err);
    process::exit(1)
  });
  println!("{}", result);
}
```
运行：
```shell
cargo run > output.txt
```

## 5、运算符重载
### 5.1、+重载
```js
use std::ops;

#[derive(Debug)]
struct Complex {
    real: f64,
    imag: f64,
}

impl Complex {
    fn new(real: f64, imag: f64) -> Self {
        Complex {
            real,
            imag
        }
    }
}

impl ops::Add for Complex {
    type Output = Self;
    fn add(self, other: Complex) -> Self {
        Complex {
            real: self.real + other.real,
            imag: self.imag + other.imag,
        }
    }
}

fn main() {
    let c = Complex::new(1.0, 2.0);
    let d = Complex::new(3.0, 4.0);
    let sum = c + d;
    println!("{:?}", sum);
}
```

## 6、宏
### 6.1、规则宏(声明宏)
#### 6.1.1、宏定义
示例1
```js
macro_rules! my_macro {
    () => {
        println!("My macro!");
    };
}

fn main() {
    my_macro!();
}
```
示例2
```js
macro_rules! log {
    ($level: expr, $($arg: tt)*) => {
        println!(concat!("[", $level, "] ", $($arg)*));
    };
}
```

#### 6.1.2、带参数宏
```js
macro_rules! add {
    ($x: expr, $y: expr) => {
        $x + $y
    };
}
```

#### 6.1.3、多个参数宏
```js
macro_rules! sum {
    ($x:expr) => {
        $x
    };
    ($x:expr, $($rest:expr),*) => {
        $x + sum!($($rest),*)
    };
}
```

#### 6.1.4、数据结构定义
```js
macro_rules! point {
    ($name: ident, $x: expr, $y: expr) => {
        struct $name {
            x: i32,
            y: i32,
        }

        impl $name {
            fn new(x: i32, y: i32) -> Self {
                $name { x, y }
            }

            fn get_x(&self) -> i32 {
                self.x
            }

            fn get_y(&self) -> i32 {
                self.y
            }
        }
    };
}
fn main() {
    point!(Point, 1, 2);
    let p = Point::new(1, 2);
    println!("x: {} y: {}", p.get_x(), p.get_y());
}
```

#### 6.1.5、DSL
```js
macro_rules! html_element {
    ($tag:expr, { $($attr:ident=$value:expr),* }, [$($content:expr),*]) => {{
        let mut element = String::new();
        element.push_str(&format!("<{} ", $tag));
        $(element.push_str(&format!("{}=\"{}\" ", stringify!($attr), $value));)*
        element.push_str(">");
        element.push_str(&format!("{}", html_content!($($content),*)));
        element.push_str(&format!("</{}>", $tag));
        element
    }};
}

macro_rules! html_content {
    ($($content:expr),*) => {
        format!($($content),*)
    };
    () => {
        String::new()
    };
}

fn main() {
    let name = "Alice";
    let age = 30;

    let html = html_element!(
        "div",
        {
            class="container",
            id="user-info",
            data="user-data"
        },
        [
            "Name: {}, Age: {}", name, age
        ]
    );

    println!("{}", html);
}
```

#### 6.1.6、匹配模式宏
```js
macro_rules! expr_match {
    ($e:expr) => {
        println!("The expression is {:?}", $e);
    };
    ($e:expr, $msg:expr) => {
        println!("{}: {:?}", $msg, $e);
    };
    ($e:expr, $msg:expr, $result:expr) => {
        println!("{}: {:?} => {:?}", $msg, $e, $result);
    };
}
```

### 6.2、过程宏(属性宏)
:::tip
添加配置项`Cargo.toml`, 在`lib.rs`中定义宏
```js
[lib]
proc_macro = true
path = "src/lib.rs"
```
:::
#### 6.2.1、简单宏
```js
use proc_macro::TokenStream;

#[proc_macro_attribute]
pub fn my_attribute(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let mut result = item.to_string();
    result.push_str(" // This is my custom attribute!");
    result.parse().unwrap()
}
```
main.rs
```js
use rust_tools::my_attribute;

#[my_attribute]
fn hello() {}

fn main() {
    hello();
}
```

#### 6.2.2、带参数的宏
```js
use proc_macro::TokenStream;

#[proc_macro_attribute]
pub fn my_attribute(attr: TokenStream, item: TokenStream) -> TokenStream {
    let function_name = attr.to_string();
    let mut result = item.to_string();
    result.push_str(&format!("fn {}() {{", function_name));
    result.push_str("println!(\"This is a custom function generated by attribute macro!\"); }");
    result.parse().unwrap()
}
```
main.rs
```js
use rust_tools::my_attribute;

#[my_attribute(hello)]
fn dummy() {}

fn main() {
    hello();
}
```

#### 6.2.3、自定义数据结构
```js
use proc_macro::TokenStream;

#[proc_macro_attribute]
pub fn my_struct(attr: TokenStream, item: TokenStream) -> TokenStream {
    let struct_name = attr.to_string();
    let mut result = item.to_string();
    result.push_str(&format!("struct {} {{", struct_name));
    result.push_str("data: i32, }");
    println!("{}-{}-{}", attr, item, result);
    result.parse().unwrap()
}
```
main.rs
```js
use rust_tools::my_struct;

#[my_struct(Point)]
fn dummy() {}

fn main() {
    let point = Point { data: 12 };
    println!("{}", point.data);
}
```

### 6.3、函数宏
#### 6.3.1、简单宏
```js
use proc_macro::TokenStream;

#[proc_macro]
pub fn print_hello(_input: TokenStream) -> TokenStream {
    let output = "println!(\"Hello, macro!\");";
    output.parse().unwrap()
}
```

#### 6.3.2、带参数的宏
```js
use proc_macro::TokenStream;

#[proc_macro]
pub fn print_message(input: TokenStream) -> TokenStream {
    let message = input.to_string();
    let output = format!("println!(\"{}!\");", message);
    output.parse().unwrap()
}
```
main.rs
```js
use rust_tools::print_hello;

fn main() {
    print_message!(111);
}
```

#### 6.3.3、自定义数据结构
```js
use proc_macro::TokenStream;

#[proc_macro]
pub fn my_struct(input: TokenStream) -> TokenStream {
    let struct_name = input.to_string();
    let output = format!("struct {} {{ data: i32 }}", struct_name);
    output.parse().unwrap()
}
```

#### 6.3.4、自定义宏
lib.rs
```js
extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // rust转字符串
    let ast = syn::parse(input).unwrap();
    impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        trait HelloMacro {
            fn hello_macro();
        }
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}", stringify!(#name));
            }
        }
        impl #name {
            fn hello_macro2() {
                println!("Hello, Macro! My name is {}", stringify!(#name));
            }
        }
    };
    gen.into()
}
```
main.rs
```js
use packages::HelloMacro;

#[derive(HelloMacro)]
struct Post{}
    
fn main() {
    Post::hello_macro2();
}
```

### 6.4、文档
#### 6.4.1、文档格式
```js
//! # my doc
//! 
//! my doc description
//! 

/// 计算一个数字加1后的值
/// 
/// x: 第一个参数
/// 
/// # Example
/// 
/// ```
///   let arg = 5;
///   let result = rust-tools::add(arg);
/// 
///   assert_eq!(6, result);
/// ```
pub fn add(x: i32) -> i32 {
    x + 1
}
```

#### 6.4.2、展开导出
```js
// 展开导出
pub use self::Kinds::{PrimaryColor, SecondaryColor};

pub mod Kinds {
    /// primary color
    pub enum PrimaryColor {
        Red,
        Yellow,
        Blue,
    }

    /// secondary color
    pub enum SecondaryColor {
        Orange,
        Green,
        Purple,
    }
}
```

#### 6.4.3、文档预览
```shell
cargo doc --open
```

#### 6.4.4、文档生成
```shell
cargo doc
```

### 6.5、工作区间
#### 6.5.1、工作区间配置
目录结构
```js
|-workspace
  |-add-one
    |-Cargo.toml
    |-src
  |-add-two
    |-Cargo.toml
    |-src
  |-Cargo.toml
```
创建工作区间
```shell
cargo new add-one --lib
```
将lib模块添加到工作区间, 根目录下`Cargo.toml`
```js
[workspace]
members = [
  "add-one",
  "add-two",
]
```
指定编译工作区间
```shell
cargo build -p add-one
```

指定运行工作区间
```shell
cargo run -p add-one
```

#### 6.5.2、工作区间引用
`add-one`下的`Cargo.toml`
```js
[dependecies]
add-two = { path = "../add-one" }
```

