# Vue3高级知识
## 1、API变更
:::tip
Vue3 的全局 API 已经发生了变化。
- Vue2没有`app`的概念，我们定义的应用只是通过`new Vue()`创建的根 Vue 实例,  Vue3需要通过`createApp()`方法来创建一个应用实例,也就是根实例
- Vue3 中移除了`Vue.component`使用`app.component`来注册全局组件
- Vue3 中移除了`Vue.use`使用`app.use`来注册全局插件
- Vue3 中移除了`Vue.directive`使用`app.directive`来注册全局指令
- Vue3 中移除了`Vue.filter`使用`app.config.globalProperties`来代理使用
:::
### 1.1、创建根实例
```js
import { createApp } from 'vue'
const app = createApp(App)
app.mount('#app')
```
### 1.2、注册全局组件
```js
import { createApp } from 'vue';
import MyComponent from './MyComponent.vue';

const app = createApp();
app.component('my-component', MyComponent);
app.mount('#app');
```

### 1.3、注册全局插件
```js
import { createApp } from 'vue';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
```
### 1.4、注册指令

#### 1.4.1、指令钩子
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted() {},
  // 绑定元素的父组件更新前调用
  beforeUpdate() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated() {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {},
  // 绑定元素的父组件卸载后调用
  unmounted() {}
}
```

#### 1.4.2、钩子参数
指令的钩子会传递以下几种参数：
```js
- el：指令绑定到的元素。这可以用于直接操作 DOM。
- binding：一个对象，包含以下 property：
  - value：传递给指令的值。例如在 v-my-directive=“1 + 1” 中，值是 2。
  - oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
  - arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 “foo”。
  - modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
  - instance：使用该指令的组件实例。
  - dir：指令的定义对象。
- vnode：代表绑定元素的底层 VNode。
- prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
```

#### 1.4.3、全局指令
```js
const app = createApp(App)
app.directive('bg', {
 	mounted: (el) => el.style.backgroundColor = 'blue'
})
```

#### 1.4.4、局部指令(非setup语法糖)
```vue
<div>
  <input type="text" v-bg1>
</div>
```
```js
<script lang="ts">
export default {
  // name: 'MyComponent',
  directives: {
      bg1: {
        mounted(el)=>el.style.backgroundColor = 'blue'
      }
  },
  setup() {

  }
}
</script>
```
示例：
<div>
  <input type="text" v-bg1>
</div>

<script lang="ts">
export default {
  // name: 'MyComponent',
  directives: {
      bg1: {
        mounted(el) {
          el.style.backgroundColor = 'blue'
        }
      }
  },
  setup() {}
}
</script>

#### 1.4.5、局部指令(setup语法糖)
```vue
<div>
  <input type="text" v-bg>
</div>
```
```js
<script setup lang="ts">
import { ref } from 'vue'

const vBg = {
  mounted(el) {
    el.style.backgroundColor = 'red'
  }
}
</script>
```
示例：
<div>
  <input type="text" v-bg>
</div>

#### 1.4.6、指令的参数和修饰符
示例1：
```vue
<div v-params:params.lazy="1"></div>
{{paramsStr}}
```
```js
<script setup lang="ts">
import { ref } from 'vue'

