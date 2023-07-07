# transition 过渡动画与 animation 自定义动画

:::tip
`transition`过渡动画、`animation`自定义动画在实际开发中是非常重要的，对于交互体验的提升都有很大的帮助。
:::

## 1、transition 过渡动画
### 1.1、如何理解过渡动画 ？
一个元素由`A状态`经过一段时间变化成`B状态`，我们只需要定义其开始和结束的状态，而他的中间的状态会自己添加“补间动画”。

### 1.2、过渡动画何时发生？
1. 当属性值发生变化时，才会触发`transition`动画

### 1.3、基本语法
**语法**
```js
// 简写写法
// transition: css属性名  过渡时间   时间函数  延迟时间
transition: transition-property transition-duration [transition-timing-function]
  [transition-delay];

// 完整写法
transition-property: transition-property, transition-property, transition-property;
transition-duration: transition-duration, transition-duration, transition-duration;
transition-timing-function: transition-timing-function;
transition-delay: transition-delay, transition-delay, transition-delay;
```
**属性**
|属性	|描述|
|-|-|
|transition-property|指定 CSS 属性的 name，哪些属性要过渡|
|transition-duration|transition 效果需要指定多少秒或毫秒才能完成，动画时间|
|transition-timing-function|指定 transition 效果的转速曲线，变化曲线|
|transition-delay|定义 transition 效果开始的时候（延迟时间）|

**用法**
```js
// 完整写法
transition: width 1s linear 0s;
// 常规写法
transition: width 1s linear;
```

**示例1**
<div class="box"></div>

:::details 示例代码
  ```ts
  <div class="box"></div>
  <style scoped>
    .box {
      width: 100px;
      height: 100px;
      background-color: red;
      transition: border-radius 1s ease;
    }
    .box:hover {
      border-radius: 50%;
    }
  </style>
  ```
:::

**示例2**
<div class="tbox"></div>

:::details 示例代码
  ```ts
  <div class="tbox"></div>
  <style scoped>
    .tbox {
      width: 100px;
      height: 100px;
      background-color: red;
      transition-property: width, height, opacity;
      transition-duration: 1s, 2s, 1s;
      transition-timing-function: ease-in;
      transition-delay: 0s, 1s, 2s;
    }
    .tbox:hover {
      width: 200px;
      height: 200px;
      opacity: 0.5;
    }
  </style>
  ```

### 1.4、过渡属性

:::tip
**可参于过渡的属性**

1. 所有数值类型的属性，都可以参与过渡<br />
比如：width、height、left、top、border-radius、font-size、opacity
2. 背景颜色和文字都可以被过渡
3. 所有的变形（包括 2D 和 3D）都能被过渡，在 CSS 中 90%的属性都可以被过渡

**不能参与过渡动画的属性**

float 和 position 不能
display 无法过渡
font-family 等
:::

### 1.5、all过渡属性
:::tip
1. 需要所有属性参与过渡，即定义为 all
2. all 属性不要随意使用，会引发效率问题，如果只需要某一个属性过渡，还是要指定特定的属性
:::
**用法**
```js
// 完整写法
transition: all 1s linear 0s;
// 常规写法
transition: all 1s linear;
```
### 1.6、多个过渡动画
**语法**
```js
transition: 属性 过渡时间 时间函数 延迟时间, 属性 过渡时间 时间函数 延迟时间,
  属性 过渡时间 时间函数 延迟时间;
```
**用法**
```js
transition: width 1s linear 0s, height 1s linear 0s;
```
**示例**
<div class="mbox"></div>

:::details 示例代码
  ```ts
  <div class="mbox"></div>
  <style scoped>
    .mbox {
      width: 100px;
      height: 100px;
      background-color: red;
      transition: width 1s linear, height 1s linear, opacity 1s linear 1s;
    }
    .mbox:hover {
      width: 200px;
      height: 200px;
      opacity: 0.5;
    }
  </style>
  ```
:::

### 1.7、时间函数
:::tip
时间函数（transition-timing-function），管理着动画在单位帧内播放的速度曲线
:::

**预设值**
|值	|描述|
|-|-|
|linear	|规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。|
|ease	|规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。|
|ease-in|	规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。|
|ease-out|	规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。|
|ease-in-out|	规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。|
|cubic-bezier(n,n,n,n)|	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。|

## 2、animation 自定义动画
:::tip 自定义动画的步骤
- 第一步是：定义动画
- 第二步是：调用动画
:::

### 2.1、定义动画
:::tip @keyframes关键帧动画

