# Vue2简介
## 1、简介
`Vue`(发音为 /vjuː/，类似 view) 是一款用于构建用户界面的`JavaScript`框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

## 2、官网
https://v2.cn.vuejs.org/
## 3、常见指令
|名称|描述|
|-|-|
|v-on|绑定事件<br/>① "v-on"可以简写成@<br/>② 可以使用“@[变量名]”，绑定动态事件<br/>③ 事件处理函数中，可以使用事件对象 event|
|v-if ，v-else-if ，v-else|	条件渲染,通过控制`dom`结构的存在与否来实现区块的显示和隐藏|
|v-show|条件渲染：通过控制元素的`display`属性来控制区块的显示和隐藏|
|v-for|	列表渲染|
|v-model|数据双向绑定|
|v-bind|	①"v-bind:"可以简写成":"<br/>② 可以将标签/组件上的某个属性与数据变量进行绑定<br/>③ 可以使用 ":[变量名]"，绑定动态属性
|v-html|	识别变量中的`html`标签|
|v-once|标签/组件只渲染一次|

## 4、事件修饰符
|名称|描述|
|-|-|
|.prevent|	阻止默认事件|
|.stop|	阻止事件冒泡|
|.self|	只有操作自身时，才会触发自身上的事件（常用于点击事件，即只有点击自己时，才会触发自身上绑定的点击事件）|
|.capture|	把事件的运营模式变成捕获（不常用）|
|.once|	事件只执行一次|
|.passive|	提升事件性能，常用于滚动事件 scroll（不常用）|

## 5、样式相关
|名称|描述|
|-|-|
|:class|	v-bind:class 的简写形式，为元素绑定动态类名|
|$attrs|	可以用来获取父组件绑定在子组件身上的属性（Non-Props 属性）|
|:style|	v-bind:style 的简写形式，为元素绑定动态的行内样式|
#

## 6、按键修饰符
|名称|	描述|
|-|-|
|.enter|按键是enter时触发|
|.tab|按键是tab时触发|
|.delete|按键是delete时触发|
|.esc|按键是esc时触发|
|.up|按键是up时触发|
|.down|按键是down时触发|
|.left|按键是left时触发|
|.right|按键是right时触发|

## 7、动态组件
|名称|描述|
|-|-|
|`<component/>` |定义动态组件。具体显示哪个组件，由“:is”属性的值决定|
|`<keep-alive></keep-alive>`|缓存标签。包裹动态组件后，可以保留上一个组件中的内容|

## 8、异步组件
|名称|描述|
|-|-|
|Vue.defineAsyncComponent()	|该方法可以创建异步组件（了解即可）|

## 9、依赖、注入
|名称|描述|
|-|-|
|provide|祖先组件，通过`provide`可以向子孙组件注入依赖|
|inject|孙子组件，通过`inject`可以在可用的注入内容中搜索需要使用的内容|

:::details 示例代码
```js
// 父组件
<script steup>
  import { provide } from 'vue'
  provide('a', 'a-value')
</script>

// 子组件
<script steup>
  import { inject } from 'vue'
  const aValue = inject('a')
</script>
```
:::