const paramsStr = ref('')
const vParams = {
  mounted(el, { value, oldValue, arg, modifiers }) {
    paramsStr.value = `value:${value} - oldValue:${oldValue} - arg:${arg} - modifiers:${JSON.stringify(modifiers)}`
  }
}
</script>
```

<div v-params:params.lazy="1"></div>
{{paramsStr}}


示例2：
```vue
<div v-color="{ bgColor: 'red', color: 'yellow' }">this is a v-color directive</div>
```
```js
<script setup lang="ts">
const vColor = {
  mounted(el, { value }) {
    el.style.backgroundColor = value.bgColor
    el.style.color = value.color
  }
}
</script>
```
<div v-color="{ bgColor: 'red', color: 'yellow' }">this is a v-color directive</div>

### 1.5、注册过滤器
#### 1.5.1、全局过滤器
```vue
<div >￥{{$filters.numFormat(111)}}</div>
```
```js
const app = createApp(App)
app.config.globalProperties.$filters={
  numFormat(value) {
    return value+'元'
  }
}
```
#### 1.5.2、局部过滤器
```vue
<span>{{ filters('hello') }}</span>
```
```js
```
示例：
<div>{{ filters('hello') }}</div>

### 1.6、按键修饰符
Vue3 内置了许多键码别名，你可以使用这些键码别名代替真实的键码值。下面是常用的键码别名列表：
- .enter: 回车键
- .tab: Tab键
- .delete (捕获“删除”和“退格”键)
- .esc: Esc
- .space: 空格
- .up: 上键
- .down: 下键
- .left: 左键
- .right: 右键
- .ctrl: Ctrl
- .alt: Alt
- .shift: Shift
- .meta (Windows 键和 Command 键)

:::warning
Vue3不在支持`keyCode`需要使用对应的alias
:::

#### 1.6.1、单个修饰符
```vue
<input type="text" v-on:keyup.enter="enterAction" :style="{ border: '1px solid skyblue' }" />
或者
<input type="text" @keyup.enter="enterAction" :style="{ border: '1px solid red' }" />
```
```js
const enterAction = () => {
  alert('keyup.enter')
}
```
示例： 
<input type="text" v-on:keyup.enter="enterAction" :style="{ border: '1px solid skyblue' }" />
<input type="text" @keyup.enter="enterAction" :style="{ border: '1px solid red', marginLeft: '10px' }" />

#### 1.6.2、多个修饰符
```vue
<div @keydown.ctrl.alt.space="onSpace"></div>
```
#### 1.6.3、自定义键ma按键修饰符

### 1.7、事件监听
:::warning
在Vue3中`$on`、`$off`、`$once`被移除，事件监听推荐使用三方库`mitt`
:::
安装
```js
npm install mitt -S
```
使用
```js
import mitt from 'mitt'

export const emitter = mitt()

emitter.on('foo', () => {
  
})

// emitter.emit('foo')
```
跨组件交互
```js
import emitter from './compoennt'

emitter.emit('foo')
```

## 2、数据响应式
### 2.1、ref
:::tip
在Vue中，`ref`是一个用于`创建响应式数据`的函数。它接收一个参数，即需要创建引用的值，并返回一个响应式对象。
:::
#### 2.1.1、锚点
```vue
<div ref="ref1"></div>

<script setup>
import { ref } from 'vue'
const ref1 = ref()
</script>
```

#### 2.1.2、自定义ref
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

## 3、插槽Slot
:::tip
插槽（Slot）是一种用于在`父组件中插入子组件内容`的机制。通过插槽，您可以定义一些占位符，在父组件中填充具体的内容，以实现动态组件的复用和定制
:::
### 3.1、默认插槽
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

### 3.2、具名插槽
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

### 3.3、作用域插槽
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

## 4、组件
### 4.1、render渲染函数
#### 4.1.1、组件渲染
sfc组件
```vue
<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  data() {
    return {
      message: 'Hello, world!'
    };
  },
  render() {
    return h('div', [
      h('h1', this.message),
    ])
  }
});
</script>
```
也可以直接定义
```js
<script setup lang="ts">
import { ref, h } from 'vue'
const MyComponent2 = {
  render() {
    return h('div', [
      h('h1', { style: { color: 'red', marginBottom: '20px' } }, 'Hello, world!'),
    ])
  }
}
</script>
```
示例：
<MyComponent2 />
#### 4.1.2、事件处理
```vue
<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  data() {
    return {
      message: 'Hello, world!'
    };
  },
  render() {
    return h('div', [
      h('h1', this.message),
      h('button', {
        style: {
          color: 'red',
          border: '1px solid skyblue',
          padding: '5px 20px',
        },
        onClick: () => {
          alert('---');
          this.message = 'Hello, world!!!!';
        }
      }, 'Click me')
    ])
  }
});
</script>
```
示例：
<MyComponent />

#### 4.1.3、slots
```vue
<MyComponent3>
  <span>default</span>
