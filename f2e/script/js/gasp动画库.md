# gsap动画库
## 1、简介

## 2、官网
官网： https://greensock.com

codepen： https://codepen.io/collection/AQPByE

## 3、引入方式
可选引入方式： https://greensock.com/docs/v3/Installation#CDN

### 3.1、cdn
```shell

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```
### 3.2、npm
```shell
npm install gsap
```

## 4、基本使用
- duration: 单位为秒

### 4.1、tween（缓动动画）
#### 4.1.1、gsap.from
:::tip
从哪到当前位置动画
:::
```js
gsap.set(divTo.value, { x: 0, rotation: 0 })
// 设置结束位置的 x 值为 100, 360度旋转，持续时间为 1 秒，并使用默认的缓动函数
gsap.from(divTo.value, {rotation: 360, x: -100, duration: 1})
```

#### 4.1.2、gsap.to
:::tip
从当前位置到指定位置动画
:::
```js
// 方式一
gsap.to(document.querySelector('.divTo'), {rotation: 360, x: 100, duration: 1})

// 方式二
gsap.set(divTo.value, { x: 0, rotation: 0 })
// 设置结束位置的 x 值为 100, 360度旋转，持续时间为 1 秒，并使用默认的缓动函数
gsap.to(divTo.value, {rotation: 360, x: 100, duration: 1})
```

#### 4.1.3、gsap.fromTo
:::tip
同时设置动画起始状态和结束状态
:::
```js
gsap.set(divTo.value, { rotation: 0 })
// 设置结束位置的 x 值为 -100, 360度旋转，移动到 100px 的位置，持续时间为 1 秒，并使用默认的缓动函数
gsap.fromTo(divTo.value, { x: -100, duration: 1 }, { rotation: 360, x: 100, duration: 1 })
```

示例：
<div class='divTo' ref="divTo" :style="{width: '100px', height: '100px', background: 'red'}"></div>
<button @click="to" class="btn">to</button>
<button @click="from" class="btn">from</button>
<button @click="fromTo" class="btn">from to</button>

### 4.2、gsap.timeline
#### 4.2.1、通用设置
:::tip
按照时间线节点依次执行动画
:::

```js
<div :style="{ overflow: 'hidden' }">
  <div class="box box1" :style="{background: 'red'}"></div>
  <div class="box box2" :style="{background: 'orange'}"></div>
  <div class="box box3" :style="{background: 'yellow'}"></div>
  <button @click="timeline" class="btn">timeline</button>
</div>

const tl = gsap.timeline();
tl.to(".box1", {duration: 2, x: 100}) //notice that there's no semicolon!
.to(".box2", {duration: 1, y: 200})
.to(".box3", {duration: 3, rotation: 360});
```

示例：
<div :style="{ overflow: 'hidden' }">
  <div class="box box1" :style="{background: 'red'}"></div>
  <div class="box box2" :style="{background: 'orange'}"></div>
  <div class="box box3" :style="{background: 'yellow'}"></div>
  <button @click="timeline" class="btn">timeline</button>
</div>

#### 4.2.2、时间叠加
```js
<div :style="{ overflow: 'hidden' }">
  <div class="box box1" :style="{background: 'red'}"></div>
  <div class="box box2" :style="{background: 'orange'}"></div>
  <div class="box box3" :style="{background: 'yellow'}"></div>
  <button @click="timeline" class="btn">timeline</button>
</div>

const tl = gsap.timeline();
// 从时间线开始的第5秒开始, box12在 box11 结束前3秒执行，box13在box12结束后1秒后执行
tl.to(".box1", { x: 100 } ,  5)
.to(".box2", { y: 200}, "-=3")
.to(".box3", { rotation: 360 }, "+=1");
```

<div :style="{ overflow: 'hidden' }">
  <div class="box box11" :style="{background: 'red'}"></div>
  <div class="box box12" :style="{background: 'orange'}"></div>
  <div class="box box13" :style="{background: 'yellow'}"></div>
  <button @click="timeline2" class="btn">timeline</button>
</div>

#### 4.2.3、时间线标签
```js
<div :style="{ overflow: 'hidden' }">
  <div class="box box21" :style="{background: 'red'}"></div>
  <div class="box box22" :style="{background: 'orange'}"></div>
  <div class="box box23" :style="{background: 'yellow'}"></div>
  <button @click="timeline3" class="btn">timeline</button>
</div>
const tl = gsap.timeline();
tl.to(divLabel.value, {x: 100, duration: 1}); 
tl.addLabel('first');
tl.to(divLabel.value, {y: 100, duration: 1});
tl.seek('first');
```
执行效果
![gsap-lable](/f2e/gsap-lable.png)

