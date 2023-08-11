# Nuxt3简介

## 1、简介
`Nuxt`是一个基于`Vue.js的通用应用框架`,主要有以下特点:
- 服务端渲染(SSR)。Nuxt 可以将 Vue 组件渲染成 HTML,提高首屏加载速度。
- 自动代码分层。Nuxt 将代码分为页面、组件、布局、插件等层,结构清晰。
- 丰富的生态系统。可同时使用 Vue 生态的类库和模块。
- 集成开发工具。提供包括代码热加载、TypeScript、ESLint等在内的开发工具。
- 通用应用架构。可用于构建网站、web应用、移动应用等不同用途。

## 2、官网
英文官网： https://nuxt.com/
中文官网： https://www.nuxt.com.cn/

## 3、项目配置

### 3.1、创建项目
:::tip
要求：
- Node.js 16.10版本及更高版本
:::

<TabCodeGroup v-model="tab">
  <TabCodeItem title="npx" name="0">
    $ npx nuxi@latest init "project-name"
  </TabCodeItem>
  <TabCodeItem title="pnpm" name="1">
    $ pnpm dlx nuxi@latest init "project-name"
  </TabCodeItem>
</TabCodeGroup>

### 3.2、运行项目
<TabCodeGroup v-model="tab2">
  <TabCodeItem title="npm" name="0">
    $ npm run dev -- -o
  </TabCodeItem>
  <TabCodeItem title="yarn" name="1">
    $ yarn dev -o
  </TabCodeItem>
  <TabCodeItem title="pnpm" name="2">
    $ pnpm dev -o
  </TabCodeItem>
</TabCodeGroup>

### 3.3、项目结构
```shell
nuxt3-learn          
├─ public // 静态资源           
│  └─ favicon.ico  
├─ pages // 路由页面 
│  ├─ books.vue
│  ├─ details.vue
│  └─ index.vue    
├─ server // 服务端目录           
│  └─ tsconfig.json  
├─ README.md         
├─ app.vue // app入口
├─ nuxt.config.ts // nuxt配置
├─ package.json      
└─ tsconfig.json     
```

## 4、Nuxt3 API
### 4.1、组件

#### 4.1.1、系统组件
- NuxtWelcome: 欢迎页面
```vue
  <NuxtWelcome />
```

- NuxtPage: 页面
```vue
// app.vue
<template>
  <div>
    <h1>app page</h1>
    <!-- pages路由入口 -->
    <NuxtPage></NuxtPage>
  </div>
</template>
```

- NuxtLink: 链接,路由跳转
```vue
  <NuxtLink to="/details">book details</NuxtLink>
```

- NuxtLayout: 布局
```vue
<template>
  <!-- 默认布局 -->
  <NuxtLayout>
    <h1>app page</h1>
    <!-- 路由入口 -->
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
```

#### 4.1.2、自定义组件
:::tip
- 在项目根目录下创建`components`目录，创建的组件会自动注册
- 组件名以小写或驼峰命名直接导入，以目录组织使用驼峰命名加载
:::
```shell
components        
├─ modal          
│  └─ dialog.vue  
└─ AppAlert.vue     
```
```vue
// AppAlert.vue
<template>
  <h1>app alert</h1>
  <span>
    <slot />
  </span>
</template>
```
```vue
// dialog.vue
<template>
  <h1>modal dialog</h1>
  <span>
    <slot />
  </span>
</template>
```
```app.vue
<AppAlert>
  this is a app alert
</AppAlert>
<ModalDialog>
  this is a app alert
</ModalDialog>
```
#### 4.1.3、组件懒加载
:::tip
组件懒加载直接在组件前加`Lazy`
:::
```vue
<template>
  <LazyAppAlert></LazyAppAlert>
</template>
```

### 4.2、路由
:::tip
在根目录下创建`pages`目录，Nuxt会自动创建路由映射
:::

#### 4.2.1、静态路由
1、在`app.vue`添加入口
```vue
<template>
  <div>
    <h1>app page</h1>
    <!-- pages路由入口 -->
    <NuxtPage></NuxtPage>
  </div>
</template>
```
2、在`pages`目录下创建`books.vue`
```vue
<template>
  <div>
    <h1>book page index</h1>
  </div>
</template>
```
3、访问`localhost:3000/books`

