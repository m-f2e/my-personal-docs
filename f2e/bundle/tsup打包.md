# tsup打包.md

## 1、简介
tsup是一个基于ESBuild实现在零配置的情况下快速捆绑Typescript模块的项目，支持Node.js应用中的任何内容。

使用tsup来快速打包Typescript库，无需任何配置，并且基于esbuild进行打包，打包ts文件速度毫秒级，方便又高效。
## 2、安装
```shell
npm i -D typescript tsup
```

## 3、配置参数
- entry: 入口文件
- external: 打包排除项
- format: 打包格式
- dts: 生成dts
- clean: 打包前清除缓存
- format: 打包格式
- sourcemap: 打包是否生成source map
- watch: 是否开启监视
- splitting: 是否分离代码
- minify: 是否压缩代码
- legacyOutput: tsup 将生成两个额外的输出文件，分别是`CommonJS`和`AMD`模块格式的文件

## 4、配置
### 4.1、配置方式一
1、创建`tsup.config.ts`
```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [ // 入口文件
    'src/index.ts',
  ],
  external: [ // 打包排除项
    'vite',
    'vue'
  ],
  dts: true, // 生成dts
  clean: true, // 打包前清除缓存
  format: ['cjs', 'esm'],
})
```

2、修改`package.json`
```json
{
  ...,
  "scripts": {
    "build": "tsup",
  }
}
```

### 4.2、配置方式二
```json
{
  "name": "@mz/api",
  "private": true,
  "version": "0.0.1",
  "main": "index.ts",
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup"
  },
  "tsup": {
    "entry": ["index.ts"],
    "dts": true,
    "sourcemap": true,
    "format": [
      "esm",
      "cjs"
    ]
  },
  "devDependencies": {
    "tsup": "^6.7.0",
    "typescript": "^5.0.2"
  },
}
```
