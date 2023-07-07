> 如果我们想设置1px高度的line，我们可以有不同的方式实现。但是不同的方式在不同的浏览器上，可能会效果不一样。

## 1、height
:::tip height 
  在`Edge`上展示了line高度为1px、0.75px、0.5px和0.25px，是我们期望的效果
:::
<div class="row">
  height: 1px
  <div class="line height1px" />
</div>
<div class="row">
  height: 0.75px
  <div class="line heightP75px" />
</div>
<div class="row">
  height: 0.5px
  <div class="line heightP5px" />
</div>
<div class="row">
  height: 0.5px
  <div class="line heightP25px" />
</div>

:::details 示例代码
```ts
<div class="row">
  height: 1px
  <div class="line height1px" />
</div>
<div class="row">
  height: 0.75px
  <div class="line heightP75px" />
</div>
<div class="row">
  height: 0.5px
  <div class="line heightP5px" />
</div>
<div class="row">
  height: 0.5px
  <div class="line heightP25px" />
</div>

<style scoped>
.row {
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
}
.line {
  /* width: 100%; */
  flex: 1 1 auto;
}
.height1px {
  height: 1px;
  background-color: red;
}
.heightP75px {
  height: .75px;
  background-color: blue;
}
.heightP5px {
  height: .5px;
  background-color: green;
}
.heightP25px {
  height: .25px;
  background-color: skyblue;
}
</style>
```
:::

## 2、border
:::tip height 
  在`Edge`上展示了line高度都为`1px`不是我们期望的效果
:::
<div class="row">
  borderBottom: 1px
  <div class="line border1px" />
</div>
<div class="row">
  borderBottom: 0.75px
  <div class="line borderP75px" />
</div>
<div class="row">
  borderBottom: 0.5px
  <div class="line borderP5px" />
</div>
<div class="row">
  borderBottom: 0.5px
  <div class="line borderP25px" />
</div>

:::details 示例代码
```ts
<div class="row">
  borderBottom: 1px
  <div class="line border1px" />
</div>
<div class="row">
  borderBottom: 0.75px
  <div class="line borderP75px" />
</div>
<div class="row">
  borderBottom: 0.5px
  <div class="line borderP5px" />
</div>
<div class="row">
  borderBottom: 0.5px
  <div class="line borderP25px" />
</div>

<style scoped>
.row {
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
}
.line {
  /* width: 100%; */
  flex: 1 1 auto;
}
.border1px {
  border-bottom: 1px solid red;
}
.borderP75px {
  border-bottom: .75px solid blue;
}
.borderP5px {
  border-bottom: .5px solid green;
}
.borderP25px {
  border-bottom: .25px solid skyblue;
}
</style>
```
:::

## 3、伪类实现物理像素1px
:::tip 伪类
  在不同设备分辨率的设备上通过`dpr`调整始终展示1个物理像素, 符合始终1像素要求
:::
<div class="row">
  <div class="before1px">before1px: 1px</div>
</div>

:::details 示例代码
```ts
<div class="row">
  <div class="before1px">before1px: 1px</div>
</div>

<style>
.before1px::before {
  display: block;
  content: "";
  position: absolute;
  bottom: 10px;
  left: 15%;
  background-color: red;
  height: 1px;
  width: 85%;
}
/* dpr =2 */
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .before1px::before {
    transform: scaleY(0.5);
  }
}
/* dpr =2 */
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .before1px::before {
    transform: scaleY(0.33);
  }
}
</style>
```
:::

<style scoped>
.row {
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
}
.line {
  /* width: 100%; */
  flex: 1 1 auto;
}
.height1px {
  height: 1px;
  background-color: red;
}
.heightP75px {
  height: .75px;
  background-color: blue;
}
.heightP5px {
  height: .5px;
  background-color: green;
}
.heightP25px {
  height: .25px;
  background-color: skyblue;
}
.border1px {
  border-bottom: 1px solid red;
}
.borderP75px {
  border-bottom: .75px solid blue;
}
.borderP5px {
  border-bottom: .5px solid green;
}
.borderP25px {
  border-bottom: .25px solid skyblue;
}
.before1px::before {
  display: block;
  content: "";
  position: absolute;
  bottom: 10px;
  left: 15%;
  background-color: red;
  height: 1px;
  width: 85%;
}
/* dpr =2 */
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .before1px::before {
    transform: scaleY(0.5);
  }
}
/* dpr =2 */
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .before1px::before {
    transform: scaleY(0.33);
  }
}
</style>