#### 4.2.2、动态路由
1、在`pages`新增页面
```shell
pages            
├─ user-[group]  
│  └─ [id].vue   
├─ books.vue     
├─ details.vue   
└─ index.vue     
```
2、在`user-[group]/[id].vue`中添加
```vue
<template>
  <div>
    <h1>user group id</h1>
    <p>{{ $route.params.group }}-{{ $route.params.id }}</p>
  </div>
</template>
```
3、在`books.vue`中添加
```vue
<template>
  <div>
    <h1>book page index</h1>
    <NuxtLink to="/user-admin/1">to group user id</NuxtLink>
  </div>
</template>
```
#### 4.2.3、路由跳转
在`books.vue`中添加
```vue
<template>
  <div>
    <h1>book page index</h1>
    <NuxtLink to="/details">book details</NuxtLink>
  </div>
</template>
```

#### 4.2.4、嵌套路由
:::tip
- 存在与`parent目录`同名的文件`parent.vue`，访问目录下页面会默认先加载同名文件`parent.vue`，再加载`parent/index.vue`
- 存在与`parent目录`同名的文件，会默认加载`parent目录`下的`index.vue`
- 加载`parent目录`下的`child.vue`需要在`parent.vue`添加`<NuxtPage></NuxtPage>`
:::

1、路由目录
```shell
pages            
├─ parent        
│  ├─ child.vue  
│  └─ index.vue  
├─ books.vue     
└─ parent.vue    
```
2、在`parent.vue`中添加
```vue
<template>
  <div>
    <h1>parent page</h1>
    <NuxtPage></NuxtPage>
  </div>
</template>
```
3、在`child.vue`中添加
```vue
<template>
  <div>
    <h1>child page</h1>
  </div>
</template>
```

### 4.3、布局

#### 4.3.1、通用布局
:::tip
默认使用的是`layouts/default.vue`布局文件
:::
```vue
// app.vue
<template>
  <!-- 默认布局 -->
  <NuxtLayout>
    <h1>app page</h1>
    <!-- 路由入口 -->
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
```

#### 4.3.2、自定义布局
```vue
// layouts/custom-layout.vue
<template>
  <div>
    <h1>自定义布局文件</h1>
    <slot></slot>
  </div>
</template>
```
全局自定义
```vue
// parent.vue
<script setup>
definePageMeta({
  layout: 'custom-layout' 
})
</script>
```

局部自定义
```vue
// parent.vue
<NuxtLayout name="custom-layout">
  <h1>parent page</h1>
  <NuxtPage></NuxtPage>
</NuxtLayout>
```
#### 4.3.3、自定义布局模板
修改`custom-layout.vue`
```vue
<template>
  <div>
    <h1>自定义布局文件</h1>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```
修改`parent.vue`
```vue
<template>
  <div>
    <NuxtLayout name="custom-layout">
      <template #header>
        <h1>header</h1>
      </template>
      <h1>parent page</h1>
      <NuxtPage></NuxtPage>
      <template #footer>
        <h1>footer</h1>
      </template>
    </NuxtLayout>
  </div>
</template>
```

#### 4.3.4、不使用布局
```vue
<script setup>
definePageMeta({
  layout: false
})
</script>
```

### 4.4、错误页面
在项目根目录下创建`error.vue`
```vue
<template>
  error page
</template>
```


### 4.5、server
:::tip
`Nuxt`自动扫描`~/server/api`, `~/server/routes`, 和 `~/server/middleware`目录中的文件，以注册具有HMR支持的API和服务器处理程序。

每个文件都应该导出一个用`defineEventHandler()`定义的默认函数。

处理程序可以直接返回JSON数据，一个`Promise`或使用`event.node.res.end()`发送响应。
:::
#### 4.5.1、api接口
:::tip
- 句柄文件名可以用`.get`, `.post`, `.put`, `.delete`作为后缀
- 默认请求类型为`GET`，文件命名`xx.get.ts`等价于`xx.ts`
- `POST`请求文件命名`xx.post.ts`
:::
在项目根目录下创建`server/api`目录, 新建`hello.ts`
```ts
export default defineEventHandler((event) => {
  return {
    api: 'works'
  }
})
```
在浏览器访问`http://localhost:3000/api/hello`

