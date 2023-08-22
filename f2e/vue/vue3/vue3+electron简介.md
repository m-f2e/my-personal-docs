# Vue3 + Electron 构建开发桌面程序

参考链接:

- https://xiaoman.blog.csdn.net/article/details/131713875
- https://xiaoman.blog.csdn.net/article/details/126063804

## 1、初始化项目

```shell
# 创建Vue项目
npm init vue
# 安装依赖
npm install
# 一定要安装成开发依赖
npm install electron electron-builder -D
```

## 2、目录结构

```vue
- plugins - vite.electron.build.ts // electron打包插件 - vite.electron.dev.ts // electron开发插件 - src - main.ts //
vue入口 - background.ts // electron入口 - package.json - tsconfig.json // ts配置 - vite.config.ts // vite配置
```

### 2.1、background.ts

```ts
import { app, BrowserWindow } from 'electron'

// 等待Electron应用就绪后创建BrowserWindow窗口
app.whenReady().then(async () => {
  const win = await new BrowserWindow({
    width: 800,
    height: 600,

    // 配置窗口的WebPreferences选项，用于控制渲染进程的行为
    webPreferences: {
      nodeIntegration: true, // 启用Node.js集成
      contextIsolation: false, // 禁用上下文隔离
      webSecurity: false, // 禁用web安全策略
    },
  })

  // 根据命令行参数加载URL或本地文件
  if (process.argv[2]) {
    win.loadURL(process.argv[2])
  } else {
    win.loadFile('index.html')
  }
})
```

### 2.2、vite.electron.dev.ts

:::tip esbuild.buildSync()

- entryPoints：指定要编译的入口文件，这里是 src/background.ts。
- bundle：指定是否打包所有依赖项，这里是 true，表示需要打包所有依赖项。
- outfile：指定输出文件的路径和名称，这里是 dist/background.js。
- platform：指定编译的目标平台，这里是 node，表示编译为 Node.js 可用的代码。
- target：指定编译的目标 JavaScript 版本，这里是 node12，表示编译为 Node.js 12 及以上版本可用的代码。
- external：指定不需要被打包的外部依赖项，这里是['electron']，表示 electron 模块不需要被打包。 :::

```ts
// 导入需要使用的类型和库
import type { Plugin } from 'vite'
import type { AddressInfo } from 'net'
import { spawn } from 'child_process'
import fs from 'fs'

// 导出Vite插件函数
export const viteElectronDev = (): Plugin => {
  return {
    name: 'vite-electron-dev',
    // 在configureServer中实现插件的逻辑
    configureServer(server) {
      // 定义初始化Electron的函数
      const initElectron = () => {
        // 使用esbuild编译TypeScript代码为JavaScript
        require('esbuild').buildSync({
          entryPoints: ['src/background.ts'],
          bundle: true,
          outfile: 'dist/background.js',
          platform: 'node',
          target: 'node12',
          external: ['electron'],
        })
      }

      // 调用初始化Electron函数
      initElectron()

      // 监听Vite的HTTP服务器的listening事件
      server?.httpServer?.once('listening', () => {
        // 获取HTTP服务器的监听地址和端口号
        const addressInfo = server?.httpServer?.address() as AddressInfo
        const IP = `http://localhost:${addressInfo.port}`
        // 启动Electron进程
        let electronProcess = spawn(require('electron'), ['dist/background.js', IP])

        // 监听主进程代码的更改
        fs.watchFile('src/background.ts', () => {
          // 杀死当前的Electron进程
          electronProcess.kill()
          // 重新编译主进程代码并重新启动Electron进程
          initElectron()
          electronProcess = spawn(require('electron'), ['dist/background.js', IP])
        })

        // 监听Electron进程的stdout输出
        electronProcess.stdout?.on('data', (data) => {
          console.log(`日志: ${data}`)
        })
      })
    },
  }
}
```

### 2.3、vite.electron.build.ts

```ts
import type { Plugin } from 'vite'
import * as electronBuilder from 'electron-builder'
import path from 'path'
import fs from 'fs'

// 导出Vite插件函数
export const viteElectronBuild = (): Plugin => {
  return {
    name: 'vite-electron-build',

    // closeBundle是Vite的一个插件钩子函数，用于在Vite构建完成后执行一些自定义逻辑。
    closeBundle() {
      // 定义初始化Electron的函数
      const initElectron = () => {
        // 使用esbuild编译TypeScript代码为JavaScript
        require('esbuild').buildSync({
          entryPoints: ['src/background.ts'],
          bundle: true,
          outfile: 'dist/background.js',
          platform: 'node',
          target: 'node12',
          external: ['electron'],
        })
      }

      // 调用初始化Electron函数
      initElectron()

      // 修改package.json文件的main字段 不然会打包失败
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      fs.writeSync(fs.openSync('dist/package.json', 'w'), JSON.stringify(json, null, 2))

      // 创建一个空的node_modules目录 不然会打包失败
      fs.mkdirSync(path.join(process.cwd(), 'dist/node_modules'))

      // 使用electron-builder打包Electron应用程序
      electronBuilder.build({
        config: {
          appId: 'com.example.app',
          productName: 'vite-electron',
          directories: {
            output: path.join(process.cwd(), 'release'), //输出目录
            app: path.join(process.cwd(), 'dist'), //app目录
          },
          asar: true,
          nsis: {
            oneClick: false, //取消一键安装
          },
        },
      })
    },
  }
}
```

### 2.4、vite.config.ts

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteElectronDev } from './plugins/vite.electron.dev'
import { viteElectronBuild } from './plugins/vite.electron.build'

export default defineConfig({
  base: './', // 默认绝对路径改为相对路径 否则打包白屏
  plugins: [vue(), vueJsx(), viteElectronDev(), viteElectronBuild()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
})
```

