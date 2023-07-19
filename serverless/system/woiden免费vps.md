# Woiden免费VPS

## 1、vps简介
`VPS服务器`（虚拟专用服务器）（"Virtual Private Server"，或简称 }"VPS"）是利用虚拟服务器软件(如微软的Virtual Server、VMware的ESX server、SWsoft 的Virtuozzo)在一台物理服务器上创建多个相互隔离的小服务器。

`VPS`（Virtual Private Server 虚拟专用服务器）技术，将一部服务器分割成多个`虚拟专享服务器`的优质服务。每个VPS都可分配独立`公网IP地址`、`独立操作系统`、`独立超大空间`、`独立内存`、`独立CPU资源`、`独立执行程序`和`独立系统配置`等。 用户除了可以分配多个虚拟主机及无限企业邮箱外，更具有独立服务器功能，可自行安装程序，单独重启服务器。 高端虚拟主机用户的最佳选择。

## 2、woiden vps简介
`Woiden VPS`是一家提供VPS服务器服务的公司,其VPS服务器价格实惠,且服务质量不错。`Woiden VPS`的VPS服务器支持`Linux`和`Windows`操作系统,有多种配置选择,可以满足各种应用需求。`Woiden VPS`还提供了7天无理由退款的服务,客户可以在购买后7天内申请退款,非常方便。

## 3、woiden vps限制
:::warning 限制
申请的vps仅能使用 **3天**，到期后需要续签或者重新申请。
:::

## 4、woiden vps申请
:::tip
- 申请woiden vps前，需要先注册 **Telegram**（woiden使用 [Telegram](https://telegram.org/) 进行登录）
- Telegram官网地址：https://telegram.org/
:::

申请地址：https://woiden.id/create-vps/

![woiden-create](/system/woiden-create.jpg)


## 5、woiden vps基本使用

### 5.1、vps登录

web终端登录地址： https://ssh.hax.co.id/

输入ipv6和密码即可
![woiden-login](/system/woiden-login.jpg)


### 5.2、vps验证配置
```shell
wget -qO- bench.sh | bash
```

### 5.3、文件服务器
:::tip
- 输入IP
- 选择授权类型为密码
- 输入密码
:::
文件服务器地址：https://ftp.hax.co.id/

![woiden-file](/system/woiden-file.jpg)

## 6、woiden vps安装宝塔
:::tip
- 宝塔官网： https://www.bt.cn/new/index.html?invite_code=MV9oc2Jib3U=
- 安装地址： https://www.bt.cn/new/download.html
:::

centos安装
```shell
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

![woiden-bt](/system/woiden-bt.jpg)