在`server/api`目录下新建`user.post.ts`
```ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { body }
})
```
使用postman发送`post`请求

#### 4.5.2、middleware
:::tip
每次执行请求前都会先执行`middleware`函数
middleware的执行顺序按命名先后排序执行
:::
在项目根目录下创建`server/middleware`目录, 新建`auth.ts`
```ts
export default defineEventHandler((event) => {
  console.log('$---', event.node.req.url);
  // $--- /api/hello
  event.context.auth = { user: 123 }
})
```
修改`server/api/hello.ts`
```ts
export default defineEventHandler((event) => {
  console.log('$---', event.context.auth);
  // $--- { user: 123 } 
  return {
    api: 'works'
  }
})
```
在浏览器访问`http://localhost:3000/api/hello`

#### 4.5.3、请求接口
```vue
<template>
  <div>
    <h1>book page index</h1>
    <NuxtLink to="/details">book details</NuxtLink> |
    <NuxtLink to="/user-admin/1">to group user id</NuxtLink>

    <ul>
      <li v-for="(item, index) in data.books" :key="index">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
// ref 
const { data } = await useFetch('/api/books', { method: 'GET' })
console.log(data.value.books)
</script>
```

#### 4.5.4、server插件
:::tip
- `Nuxt`将自动读取`~/server/plugins`目录中的任何文件，并将它们注册为`Nitro`插件
- 启动服务/编译时执行插件
:::
```ts
export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin', nitroApp)
})
```

### 4.6、composables
:::tip
`composables`是一种在组件外封装和重用逻辑的方式。

- 常见的使用场景包括:
  - 封装通用逻辑:如数据获取,验证,格式化等
  - 跨组件共享状态逻辑
  - 访问组件外的状态和功能
- composables的常见特征:
  - 是一个纯函数,没有副作用
  - 通过返回值导出逻辑
  - 可以用在 setup() 或其他组件中
  - 存放在单独的文件中,便于重用
:::
#### 4.6.1、useState
:::tip
useState是一个在Nuxt组件中声明状态的简单方式:
- `Nuxt3`中,可以通过`useState()`来在组件内声明状态:
- `useState`会在服务器端渲染(SSR)时自动序列化状态,在客户端保持同步。
:::
:::warning
因为`useState`中的数据将被序列化为JSON, 所以它不包含任何不能序列化的内容，例如类、函数或符号，这一点很重要。
:::
```vue
// app.vue
<template>
  <div>
    <h1>app page</h1>
    <NuxtPage></NuxtPage>
  </div>
</template>
```

#### 4.6.2、自定义composables
在项目根目录下创建`composables`目录, 新建`foo.ts`
```ts
export const useFoo = () => {
  return useState('foo', () => 'bar')
}
```
```vue
// 无需注册，引入直接使用
<template>
  <div>
    {{ foo }}
  </div>
</template>
<script setup>
const foo = useFoo()
```

#### 4.6.3、useFetch
:::tip
在`Nuxt3`中,可以通过`useFetch`函数来发起数据请求
:::

pick选取指定数据
```vue
const { data } = await useFetch('/api/books', { method: 'GET', pick: ['books'] })
```

### 4.7、插件
:::tip
- 插件现在有不同的格式，并且只接受一个参数(nuxtApp)
- 插件会在前端页面加载时访问`plugins`目录中的插件
:::
在项目根目录下创建`plugins`目录, 新建`a.ts`
```shell
export default defineNuxtPlugin(nuxtApp => {
  console.log('$---global plugin a');
  // nuxtApp.provide('injected', () => 'my injected function')
  return {
    provide: {
      injected: () => 'my injected function'
    }
  }
})
```
```vue
// app.vue
<script setup>
const { $injected } = useNuxtApp()

console.log('$---', $injected());
</script>
```

<script setup>
import { ref } from 'vue'
const tab = ref('0') 
const tab2 = ref('0') 
</script>
