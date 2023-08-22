# Mitt
:::tip
`Vue3`中移除了`$on`、`$off`、`$once`等方法，组件实例不再实现事件触发接口, 因此我们熟悉的EventBus便无法使用了。然而我们习惯了使用EventBus，对于这种情况我们可以使用Mitt库代替。
:::

## 1、安装
```shell
npm install mitt -S
```

## 2、使用
### 2.1、全局初始化
在`main.ts`中初始化
```ts
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
 
const Mit = mitt()
 
//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}
 
const app = createApp(App)
 
//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit
 
app.mount('#app')
```

### 2.2、emit(事件派发)
```ts
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>
```
### 2.3、on(事件监听)
```ts
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})

// 监听所有事件
instance?.proxy?.$Bus.on('*', (type, num) => {
    console.log(num,'===========>B')
})
</script>
```

### 2.4、off(事件移除)
```ts
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const fn = (num: any) => {
    console.log(num,'===========>B')
}

instance?.proxy?.$Bus.on('on-num', fn)

// 移除事件
instance?.proxy?.$Bus.off('on-num', fn)

</script>
```

### 2.5、clear(清空所有事件监听)
```ts
instance?.proxy?.$Bus.all.clear() 
```