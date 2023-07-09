# 1、media媒体查询

`CSS Media`是一种CSS特性，用于根据设备的属性和特征来应用不同的`样式和布局`。通过使用CSS Media`查询，开发者可以根据设备的屏幕尺寸、分辨率、方向等条件，为不同的设备提供适当的样式。

`CSS Media`查询基于媒体类型（如屏幕、打印机）和媒体特性（如宽度、高度），可以对不同的媒体类型指定不同的样式规则。例如，通过使用`@media`规则，可以在不同的屏幕尺寸上应用不同的样式，以实现响应式设计。

## 2、媒体类型查询
```css
@media screen {
  /* 在屏幕上应用的样式 */
}

@media print {
  /* 在打印时应用的样式 */
}
```

## 3、媒体特性查询
```css
@media (max-width: 768px) {
  /* 当视口宽度小于等于768像素时应用的样式 */
}

@media (orientation: landscape) {
  /* 在横向方向上应用的样式 */
}

@media (min-resolution: 300dpi) {
  /* 当设备分辨率大于等于300dpi时应用的样式 */
}

@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  /* 在设备像素比为2或分辨率大于等于192dpi时应用的样式 */
}
```

## 4、示例
### 4.1、flex响应式布局
:::tip
使用flex布局实现响应式布局
:::

<div class="container">
  <div class="row">
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
  </div>
  <div class="row">
    <div class="box col-xlg-6 col-md-12"></div>
    <div class="box col-xlg-6 col-md-12"></div>
  </div>
</div>

<style scoped>
.container .box {
  border: 2px solid red;
  height: 100px;
}
.container .row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
@media screen and (max-width: 1902px) {
  .col-xlg-1 {
    width: 8.333333%;
  }
  .col-xlg-2 {
    width: 16.666667%;
  }
  .col-xlg-3 {
    width: 25%;
  }
  .col-xlg-4 {
    width: 33.333333%;
  }
  .col-xlg-5 {
    width: 41.666667%;
  }
  .col-xlg-6 {
    width: 50%;
  }
  .col-xlg-7 {
    width: 58.333333%;
  }
  .col-xlg-8 {
    width: 66.666667%;
  }
  .col-xlg-9 {
    width: 75%;
  }
  .col-xlg-10 {
    width: 83.333333%;
  }
  .col-xlg-11 {
    width: 91.666667%;
  }
  .col-xlg-12 {
    width: 100%;
  }
}
@media screen and (max-width: 1200px) {
  .col-lg-1 {
    width: 8.333333%;
  }
  .col-lg-2 {
    width: 16.666667%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-4 {
    width: 33.333333%;
  }
  .col-lg-5 {
    width: 41.666667%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-7 {
    width: 58.333333%;
  }
  .col-lg-8 {
    width: 66.666667%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-10 {
    width: 83.333333%;
  }
  .col-lg-11 {
    width: 91.666667%;
  }
  .col-lg-12 {
    width: 100%;
  }
}
@media screen and (max-width: 992px) {
  .col-md-1 {
    width: 8.333333%;
  }
  .col-md-2 {
    width: 16.666667%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-4 {
    width: 33.333333%;
  }
  .col-md-5 {
    width: 41.666667%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-7 {
    width: 58.333333%;
  }
  .col-md-8 {
    width: 66.666667%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-10 {
    width: 83.333333%;
  }
  .col-md-11 {
    width: 91.666667%;
  }
  .col-md-12 {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .col-sm-1 {
    width: 8.333333%;
  }
  .col-sm-2 {
    width: 16.666667%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-4 {
    width: 33.333333%;
  }
  .col-sm-5 {
    width: 41.666667%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-7 {
    width: 58.333333%;
  }
  .col-sm-8 {
    width: 66.666667%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-10 {
    width: 83.333333%;
  }
  .col-sm-11 {
    width: 91.666667%;
  }
  .col-sm-12 {
    width: 100%;
  }
}
</style>

:::details 示例代码
```js

<div class="container">
  <div class="row">
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
    <div class="box col-xlg-3 col-md-6 col-sm-12"></div>
  </div>
  <div class="row">
    <div class="box col-xlg-6 col-md-12"></div>
    <div class="box col-xlg-6 col-md-12"></div>
  </div>
</div>

