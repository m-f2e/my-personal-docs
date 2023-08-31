# NodeJS简介
## 1、简介
`Node.js`是一个开源和跨平台的`JavaScript`运行时环境，它建立在`Google Chrome V8 JavaScript`引擎之上，主要用于创建网络服务器，但不仅限于此。
`Node.js`在浏览器之外运行`V8 JavaScript`引擎(Google Chrome 的内核),这使得`Node.js`非常高效。Node.js 应用程序在单个进程中运行，无需为每个请求创建新线程。

Node.js 对一些特殊进行优化，提供替代的，使得 V8 在非浏览器环境下运行得更好。

## 2、官网
https://nodejs.org/zh-cn

## 3、安装
### 3.1、直接安装
在官网下载`Node.js`安装包进行安装

### 3.2、多版本管理
[nvm安装文档](/tool/efficiency/nvm简介) 

## 4、语法
### 4.1、系统API
#### 4.1.1、process(进程)
##### 4.1.1.1、process.cwd（命令行工作目录）
```ts
process.cwd()
```
##### 4.1.1.2、process.env（环境变量）
```ts
process.env
```
##### 4.1.1.3、process.argv（命令行参数）
```ts
process.argv
```

#### 4.1.2、path(路径)
##### 4.1.2.1、path.join(路径拼接)
```ts
path.join('a', 'b', 'c')
```
##### 4.1.2.2、path.resolve(路径拼接)
```ts
path.resolve(__dirname, 'index.ts')
```
##### 4.1.2.3、path.dirname(获取目录名)
```ts
path.dirname(__dirname)
```
##### 4.1.2.4、path.basename(获取文件名)
```ts
path.basename(__dirname)
```
##### 4.1.2.5、path.extname(获取扩展名)
```ts
path.extname(__dirname)
```

#### 4.1.2.6、path.sep(获取路径分隔符)
```ts
path.sep

// /
```

#### 4.1.3、1