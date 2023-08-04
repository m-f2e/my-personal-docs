# unbuild打包

## 1、官网
https://www.npmjs.com/package/unbuild

## 2、简介
`Unbuild`是一个通用的，可自定义的JavaScript打包工具。它可以从package.json中自动推断出打包的入口和配置，从而实现自动化构建。

## 3、配置参数
- entries: 入口文件
- externals: 打包排除项
- clean: 打包前清除缓存
- declaration: 生成类型定义
- rollup: rollup配置
- failOnWarn: 警告是否会引发报错

```ts
// build.config.ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  externals: ['vite'],
  declaration: true, // 生成类型定义
  clean: true, // 打包前清除
  failOnWarn: false, // 警告是否会引发报错
  rollup: {
    emitCJS: true, // 生成commonjs
    esbuild: {
      minify: false, // 压缩代码
    },
  },
})
```

```json
"scripts": {
  "build": "unbuild", // 打包
  "stub": "unbuild --stub", // 拥有pnpm monorepo插桩
}
```