<style scoped>
.container .box {
  border: 2px solid red;
  height: 100px;
}
.container .row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
@media screen and (max-width: 1902px) {
  .col-xlg-1 {
    width: 8.333333%;
  }
  .col-xlg-2 {
    width: 16.666667%;
  }
  .col-xlg-3 {
    width: 25%;
  }
  .col-xlg-4 {
    width: 33.333333%;
  }
  .col-xlg-5 {
    width: 41.666667%;
  }
  .col-xlg-6 {
    width: 50%;
  }
  .col-xlg-7 {
    width: 58.333333%;
  }
  .col-xlg-8 {
    width: 66.666667%;
  }
  .col-xlg-9 {
    width: 75%;
  }
  .col-xlg-10 {
    width: 83.333333%;
  }
  .col-xlg-11 {
    width: 91.666667%;
  }
  .col-xlg-12 {
    width: 100%;
  }
}
@media screen and (max-width: 1200px) {
  .col-lg-1 {
    width: 8.333333%;
  }
  .col-lg-2 {
    width: 16.666667%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-4 {
    width: 33.333333%;
  }
  .col-lg-5 {
    width: 41.666667%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-7 {
    width: 58.333333%;
  }
  .col-lg-8 {
    width: 66.666667%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-10 {
    width: 83.333333%;
  }
  .col-lg-11 {
    width: 91.666667%;
  }
  .col-lg-12 {
    width: 100%;
  }
}
@media screen and (max-width: 992px) {
  .col-md-1 {
    width: 8.333333%;
  }
  .col-md-2 {
    width: 16.666667%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-4 {
    width: 33.333333%;
  }
  .col-md-5 {
    width: 41.666667%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-7 {
    width: 58.333333%;
  }
  .col-md-8 {
    width: 66.666667%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-10 {
    width: 83.333333%;
  }
  .col-md-11 {
    width: 91.666667%;
  }
  .col-md-12 {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .col-sm-1 {
    width: 8.333333%;
  }
  .col-sm-2 {
    width: 16.666667%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-4 {
    width: 33.333333%;
  }
  .col-sm-5 {
    width: 41.666667%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-7 {
    width: 58.333333%;
  }
  .col-sm-8 {
    width: 66.666667%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-10 {
    width: 83.333333%;
  }
  .col-sm-11 {
    width: 91.666667%;
  }
  .col-sm-12 {
    width: 100%;
  }
}
</style>
```
:::

### 4.2、grid响应式布局
:::tip
使用grid布局实现响应式布局
:::

<div class="gContainer">
  <div class="row">
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
  </div>
  <div class="row">
    <div class="box g-col-xlg-6 g-col-md-12"></div>
    <div class="box g-col-xlg-6 g-col-md-12"></div>
  </div>
</div>

<style scoped>
.gContainer .box {
  border: 2px solid red;
  height: 100px;
}
.gContainer .row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  box-sizing: border-box;
}
@media screen and (max-width: 1902px) {
  .g-col-xlg-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-xlg-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-xlg-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-xlg-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-xlg-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-xlg-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-xlg-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-xlg-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-xlg-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-xlg-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-xlg-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-xlg-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
@media screen and (max-width: 1200px) {
  .g-col-lg-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-lg-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-lg-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-lg-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-lg-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-lg-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-lg-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-lg-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-lg-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-lg-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-lg-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-lg-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
@media screen and (max-width: 992px) {
  .g-col-md-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-md-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-md-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-md-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-md-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-md-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-md-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-md-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-md-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-md-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-md-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-md-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
@media screen and (max-width: 768px) {
  .g-col-sm-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-sm-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-sm-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-sm-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-sm-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-sm-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-sm-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-sm-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-sm-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-sm-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-sm-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-sm-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
</style>

:::details 示例代码
```js
<div class="gContainer">
  <div class="row">
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
    <div class="box g-col-xlg-3 g-col-md-6 col-sm-12"></div>
  </div>
  <div class="row">
    <div class="box g-col-xlg-6 g-col-md-12"></div>
    <div class="box g-col-xlg-6 g-col-md-12"></div>
  </div>
</div>

<style scoped>
.gContainer .box {
  border: 2px solid red;
  height: 100px;
}
.gContainer .row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  box-sizing: border-box;
}
@media screen and (max-width: 1902px) {
  .g-col-xlg-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-xlg-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-xlg-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-xlg-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-xlg-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-xlg-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-xlg-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-xlg-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-xlg-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-xlg-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-xlg-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-xlg-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
@media screen and (max-width: 1200px) {
  .g-col-lg-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-lg-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-lg-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-lg-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-lg-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-lg-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-lg-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-lg-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-lg-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-lg-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-lg-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-lg-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
@media screen and (max-width: 992px) {
  .g-col-md-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-md-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-md-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-md-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-md-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-md-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-md-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-md-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-md-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-md-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-md-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-md-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
@media screen and (max-width: 768px) {
  .g-col-sm-1 {
    grid-area: auto/auto/auto/span 1;
  }
  .g-col-sm-2 {
    grid-area: auto/auto/auto/span 2;
  }
  .g-col-sm-3 {
    grid-area: auto/auto/auto/span 3;
  }
  .g-col-sm-4 {
    grid-area: auto/auto/auto/span 4;
  }
  .g-col-sm-5 {
    grid-area: auto/auto/auto/span 5;
  }
  .g-col-sm-6 {
    grid-area: auto/auto/auto/span 6;
  }
  .g-col-sm-7 {
    grid-area: auto/auto/auto/span 7;
  }
  .g-col-sm-8 {
    grid-area: auto/auto/auto/span 8;
  }
  .g-col-sm-9 {
    grid-area: auto/auto/auto/span 9;
  }
  .g-col-sm-10 {
    grid-area: auto/auto/auto/span 10;
  }
  .g-col-sm-11 {
    grid-area: auto/auto/auto/span 11;
  }
  .g-col-sm-12 {
    grid-area: auto/auto/auto/span 12;
  }
}
</style>
```
:::