1. 动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。
2. 在动画过程中，您可以多次更改 CSS 样式的设定。
3. 动画执行各阶段时间，可以通过百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"。
4. from 和 to 等价于 0% 和 100%。from 和 0% 是动画的开始时间，to 和 100% 动画的结束时间。
:::

**语法**
```js
@keyframes  动画名 {
  // 起始状态
  from {  样式   }
  // 结束状态
  to {  样式  }
}
或
@keyframes  动画名 {
  // 起始状态
	0% {  样式   }
	// 结束状态
	100% {  样式  }
}
```

### 2.2、调用动画
**语法**
```js
animation: 动画名 动画完成时间 时间函数 延迟时间 播放次数 是否返向播放
  动画不播放或完成时的状态 动画是否正在运行或已暂停;
```

**属性**
|属性|说明|属性值|
|-|-|-|
|animation-name|	指定应用的一系列动画名，即@keyframes 定义的动画名	|none 表示不调用动画<br/>动画名：由大小写敏感的字母 a-z、数字 0-9、下划线 (_) 和/或横线 (-) 组成。不能以数字开头|
|animation-duration|	指定动画周期时长，需要多少秒或毫秒完成	|默认值为 0s，表示无动画。时长单位为秒（s)或者毫秒（ms）<br />如: 1s ，2s|
|animation-timing-function |	设置动画将如何完成一个周期|	linear（直线匀速）<br />ease（慢-快-慢）<br />ease-in（慢-快）<br />ease-out（快-慢）<br />ease-in-out（慢-快-慢）<br />贝塞尔函数表示 cubic-bezier(0.84,-0.21, 1,-0.15)<br />steps(n,start|end)|
|animation-delay|	设置动画在启动前的延迟间隔时间|	默认值为 0s,表示立即执行,时长单位为秒（s)或者毫秒（ms）<br />如: 1s ，2s|
|animation-iteration-count|	定义动画的播放次数。|n：一个数字，动画播放次数, infinite：无限次播放|
|animation-direction|	指定是否应该轮流反向播放动画。|normal： 默认值。动画正常播放<br />reverse :动画反向播放，动画按步后退的效果<br />alternate： 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。<br />alternate-reverse : 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。|
|animation-fill-mode	|规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。|	none: 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。<br />forwards: 在动画结束后，动画将停止在最后结束的状态 <br />backwards:both : 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性|
|animation-play-state|	指定动画是否正在运行或已暂停。	|paused 暂停动画 running 正在运行动画|

**示例**
<div class="anim"></div>

:::details 示例代码
```js
<div class="anim"></div>
<style scoped>
@keyframes anim {
  from {
    width: 200px;
    height: 200px;
  }
  to {
    width: 100px;
    height: 100px;
  }
}
.anim {
  width: 50px;
  height: 50px;
  background-color: red;
}
.anim:hover {
  animation: anim 5s linear infinite;
}
</style>
```
:::

### 2.3、多关键帧动画
<div class="mContainer">
  <div class="mAnim"></div>
</div>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: border-radius 1s ease;
}
.box:hover {
  border-radius: 50%;
}
.mbox {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: width 1s linear, height 1s linear, opacity 1s linear 1s;
}
.mbox:hover {
  width: 200px;
  height: 200px;
  opacity: 0.5;
}
.tbox {
  width: 100px;
  height: 100px;
  background-color: red;
  transition-property: width, height, opacity;
  transition-duration: 1s, 2s, 1s;
  transition-timing-function: ease-in;
  transition-delay: 0s, 1s, 2s;
}
.tbox:hover {
  width: 200px;
  height: 200px;
  opacity: 0.5;
}

@keyframes anim {
  from {
    width: 200px;
    height: 200px;
  }
  to {
    width: 100px;
    height: 100px;
  }
}
.anim {
  width: 50px;
  height: 50px;
  background-color: red;
}
.anim:hover {
  animation: anim 5s linear infinite;
}

.mContainer {
  position: relative;
  height: 200px;
}
.mAnim {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  position: absolute;
  animation: mAnim 4s ease 0s infinite;
}
@keyframes mAnim {
  0% {
    top: 0;
    left: 0;
    background-color: red;
  }
  25% {
    top: 0;
    left: 100px;
    background-color: blue;
  }
  50% {
    top: 100px;
    left: 100px;
    background-color: green;
  }
  75% {
    top: 100px;
    left: 0;
    background-color: yellow;
  }
  100% {
    top: 0;
    left: 0;
    background-color: red;
  }
}
</style>