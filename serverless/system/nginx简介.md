# Nginx服务器
## 1、简介
`Nginx`是一款免费的开源软件，是一个`高性能`的`HTTP`和`反向代理`Web服务器。它可以作为一个HTTP服务器进行网站的发布处理，另外Nginx可以作为`反向代理`进行`负载均衡`的实现。

Nginx使用基于`事件驱动`架构，使得其可以支持数以`百万级别`的TCP连接。高度的模块化和自由软件许可证使得第三方模块层出不穷(开源)。

## 2、官网
http://nginx.org/

## 3、下载nginx
下载地址：http://nginx.org/en/download.html

查看历史版本：  http://nginx.org/download/

## 4、yum方式安装Nginx
:::tip 官网安装教程
安装教程地址: http://nginx.org/en/linux_packages.html#instructions
:::
### 4.1、安装工具集
```shell
# 升级所有包同时也升级软件和系统内核
yum update
# 安装yum依赖
yum install yum-utils
```

### 4.2、添加yum源文件
```shell
cd /etc/yum.repos.d/
# 添加nginx的yum源码
vim nginx.repo

# 或 直接新建 nginx.repo 文件
vim /etc/yum.repos.d/nginx.repo
```

### 4.3、配置信息到nginx.repo文件中
```shell
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```
:::warning 阿里云服务器
- 如果使用阿里云服务器上面三个步骤，可以省略上面3个步骤
- 如果发现无法安装最新版本的Nginx，可以配置上面步骤
:::
### 4.4、安装nginx
```shell
// -y表示不显示安装步骤
yum install -y nginx
```

### 4.5、查看nginx版本
```shell
nginx -v
```
### 4.6、查ngin包
```shell
yum list | grep nginx
```

### 4.7、查nginx安装相关的文件位置信息
```shell
whereis nginx
```

## nginx目录结构
```shell
# Nginx终端管理理命令
/usr/sbin/
# 启动 Nginx
/usr/sbin/nginx

# Nginx 配置
/etc/nginx
/etc/nginx/nginx.conf
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf

# Nginx模块⽬录
/usr/lib64/nginx

# 默认站点目录
/usr/share/nginx
```

## nginx常用命令
### 6.1、启动nginx
```shell
cd /usr/sbin/
./nginx
或
/usr/sbin/nginx
```

### 6.2、查看nginx进程
```shell
ps -ef  | grep nginx
```

### 6.3、查看nginx的进程 id
```shell
ps -C nginx -o pid
```

### 6.4、检查nginx配置文件正确性
```shell
nginx -t
```

### 6.5、停止nginx
```shell
# 快速停止或关闭Nginx服务
nginx -s stop

# 查看 nginx 的运行进程
ps -ef  | grep nginx
# 方式一：直接停止或关闭 nginx
nginx -s stop
# 再次查看 nginx 的运行进程
ps -ef  | grep nginx
```

### 6.6、重启nginx
```shell
# 修改配置文件后重新加载生效
nginx -s reload
```
### 6.7、完整有序的停止Nginx
```shell
nginx -s quit
```

### 6.8、查看nginx日志
```shell
tail -f /var/log/nginx/error.log
```

### 6.9、查看nginx运行路径
```shell
# 查询运行文件所在路径
which nginx
```

## 7、卸载 nginx
### 7.1、查找所有名字包含nginx的文件
```shell
find / -name nginx
```

### 7.2、删除所有名字包含nginx的文件
```shell
rm -rf 文件路径*
```

### 7.3、使用yum清理相关依赖和软件包
```shell
yum remove nginx
```

## 8、nginx 简单部署
:::tip
- nginx的默认站点静态文件目录 `/usr/share/nginx/html` 将自己的项目文件上传上来即可完成基础的测试部署
- 如果修改了配置文件，需要重新启动nginx`nginx -s reload`
:::
