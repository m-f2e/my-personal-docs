## 什么是Dev Containers
`Dev Containers`是一种`Docker容器技术`，它允许开发人员在单个容器中运行多个应用程序和服务，并使用户能够轻松地在不同的环境中进行开发和测试。

与传统的Docker容器不同，`Dev Containers`提供了一种更灵活的开发环境，因为它们可以在`同一个容器中运行多个应用程序和服务`，而不需要为每个应用程序和服务创建单独的容器。这使得开发人员可以更容易地共享代码、工具和资源，从而提高开发效率和协作能力。

## 可以参考示例
https://github.com/MisterZhouZhou/oh-mz-dev

## 使用Dev Containers
1. 在一个项目目录下，创建`.devcontainer`文件夹
2. 在`.devcontainer`文件夹下创建一个`Dockerfile`文件
3. 在`Dockerfile`文件中添加以下内容
```ts
FROM mzlmdocker/oh-mz-docker-linux:0.0.1
```
4. 在`.devcontainer`文件夹下创建一个`devcontainer.json`文件
5. 在`devcontainer.json`文件中添加以下内容
```json
{
	"name": "OhMzDockerLinuxDev",
	"context": "..",
	"dockerFile": "./Dockerfile",
	"settings": {},
	"extensions": [
		"golang.go",
		"dbaeumer.vscode-eslint",
		"esbenp.prettier-vscode",
		"castwide.solargraph",
		"kaiwood.endwise",
		"jnbt.vscode-rufo",
		"MS-CEINTL.vscode-language-pack-zh-hans",
		"denoland.vscode-deno"
	],
	"runArgs": [
		"--privileged",
		"--dns=114.114.114.114", // 如果你用的是长城宽带，在遇到网络不通的时候，可以删掉这一行
		"--network=network1"
	],
	"containerEnv": {
		"DISPLAY": "host.docker.internal:0.0"
	},
	"mounts": [
    "source=docker,target=/var/lib/docker,type=volume",
		"source=config,target=/root/.config,type=volume",
    "source=vscode-extensions,target=/root/.vscode-server/extensions,type=volume",
		"source=ssh,target=/root/.ssh,type=volume",
		"source=go-bin,target=/root/go/bin,type=volume",
		"source=pnpm-bin,target=/root/.local/share/pnpm,type=volume",
		// "source=gems,target=/usr/local/rvm/gems,type=volume",
    // "source=rust-bin,target=/root/.cargo/bin,type=volume",
    //
    // 修改之前请看一下上面内容是否已经包含你需要的挂载
    // 重复挂载将导致容器启动失败！
    //
		"source=repos,target=/root/repos,type=volume"
	],
	// Uncomment to connect as a non-root user if you've added one. See https://aka.ms/vscode-remote/containers/non-root.
	// "shutdownAction": "none",
	"remoteUser": "root",
	// "overrideCommand": false,
	// "forwardPorts": [],
	// "postCreateCommand": "apt-get update && apt-get install -y curl",
	"postStartCommand": "nohup bash -c '/usr/sbin/dockerd &> /var/log/dockerd.log &' &> /dev/null"
}
```
6. 在`VSCode`中使用快捷键`Command + Shift + P`

![Dev Containers](/vscode/devContainer.jpg)

7. 等待构建完成即可