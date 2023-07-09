# nvm简介

## 1、简介
`nvm（Node Version Manager）`是一个用于管理`Node.js版本`的工具，它允许你在同一台机器上同时安装和切换不同版本的Node.js。

## 2、特点和优势：

多版本管理：nvm 可以同时安装和使用多个不同的 Node.js 版本。这对于开发者来说很有用，因为不同的项目可能需要不同的 Node.js 版本。
快速切换：通过 nvm，你可以轻松地在不同的 Node.js 版本之间进行切换。这对于测试和调试不同版本的代码非常方便。
独立环境：每个已安装的 Node.js 版本都在独立的环境中运行，互不干扰。这意味着你可以在同一台机器上同时运行和管理多个项目，每个项目都使用不同的 Node.js 版本。
简单易用：nvm 提供简洁的命令行接口，使得安装、切换和删除 Node.js 版本变得非常简单。
跨平

## 3、安装nvm

### 3.1、 执行安装命令
```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
```shell
// Wget 安装方式
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

### 3.2、修改.bash_profile
```shell
# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### 3.3、更新配置文件
```shell
source ~/.bash_profile
```

### 3.4、验证nvm
:::tip 
输入命令，输出版本信息即为成功
:::

```shell
nvm --version
```

## 4、设置淘宝镜像源
:::tip
nvm ls-remote无法获取到最新的节点，解决方法：更改nvm的镜像源
:::

### 4.1、直接安装
```shell
NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node nvm install v16.19.1
```

### 4.2、更改nvm镜像源
```shell
# nvm
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

更新配置文件
```shell
source ~/.bash_profile
```

## 5、查看node版本
### 5.1、查看本地版本
```shell
nvm list
```
### 5.2、查看远程版本
```shell
nvm ls-remote
```

## 6、版本切换
### 6.1、安装指定版本
```shell
// 安装v4.4.0，既可nvm install v4.4.0，又可nvm install 4.4
nvm install v14

nvm install v16.19.1
```

### 6.2、切换node版本
```shell
nvm use v10.22.1
```

## 7、删除指定版本
```shell
nvm uninstall <version>
```
