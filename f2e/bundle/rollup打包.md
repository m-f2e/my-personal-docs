# Rollup打包
## 1、简介
`Rollup`是一个`JavaScript`模块打包工具，可以将多个小的代码片段编译为完整的库和应用。`Rollup`支持许多输出格式，包括`ES模块`、`CommonJS`、`UMD`等。

## 2、安装
```shell
npm install -g rollup
```

## 3、插件

## 4、示例
### 4.1、基本使用
```js
import resolve from "@rollup/plugin-node-resolve";
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import repacle from 'rollup-plugin-replace'

const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

export default {
  input: './src/main.ts',
  output: {
    file: './lib/bundle.js',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    ts(),
    terser({
      compress: {
          drop_console: !isDev()
      }
    }),
    repacle({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    resolve(['.js', '.ts']),
    isDev() && livereload(),
    isDev() && serve({
        open: true,
        openPage: "/public/index.html"
    })
  ]
}
```

`package.json`
```ts
{
  "name": "demo2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=development rollup -c -w",
    "build": "cross-env NODE_ENV=produaction rollup -c"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^15.2.1",
    "cross-env": "^7.0.3",
    "rollup": "^3.28.1",
    "rollup-plugin-livereload": "^2.0.5",
    "rollup-plugin-replace": "^2.2.0",
    "rollup-plugin-serve": "^2.0.2",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.35.0",
    "typescript": "^5.2.2"
  }
}
```
