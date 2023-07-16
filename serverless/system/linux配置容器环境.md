# linux配置容器环境

## 1、安装docker
### 1.1、一键安装
:::tip
`docker`安装好后默认路径为 `/var/lib/docker` ，其下的`containers`文件夹为容器文件夹，`image`为镜像文件夹
:::

```shell
#安装命令
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

#或使用国内 daocloud 一键安装命令
curl -sSL https://get.daocloud.io/docker | sh

或者
wget -qO- get.docker.com | sh
```

### 1.2、手动安装
#### 1.2.1、安装依赖包
> yum-util 提供的yum-config-manager devicemapper存储驱动程序需要依赖 device-mapper-persistent-data 和 lvm2

```shell
#安装命令
yum install -y yum-utils device-mapper-persistent-data lvm2
```
#### 1.2.2、设置yum源
```shell
#官方源（慢，国内不建议）
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo

#阿里源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#清华大学源
yum-config-manager --add-repo https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```
#### 1.2.3、安装docker ce（社区版|免费）
```shell
#安装命令
yum install -y docker-ce docker-ce-cli containerd.io

```

#### 1.2.4、安装指定版本
:::tip
- 使用`yum list docker-ce --showduplicates | sort -r`查看可用版本
- 安装指定版本
:::

```shell
// 查看可用版本
yum list docker-ce --showduplicates | sort -r

如： docker-ce.x86_64  3:20.10.9-3.el7  docker-ce-stable 

// 安装指定版本
yum install -y docker-ce-20.10.9 docker-ce-cli-20.10.9 containerd.io
```

#### 1.2.5、修改docker文件路径
:::tip
vim /etc/docker/daemon.json 
:::
内容如下：
```shell
{
  "data-root": "/data/docker"
}
```

## 2、安装docker-compose
### 2.1、安装
```shell
curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 2.2、给docker-compose执行权限
```shell
chmod +x /usr/local/bin/docker-compose
```

### 2.3、检查docker-compose版本
```shell
docker-compose --version
```

## 3、docker命令
### 3.1、启动docker
```shell
systemctl start docker 
或者 
service docker start
```

### 3.2、停止docker
```shell
systemctl stop docker 
或者 
service docker stop
```

### 3.3、重启docker
```shell
systemctl restart docker 
或者 
service docker restart
```

### 3.4、查看docker状态
```shell
systemctl status docker 
或者 
service docker status
```

### 3.5、查看docker进程
```shell
ps -ef | grep docker
```