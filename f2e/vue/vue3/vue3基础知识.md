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
清除副作用
:::tip
就是在触发监听之前会调用一个函数可以处理你的逻辑例如防抖
:::
```vue
watchEffect((oninvalidate) => {
  oninvalidate(()=>{
      
  })
  console.log('message2', message2.value);
})
```
停止跟踪
:::tip
- 停止跟踪 watchEffect 返回一个函数 调用之后将停止更新
- onTrigger  可以帮助我们调试 watchEffect
:::
```vue
const stop =  watchEffect((oninvalidate) => {
  oninvalidate(()=>{

  })
  console.log('message2', message2.value);
},{
  flush:"post",
  onTrigger () {

  }
})
stop()
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

// 可选项
watch(() => obj.name, (newValue, oldValue) => {

}, { 
  immediate: true, // 是否立即调用
  deep: true // 是否开启深度监听
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
import { ref, Ref } from 'vue'
// number
const count = ref(0)
// string
const str = ref('')
// 定义dom的ref
const domRef = ref()
// 类型定义
let message: Ref<string | number> = ref("我是message")

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

#### 3.2.7、v-momo
:::tip
- `v-memo`是Vue3新增的指令之一，它可以缓存一个模板的子树，从而提高应用程序的性能。`v-memo`所做的与我们现有的计算属性一样，只不过`v-memo`的对象是DOM。这个新指令将缓存它所控制的DOM部分，如果一个特定的值发生变化，只需运行更新并重新渲染。
- `v-memo`接收的是`[]`相当于`v-once`, 只会渲染一次
:::

示例：
<div :style="{ height: '200px', overflow: 'auto' }">
  <input type="text" v-model="value" :style="{ border: '1px solid red' }" />
  <!-- v-memo中值若不发生变化，则不会进行更新 -->
  <ul v-memo="[shouldUpdate]">
      <li class="licss" v-for="item in arr" :key="item">
        {{ value }} -- {{ animalType[value] }}
      </li>
  </ul>
</div>

#### 3.2.8、shallowRef
:::tip
创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的
:::
```vue
import { Ref, shallowRef } from 'vue'
type Obj = {
  name: string
}
let message: Ref<Obj> = shallowRef({
  name: "zw"
})

// 无法监听
message.value.name = '大满'
// 可以监听
message.value = { name: "大满" }
```
#### 3.2.9、triggerRef
:::tip
强制更新页面DOM
:::
```vue
import { Ref, shallowRef, triggerRef } from 'vue'
type Obj = {
  name: string
}
let message: Ref<Obj> = shallowRef({
  name: "hello"
})

message.value.name = 'hello1'
// 强制更新页面DOM
triggerRef(message)
```
#### 3.2.10、reactive
:::tip
`reactive`的作用是将对象中的所有属性转换为响应式数据
:::
```vue
import { reactive } from 'vue'
const obj = reactive({
  name: 'zw',
  age: 18
})
// 修改数据
obj.name = 'zz'
// 访问数据
console.log(obj.name)
``` 
数组异步赋值问题
:::warning
这样赋值页面是不会变化的因为会脱离响应式
:::
```vue
let person = reactive<number[]>([])
person = [1, 2, 3]
```
解决方案1
```vue
const arr = [1, 2, 3]
person.push(...arr)
```
解决方案2
```vue
type Person = {
  list?:Array<number>
}
let person = reactive<Person>({
   list:[]
})
const arr = [1, 2, 3]
person.list = arr;
```
#### 3.2.11、readonly
:::tip
拷贝一份proxy对象将其设置为只读
:::
```vue
import { reactive ,readonly} from 'vue'
const person = reactive({count:1})
const copy = readonly(person)
```
#### 3.2.12、toRef
```vue
import { reactive, toRef } from 'vue'
const obj = {
  foo: 1,
  bar: 1
}
const state = toRef(obj, 'bar')
```
#### 3.2.13、toRaw
:::tip
将响应式对象转化为普通对象
:::
```vue
import { reactive, toRaw } from 'vue'
 
