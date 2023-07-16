# Nginx 配置

## 1、nginx.conf 核心配置文件

```shell
# 查看Nginx安装相关的文件位置信息
whereis nginx
# 查看nginx配置
cat /etc/nginx/nginx.conf
```

:::tip
- nginx 全局块，配置影响nginx全局的指令
- 每个指令必须有分号结束
:::
```shell

# nginx的worker进程运行用户以及用户组
user  nginx;
# nginx开启的进程数，通常应该为当前主机的CPU物理核数;
# auto 表示 和 CPU内核相关，有几个内核，就会开启几个进程
worker_processes  auto;

# 制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
error_log  /var/log/nginx/error.log notice;
# 指定nginx进程运行文件存放地址
pid        /var/run/nginx.pid;

# events块（事件配置）
# 配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
events {
    # 每一个进程可以处理多少个连接，如果是多核可以将连接数调高 worker_processes * 1024
    worker_connections  1024;

    # 设置网路连接序列化，防止惊群现象发生，默认为 on
    # accept_mutex on;
    # 设置一个进程是否同时接受多个网络连接，默认为 off
    # multi_accept on;
    # 事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    # use epoll;
}

# http块
http {
    # 文件扩展名与文件类型映射表
    include       /etc/nginx/mime.types;
    # 默认文件类型，默认为text/plain
    default_type  application/octet-stream;
    # 自定义日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # 用了log_format 指令设置了日志格式之后，需要用access_log指令指定日志文件的存放路径；
    access_log  /var/log/nginx/access.log  main;

    # 允许sendfile方式传输文件，默认为off，可以在http块，server块，location块
    sendfile        on;
    # 防止网络阻塞
    #tcp_nopush     on;

    # 连接超时时间，可以在http，server，location块
    keepalive_timeout  65;

    # gzip模块设置
    #gzip  on;

    # 引入系统默认的配置文件
    include /etc/nginx/conf.d/*.conf;
}
```
## 2、日志格式log_format
:::tip
 log_format 有很多可选的参数用于标示服务器的活动状态，默认的是：

'$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" "$http_x_forwarded_for"';
:::
### 2.1、查看日志目录
```shell
ls -l /var/log/nginx/
```
### 2.2、查看日志格式
```shell
cat /var/log/nginx/access.log
```

### 2.3、日志参数
|参数|描述|示例|
|:--|:--|:--|
|$remote_addr	|客户端地址	|117.132.65.236|
|$remote_user	|客户端用户名称|	- -|
|$time_local	|访问时间和时区|	24/Aug/2022:09:46:53 +0800|
|$request	|请求的 URI 和 HTTP 协议	|"GET /./assets/js/48.e1244895.js HTTP/1.1"|
|$http_host	|请求地址，即浏览器中你输入的地址（IP 或域名）|	https://www.arryblog.com/guide/css3/css-30-case.html|
|$status	|HTTP 请求状态|	200|
|$upstream_status	|upstream 状态|	200|
|$body_bytes_sent	|发送给客户端文件内容大小	|3618|
|$http_referer	|url 跳转来源	|https://www.baidu.com/|
|$http_user_agent	|用户终端浏览器等信息	|"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"|
|$ssl_protocol	|SSL 协议版本|	TLSv1|
|$ssl_cipher	|交换数据中的算法|	RC4-SHA|
|$upstream_addr	|后台 upstream 的地址，即真正提供服务的主机地址|	13.28.68.36:80|
|$request_time	|整个请求的总时间|	0.165|
|$upstream_response_time	|请求过程中，upstream 响应时间	|0.002|

## 3、自定义配置文件
### 3.1、创建配置文件
> 1)在 /etc/nginx/目录下新建文件夹 vhosts
```shell
cd /etc/nginx/
mkdir vhosts
```
> 2)在 vhosts 文件夹下新建文件 服务器ip.conf
```shell
cd vhosts/
vim 服务器ip.conf
```
内容如下：
```shell
server {
  listen 80;
  server_name 147.100.86.253;
	location / {
    # 例如，您的网站运行目录在/workspace/project/workspace/project
    root /workspace/project;
    index index.html index.htm;
  }
}
```
### 3.2、修改主配置文件
:::tip
在修改默认的 nginx.conf 配置文件时，需要先备份
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
:::

> 在`/etc/nginx/nginx.conf`中的 http 模块底部引入以上新建的自定义配置文件 `vhosts/服务器ip.conf`

编辑 nginx.conf 配置文件
```shell
vim /etc/nginx/nginx.conf
```
在 nginx.conf 文件中的引入自定义配置文件
```shell
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # 添加自定义配置文件，用于配置我们自己的域名（导入的自定义配置文件是有先后顺序的）
	include /etc/nginx/vhosts/*.conf;
    include /etc/nginx/conf.d/*.conf;
}
```

### 3.3、检查配置文件正确性
```shell
nginx -t
```

### 3.4、新建项目目录，上传并测试
```shell
mkdir -p /workspace/project
cd workspace/project
```
> 通过rz的方式直接上传一个index.html文件做测试
```shell
# 如果没有 rz 上传命令，就先安装即可
yum install lrzsz -y

rz 回车后选择需要上传的文件
```
### 3.5、重启服务
```shell
/usr/sbin/nginx -s reload
```

## 4、GZIP压缩
:::tip
在 nginx 的默认主配置文件nginx.conf中，添加以下配置即可
:::

### 4.1、GZIP压缩配置
```shell
# 开启压缩功能，on 表示开启 off 表示关闭，默认是 off
gzip on;
#表示允许压缩的页面最小字节数，页面字节数从header头的Content-Length中获取。默认值是0，表示不管页面多大都进行压缩，建议设置成大于1K。如果小于1K可能会越压越大。即：小于设置值的文件将不会压缩
gzip_min_length  1k;
# 设置压缩所需要的缓冲区大小
gzip_buffers 4 32k;
# 设置gzip压缩针对的HTTP协议版本
gzip_http_version 1.1;
# gzip 压缩级别，1-9，数字越大压缩的越好（一般选择4-6），也越占用CPU时间
gzip_comp_level 6;
gzip_types text/css text/xml application/javascript;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;
```

### 4.2、GZIP压缩示例
```shell
events {
    use epoll;
    worker_connections 51200;
    multi_accept on;
}

http {
    gzip on;
    gzip_min_length  1k;
    gzip_buffers     4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types application/atom+xml application/geo+json application/javascript application/x-javascript application/json application/ld+json application/manifest+json application/rdf+xml application/rss+xml application/xhtml+xml application/xml font/eot font/otf font/ttf image/svg+xml image/jpeg image/gif image/png text/css text/javascript text/plain text/xml;
    gzip_vary on;
    gzip_disable   "MSIE [1-6]\.";
}
```

重启服务
```shell
nginx -s reload
```