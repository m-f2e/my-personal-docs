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

修改`tsconfig.json`配置文件
```json
"jsx": "preserve",
"jsxFactory": "h",
"jsxFragmentFactory": "Fragment"
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
纯jsx语法设置响应式需要将响应式写在函数式组件外
:::

```tsx
export default ()=> {
  return (
    <div class={tsxComStyle.box} onClick={() => console.log('---')}></div>
  )
}
```

```tsx
// 纯jsx使用v-model做数据绑定无法使用响应式！！！
import { ref } from 'vue'
const countRef = ref(111)

export default ()=> {
  return (
    <input v-model={countRef.value} />
  )
}
```

示例：
<Toast v-model="clickShow" message="点击事件展示" />

<TsxContainer>
  <div :style="{ display: 'inline-block', backgroundColor: 'skyblue', padding: '10px 20px', borderRadius: '5px' }" @click="clickShow=!clickShow">点我试试</div>
</TsxContainer>

### 3.4、tsx与v-model
```tsx
import { ref } from 'vue'
const v = ref<string>('')

export default (props, context) => {
  const count = props.count
  return (
    <>
      {/* props.count */}
      <div>props: {count}</div>
      <input v-model={count} style={{ border: '1px solid red' }} />

      {/* ref value */}
      <div>ref: { v.value }</div>
      <input v-model={v.value} type="text" style={{ border: '1px solid green' }}  />
    </>
  )
}
```
<RenderX :count="1" />

### 3.5、v-bind
```tsx
import { ref } from 'vue'

const arr = [1, 2, 3, 4, 5]

<div data-arr={arr}>1</div>
// <div data-arr="1,2,3,4,5">1</div>
```

### 3.6、v-on
:::tip
- 所有事件有on开头
- 所有事件名称首字母大写
:::
```tsx
<button onClick={clickTap}>点击</button>
```

### 3.7、props
```tsx
type Props = {
  title:string
}
 
const renderDom = (props:Props) => {
  return (
    <>
      <div>{props.title}</div>
      <button onClick={clickTap}>点击</button>
    </>
  )
}
```
### 3.8、emit派发
```tsx
type Props = {
    title: string
}
 
const renderDom = (props: Props,content:any) => {
  return (
    <>
      <div>{props.title}</div>
      <button onClick={clickTap.bind(this,content)}>点击</button>
    </>
  )
}
 
const clickTap = (ctx:any) => {
  ctx.emit('on-click',1)
}
```

### 3.9、slot
```tsx
const A = (props, { slots }) => (
  <>
    <h1>{ slots.default ? slots.default() : 'foo' }</h1>
    <h2>{ slots.bar?.() }</h2>
  </>
);
 
const App = {
  setup() {
    const slots = {
      bar: () => <span>B</span>,
    };
    return () => (
      <A v-slots={slots}>
        <div>A</div>
      </A>
    );
  },
};
 
// or
 
const App = {
  setup() {
    const slots = {
      default: () => <div>A</div>,
      bar: () => <span>B</span>,
    };
    return () => <A v-slots={slots} />;
  },
};
 
// or you can use object slots when `enableObjectSlots` is not false.
const App = {
  setup() {
    return () => (
      <>
        <A>
          {{
            default: () => <div>A</div>,
            bar: () => <span>B</span>,
          }}
        </A>
        <B>{() => "foo"}</B>
      </>
    );
  },
};
```

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

### 5.3、事件
:::tip
- jsx方法名需要使用 {} 包裹起来
- jsx无自定义参数的函数不需要带()结尾
- jsx在使用带参数的函数，则需要使用箭头函数包裹: `{() => func(args)}`
- jsx需要借助`withModifiers`实现`.self` ,`.stop`等修饰符的效果
:::
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
#### 5.3.3、函数事件
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    const age = ref(0)
    const increment = () => {
      age.value++
    }
    return () => (
      <div onClick={increment}>
        age: {age.value}
      </div>
    )
  },
})
```
#### 5.3.4、事件修饰符
```tsx
import { defineComponent, withModifiers } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    const age = ref(0)
    const increment = () => {
      age.value++
    }
    return () => (
      <div onClick={withModifiers(inc, ["stop"])}>
        age: {age.value}
      </div>
    )
  },
})
```

### 5.4、插槽v-slot
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
### 5.5、ref绑定
:::tip
- 对于`ref`双向绑定变量，jsx不会像`template`自动处理`.value`需要手动加`.value`
- 对于dom标签的`ref引用`，jsx是直接用ref()变量，不需要加.value
:::

```vue
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    const divRef = ref()
    return () => (
      <div ref={divRef}></div>
    )
  },
})
```

### 5.6、v-model
:::tip
- 组件只有一个v-model时，使用v-model语法
- 组件只有多个v-model时，可以使用v-model:xx语法
- 多个v-model时 也可以v-models语法,需传递一个二维数组(新版不推荐)
:::
#### 5.6.1、单个v-model
直接使用v-model
```tsx
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'TsxComponent',
  setup() {
    const countRef = ref(111)
    return () => (
      <input v-model={countRef.value} />
    )
  }
})
```
自定义v-model
```tsx
export default defineComponent({
  name: 'TsxInput',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const countRef = ref(props.modelValue)
    const onChange = (el) => {
      emit('update:modelValue', el.target.value)
    }
    return () => (
      <input v-model={countRef.value} onInput={onChange} />
    )
  }
})
```
示例：

