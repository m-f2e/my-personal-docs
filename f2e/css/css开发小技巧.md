
# CSS开发小技巧

## 1、文字展示
### 1.1、单行展示

```html
<div class="line1">很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本</div>

.line1 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

示例：
<div class="line1">很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本</div>


### 1.2、展示两行

```html
<div class="line2">很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本</div>

.line2 {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

示例：
<div class="line2">很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本很长的文本</div>

###  1.3、超出展示按钮
#### 1.3.1、vue-clamp
https://vue-clamp.vercel.app/?lang=zh

#### 1.3.2、css实现(高度固定)

```html
<div class="mul">
  <button class="btn">展开</button>
浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
</div>

.mul {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mul::before {
  content: "";
  float: right;
  width: 0px;
  height: 50px;
  background-color: red;
}
.btn {
  float: right;
  background-color: green;
  clear: both;
}
```

示例：
<div class="mul">
  <button class="btn">展开</button>
浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
</div>
<br/>

#### 1.3.3、css实现（动态计算）
```html
<div class="wrapper">
  <input id="exp1" class="exp" type="checkbox">
  <div class="text">
    <label class="btn" for="exp1"></label>
    浮动元素是如何定位的
正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。
  </div>
</div>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  margin: 10px auto;
  /* width: 680px; */
  overflow: hidden;
  border-radius: 8px;
  padding: 15px ;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  .text {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    position: relative;
    line-height: 1.5;
    /* max-height: 4.5em; */
    transition: .3s max-height;
  }
  [line-clamp="1"] {
    max-height: 1.5em;
  }
  [line-clamp="2"] {
    max-height: 3em;
  }
  [line-clamp="3"] {
    max-height: 4.5em;
  }
  .text::before {
    content: '';
    height: calc(100% - 24px);
    float: right;
  }
  .btn{
    position: relative;
    float: right;
    clear: both;
    margin-left: 20px;
    font-size: 14px;
    padding: 0 8px;
    background: #3F51B5;
    line-height: 24px;
    border-radius: 4px;
    color:  #fff;
    cursor: pointer;
  }
  .btn::before{
    content: '...';
    position: absolute;
    left: -5px;
    color: #333;
    transform: translateX(-100%)
  }
  .btn::after{
    content:'展开';
  }
  .exp{
    display: none;
  }
  .exp:checked+.text{
    max-height: none;
  }
  .exp:checked+.text::after{
    visibility: hidden;
  }
  .exp:checked+.text .btn {
    margin-left: 0px;
  }
  .exp:checked+.text .btn::before{
    visibility: hidden;
  }
  .exp:checked+.text .btn::after{
    content:'收起'
  }
}
</style>
```
链接地址：https://codepen.io/xboxyan/pen/LYWpWzK

示例：
<div class="wrapper">
  <input id="exp1" class="exp" type="checkbox">
  <div class="text" line-clamp="3">
    <label class="btn" for="exp1"></label>
    浮动元素是如何定位的
正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。
   <div :style="{width: '44px'}"></div>
  </div>
</div>

## 2、绘制三角形
### 2.1、上三角
```html
<div class="triangle"></div>

<style lang="scss" scoped>
.triangle {
  background-color: #1B1C33;
  height: 40px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 12px;
    width: 0;
    height: 0;
    opacity: 0.9;
    border-bottom: 6px solid #1B1C33;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
</style>
```
示例：
<div class="triangle"></div>

### 2.2、下三角
```html
<div class="triangle2"></div>

<style lang="scss" scoped>
.triangle2 {
  background-color: #1B1C33;
  height: 40px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 12px;
    width: 0;
    height: 0;
    opacity: 0.9;
    border-top: 6px solid #1B1C33;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
</style>
```
示例：
<div class="triangle2"></div>

### 2.3、右三角
```html
<div class="triangle3"></div>

<style lang="scss" scoped>
.triangle3 {
  background-color: #1B1C33;
  height: 40px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 12px;
    width: 0;
    height: 0;
    opacity: 0.9;
    border-top: 6px solid #1B1C33;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
</style>
```
示例：
<div class="triangle3"></div>

### 2.4、等腰梯形
```html
<div class="triangle4"></div>

.trapezoid {
  position: relative;
  padding-bottom: 1px;
  &::after {
    content: '';
    height: 0;
    width: 80px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 40px solid #1B1C33;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    position: absolute;
    top: 0;
  }
}
```
示例：
<div class="trapezoid"></div>

### 2.5、扇形
```html
<div class="theFan"></div>

.theFan {
  position: relative;
  padding-bottom: 50px;
  margin-bottom: 60px;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 10px;
    border:100px solid;
    border-radius: 100%;
    border-color: #1B1C33 transparent transparent transparent;
    width: 0;
  }
}
```
示例：
<div class="theFan"></div>

## 3、绘制箭头
### 3.1、上箭头
```html
<div class="arrowUp"></div>
<div class="arrowUp2"></div>

.arrowUp {
  width: 0;
  height: 0; 
  border-top:  50px solid transparent;
  border-right:  50px solid transparent;
  /*参数1：x轴偏移量， 参数2:y轴偏移量， 参数3：颜色*/
  box-shadow: 5px 5px red; 
  /*调整角度*/
  transform: rotate(-135deg); 
}
.arrowUp2 {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: solid red;
  border-width: 0 5px 5px 0;
  transform: rotate(-135deg); 
}
```
示例：
<div class="arrowUp"></div>
<div class="arrowUp2"></div>

### 3.2、下箭头
:::tip
直接调整`transform: rotate(45deg); `
:::

<script lang="ts" setup>
  import { ref } from 'vue'
  const showMoreLine = ref(false)
</script>

<style lang="scss" scoped>
.theFan {
  position: relative;
  padding-bottom: 50px;
  margin-bottom: 60px;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 10px;
    border:100px solid;
    border-radius: 100%;
    border-color: #1B1C33 transparent transparent transparent;
    width: 0;
  }
}
.trapezoid {
  position: relative;
  padding-bottom: 1px;
  margin-bottom: 40px;
  &::after {
    content: '';
    height: 0;
    width: 80px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 40px solid #1B1C33;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.arrowUp {
  width: 0;
  height: 0; 
  border-top:  50px solid transparent;
  border-right:  50px solid transparent;
  /*参数1：x轴偏移量， 参数2:y轴偏移量， 参数3：颜色*/
  box-shadow: 5px 5px red; 
  /*调整角度*/
  transform: rotate(-135deg); 
}
.arrowUp2 {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: solid red;
  border-width: 0 5px 5px 0;
  transform: rotate(-135deg); 
}
.triangle {
  background-color: #1B1C33;
  height: 40px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 12px;
    width: 0;
    height: 0;
    opacity: 0.9;
    border-bottom: 6px solid #1B1C33;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
.triangle2 {
  background-color: #1B1C33;
  height: 40px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 12px;
    width: 0;
    height: 0;
    opacity: 0.9;
    border-top: 6px solid #1B1C33;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
.triangle3 {
  background-color: #1B1C33;
  height: 40px;
  width: 200px;
  position: relative;
  border-radius: 8px;
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 12px;
    width: 0;
    height: 0;
    opacity: 0.9;
    border-left: 6px solid #1B1C33;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
}
.line1 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.line2 {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mul {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mul::before {
  content: "";
  float: right;
  width: 0px;
  height: 50px;
  background-color: red;
}
.btn {
  float: right;
  background-color: green;
  clear: both;
}
.wrapper {
  display: flex;
  margin: 10px auto;
  /* width: 680px; */
  overflow: hidden;
  border-radius: 8px;
  padding: 15px ;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  .text {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    position: relative;
    line-height: 1.5;
    /* max-height: 4.5em; */
    transition: .3s max-height;
  }
  [line-clamp="1"] {
    max-height: 1.5em;
  }
  [line-clamp="2"] {
    max-height: 3em;
  }
  [line-clamp="3"] {
    max-height: 4.5em;
  }
  .text::before {
    content: '';
    height: calc(100% - 24px);
    float: right;
  }
  .btn{
    position: relative;
    float: right;
    clear: both;
    margin-left: 20px;
    font-size: 14px;
    padding: 0 8px;
    background: #3F51B5;
    line-height: 24px;
    border-radius: 4px;
    color:  #fff;
    cursor: pointer;
  }
  .btn::before{
    content: '...';
    position: absolute;
    left: -5px;
    color: #333;
    transform: translateX(-100%)
  }
  .btn::after{
    content:'展开';
  }
  .exp{
    display: none;
  }
  .exp:checked+.text{
    max-height: none;
  }
  .exp:checked+.text::after{
    visibility: hidden;
  }
  .exp:checked+.text .btn {
    margin-left: 0px;
  }
  .exp:checked+.text .btn::before{
    visibility: hidden;
  }
  .exp:checked+.text .btn::after{
    content:'收起'
  }
}
</style>


## 4、绝对居中
```css
.center-button {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 5、图片
### 5.1、base64转文件
```js
base64ToFile(base64Data, filename = 'file') {
  const arr = base64Data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split('/')[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}
```
### 5.2、base64转blob
```js
  dataURLToBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
```