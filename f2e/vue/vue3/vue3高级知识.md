# Vue3高级知识

## 1、ref
:::tip
在Vue中，`ref`是一个用于`创建响应式数据`的函数。它接收一个参数，即需要创建引用的值，并返回一个响应式对象。
:::
### 1.1、锚点
```vue
<div ref="ref1"></div>

<script setup>
import { ref } from 'vue'
const ref1 = ref()
</script>
```

### 1.2、自定义ref
```vue
import { customRef } from 'vue'
function MyRef<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        // 追踪value
        track();
        return value;
      },
      set(newValue: T) {
        value = newValue;
        // 触发更新
        trigger();
      }
    }
  });
}
```
使用
```vue
let keyWord = MyRef<string>("1111");
```

## 2、插槽Slot
:::tip
插槽（Slot）是一种用于在`父组件中插入子组件内容`的机制。通过插槽，您可以定义一些占位符，在父组件中填充具体的内容，以实现动态组件的复用和定制
:::
### 2.1、默认插槽
父组件
```js 
<template>
  <div>
    <ChildComponent>
      <p>这是插槽内容</p>
    </ChildComponent>
  </div>
</template>
```

子组件
```js
<template>
  <slot></slot>
</template>
```

### 2.2、具名插槽
父组件
```js
<ChildComponent>
  <template v-slot:header>
    <h3>这是头部插槽</h3>
  </template>
  
  <template #content>
    <p>这是内容插槽</p>
  </template
</ChildComponent>
```
子组件
```js
<template>
  <div>
    <p>下面是两个具名插槽：</p>
    <slot name="header"></slot>
    <slot name="content"></slot>
  </div>
</template>
```

### 2.3、作用域插槽
父组件
```js
<ChildComponent>
  <template v-slot:header="{user}">
    <h3>这是头部插槽</h3>
  </template>
  或者
  <template #header="{user}">
    <h3>这是头部插槽</h3>
  </template>
</ChildComponent>
```
子组件
```js
<template>
  <div>
    <p>下面是两个具名插槽：</p>
    <slot name="header" :user="item"></slot>
  </div>
</template>
```

## 


## 3、示例

### 3.1、自定义渲染器