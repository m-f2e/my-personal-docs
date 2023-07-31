# Vue3简介
## 1、简介
`Vue`(发音为 /vjuː/，类似 view) 是一款用于构建用户界面的`JavaScript`框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

## 2、官网
https://vuejs.org/

https://www.vue3js.cn/

## 3、Vue3新特性

## 3.1、生命周期
### 3.2、watchEffect
:::tip
- 通过`watchEffect`监听数据变化, 当依赖的响应式数据发生改变时自动执行
:::
```js
import { watchEffect } from 'vue'
// 监听基本数据
watchEffect(() => { 
  localStorage.setItem('count', count.value)
})
```

### 3.3、watch
:::tip
- 通过`watch`监听数据变化
:::
```js
<script setup>
import { ref, watch, watchEffect } from 'vue'
const count = ref(0)
// 监听基本数据
watch(count, () => {

})

// 监听多个数据, 此时newValue和oldValue都是数组
watch([count, count2], (newValue, oldValue) => {
  
})

// 监听对象中的某个值
watch(() => obj.name, (newValue, oldValue) => {

})
</script>
```

### 3.4、ref
:::tip
- 常用于定义基本数据类型的响应式
- 也可以用于对象类型的响应式，不过对象推荐使用`reactive`
- 通过js访问数据需要使用`.value`
:::
```js
<script setup>
import { ref } from 'vue'
// number
const count = ref(0)
// string
const str = ref('')
// 定义dom的ref
const domRef = ref()

// 修改数据
count.value = 1
// 访问数据
console.log(count.value)
</script>
```

### 3.5、computed
:::tip
计算属性，当函数内依赖的响应式数据发生改变时自动计算返回
:::
```js
<script setup>
import { ref, computed } from 'vue'
const count = ref(0)
const doubleCount = computed(() => {
  return count.value * 2
})
</script>

### 3.6、reactive
```js
<script setup>
import { reactive } from 'vue'
const obj = reactive({
  name: 'zw',
  age: 18
})
// 修改数据
obj.name = 'zz'
// 访问数据
console.log(obj.name)
</script>
```

### 3.7、toRefs
:::tip
`toRefs`的作用是将响应式对象中的所有属性转换为单独的响应式数据
:::
```js
import { toRefs } from 'vue'
const obj = reactive({
  name: 'zw',
  age: 18
})
const { name, age } = toRefs(obj)
// 修改数据
name.value = 'zz'
// 访问数据
console.log(age.value)
</script>
```

### 3.8、nextTick
:::tip
nextTick主要用于处理数据动态变化后,DOM还未及时更新的问题,用nextTick就可以获取数据更新后最新DOM的变化
:::
```js
import { nextTick } from 'vue'

nextTick(() => {
  // this._initScroll();
})
</script>
```

<script setup>
import { ref, reactive } from 'vue'
const count = ref(0)
const obj = reactive({
  name: 'zw',
  age: 18
})
</script>