# Vue3高级知识

## 1、插槽Slot
:::tip
插槽（Slot）是一种用于在`父组件中插入子组件内容`的机制。通过插槽，您可以定义一些占位符，在父组件中填充具体的内容，以实现动态组件的复用和定制
:::
### 1.1、默认插槽
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

### 1.2、具名插槽
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

### 1.3、作用域插槽
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