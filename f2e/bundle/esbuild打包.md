# esbuild

## 1、简介
:::tip
`esbuild`是`go`语言编写的并且是`多线程`执行,性能是js的好几十倍
:::

### 1.1、特点
- 无需缓存即可实现基础打包
- 支持 ES6 跟 CommonJS 模块
- 支持ES 6 Tree Shaking
- 体积小
- 插件化
- 其他
- 内置支持编译 jsx

## 2、安装

## 3、插件

## 4、示例
### 4.1、esbuild + swc 构建ts项目
:::tip
- SWC则宣称其比Babel快20倍(四核情况下可以快70倍)
- SWC是用`rust`写的，所实现的功能跟`babel`一样，`es6语法转es5`，但是速度比babel更快
:::

#### 4.1.1、安装
:::tip
- `@swc/core`是`swc`的核心包，用于编译`JavaScript`和`TypeScript`代码；
- `esbuild`是一个快速的`JavaScript`和`TypeScript`构建工具；
- `@swc/helpers`是`swc`的辅助包，用于转换`JSX`代码。
:::
```shell
npm install @swc/core @swc/helpers esbuild -D
```

#### 4.1.2、配置
esbuild.js
```js
import esbuild from 'esbuild';
import swc from '@swc/core';
import fs from 'node:fs'

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outdir: 'dist',
  loader: {
    '.ts': 'ts',
    '.js': 'js',
    '.jsx': 'jsx',
    '.tsx': 'tsx'
  },
  treeShaking: true,
  define: {
    'process.env.NODE_ENV': "production",
  },
  plugins: [
    {
      name: 'swc-loader',
      setup(build) {
        build.onLoad({ filter: /\.(js|ts|tsx|jsx)$/ }, (args) => {
          const contents = fs.readFileSync(args.path, 'utf-8');
          const { code } = swc.transformSync(contents, {
            filename: args.path
          });
          return { contents: code };
        })
      }
    }
  ]
})
```
package.json
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "node esbuild.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@swc/core": "^1.3.79",
    "@swc/helpers": "^0.5.1",
    "esbuild": "^0.19.2",
    "typescript": "^5.2.2"
  }
}
```