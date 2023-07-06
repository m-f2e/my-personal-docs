
## pnpm简介

`pnpm`是一个包管理器,它含义为`performant npm`意指『高性能的 npm』，与npm一样的都是软件包管理工具。

## 安装pnpm
```shell
npm install -g pnpm
```

## 常用命令
pnpm常用命令的使用

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