# Express简介
## 1、官网
https://www.expressjs.com.cn/

## 2、安装
```shell
npm install express
```

## 3、使用
### 3.1、简单使用
```ts
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/list', (req, res) => {
  res.json({
    code: 200,
    data: [1, 2, 3],
    msg: null
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

### 3.2、响应类型
```ts
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/json', (req, res) => {
  res.json({})
})
```

### 3.3、路由

#### 3.3.1、路由定义
```ts
import express from 'express'

const app = express()

// router
const router = express.Router()
router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/list', (req, res) => {
  res.json({
    code: 200,
    data: [1, 2, 3],
    msg: null
  })
})

app.use(router)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

#### 3.3.2、路由组
```ts
// 路由分组
import express from 'express'
import type { Express, Router, Request, Response } from 'express'

const app: Express = express()

// 路由分组
const userRouter: Router = express.Router()
userRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello user!')
})
userRouter.get('/:id', (req: Request, res: Response) => {
  res.send('Hello ' + req.params.id)
})

const orderRouter: Router = express.Router()
orderRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello order!')
})

app.use('/user', userRouter)
app.use('/order', orderRouter)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

#### 3.3.3、路由匹配
```ts
const userRouter = express.Router()
userRouter.get('/', (req, res) => {
  res.send('Hello user!')
})
userRouter.get('/:id', (req, res) => {
  res.send('Hello ' + req.params.id)
})
// localhost:3000/user/1
```