</MyComponent3>
```
```js
<script setup lang="ts">
import { ref, h } from 'vue'
const MyComponent3 = {
  render() {
    return h('div', [
      h('div', [
        this.$slots.default()
      ])
    ])
  }
}
</script>
```

示例：
<MyComponent3>
  <span>default</span>
</MyComponent3>

### 4.2、函数组件
#### 4.2.1、组件渲染
```vue
<script>
import { h } from 'vue'
function Heading(props, { attrs,slots }) {
  return h(`h${props.level}`, attrs, slots)
}
// Heading.props = ['level']
Heading.props = {
  level: {
    type: String,
    default: '1'
  }
}
export default Heading
</script>
```
```vue
<FunctionComponent level="1">你好</FunctionComponent>
<FunctionComponent level="2">你好</FunctionComponent>
<FunctionComponent level="3">你好</FunctionComponent>
<FunctionComponent level="4">你好</FunctionComponent>
<FunctionComponent level="5">你好</FunctionComponent>
```

示例：
<FunctionComponent level="1">你好</FunctionComponent>
<FunctionComponent level="2">你好</FunctionComponent>
<FunctionComponent level="3">你好</FunctionComponent>
<FunctionComponent level="4">你好</FunctionComponent>
<FunctionComponent level="5">你好</FunctionComponent>

#### 4.2.2、事件处理
```vue
<script>
import { h } from 'vue'
function Heading(props, { attrs,slots }) {
  return h(`h${props.level}`, {
    ...attrs,
    onClick: () => {
      console.log('click')
    }
  }, slots)
}
// Heading.props = ['level']
Heading.props = {
  level: {
    type: String,
    default: '1'
  }
}
export default Heading
</script>

```
示例：
<FunctionComponent :style="{ color: 'red'}" level="1">你好</FunctionComponent>
### 4.3、组件白名单
:::tip
Vue3中检测自定义元素发生在模版编译时，如果添加一些自定义元素或者忽略警告需要配置`isCustomElement`选项
:::
#### 4.3.1 vue-cli
```js
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader',
    options: {
      compilerOptions: {
        isCustomElement: tag => tag === 'my-component',
      }
    }
  }
]
````

#### 4.3.2 vite
:::tip
在vite项目中配置`vueCompilerOptions`选项
:::
修改`vite.config.js`
```js
module.exports = {
  vueCompilerOptions: {
    isCustomElement: tag => tag === 'my-component',
  }
}
```

### 4.4、异步组件
#### 4.4.1、定义一个异步组件
```vue
import { defineAsyncComponent } from 'vue'

const asyncPage = defineAsyncComponent(() => import('./async.vue'))
```

#### 4.4.2、带配置的异步组件
```vue
import ErrorComponent from './ErrorComponent.vue'
import LoadingComponent from './LoadingComponent.vue'

const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./async.vue'),
  delay: 100,
  timeout: 200,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```
## 5、示例

