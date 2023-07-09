
## pnpm简介

`pnpm`是一个包管理器,它含义为`performant npm`意指『高性能的 npm』，与npm一样的都是软件包管理工具。与传统的`npm`和`yarn`不同，`pnpm`采用了一种独特的方式来处理依赖项，称为`"逻辑连接(Linking)"`，以`减少磁盘空间的占用`和`加快安装`过程。

## 特点和优势：
1. 快速安装：pnpm使用逻辑链接的方式，将共享的模块直接链接到项目中，避免了重复下载和存储。这大大提高了安装速度，并节省了磁盘空间。
2. 空间占用更小：由于使用了链接机制，每个项目的依赖项只会被保存一次，而不是像npm和Yarn那样在每个项目中都存储一份。这可以显著减少磁盘空间的占用。
3. 并行安装：pnpm能够并行安装多个包，利用系统资源提升安装速度。
4. 冲突解决：pnpm通过保留依赖树上所有版本的方式来解决依赖冲突。这使得开发者可以在不出现兼容性问题的情况下使用不同版本的包。
5. 良好的兼容性：pnpm与npm兼容，可以直接使用package.json中的依赖配置，无需进行额外转换。
6. 命令行友好：pnpm提供了易于使用的命令行界面，并且和npm的命令语法类似，可以轻松上手。

## 安装pnpm
```shell
npm install -g pnpm
```

## 常用命令
:::tip 
pnpm常用命令的使用
:::
### 全局安装
```shell
pnpm add -g <Module Name>
```

### 当前项目安装
```shell
# 开发环境模块
pnpm add <Module Name> -D

# 生产环境模块
pnpm add <Module Name>
或者
pnpm add <Module Name> -S
```

### 根据package.json安装
```shell
pnpm install
或者
pnpm i
```
### 查看已安装模块
```shell
pnpm list
或者
pnpm ls
```

### 查看包信息
```shell
pnpm info axios
或者
pnpm view axios
```
### 更新自身版本
```shell
pnpm update
或者
pnpm up
```

### 更新指定模块
```shell
pnpm update <Module Name>
```

### 卸载指定模块
```shell
pnpm uninstall <Module Name>
```

### 卸载全局模块
```shell
pnpm uninstall -g <Module Name>
或者
pnpm rm -g <Module Name>
或者
pnpm un -g <Module Name>
```