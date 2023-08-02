# vite-plugin简介
## 1、简介
`Vite`可以使用插件进行扩展，这得益于`Rollup`优秀的插件接口设计和一部分`Vite`独有的额外选项。这意味着`Vite`用户可以利用`Rollup`插件的强大生态系统，同时根据需要也能够扩展开发服务器和 SSR 功能。也可以理解为Vite插件对Rollup插件做了扩展，加上了一些Vite独有的属性。

## 2、vite插件执行顺序
1. 别名处理`Alias`
2. 用户插件设置​​`enforce: 'pre'​​`
3. Vite核心插件
4. 用户插件未设置`​​enforce​​`
5. Vite构建插件
6. 用户插件设置`​​enforce: 'post'​​`
7. Vite构建后置插件`(minify, manifest, reporting)`

## 3、强制插件排序
为了与某些`Rollup`插件兼容，可能需要强制修改插件的执行顺序，或者只在构建时使用。这应该是`Vite`插件的实现细节。可以使用 enforce 修饰符来强制插件的位置:

- pre：在 Vite 核心插件之前调用该插件
- 默认：在 Vite 核心插件之后调用该插件
- post：在 Vite 构建插件之后调用该插件
```js
// vite.config.js
import image from '@rollup/plugin-image'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...image(),
      enforce: 'pre'
    }
  ]
})
```

## 4、按需插件
默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，使用`apply`属性指明它们仅在`'build'`或`'serve'`模式时调用：
```js
// vite.config.js
import typescript2 from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: 'build'
    }
  ]
})
```

## 5、插件API
https://vitejs.cn/vite3-cn/guide/api-plugin.html
### 5.1、约定
- Vite 插件应该有一个带`vite-plugin-`前缀、语义清晰的名称。
- 如果你的插件只适用于特定的框架，它的名字应该遵循以下前缀格式：
  1. `vite-plugin-vue-`前缀作为`Vue`插件
  2. `vite-plugin-react-`前缀作为`React`插件
  3. `vite-plugin-svelte-`前缀作为`Svelte`插件

### 5.1、hook类型

#### 5.1.1、一次性钩子
:::tip
在服务器启动或者关闭时只调用一次
:::
1. `options`: 替换或操纵选项
2. `buildStart`: 开始创建
3. `buildEnd`: 结束构建
4. `closeBundle`: 结束打包

#### 5.1.2、全局钩子（vite特有钩子）
https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks

1. `config`: 配置项钩子，可修改默认配置
2. `configResolved`: 获取加载后配置
3. `configureServer`: 用于配置dev server
4. `transformIndexHtml`: 用于转换宿主页
5. `handleHotUpdate`: 自定义HMR更新时调用

#### 5.1.3、局部钩子(文件钩子， 每次模块请求都会被调用)
https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks

1. `resolveId`: 解析`import`引入文件、虚拟模块路径(确认id)
2. `load`: 加载虚拟文件、磁盘、网络
3. `transform`: 转换文件内容(code)

#### 5.1.4、钩子执行顺序
```js
export default function VitePluginExample () {
  return {
    name: 'hooks-order', 
    // 初始化hooks，只走一次
    options(opts) {
      console.log('options', opts);
    },
    buildStart() {
      console.log('buildStart');
    },
    // vite特有钩子
    /// 修改配置
    config(config) {
      console.log('config', config);
      return {}
    },
    /// 确认配置
    configResolved(resolvedCofnig) {
      console.log('configResolved');
    },
    /// 开发服务器
    configureServer(server) {
      console.log('configureServer');
      // server.app.use((req, res, next) => {
      //   // custom handle request...
      // })
    },
    transformIndexHtml(html) {
      console.log('transformIndexHtml');
      return html
      // return html.replace(
      //   /<title>(.*?)<\/title>/,
      //   `<title>Title replaced!</title>`
      // )
    },
    // 通用钩子
    /// 确认资源id
    resolveId ( source ) {
      if (source === 'virtual-module') {
        console.log('resolvedId', source);
        return source; 
      }
      return null; 
    },
    /// 加载资源
    load ( id ) {
      if (id === 'virtual-module') {
        console.log('load');
        return 'export default "This is virtual!"';
      }
      return null;
    },
    /// 代码转换
    transform(code, id) {
      if (id === 'virtual-module') {
        console.log('transform');
      }
      return code
    },
  };
}
```