const obj = reactive({
   foo: 1,
   bar: 1
})
const state = toRaw(obj)
```
#### 3.2.14、keep-alive
:::tip
- 有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态
- 初次进入时： onMounted> onActivated
- 退出后触发 deactivated
- 再次进入：
  - 只会触发 onActivated
  - 事件挂载的方法等，只执行一次的放在`onMounted`中；组件每次进去执行的方法放在 `onActivated`中
:::
```vue
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>

<!-- 其他配置 -->
<keep-alive :include="" :exclude="" :max=""></keep-alive>
```

#### 3.2.15、动态css
```vue
<div class="dyDiv">mz hello</div>

const red = ref('red')
const redObj = reactive({
  color: 'red'
})
.dyDiv {
  color: v-bind(red);
  color: v-bind('redObj.color');
}
```
示例：
<div class="dyDiv">mz hello</div>

#### 3.2.16、css module
:::tip
`<style module>`标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件
:::

```vue
<template>
    <div :class="$style.red">
      hello
    </div>
</template>
 
<style module>
.red {
    color: red;
    font-size: 20px;
}
</style>
```

```vue
<template>
    <div :class="[zs.red,zs.border]">
        弟弟
    </div>
</template>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

```vue
<template>
    <div :class="[zs.red,zs.border]">hello</div>
</template>
 
 
<script setup lang="ts">
import { useCssModule } from 'vue'
const css = useCssModule('zs')
</script>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
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
#### 3.3.8、withDefaults
:::tip
TS 特有的默认值方式
:::
```vue
type Props = {
    title?: string,
    data?: number[]
}
withDefaults(defineProps<Props>(), {
    title: "张三",
    data: () => [1, 2, 3]
})
```
## 4、示例
### 4.1、defineProps瀑布流
瀑布流组件
```vue
<template>
  <div class="wraps">
    <div 
      v-for="item in waterList" 
      class="items" 
      :style="{height:item.height+'px',background:item.background,top:item.top+'px',left:item.left + 'px'}">
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const props = defineProps<{
  list: any[]
}>()
const waterList = reactive<any[]>([])

const init = () => {
  const heightList: any[] = []
  const width = 130
  const x = document.body.clientWidth
  const column = Math.floor(x / width)
  for (let i = 0; i < props.list.length; i++) {
    if (i < column) {
      props.list[i].top = 10
      props.list[i].left = i * width
      heightList.push(props.list[i].height + 10)
      waterList.push(props.list[i])
    } else {
      // 找到最高的高度
      let current = heightList[0]
      let index = 0
      heightList.forEach((h, idx) => {
        if (current > h) {
          current = h
          index = idx
        }
      })
      props.list[i].top = current + 20
      props.list[i].left = index * width
      heightList[index] = heightList[index] + props.list[i].height + 20
      heightList.push(props.list[i].height + 10)
      waterList.push(props.list[i])
    }
  }
}

onMounted(() => {
  window.onresize = () => init()
  init()
})
</script>

<style scoped lang="scss">
.wraps {
  position: relative;
  height: 100%;
  .items {
    position: absolute;
    width: 120px;
  }
}
</style>
```
使用
```vue
<div :style="{ height: '400px', overflow: 'auto' }">
  <WaterFallVue :list="list"></WaterFallVue>
</div>