示例：
<div :style="{ overflow: 'hidden' }">
  <div class="box box21" :style="{background: 'red'}"></div>
  <div class="box box22" :style="{background: 'orange'}"></div>
  <div class="box box23" :style="{background: 'yellow'}"></div>
  <button @click="timeline3" class="btn">timeline</button>
</div>

#### 4.2.4、ease动画效果
```vue
<div :style="{ display: 'flex' }">
  <div class="box green">linear</div>
  <div class="box purple">bounce</div>
</div>

onMounted(() => {
  // yoyo
  gsap.to('.yoyo div', {
    scale: 0.1,
    y: 60,
    duration: 1,
    repeat: -1,
    yoyo: true, // 悠悠球效果
    delay: 1, 
    // stagger: 0.2 // 交替执行
    stagger: {
      amount: 1, // 总时间
      from: 'center' // 动画起始位置'start'、'center'、'end'
    }
  })
  gsap.to(".green", { 
    rotation: 360,
    duration: 2,
    repeat: -1,
    repeatDelay: 2,
    ease: 'none'
  });
  gsap.to(".purple", { 
    rotation: 360,
    duration: 2,
    repeat: -1,
    repeatDelay: 2,
    ease: 'bounce.out'
  });
})
```
示例：
<div :style="{ display: 'flex' }">
  <div class="box green">linear</div>
  <div class="box purple">bounce</div>
</div>

#### 4.2.5、Staggers交替
```vue
<div class="staggers" :style="{ display: 'flex' }">
  <div class="box" :style="{background: 'red', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'orange', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'yellow', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'green', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'blue', marginRight: '10px'}"></div>
</div>
<button @click="staggerShow" class="btn">stagger show</button>
<button @click="staggerHide" class="btn">stagger hide</button>

const staggerShow = () => {
  gsap.from(".staggers .box", {
    duration: 2,
    scale: 0.5, 
    opacity: 0, 
    delay: 0.5, 
    stagger: 0.2,
    ease: "elastic", 
    force3D: true
  });
}

const staggerHide = () => {
  gsap.to(".staggers .box", {
    duration: 0.5, 
    opacity: 0, 
    y: -100, 
    stagger: 0.1,
    ease: "back.in"
  });
}
```

示例：
<div class="staggers" :style="{ display: 'flex' }">
  <div class="box" :style="{background: 'red', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'orange', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'yellow', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'green', marginRight: '10px'}"></div>
  <div class="box" :style="{background: 'blue', marginRight: '10px'}"></div>
</div>
<button @click="staggerShow" class="btn">stagger show</button>
<button @click="staggerHide" class="btn">stagger hide</button>

#### 4.2.6、timeline执行顺序
```vue
const tl = gsap.timeline();
tl.to(".box1", {duration: 2, x: 100}) // 默认">"
tl.to(".box2", {duration: 1, x: 200}, "<") // 同步执行
tl.to(".box3", {duration: 3, rotation: 360}, "+=1") // 上一个动画结束后1秒后执行
```

### 4.3、ScrollTrigger(滚动触发)
#### 4.3.1、通用设置
:::tip
按照时间线节点依次执行动画
:::

```vue
<div class="ballScroll">
  <div class="box ball">小圆</div>
</div>

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

 ScrollTrigger.create({
  trigger: ".ballScroll",
  start: "top top",
  end: "+=300",
  scrub: true,
  pin: true,
  markers: true,
  animation: gsap.to(".ballScroll .ball", {
    x: 200,
    y: 200,
    rotation: 100
  }),
})
```

示例：
<div class="ballScroll">
  <div class="box ball">小圆</div>
</div>


## 5、示例
### 5.1、yoyo
:::tip
- `scale`: 缩放
- `yoyo`: 像悠悠球一样回环执行动画
- `repeat`: 动画重复次数，`-1`为无限循环
- `stagger`: 交替执行动画, 可为数字或对象
:::

```vue
<div class="yoyo" :style="{ display: 'flex', wrap: 'wrap' }">
  <div class="box" :style="{background: 'red'}"></div>
  <div class="box" :style="{background: 'orange'}"></div>
  <div class="box" :style="{background: 'yellow'}"></div>
  <div class="box" :style="{background: 'blue'}"></div>
  <div class="box" :style="{background: 'pink'}"></div>
  <div class="box" :style="{background: 'skyblue'}"></div>
</div>

<script setup>
onMounted(() => {
  // yoyo
  gsap.to('.yoyo div', {
    scale: 0.1,
    y: 60,
    duration: 1,
    repeat: -1,
    yoyo: true, // 悠悠球效果
    delay: 1, 
    // stagger: 0.2 // 交替执行
    stagger: {
      amount: 1, // 总时间
      from: 'center' // 动画起始位置'start'、'center'、'end'
    }
  })
})
</script>
```

