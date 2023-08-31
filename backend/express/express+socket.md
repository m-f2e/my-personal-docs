# Express + Socket

## 1、安装
```shell
npm install express express-ws
```

## 2、服务端
```ts
import express from 'express'
import ws from 'express-ws'

const { app, getWss, applyTo } = ws(express())

app.ws('/talk', (ws, req) => {
  ws.on('message', (message) => {
    console.log('$---', getWss().clients);
    // 获取所有客户端
    getWss().clients.forEach((client) => {
      client.send(`${message}--${new Date().getTime()}`)
    })
  })
  ws.on('close', (e) => {
    console.log('$---', e);
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

## 3、客户端
### 3.1、readyState 状态
- CONNECTING：值为0，表示正在连接。
- OPEN：值为1，表示连接成功，可以通信了。
- CLOSING：值为2，表示连接正在关闭。
- CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

### 3.2、onopen
:::tip
当客户端连接成功时触发。  
:::
```ts
ws.onopen = () => {
  console.log('成功')
}
```

### 3.3、onclose
:::tip
当客户端连接关闭时触发。  
:::
```ts
ws.onclose = () => {
  console.log('关闭')
}
```

### 3.4、onmessage
:::tip
当客户端发送消息时触发。  
:::
```ts
ws.onmessage = (message) => {
  console.log('收到消息', message)
}
```

### 3.5、send
:::tip
向客户端发送消息。  
:::
```ts
ws.send('hello')
```

### 3.6、示例
```ts
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
    const ws = new WebSocket('ws://localhost:3000/talk')
    ws.onopen = () => {
      console.log('onopen成功')
      ws.send('hello')
    }
    ws.onmessage = (e) => {
      console.log('onmessage$---', e.data);
    }
    ws.onclose = () => {
      console.log('onclose')
    }
    
  </script>
</body>
</html>
```