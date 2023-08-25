# Typescript订阅监听
## 1、什么是否发布订阅模式
:::tip
发布订阅模式是一种设计模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，当主题对象发生变化时，它的所有依赖者都会收到通知并自动更新。
:::

## 2、发布订阅模式的实现
```ts
interface EventFace {
  on: (name: string, callback: Function) => void,
  off: (name: string, callback: Function) => void,
  emit: (name: string, ...args: any[]) => void,
  once: (name: string, callback: Function) => void
}

interface List {
  [key: string]: Array<Function>
}

class Dispatch implements EventFace {
  list: List 
  constructor() {
    this.list = {}
  }
  on(name: string, callback: Function) {
    const callbackList: Array<Function> = this.list[name] || []
    callbackList.push(callback)
    this.list[name] = callbackList
  }
  off(name: string, callback: Function) {
    const callbackList: Array<Function> = this.list[name]
    if (callbackList && callback) {
      const index = callbackList.indexOf(callback)
      callbackList.splice(index, 1)
    } else {
      console.error('该事件未监听')
    }
  }
  emit(name: string, ...args: any[]) {
    const callbackList: Array<Function> = this.list[name]
    if (callbackList) {
      callbackList.forEach(callback => {
        callback.apply(this, args)
      })
    } else {
      console.error('该事件未监听')
    }
  }
  once(name: string, callback: Function) {
    const decor = (...args: any[]) => {
      callback.apply(this, args)
      this.off(name, decor)
    }
    this.on(name, decor)
  }
}

const dispatch = new Dispatch()
dispatch.on('test', (...args: any[]) => {
  console.log(args)
})

dispatch.emit('test', 1, 2, 3)
```

<script setup lang="ts">
  interface EventFace {
    on: (name: string, callback: Function) => void,
    off: (name: string, callback: Function) => void,
    emit: (name: string, ...args: any[]) => void,
    once: (name: string, callback: Function) => void
  }

  interface List {
    [key: string]: Array<Function>
  }

  class Dispatch implements EventFace {
    list: List 
    constructor() {
      this.list = {}
    }
    on(name: string, callback: Function) {
      const callbackList: Array<Function> = this.list[name] || []
      callbackList.push(callback)
      this.list[name] = callbackList
    }
    off(name: string, callback: Function) {
      const callbackList: Array<Function> = this.list[name]
      if (callbackList && callback) {
        const index = callbackList.indexOf(callback)
        callbackList.splice(index, 1)
      } else {
        console.error('该事件未监听')
      }
    }
    emit(name: string, ...args: any[]) {
      const callbackList: Array<Function> = this.list[name]
      if (callbackList) {
        callbackList.forEach(callback => {
          callback.apply(this, args)
        })
      } else {
        console.error('该事件未监听')
      }
    }
    once(name: string, callback: Function) {
      const decor = (...args: any[]) => {
        callback.apply(this, args)
        this.off(name, decor)
      }
      this.on(name, decor)
    }
  }

  const dispatch = new Dispatch()
  dispatch.on('test', (...args: any[]) => {
    console.log(args)
  })

  dispatch.emit('test', 1, 2, 3)
</script>