### 5.1、自定义渲染器
:::tip
Vue3中支持自定义渲染器，可以自定义组件的渲染
:::
该例子是将数据渲染到canvas上
```html
// index.html
<body>
  <div id="demo" />
</body>
```
```vue
// CanvasApp.vue
<template>
  <piechart @click="handleClick" :data="state.data" :x="200" :y="200" :r="200"></piechart>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'CanvasApp',
  setup() {
    const state = reactive({
      data: [
        { name: '大专', count: 200, color: 'brown' },
        { name: '本科', count: 100, color: 'blue' },
        { name: '硕士', count: 50, color: 'green' },
        { name: '博士', count: 30, color: 'red' }
      ]
    })
    const handleClick = () => {
      state.data.push({
        name: '高中', count: 30, color: 'orange'
      })
    }
    return {
      state,
      handleClick
    }
  }
}
</script>
```
```js
// main.js
import { createApp, createRenderer } from 'vue'

const nodeOps = {
  // 处理元素创建
  createElement(tag, data, children) {
    return {tag}
  },
  // 处理元素插入
  insert(child, parent, anchor) {
    // 1、如果是子元素，不是真实dom,只需将子元素插入到父元素中
    child.parent = parent
    if (!parent.childs) {
      parent.childs = [child]
    } else {
      parent.childs.push(child)
    }
    // 2、如果是真实dom，需要进行绘制
    if (parent.nodeType === 1) {
      draw(child)
      // 事件处理
      if (child.onClick) {
        canvas.addEventListener('click', () => {
          child.onClick()
          setTimeout(() => {
            draw(child)
          }, 0)
        })
      }
    }
    return
  },
  remove(el) {},
  createText(text) {},
  setText(el, text) {},
  setElementText(el, text) {},
  parentNode(el) {},
  nextSibling(el) {},
  querySelector(el, selector) {},
  setCopeIn(el, text) {},
  cloneNode(el) {},
  insertStateContent(el, text) {},
  // 属性更新
  patchProps(el, key, preValue, nextValue) {
    el[key] = nextValue
  },
}

// 绘制
const draw = (el, noClear) => {
  if (!noClear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  if (el.tag === 'piechart') {
    let { data, x, y, r } = el;
    let total = data.reduce((a, b) => a + b, 0);
    let start = 0,
        end = 0
    data.forEach((item, index) => {
      end += item.count / total * 360
      drawPieChart(start, end, item.color, x, y, r)
      drawPieChartText(item.name, (start + end)/2, x, y, r)
      start = end
    })
  }
  el.childs && el.childs.forEach(child => {
    draw(child, true)
  })
}

const d2a = (n) => {
  return n * Math.PI / 180
}

const drawPieChart = (start, end, color, cx, cy, r) => {
  let x = cx + Math.cos(d2a(start)) * r
  let y = cy + Math.sin(d2a(start)) * r
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(x, y)
  ctx.arc(cx, cy, r, d2a(start), d2a(end), false)
  ctx.fillStyle = color
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

const drawPieChartText = (text, position, cx, cy, r) => {
  ctx.beginPath()
  let x = cx + Math.cos(d2a(position)) * r/1.25 - 20
  let y = cy + Math.sin(d2a(position)) * r/1.25
  ctx.fillstyle = '#000'

  ctx.font = '20px 微软雅黑'
  ctx.fillText(text, x, y)
  ctx.closePath()
}

const renderer = createRenderer(nodeOps)
let ctx, canvas;

function createCanvasApp(App) {
  const app = renderer.createApp(App)
  const mount = app.mount
  app.mount = function (selector) {
    // 创建canvas并插入画布
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    // 设置画布的宽高
    canvas.width = 600
    canvas.height = 600
    document.querySelector(selector).appendChild(canvas)
    // 执行挂载
    mount(canvas)
  }
  return app
}

createCanvasApp(CanvasApp).mount('#demo')
```

### 5.2、自定义reactive
```vue
const myReactive = <T extends object>(obj: T) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
}
```
### 5.3、自定义effect
```vue
<div>{{ effectValue }}</div>
<button :style="{ color: 'red', border: '1px solid skyblue' }" @click="changeName">改变name</button>

const myReactive = <T extends object>(obj: T) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    }
  })
}

let activeEffect; 
const myEffect = (fn: Function) => {
  const _effect = () => {
    activeEffect = _effect
    fn()
  }
  _effect()
}

// 收集依赖
const targetMap = new WeakMap()
const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

// 触发依赖更新
const trigger = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key)
  if (!dep) {
    return
  }
  dep.forEach(effect => {
    effect()
  })
}

const effectValue = ref()
const myObj = myReactive({
  name: 'zw',
  age: 18
})
myEffect(() => {
  effectValue.value = myObj.name + myObj.age
})
const changeName = () => {
  myObj.name = 'min'
}
```
示例:
<div>{{ effectValue }}</div>
<button :style="{ color: 'red', border: '1px solid skyblue' }" @click="changeName">改变name</button>