### 2.5、二合一插件
```ts
import type { AddressInfo } from 'net'
import type { Plugin } from 'vite'
import { spawn } from 'child_process'
import * as electronBuilder from 'electron-builder'
import fs from 'fs'
import path from 'path'

const initElectron = () => {
  // 使用esbuild编译TypeScript代码为JavaScript
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    bundle: true,
    // minify: true,
    outfile: 'dist/background.js',
    platform: 'node',
    target: 'node12',
    external: ['electron'],
  })
}

const VitePluginElectronM = (): Plugin => {
  return {
    name: 'vite-plugin-electron-m',
    // 配置开发服务器
    configureServer(server) {
      // 注册初始化Electron的函数
      initElectron()
      // 监听Vite的HTTP服务器的listening事件
      server?.httpServer?.on('listening', () => {
        // 获取HTTP服务器的监听地址和端口号
        const addressInfo = server?.httpServer?.address() as AddressInfo
        const IP = `http://localhost:${addressInfo.port}`
        // 启动Electron进程
        let electronProcess = spawn(require('electron'), ['dist/background.js', IP])
        // 监听主进程代码的更改
        fs.watchFile('src/background.ts', () => {
          // 杀死当前的Electron进程
          electronProcess.kill()
          // 重新编译主进程代码并重新启动Electron进程
          initElectron()
          // 重新启动Electron进程
          electronProcess = spawn(require('electron'), ['dist/background.js', IP])
        })
        // 监听Electron进程的stdout输出
        electronProcess.stdout?.on('data', (data) => {
          console.log(`日志: ${data}`);
        })
      })
    },
    // closeBundle是Vite的一个插件钩子函数，用于在Vite构建完成后执行一些自定义逻辑
    closeBundle() {
      // 注册初始化Electron的函数
      initElectron()
      // 修改package.json文件的main字段 不然会打包失败
      const json =  JSON.parse(fs.readFileSync('package.json', 'utf-8')) 
      json.main = 'background.js'
      fs.writeSync(fs.openSync('dist/package.json', 'w'), JSON.stringify(json, null, 2))

      // 创建一个空的node_modules目录 不然会打包失败
      fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"));

      // 使用electron-builder打包Electron应用程序
      electronBuilder.build({
        config: {
          appId: 'com.vite.electron',
          productName: 'Vite Electron',
          copyright: 'Vite Electron',
          directories: {
            output: path.join(process.cwd(), "release"), //输出目录
            app: path.join(process.cwd(), "dist"),
          },
          asar: true,
          nsis: {
            oneClick: false, // 取消一键安装
          }
        }
      })
    }
  }
}

export {
  VitePluginElectronM
}

export default VitePluginElectronM
```

### 2.6、补充

通用配置

```json
  "build": {
    "appId": "com.electron.desktop",
    "productName": "electron",
    "asar": true,
    "copyright": "Copyright © 2022 electron",
    "directories": {
      "output": "release/"
    },
    "files": [
      "dist"
    ],
    "mac": {
      "artifactName": "${productName}_${version}.${ext}",
      "target": [
        "dmg"
      ]
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64"
          ]
        }
      ],
      "artifactName": "${productName}_${version}.${ext}"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true,
      "deleteAppDataOnUninstall": false
    },
    "publish": [
      {
        "provider": "generic",
        "url": "http://127.0.0.1:8080"
      }
    ],
    "releaseInfo": {
      "releaseNotes": "版本更新的具体内容"
    }
  }
```

nsis 配置详解

```json
{
  "oneClick": false, // 创建一键安装程序还是辅助安装程序（默认是一键安装）
  "allowElevation": true, // 是否允许请求提升，如果为false，则用户必须使用提升的权限重新启动安装程序 （仅作用于辅助安装程序）
  "allowToChangeInstallationDirectory": true, // 是否允许修改安装目录 （仅作用于辅助安装程序）
  "installerIcon": "public/timg.ico", // 安装程序图标的路径
  "uninstallerIcon": "public/timg.ico", // 卸载程序图标的路径
  "installerHeader": "public/timg.ico", // 安装时头部图片路径（仅作用于辅助安装程序）
  "installerHeaderIcon": "public/timg.ico", // 安装时标题图标（进度条上方）的路径（仅作用于一键安装程序）
  "installerSidebar": "public/installerSiddebar.bmp", // 安装完毕界面图片的路径，图片后缀.bmp，尺寸164*314 （仅作用于辅助安装程序）
  "uninstallerSidebar": "public/uninstallerSiddebar.bmp", // 开始卸载界面图片的路径，图片后缀.bmp，尺寸164*314 （仅作用于辅助安装程序）
  "uninstallDisplayName": "${productName}${version}", // 控制面板中的卸载程序显示名称
  "createDesktopShortcut": true, // 是否创建桌面快捷方式
  "createStartMenuShortcut": true, // 是否创建开始菜单快捷方式
  "shortcutName": "SHom", // 用于快捷方式的名称，默认为应用程序名称
  "include": "script/installer.nsi", // NSIS包含定制安装程序脚本的路径，安装过程中自行调用  (可用于写入注册表 开机自启动等操作)
  "script": "script/installer.nsi", // 用于自定义安装程序的NSIS脚本的路径
  "deleteAppDataOnUninstall": false, // 是否在卸载时删除应用程序数据（仅作用于一键安装程序）
  "runAfterFinish": true, // 完成后是否运行已安装的应用程序（对于辅助安装程序，应删除相应的复选框）
  "menuCategory": false // 是否为开始菜单快捷方式和程序文件目录创建子菜单，如果为true，则使用公司名称
}
```
