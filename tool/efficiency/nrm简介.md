# nrm简介

## 1、简介
`nrm`是一个用于管理`npm`镜像源的Node.js工具。它可以让你轻松切换和管理不同的npm镜像源，方便在不同的网络环境下加快包的安装和下载速度。

## 2、安装
```shell
npm install -g nrm
```

## 3、使用
### 3.1、可用镜像列表

:::tip 
列出当前所有可用的镜像源及其地址
:::

```shell
nrm ls
/*
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/
*/
```
### 3.2、查看当前镜像源
:::tip
查看当前正在使用的镜像源信息
:::

```shell
nrm current
```

### 3.3、切换镜像源
:::tip
切换到指定的镜像源
:::

```shell
nrm use taobao
```

### 3.4、添加镜像源
:::tip
添加一个新的镜像源
:::
```shell
nrm add xx http://xxx.xx
```

### 3.5、删除镜像源
:::tip
删除指定的镜像源
:::

```shell
nrm del xx
```

### 3.6、测试镜像源
:::tip
测试所有镜像源的响应速度
:::

```shell
nrm test
```