### 5.4、自定义computed
```vue
<div>{{ computedValue.value }}</div>
<button :style="{ color: 'red', border: '1px solid skyblue' }" @click="changeName">改变name</button>

const myReactive = <T extends object>(obj: T) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver) as object
      track(target, key)
      if (res != null && typeof res == 'object') {
        return myReactive(res)
      }
      return res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    }
  })
}

interface Options {
   scheduler?: Function
}

let activeEffect; 
const myEffect = (fn: Function, options:Options) => {
  const _effect = () => {
    activeEffect = _effect
    const res = fn()
    return res
  }
  _effect.options = options
  _effect()
  return _effect
}

// 收集依赖
const targetMap = new WeakMap()
const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

// 触发依赖更新
const trigger = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key)
  if (!dep) {
    return
  }
  dep.forEach(effect => {
    if (effect.options && effect.options.scheduler) {
      effect.options.scheduler()
    } else {
      effect()
    }
  })
}

const myComputed = (getter: Function) => {
  let _value = myEffect(getter, {
    scheduler: () => { _dirty = true }
  })
  let catchValue
  let _dirty = true
  class ComputedRefImpl {
    get value() {
      if (_dirty) {
        catchValue = _value()
        _dirty = false
      }
      return catchValue
    }
  }
  return new ComputedRefImpl()
}

const effectValue = ref()
const myObj = myReactive({
  name: 'zw',
  age: 18
})
myEffect(() => {
  effectValue.value = myObj.name + myObj.age
  console.log(myObj.name, myObj.age)
})
const changeName = () => {
  myObj.name = 'min'
  // console.log('--------',myObj.name)
}
const computedValue = myComputed(() => myObj.name + myObj.age)
```
示例:
<div>{{ computedValue.value }}</div>
<button :style="{ color: 'red', border: '1px solid skyblue' }" @click="changeName">改变name</button>

### 5.5、自定义Event Bus
```vue
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | number | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus<number>()
```

<script setup lang="ts">
import { ref, h, createRenderer, onMounted } from 'vue'
import MyComponent from '../../../components/tsxComponent/render.vue'
import FunctionComponent from '../../../components/tsxComponent/function.vue'

const myReactive = <T extends object>(obj: T) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver) as object
      track(target, key)
      if (res != null && typeof res == 'object') {
        return myReactive(res)
      }
      return res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    }
  })
}

interface Options {
   scheduler?: Function
}

let activeEffect; 
const myEffect = (fn: Function, options:Options) => {
  const _effect = () => {
    activeEffect = _effect
    const res = fn()
    return res
  }
  _effect.options = options
  _effect()
  return _effect
}

// 收集依赖
const targetMap = new WeakMap()
const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

// 触发依赖更新
const trigger = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key)
  if (!dep) {
    return
  }
  dep.forEach(effect => {
    if (effect.options && effect.options.scheduler) {
      effect.options.scheduler()
    } else {
      effect()
    }
  })
}

const myComputed = (getter: Function) => {
  let _value = myEffect(getter, {
    scheduler: () => { _dirty = true }
  })
  let catchValue
  let _dirty = true
  class ComputedRefImpl {
    get value() {
      if (_dirty) {
        catchValue = _value()
        _dirty = false
      }
      return catchValue
    }
  }
  return new ComputedRefImpl()
}

const effectValue = ref()
const myObj = myReactive({
  name: 'zw',
  age: 18
})
myEffect(() => {
  effectValue.value = myObj.name + myObj.age
  console.log(myObj.name, myObj.age)
})
const changeName = () => {
  myObj.name = 'min'
  // console.log('--------',myObj.name)
}
const computedValue = myComputed(() => myObj.name + myObj.age)

const MyComponent2 = {
  render() {
    return h('div', [
      h('h1', { style: { color: 'red', marginBottom: '20px' } }, 'Hello, world!'),
    ])
  }
}

const MyComponent3 = {
  render() {
    return h('div', [
      h('div', [
        this.$slots.default()
      ])
    ])
  }
}

const paramsStr = ref('')
const vParams = {
  mounted(el, { value, oldValue, arg, modifiers }) {
    paramsStr.value = `value:${value} - oldValue:${oldValue} - arg:${arg} - modifiers:${JSON.stringify(modifiers)}`
  }
}

const vColor = {
  mounted(el, { value }) {
    el.style.backgroundColor = value.bgColor
    el.style.color = value.color
  }
}

const vBg = {
  mounted(el) {
    el.style.backgroundColor = 'red'
  }
}

const filters = (txt) => {
  return txt.toUpperCase();
}

const enterAction = () => {
  alert('keyup.enter')
}

</script>