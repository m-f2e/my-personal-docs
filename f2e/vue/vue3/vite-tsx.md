# Vue + Vite + TSX
## 1、jsx | tsx简介
`JSX`是一种JavaScript的语法扩展，它允许你在JavaScript代码中编写类似HTML的标记。<br/>
`TSX`是TypeScript的一种语法扩展，它允许你在TypeScript代码中编写类似HTML的标记。

## 2、vite vue支持tsx
:::tip
vite vue支持jsx需要插件配合
:::

```shell
yarn add @vitejs/plugin-vue-jsx -D
```
在`vite.config.js`中配置
```shell
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), jsx()],
})
```

## 3、纯jsx
### 3.1、组件写法
```tsx
export default () => {
  return (<div>
    App
  </div>)
}
或者
export default function() {
  return (<div>
    App
  </div>)
}
```
### 3.2、传参
```tsx
import type { Ref } from 'vue'

export default ({count}: {count: Ref<number>})=> {
  return (
    <p>count: {count}</p>
  )
}
```
### 3.3、点击事件
:::warning
纯jsx语法无法设置响应式
:::

```tsx
export default ()=> {
  return (
    <div class={tsxComStyle.box} onClick={() => console.log('---')}></div>
  )
}
```

示例：
<Toast v-model="clickShow" message="点击事件展示" />

<JsxTips>
  <div :style="{ display: 'inline-block', backgroundColor: 'skyblue', padding: '10px 20px', borderRadius: '5px' }" @click="clickShow=!clickShow">点我试试</div>
</JsxTips>

## 4、选项式api+jsx
:::tip
- 选项式API: 选项式API 是一种 声明式的API,通过在Vue实例的选项中声明属性和方法来控制组件的行为。它提供了一种简单、易于学习和使用的方式来编写Vue组件。
:::

```jsx
export default function JsxComponent() {
  return (
    <div>
      this is a JsxComponent
    </div>
  )
}
```
## 5、组合式api+jsx<Badge type="tip" text="推荐" />
:::tip
- 选项式API: 选项式API 是一种 声明式的API,通过在Vue实例的选项中声明属性和方法来控制组件的行为。它提供了一种简单、易于学习和使用的方式来编写Vue组件。
:::

### 5.1、组件写法
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {}) {
    return () => (
      <div></div>
    )
  },
})
```
### 5.2、传参
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(props, {slots}) {
    return () => (
      <div onClick={() => console.log('---')}>
        <p>{count}</p>
        {slots.default?.()}
      </div>
    )
  },
})
```

### 5.3、点击事件
#### 5.3.1、组件内部事件
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    return () => (
      <div onClick={() => console.log('---')}>
        {slots.default?.()}
      </div>
    )
  },
})
```

#### 5.3.2、组件回调事件
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click'],
  setup(props, {slots}) {
    return () => (
      <div onClick={() => emit('click')}>
        {slots.default?.()}
      </div>
    )
  },
})
```

示例:
<Toast v-model="clickShow" message="点击事件展示" />
<JsxTips>
  <div :style="{ display: 'inline-block', backgroundColor: 'skyblue', padding: '10px 20px', borderRadius: '5px' }" @click="clickShow=!clickShow">点我试试</div>
</JsxTips>

### 5.4、插槽
:::tip
- Vue中的插槽是一种组件间通信的方式，可以让父组件向子组件指定位置插入内容(可以是HTML结构，也可以是其他组件)。
- Vue的插槽机制分为三种：`默认插槽`、`具名插槽`和`作用域插槽`。
:::
#### 5.4.1、默认插槽
slotComponent
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    return () => (
      <div>
        {slots.default?.()}
      </div>
    )
  },
})
```

调用
```vue
<slotComponent>
  <div>点我试试</div>
</slotComponent>
```
#### 5.4.2、具名插槽
slotComponent
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    return () => (
      <div>
        {slots.header?.()}
        {slots.footer?.()}
        {slots.default?.()}
      </div>
    )
  },
})
```

调用
```vue
<SlotComponent>
  {{
    default: () => <h1>default</h1>,
    header: () => <h1>header</h1>,
    footer: () => <h1>footer</h1>,
  }}
</SlotComponent>
```
v-slots方式<Badge type="tip" text="推荐" />
```vue
<SlotComponent v-slots={{
  default: () => <h1>default</h1>,
  header: () => <h1>header</h1>,
  footer: ({ msg }: { msg: string}) => <h1>footer-{msg}</h1>,
}}>
</SlotComponent>
```

#### 5.4.3、作用域插槽
slotComponent
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    return () => (
      <div>
        {slots.header?.()}
        {slots.footer?.({ msg: 'footer msg' })}
        {slots.default?.()}
      </div>
    )
  },
})
```
调用
```vue
<SlotComponent v-slots={{
  default: () => <h1>default</h1>,
  header: () => <h1>header</h1>,
  footer: ({ msg }: { msg: string}) => <h1>footer-{msg}</h1>,
}}>
</SlotComponent>
```

## 示例
### tsx组件


<script setup>
import { ref } from 'vue'
import JsxTips from '../../../components/tsxTips/index.tsx'
import Toast from '../../../components/Toast.vue'
// 点击事件展示
const clickShow = ref(false)
</script>