count: {{ count }}
<TsxInput v-model="count" :style="{ border: '1px solid red', padding: '10px 20px', borderRadius: '5px', marginBottom: '20px' }" />

#### 5.6.2、多个v-model
```tsx
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'MulTsxInput',
  props: {
    name: String,
    age: String,
    gender: String,
  },
  emits: ['update:name', 'update:age', 'update:gender'],
  setup(props, { emit }) {
    const nameRef = ref(props.name)
    const ageRef = ref(props.name)
    const genderRef = ref(props.name)
    const onNameChange = (el) => {
      emit('update:name', el.target.value)
    }
    const onAgeChange = (el) => {
      emit('update:age', el.target.value)
    }
    const onGenderChange = (el) => {
      emit('update:gender', el.target.value)
    }
    return () => (
      <>
        <input v-model={nameRef.value} onInput={onNameChange} />
        <input v-model={ageRef.value} onInput={onAgeChange} />
        <input v-model={genderRef.value} onInput={onGenderChange} />
      </>
    )
  }
})
```
示例：

result: {{ name }} - {{ age }} - {{ gender }}
<MulTsxInput 
  v-model:name="name" 
  v-model:age="age" 
  v-model:gender="gender" 
  :style="{ border: '1px solid red', padding: '10px 20px', borderRadius: '5px', marginBottom: '20px' }" 
/>

### 5.7、for循环
:::tip
jsx中可使用map循环来实现
jsx中template的`v-for`不可用
:::
```tsx
export default defineComponent({
  setup(props, { emit }) {
    const labels = ref([
      { label:'1' },
      { label:'2' },
      { label:'3' }
    ]); 
    return () => (
      <>
        {labels.value.map(({ label }) => (
          return (
            <div>{label}</div>
          )
        ))}
      </>
    )
  }
})
```

### 5.8、if语法
:::tip
- jsx中无法使用`v-if`，可以使用逻辑运算表达式
:::
```tsx
export default defineComponent({
  setup(props, { emit }) {
    const show = ref(false)
    return () => (
      <>
        {show && <span>111</span>}
        {!show && <span>222</span>}
      </>
    )
  }
})
```
### 5.9、v-show
```tsx
export default defineComponent({
  setup(props, { emit }) {
    const show = ref(false)
    return () => (
      <>
       <span v-show={show.value}>show</span>
      </>
    )
  }
})
```
### 5.10、自定义指定
#### 5.10.1、v-loading
```tsx
import { defineComponent, ref } from 'vue'
import style from './fullScreen.module.scss'

export default defineComponent({
  name: 'fullScreen',
  setup(props, { emit }) {
    const loading = ref(true)
    return () => (
      <>
        <span v-loading_fullscreen={loading.value} class={style.fullScreen}> loading </span> 
      </>
    )
  }
})
```
```scss
// fullScreen.module.scss
.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
```

## 6、插件
### 6.1、编译tsx(小满的demo)
1、第三方插件
```shell
npm install @vue/babel-plugin-jsx
npm install @babel/core
npm install @babel/plugin-transform-typescript
npm install @babel/plugin-syntax-import-meta
npm install @types/babel__core
```

2、插件代码
```ts
import type { Plugin } from 'vite'
import * as babel from '@babel/core'; //@babel/core核心功能：将源代码转成目标代码。
import jsx from '@vue/babel-plugin-jsx'; //Vue给babel写的插件支持tsx v-model等
export default function (): Plugin {
    return {
        name: "vite-plugin-tsx",
        config (config) {
           return {
              esbuild:{
                 include:/\.ts$/
              }
           }
        },
        async transform(code, id) {
            if (/.tsx$/.test(id)) {
                //@ts-ignore
                const ts = await import('@babel/plugin-transform-typescript').then(r=>r.default)
                const res = babel.transformSync(code,{
                    plugins:[jsx,[ts, { isTSX: true, allowExtensions: true }]], //添加babel插件
                    ast:true, // ast: 抽象语法树，源代码语法结构的一种抽象表示。babel内部就是通过操纵ast做到语法转换。
                    babelrc:false, //.babelrc.json
                    configFile:false //默认搜索默认babel.config.json文件
                })
                return res?.code //code: 编译后的代码
            }
           
            return code
        }
    }
}
```

<script setup>
import { ref } from 'vue'
import TsxInput from '../../../components/tsxComponent/input.tsx'
import MulTsxInput from '../../../components/tsxComponent/mulInput.tsx'
import RenderX from '../../../components/tsxComponent/renderx.tsx'

// 点击事件展示
const clickShow = ref(false)
const count = ref('1')
const name = ref('mz')
const age = ref('18')
const gender = ref('男')
</script>