const data = [
  {
    name: "no.1",
    children: [
      {
        name: "no.1-1",
        children: [
          {
            name: "no.1-1-1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2-1",
      },
    ],
  },
  {
    name: "no.3",
  },
]
```

示例：
<div :style="{ height: '400px', overflow: 'auto' }">
  <WaterFallVue :list="list"></WaterFallVue>
</div>

### 4.2、递归组件
TreeItem组件
```vue
<template>
  <div style="margin-left:10px;" class="tree">
    <div :key="index" v-for="(item,index) in data">
      <div @click='clickItem(item)'>{{item.name}}</div>
      <TreeItem @on-click='clickItem' v-if='item?.children?.length' :data="item.children"></TreeItem>
    </div>
  </div>
</template>

<script setup lang="ts">

type TreeList = {
  name: string
  icon?: string
  children?: TreeList[] | []
}
 
type Props<T> = {
  data?: T[] | []
}
 
defineProps<Props<TreeList>>()

const clickItem = (item: TreeList) => {
  console.log(item)
}
</script>

<script lang="ts">
export default {
  name: "TreeItem"
}
</script>
```
使用
```vue
<div v-for="item in data">
  <TreeItem :data="item.children"></TreeItem>
</div>
```

示例：
<div v-for="item in data">
  <TreeItem :data="item.children"></TreeItem>
</div>

## 

<script setup>
import { ref, watch, reactive } from 'vue'
import WaterFallVue from '../../../components/WaterFallVue.vue'
import TreeItem from '../../../components/TreeItem.vue'

const shouldUpdate = ref(0)
const arr = Array.apply(null, { length: 10000 });
const value=ref('mie')
const animalType = {
  'mie':'🐏',
  'mo':'🐂',
  'miao':'🐱',
}
watch(()=>value.value,()=>{
  if(Object.keys(animalType).includes(value.value)){
    shouldUpdate.value++
  }
})


const data = [
  {
    name: "no.1",
    children: [
      {
        name: "no.1-1",
        children: [
          {
            name: "no.1-1-1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2-1",
      },
    ],
  },
  {
    name: "no.3",
  },
]

// 瀑布流
const list = [
  {
      height: 300,
      background: 'red'
  },
  {
      height: 400,
      background: 'pink'
  },
  {
      height: 500,
      background: 'blue'
  },
  {
      height: 200,
      background: 'green'
  },
  {
      height: 300,
      background: 'gray'
  },
  {
      height: 400,
      background: '#CC00FF'
  },
  {
      height: 200,
      background: 'black'
  },
  {
      height: 100,
      background: '#996666'
  },
  {
      height: 500,
      background: 'skyblue'
  },
  {
      height: 300,
      background: '#993366'
  },
  {
      height: 100,
      background: '#33FF33'
  },
  {
      height: 400,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#6633CC'
  },
  {
      height: 300,
      background: '#666699'
  },
  {
      height: 300,
      background: '#66CCFF'
  },
  {
      height: 300,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#CC3366'
  },
  {
      height: 200,
      background: '#CC9966'
  },
  {
      height: 200,
      background: '#FF00FF'
  },
  {
      height: 500,
      background: '#990000'
  },
  {
      height: 400,
      background: 'red'
  },
  {
      height: 100,
      background: '#999966'
  },
  {
      height: 200,
      background: '#CCCC66'
  },
  {
      height: 300,
      background: '#FF33FF'
  },
  {
      height: 400,
      background: '#FFFF66'
  },
  {
      height: 200,
      background: 'red'
  },
  {
      height: 100,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#33CC00'
  },
  {
      height: 300,
      background: '#330033'
  },
  {
      height: 100,
      background: '#0066CC'
  },
  {
      height: 200,
      background: 'skyblue'
  },
  {
      height: 100,
      background: '#006666'
  },
  {
      height: 200,
      background: 'yellow'
  },
  {
      height: 300,
      background: 'yellow'
  },
  {
      height: 100,
      background: '#33CCFF'
  },
  {
      height: 400,
      background: 'yellow'
  },
  {
      height: 400,
      background: 'yellow'
  },
  {
      height: 200,
      background: '#33FF00'
  },
  {
      height: 300,
      background: 'yellow'
  },
  {
      height: 100,
      background: 'green'
  }
]

const red = ref('red')
</script>

<style lang="scss" scoped>
.dyDiv {
  color: v-bind(red);
}
</style>