示例：
<div class="yoyo" :style="{ display: 'flex', flexWrap: 'wrap', width: '260px' }">
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
  <div class="box yo"></div>
</div>

### 5.2、对象动画
```vue
<div>{{ obj.myNum }} -- {{ obj.myColor }}</div>
<button @click="objStart" class="btn">start</button>

const obj = reactive({ myNum: 10, myColor: "red" })
gsap.to(obj, {
  myNum: 200,
  myColor: "blue",
  duration: 3,
  onUpdate: () => console.log(obj.myNum, obj.myColor)
});
```
示例：
<div>{{ obj.myNum }} -- {{ obj.myColor }}</div>
<button @click="objStart" class="btn">start</button>

### 5.3、实时绘制
```vue
<canvas ref="canvasRef" id="canvas" width="300" height="300"></canvas>
<button @click="canvasStart" class="btn">canvas start</button>

const canvasStart = () => {
  const ctx = canvasRef.value.getContext("2d");
  ctx.fillStyle = "#28a92b";
  let position = { x: 0, y: 0 };

  function draw() {
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillRect(position.x, position.y, 100, 100);
  }
  gsap.to(position, {
    x: 200,
    y: 200,
    duration: 3,
    onUpdate: draw
  })
}
```
示例：
<canvas ref="canvasRef" id="canvas" width="300" height="300"></canvas>
<button @click="canvasStart" class="btn">canvas start</button>

### 5.4、轨迹移动
https://codepen.io/GreenSock/pen/GRoXzYj

效果：
<iframe height="300" style="width: 100%;" scrolling="no" title="Running Tractor" src="https://codepen.io/GreenSock/embed/GRoXzYj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/GRoXzYj">
  Running Tractor</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 5.5、翻卡效果

https://codepen.io/GreenSock/pen/RwKwLWK

效果:
<iframe height="300" style="width: 100%;" scrolling="no" title="Infinite scrolling, dragging, and snapping cards with GSAP and ScrollTrigger (smooth)" src="https://codepen.io/GreenSock/embed/RwKwLWK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/RwKwLWK">
  Infinite scrolling, dragging, and snapping cards with GSAP and ScrollTrigger (smooth)</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 5.6、字体变形
https://codepen.io/fluxus/pen/ZEWydKK

