# Vite简介
## 1、简介
`Vite`是一个基于浏览器原生`ES`模块的开发服务器。它利用浏览器去解析模块，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。

`Vite`主要由两部分组成：一个开发服务器和一套构建指令。开发服务器基于原生`ES`模块提供了丰富的内建功能，如速度快到惊人的模块热更新(HMR)。构建指令使用`Rollup`打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## 2、官网
中文网：https://vitejs.cn/

## 3、api
### 3.1、import.meta

#### 3.1.1、import.meta.glob

## 4、打包
### 4.1、umd+mjs
:::tip
默认会打出来`.mjs`和`umd.js`文件
:::
vite.config.ts
```ts
import { defineConfig } from 'vite'

// umd 支持amd cmd cjs 全局变量模式
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'useResize'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          useResize: 'useResize'
        }
      }
    }
  }
})
```

### vite node脚本打包
:::tip
当前最新版本使用`js`编写脚本，使用`ts`编写脚本编译成js时会报错
:::

index.js

```js
const { build } = require('vite')
const path = require('path')

const buildRun = async () => {
  await build({
    build: {
      rollupOptions: {
        external: ['vue', 'esbuild'],
      },
      lib: {
        entry: path.resolve(__dirname, './main.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      }
    }
  })
}

buildRun()
```

```shell
node index.js
```