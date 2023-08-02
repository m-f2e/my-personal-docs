# NodeJS + TS

## 1、开发环境

### 1.1、ts-node + nodemon
#### 1.1.1、安装
```shell
$ npm i typescript @types/node ts-node nodemon -D
```

#### 1.1.2、配置
`package.json`
```json
{
  "scripts": {
		"dev": "nodemon --watch src -e ts --exec ts-node src/index.ts",
	},
}
```

#### 1.1.3、nodemon文件配置
`nodemon.json`
```json
{
  "restartable": "rs", // 指定重启的命令，当使用 nodemon 启动应用程序时，可以直接键入 rs 来重启服务
  "delay": 1000, // 启动和关闭之间的延迟时间(以毫秒为单位)
  "verbose": true, // 详细的输出信息
  "ignore": ["assets", "package.json"], // 忽略的文件
  "watch": ["app"], // 监视的文件类型
  "ext": "js, json", // 要监视的文件扩展名
  "execMap": { // 可以接受一个字典，其中键是要执行的命令名称，值是执行该命令的函数
    "ts": "ts-node",
    "js": "node"
  },
}
```
`package.json`
```json
{
  "scripts": {
		"dev": "nodemon --config nodemon.json",
		"dev": "nodemon app/index.ts",
	},
}
```

### 1.2、ts-node-dev
#### 1.2.1、安装
```shell
$ npm i typescript @types/node ts-node-dev -D
```
#### 1.2.2、配置
配置`tsconfig.json`(根据实际情况配置及修改)
```json
"experimentalDecorators"：true
"module": "commonjs", 
```

`package.json`
```json
{
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
		"start": "ts-node-dev --inspect=9230 --respawn --debug src/index.ts",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
}
```