效果：
<iframe height="300" style="width: 100%;" scrolling="no" title="Morphing letters with GSAP ScrollTrigger and Polymorph.js" src="https://codepen.io/fluxus/embed/ZEWydKK?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/fluxus/pen/ZEWydKK">
  Morphing letters with GSAP ScrollTrigger and Polymorph.js</a> by Mirko Zorić (<a href="https://codepen.io/fluxus">@fluxus</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 5.7、地图轨迹
https://codepen.io/creativeocean/pen/zYrPrgd

效果：
<iframe height="300" style="width: 100%;" scrolling="no" title="Scroll Map (Sunday Bike Route)" src="https://codepen.io/creativeocean/embed/zYrPrgd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/creativeocean/pen/zYrPrgd">
  Scroll Map (Sunday Bike Route)</a> by Tom Miller (<a href="https://codepen.io/creativeocean">@creativeocean</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 5.8、自定义动画
https://codepen.io/isladjan/pen/abdyPBw

效果：
<iframe height="300" style="width: 100%;" scrolling="no" title="Parallax scroll animation" src="https://codepen.io/isladjan/embed/abdyPBw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/isladjan/pen/abdyPBw">
  Parallax scroll animation</a> by isladjan (<a href="https://codepen.io/isladjan">@isladjan</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### 5.9、颜色过渡
https://codepen.io/Mamboleoo/pen/abdwYaJ

效果：
<iframe height="300" style="width: 100%;" scrolling="no" title="Scroll progress &amp; gsap ScrollTrigger" src="https://codepen.io/Mamboleoo/embed/abdwYaJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Mamboleoo/pen/abdwYaJ">
  Scroll progress &amp; gsap ScrollTrigger</a> by Louis Hoebregts (<a href="https://codepen.io/Mamboleoo">@Mamboleoo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ref, onMounted, reactive } from 'vue'
gsap.registerPlugin(ScrollTrigger)

const divTo = ref()
const divLabel = ref()
const canvasRef = ref()
const obj = reactive({ myNum: 10, myColor: "red" })

const to = () => {
  // 方式一
  // gsap.to(document.querySelector('.divTo'), {rotation: 360, x: 100, duration: 1})

  // 方式二
  gsap.set(divTo.value, { x: 0, rotation: 0 })
  // 设置结束位置的 x 值为 100, 360度旋转，持续时间为 1 秒，并使用默认的缓动函数
  gsap.to(divTo.value, {rotation: 360, x: 100, duration: 1})
}

const from = () => {
  gsap.set(divTo.value, { x: 0, rotation: 0 })
  // 设置结束位置的 x 值为 100, 360度旋转，持续时间为 1 秒，并使用默认的缓动函数
  gsap.from(divTo.value, {rotation: 360, x: -100, duration: 1})
}

const fromTo = () => {
  gsap.set(divTo.value, { rotation: 0 })
  // 设置结束位置的 x 值为 -100, 360度旋转，移动到 100px 的位置，持续时间为 1 秒，并使用默认的缓动函数
  gsap.fromTo(divTo.value, { x: -100, duration: 1 }, { rotation: 360, x: 100, duration: 1 })
}

// timeline
const timeline = () => {
  const tl = gsap.timeline();
  tl.to(".box1", {duration: 2, x: 100}) //notice that there's no semicolon!
  .to(".box2", {duration: 1, x: 200})
  .to(".box3", {duration: 3, rotation: 360});
}
const timeline2 = () => {
  const tl = gsap.timeline();
  // 从时间线开始的第5秒开始, box12在 box11 结束前3秒执行，box13在box12结束后1秒后执行
  tl.to(".box11", { x: 100 } , 5)
  .to(".box12", { y: 200}, "-=3")
  .to(".box13", { rotation: 360 }, "+=1");
}
const timeline3 = () => {
  const tl = gsap.timeline();
  tl.to(".box21", {x: 200, duration:1})
  // 上个动画结束1秒后添加标签
  tl.addLabel('first', '+=1')
  // 在标签后执行
  tl.to(".box22", {x: 200, duration: 1}, 'first')
  // 在标签后1秒执行
  tl.to(".box23", {x: 200, duration: 2}, 'first+=1')
}

const objStart = () => {
  gsap.set(obj, { myNum: 10, myColor: "red" })
  gsap.to(obj, {
    myNum: 200,
    myColor: "blue",
    duration: 3,
    onUpdate: () => {
      console.log(obj.myNum, obj.myColor)
    }
  });
}

const canvasStart = () => {
  const ctx = canvasRef.value.getContext("2d");
  ctx.fillStyle = "#28a92b";
  let position = { x: 0, y: 0 };

  function draw() {
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillRect(position.x, position.y, 100, 100);
  }
  gsap.to(position, {
    x: 200,
    y: 200,
    duration: 3,
    onUpdate: draw
  })
}

const staggerShow = () => {
  gsap.from(".staggers .box", {
    duration: 2,
    scale: 0.5, 
    opacity: 0, 
    delay: 0.5, 
    stagger: 0.2,
    ease: "elastic", 
    force3D: true
  });
}

const staggerHide = () => {
  gsap.to(".staggers .box", {
    duration: 0.5, 
    opacity: 0, 
    y: -100, 
    stagger: 0.1,
    ease: "back.in"
  });
}

onMounted(() => {
  // yoyo
  gsap.to('.yoyo div', {
    scale: 0.1, 
    y: 60,
    yoyo: true, 
    repeat: -1, 
    ease: "power1.inOut",
    delay: 1,
    duration: 1,
    stagger: { // 动画起始位置'start'、'center'、'end'
      amount: 0.6, 
      grid: "auto",
      from: "center"
    }
    // stagger: 0.2 // 交替执行
  })
  gsap.to(".green", { 
    rotation: 360,
    duration: 2,
    repeat: -1,
    repeatDelay: 2,
    ease: 'none'
  });
  gsap.to(".purple", { 
    rotation: 360,
    duration: 2,
    repeat: -1,
    repeatDelay: 2,
    ease: 'bounce.out'
  });

  ScrollTrigger.create({
    trigger: ".ballScroll",
    start: "bottom center",
    end: "+=300",
    scrub: true,
    pin: true,
    markers: true,
    animation: gsap.to(".ballScroll .ball", {
      x: 200,
      y: 200,
      rotation: 100
    }),
  })
})

</script>

<style lang="scss" scoped>
  .btn {
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
  }
  .box {
    width: 50px;
    height: 50px;
  }
  #canvas {
    height: 80vh;
    max-height: 300px;
    overflow: visible;
    border: solid 2px skyblue;
  }
  .green {
    width: 60px;
    height: 60px;
    background: green;
    border-radius: 6px;
  }
  .purple {
    width: 60px;
    height: 60px;
    background: purple;
    border-radius: 6px;
    margin-left: 20px;
  }
  .yo {
    background: red;
    width: 60px;
    height: 60px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .ballScroll {
    background-color: skyblue;
    width: 100%;
    height: 300px;
    .ball {
      background-color: red;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>