# 搭建npm私服

## 1、npm私服的好处
- 可以离线使用，你可以将npm私服部署到内网集群，这样离线也可以访问私有的包。
- 提高包的安全性，使用私有的npm仓库可以更好的管理你的包，避免在使用公共的npm包的时候出现漏洞。
- 提高包的下载速度，使用私有 npm 仓库，你可以将经常使用的 npm 包缓存到本地，从而显著提高包的下载速度，减少依赖包的下载时间。这对于团队内部开发和持续集成、部署等场景非常有用

## 2、Verdaccio
:::tip
`Verdaccio`是可以帮我们快速构建npm私服的一个工具
:::

### 2.1、官网
https://verdaccio.org/zh-CN/

### 2.2、安装
```shell
npm install verdaccio -g
```

### 2.3、启动
```shell
verdaccio
```

### 2.4、访问
```shell
http://localhost:4873
```

### 2.5、基本命令

#### 2.5.1、创建账号
```shell
#创建账号
npm adduser --registry http://localhost:4873/
# 账号 密码 邮箱
```

#### 2.5.2、发布npm
```shell
# 发布npm
npm publish --registry http://localhost:4873/
```

#### 2.5.3、指定开启端口
```shell
#指定开启端口 默认 4873
verdaccio --listen 9999
```
#### 2.5.4、指定安装源
```shell
# 指定安装源
npm install --registry http://localhost:4873
```

#### 2.5.5、从本地仓库删除包
```shell
# 从本地仓库删除包
npm unpublish <package-name> --registry http://localhost:4873
```

#### 2.5.6、其他配置
https://verdaccio.org/zh-CN/docs/configuration