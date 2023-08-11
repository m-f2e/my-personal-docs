# Vue3简介
## 1、简介
`Vue`(发音为 /vjuː/，类似 view) 是一款用于构建用户界面的`JavaScript`框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

## 2、官网
https://vuejs.org/

https://www.vue3js.cn/

## 3、Vue3新特性

### 3.1、生命周期

### 3.2、新增api
#### 3.2.1、watchEffect
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

#### 3.2.2、watch
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

#### 3.2.3、ref
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

#### 3.2.4、computed
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

#### 3.2.5、toRefs
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

#### 3.2.6、nextTick
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

### 3.3、setup语法糖
:::tip
在`script`标签上添加`setup`属性
:::
```ts
<script setup lang="ts"></script>
```
#### 3.3.1、defineProps
:::tip
向父组件传递数据
:::
子组件
```vue
<template>
  <p>{{ props.name }}</p>
  或者
  <p>{{ name }}</p>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '张三'
  }
})
// 或者
const props = defineProps(['name'])
</script>
```
父组件
```vue
<template>
  <div>
    <Child :name="name" />
  </div>
</template>
```

#### 3.3.2、defineEmits
:::tip
向父组件传递事件
:::
子组件
```vue
<template>
  <button type="button" @click="handleConfirm">确定</button>
</template>

<script setup lang="ts">
const emit = defineEmits(['on-confirm'])

const handleConfirm = () => {
  // 此处也可以传入参数
  emit('on-confirm', false)
}
</script>
```
父组件
```vue
<template>
  <div>
    <Child @on-confirm="onConfirm" />
  </div>
</template>
```

#### 3.3.3、defineExpose
:::tip
向父组件暴露传递性和方法, 通过组件实例调用
:::
子组件
```vue
<template>
  <div v-if="show">
    <p>{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)
const show = ref(false)

const onShow = () => {
  show.value = true
}
// defineExpose暴露出count属性和onShow方法
defineExpose({
  count,
  onShow
})
</script>
```
父组件
```vue
<template>
  <div>
    <Child ref="childRef" />
    <button type="button" @click="onClick">父组件点击</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const childRef = ref(null)
// 在父组件操作子组件的暴露出的属性或方法
const onClick = () => {
  childRef.value.count += 1;
  childRef.value.onShow();
}
```

#### 3.3.4、useSlots
:::tip
使用插槽
:::
```vue

<template>
  <div>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
 
const slots = useSlots()
// 访问插槽默认插槽default、具名插槽footer
console.log(slots.default?.())
console.log(slots.footer?.())
</script>
```

#### 3.3.5、useAttrs
:::tip
使用自定义属性
:::
子组件
```vue
<template>
  <!-- 在模板中使用 $attrs 访问属性 -->
  <div>{{ $attrs.title }}</div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
 
const attrs = useAttrs()
// 使用
console.log(attrs.class)  // child-class
console.log(attrs.title)  // 子组件title
</script>
```
父组件
```vue
<template>
  <Child class="child-class" title="子组件title" />
</template>
```

#### 3.3.6、顶层await
:::tip
`<script setup>`中可以使用顶层 await, 结果代码会被编译成`async setup()`
:::
```vue
<script setup lang="ts">
import { getUserInfo } from '@/api/system'

const userInfo = await getUserInfo();
console.log(userInfo)
</script>
```

#### 3.3.7、与普通script一起使用
```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<script>
export default defineComponent({
  setup() {
    // 与普通script一起使用
    const count = ref(0)
    return {
      count
    }
  }
})
</script>
```