# vite-plugin-dev-mock

## 1、简介
为开发环境提供`mock接口服务`插件

详细代码：https://github.com/m-f2e/vite-plugin-dev-mock
## 2、安装
```shell
npm install @m-f2e/vite-plugin-dev-mock -D
```
## 3、插件
```ts
const VitePluginDevMock = (options?: UserOptions) => {
  let entry = options?.entry || './mock/index.js'

  // 没有绝对路径转为绝对路径
  if (!path.isAbsolute(entry)) {
    entry = path.resolve(process.cwd(), entry)
  }

  return {
    name: 'vite-plugin-dev-mock',
    apply: 'serve',
    configureServer: async (server: ViteDevServer) => {
      // 获取路由配置信息
      const mockRoutesObj = await getMockRoutesObj(entry);
      if (!mockRoutesObj) {
        return
      }
      // 生成路由映射
      generateRouteMap(mockRoutesObj)
      // 添加中间件
      server.middlewares.use((req, res, next) => {
        // 匹配路由
        const route = matchRoute(req)
        if (!route) {
          return next()
        }
        // 对匹配到的路由进行处理
        const newRes = res as MockServerResponse
        newRes.send = (body: object) => {
          let chunk: string | Buffer = JSON.stringify(body)
          if (chunk) {
            chunk = Buffer.from(chunk, 'utf-8')
            newRes.setHeader('Content-Length', chunk.length)
          }
          newRes.setHeader('Content-Type', 'application/json')
          newRes.statusCode = 200
          newRes.end(chunk)
        }
        route.handler(req, newRes)
      })
    }
  }
}

export {
  VitePluginDevMock
}

export default VitePluginDevMock
```
## 4、使用
1、配置mock数据
```js
// ./mock/index.js
const apiRoutes = [
  {
    url: '/api/users',
    type: 'get',
    response: (req, res) => {
      res.send(
        [
          { id: 1, name: '张三', age: 18 },
          { id: 2, name: '李四', age: 19 },
          { id: 3, name: '王五', age: 20 },
        ]
     )
    }
  }
]

module.exports = apiRoutes
```

2、修改`vite.config.ts`
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginDevMock from '@m-f2e/vite-plugin-dev-mock'

export default defineConfig({
  plugins: [
    vue(), 
    // 默认为./mock/index.js
    VitePluginDevMock()
    // 或者自定义目录
    VitePluginDevMock({ entry: './mock/index.js' })
  ],
})
```

3、在浏览器中访问地址
```ts
http://localhost:3000/api/users
```