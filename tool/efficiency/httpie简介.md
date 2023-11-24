# httpie
## 1、简介
httpie是一个命令行HTTP客户端，它可以让你更方便地发送HTTP请求。

它是用Python写的，但它并不依赖Python。

它支持GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS和TRACE方法，并且支持文件上传。

它也支持json, xml, yaml, form, multipart, file, 和binary输入。

## 2、官网
官网：https://httpie.io

## 3、安装
安装文档： https://httpie.io/docs/cli/homebrew
```bash
# macos
brew install httpie
```

## 4、使用
参考资源： 
- https://www.msipo.com/article-29368.html
- https://zhuanlan.zhihu.com/p/45093545

### 4.1、get请求
```bash
http pie.dev/get

http get pie.dev/get
```

### 4.2、post请求
```bash
http pie.dev/post hello=world

http POST pie.dev/post hello=world
```

### 4.3、put请求
```bash
http pie.dev/put

http put pie.dev/put

http put pie.dev/put name=John email=john@example.org
```

### 4.4、delete请求
```bash
http pie.dev/delete

http delete pie.dev/delete
```

### 4.5、patch请求
```bash
http pie.dev/patch

http patch pie.dev/patch
```
