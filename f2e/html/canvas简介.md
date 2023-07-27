# Canvas简介

## 1、简介
`Canvas`是HTML5提供的一种新标签，可以用JS控制每一个像素在上面绘画。
`Canvas标签`使用JavaScript在网页上绘制图像，本身不具备绘图功能。
`Canvas`拥有多种绘制路径、矩形、圆形、字符以及图像的功能，可以实现动画效果，也可以进行实时视频的处理和渲染工作。

## 2、API
### 2.1、ctx.drawImage(canvas绘制图像)
canvas的drawImage()是提供了更多的在canvas上绘制图像的方法，使用drawImage()方法可以在画布上绘制图像，其他画布的内容，视频的某一帧的图像等，也可以裁剪画其中的一部分。

语法：
> drawImage(image，sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)；

参数：
```js
1. image: image是画布绘制的图像源，绘制到画布上的元素，可以是`canvasElement`,`imageElement`,`svgImageElement` ,`videoElement`等一系列具有图像的元素。
2. sx：绘制裁剪的图像源的x 坐标位置；
3. sy：绘制裁剪的图像源的y坐标位置；
4. sWidth：绘制裁剪的图像源的宽度；
5. sHeight：绘制裁剪的图像源的高度；
6. dx：目标源在canvas画布上绘制的左上角的x坐标；
7. dy：目标源在canvas画布上绘制的左上角的y坐标；
8. dWidth：目标源在canvas画布上绘制的宽度，会自动根据图像源截取的宽度对比做缩放；
9. dWidth：目标源在canvas画布上绘制的高度，会自动根据图像源截取的高度对比做缩放；
```

### 2.2、canvas.toBlob(图片转二进制)
可以将canvas画布中的图片进行指定质量的压缩，并转化成Blob对象返回给回调函数

语法：
> canvas.toBlob(callback, type, quality);

参数：
```js
1. callback: 回调函数，返回处理后的Blob
2. type: 图片类型,默认格式为'image/png'
3. quality: 图片压缩的质量（0-1)
```

## 3、使用场景
### 3.1、图片压缩
:::tip
利用canvas可以在前端实现对图片的压缩
:::

```vue
<div>
  <input type="file" @change="fileChange" />
  <img ref="imgRef" :src="base64Url" alt="" />
</div>
```

```js
<script setup>
import { ref } from 'vue'

const base64Url = ref()
const imgRef = ref()

const fileChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    base64Url.value = reader.result
    setTimeout(() => {
      // drawImage 
      const canvas = document.createElement('canvas')
      canvas.width = imgRef.value.width
      canvas.height = imgRef.value.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgRef.value, 0, 0, canvas.width, canvas.height)
      // toBlob
      canvas.toBlob((blob) => {
        // blob二进制流处理
      }, 'image/jpeg', 0.6)
    })
  }
}
</script>
```

示例：
<div>
  <input type="file" @change="fileChange" />
  <img ref="imgRef" :src="base64Url" alt="" />
  <p>
    <span>压缩前文件大小:{{imgZipInfo.originSize}}</span> | 
    <span>压缩后文件大小:{{imgZipInfo.zipSize}}</span>
  </p>
</div>

### 3.2、图片裁剪
:::tip
利用canvas可以在前端实现对图片的裁剪
:::

示例：
<div>
  <input type="file" @change="fileTailorChange" />
  <img ref="imgTailorRef" alt="" />
  <canvas ref="canvasRef" width="200" height="200" :style="{ border: '1px solid skyblue', marginTop: '10px' }" />
</div>

### 3.3、页面截图
:::tip
- 利用canvas可以将前端页面或者dom元素保存为图片
- 如果截图的dom是图片、canvas、video使用ctx.drawImage -> canvas.toBlob -> file-saver
- 对于div、document.body -> html2canvas
:::
```vue
<div>
  <div ref='divRef' :style="{ border: '1px solid #ccc', padding: '10px' }">
    <span>screen shoot</span>
  </div>
  <button :style="{ border: '1px solid #ccc', padding: '5px', marginTop: '10px' }" @click="screenShoot">截图保存</button>
</div>
```
```js
<script setup>
import { ref, reactive } from 'vue'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'

// 截图保存
const divRef = ref()

// 截图保存
const screenShoot = () => {
  html2canvas(divRef.value).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, 'screenShoot.png');
    }, 'image/png')
  })
}
</script>
```

示例：
<div>
  <div ref='divRef' :style="{ border: '1px solid #ccc', padding: '10px' }">
    <span>screen shoot</span>
  </div>
  <button :style="{ border: '1px solid #ccc', padding: '5px', marginTop: '10px' }" @click="screenShoot">截图保存</button>
</div>

### 3.4、添加滤镜
:::tip
利用canvas对图片像素进行操作
:::

```vue
<div ref='aFilterDivRef'>
  <input type="file" @change="aFilterChange" />
  <img ref="aFilterRef" alt="" />
  <button :style="{ border: '1px solid #ccc', padding: '5px', marginTop: '10px' }" @click="addAFilter">添加滤镜</button>
</div>
```
```js
<script setup>
import { ref, reactive } from 'vue'

// 添加滤镜
const aFilterRef = ref()
const aFilterDivRef = ref()

// 添加滤镜
const addAFilter = () => {
  const canvas = document.createElement('canvas')
  canvas.width = aFilterRef.value.width
  canvas.height = aFilterRef.value.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(aFilterRef.value, 0, 0, canvas.width, canvas.height)

  // image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < imageData.data.length; i ++) {
    if (i % 2 === 0) {
      imageData.data[i] = 0
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.putImageData(imageData, 0, 0)
  aFilterDivRef.value.appendChild(canvas)
}

const aFilterChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    aFilterRef.value.src = reader.result
  }
}
</script>
```
示例：
<div ref='aFilterDivRef'>
  <input type="file" @change="aFilterChange" />
  <img ref="aFilterRef" alt="" />
  <button :style="{ border: '1px solid #ccc', padding: '5px', marginTop: '10px' }" @click="addAFilter">添加滤镜</button>
</div>

## 3、示例

### 3.1、图片压缩上传
```vue
<div>
  <input type="file" @change="fileChange" />
  <img ref="imgRef" :src="base64Url" alt="" />
</div>
```

```js
<script setup>
import { ref } from 'vue'

const base64Url = ref()
const imgRef = ref()

const fileChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    base64Url.value = reader.result
    setTimeout(() => {
      // drawImage 
      const canvas = document.createElement('canvas')
      canvas.width = imgRef.value.width
      canvas.height = imgRef.value.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgRef.value, 0, 0, canvas.width, canvas.height)
      // toBlob
      canvas.toBlob((blob) => {
        const newFile = new File([blob], files[0].name, { type: blob.type });
        const formData = new FormData();
        formData.append('file', newFile, newFile.name);
        $.ajax({
            url: 'url',//后台文件上传接口
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
              console.log('上传成功',result)
            }
        })
      }, 'image/jpeg', 0.6)
    })
  }
}
</script>
```

### 3.2、图片压缩下载
```vue
<div>
  <input type="file" @change="fileDownChange" />
  <img ref="imgDownRef" :src="base64DownUrl" alt="" />
  <button :style="{ border: '1px solid #ccc', padding: '5px' }" @click="downloadZipFile">下载压缩文件</button>
</div>
```

```js
<script setup>
import { ref, reactive } from 'vue'
import { saveAs } from 'file-saver'

const base64DownUrl = ref()
const imgDownRef = ref()

// 下载图片
const downloadZipFile = () => {
  // drawImage 
  const canvas = document.createElement('canvas')
  canvas.width = imgDownRef.value.width
  canvas.height = imgDownRef.value.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(imgDownRef.value, 0, 0, canvas.width, canvas.height)
  // toBlob
  canvas.toBlob((blob) => {
    saveAs(blob, 'zip-file.jpg');
  }, 'image/jpeg', 0.6)
}

// 选取图片
const fileDownChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    base64DownUrl.value = reader.result
  }
}
</script>
```
示例：
<div>
  <input type="file" @change="fileDownChange" />
  <img ref="imgDownRef" :src="base64DownUrl" alt="" />
  <button :style="{ border: '1px solid #ccc', padding: '5px', margin: '10px 0' }" @click="downloadZipFile">下载压缩文件</button>
</div>

### 3.3、动态截图
```vue
<div ref="container" class="container">
  <input type="file" @change="fileChange1" />
  <img ref="img1" class="img1" alt="" />
  <canvas ref="canvas1" width="200" height="200" :style="{ border: '1px solid skyblue', marginTop: '10px' }"></canvas>
  <button :style="{ border: '1px solid #ccc', padding: '5px', marginTop: '10px' }" @click="beginCuter">开始截图</button>
  <!-- 截图选取框 -->
  <div class="cover"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    :style="{left: img1.offsetLeft+'px', top: img1.offsetTop+'px'}"
    v-if="cuterShow"
  >
    <div ref="cuter" @mousedown="mouseDown" :style="{left: curX+'px', top: curY+'px'}" class="cuter">
    </div>
  </div>
</div>
```
```js

<script setup>
import { ref } from 'vue'

// 动态截图
const container = ref()
const img1 = ref()
const canvas1 = ref()
const cuter = ref()
const cuterShow = ref(false)
const canMove = ref(false)
const curX = ref(0)
const curY = ref(0)
const disX = ref(0)
const disY = ref(0)

// 开始截图
const beginCuter = () => {
  // 显示红框
  cuterShow.value = true
}

const mouseDown = (e) => {
  canMove.value = true
  const _x = e.clientX
  const _y = e.clientY
  disX.value = _x - container.value.getBoundingClientRect().left - cuter.value.offsetLeft
  disY.value = _y - container.value.getBoundingClientRect().top - 30 - cuter.value.offsetTop
}

const mouseMove = (e) => {
  if (canMove.value) {
    const _x = e.clientX
    const _y = e.clientY
    curX.value = _x - container.value.getBoundingClientRect().left - disX.value + 2
    curY.value = _y - container.value.getBoundingClientRect().top - 30 - disY.value
  }
}

const mouseUp = () => {
  canMove.value = false
  const ctx = canvas1.value.getContext('2d')
  // 等比例缩放
  const height = (200 / img1.value.height) * img1.value.naturalHeight
  const width = (200 / img1.value.width) * img1.value.naturalWidth
  const _x = (curX.value / img1.value.height) * img1.value.naturalHeight
  const _y = (curY.value / img1.value.width) * img1.value.naturalWidth
  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(img1.value, _x, _y, width, height, 0, 0, 200, 200)
}

// 动态截图
const fileChange1 = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    img1.value.src = reader.result
    setTimeout(() => {
      const ctx = canvas1.value.getContext('2d')
      // 等比例缩放
      const height = (200/img1.value.height) * img1.value.naturalHeight
      const width = (200/img1.value.width) * img1.value.naturalWidth
      ctx.drawImage(img1.value, 0, 0, width, height, 0, 0, 200, 200)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.img1 {
  width: 500px;
  height: 500px;
  border: 1px solid skyblue;
}
.cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  .cuter {
    position: absolute;
    border: 1px solid red;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
```
示例：
<div ref="container" class="container">
  <input type="file" @change="fileChange1" />
  <img ref="img1" class="img1" alt="" />
  <canvas ref="canvas1" width="200" height="200" :style="{ border: '1px solid skyblue', marginTop: '10px' }"></canvas>
  <button :style="{ border: '1px solid #ccc', padding: '5px', marginTop: '10px' }" @click="beginCuter">开始截图</button>
  <!-- 截图选取框 -->
  <div class="cover"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    :style="{left: img1.offsetLeft+'px', top: img1.offsetTop+'px'}"
    v-if="cuterShow"
  >
    <div ref="cuter" @mousedown="mouseDown" :style="{left: curX+'px', top: curY+'px'}" class="cuter">
    </div>
  </div>
</div>

<script setup>
import { ref, reactive } from 'vue'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'

const base64Url = ref()
const imgRef = ref()
const imgZipInfo = reactive({
  originSize: 0,
  zipSize: 0,
})

// 压缩下载
const base64DownUrl = ref()
const imgDownRef = ref()

// 图片裁剪
const imgTailorRef = ref()
const canvasRef = ref()

// 截图保存
const divRef = ref()
const aFilterDivRef = ref()

// 添加滤镜
const aFilterRef = ref()

// 添加滤镜
const addAFilter = () => {
  const canvas = document.createElement('canvas')
  canvas.width = aFilterRef.value.width
  canvas.height = aFilterRef.value.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(aFilterRef.value, 0, 0, canvas.width, canvas.height)

  // image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < imageData.data.length; i ++) {
    if (i % 2 === 0) {
      imageData.data[i] = 0
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.putImageData(imageData, 0, 0)
  aFilterDivRef.value.appendChild(canvas)
}

const aFilterChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    aFilterRef.value.src = reader.result
  }
}

// 截图保存
const screenShoot = () => {
  html2canvas(divRef.value).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, 'screenShoot.png');
    }, 'image/png')
  })
}

const downloadZipFile = () => {
  // drawImage 
  const canvas = document.createElement('canvas')
  canvas.width = imgDownRef.value.width
  canvas.height = imgDownRef.value.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(imgDownRef.value, 0, 0, canvas.width, canvas.height)
  // toBlob
  canvas.toBlob((blob) => {
    saveAs(blob, 'zip-file.jpg');
  }, 'image/jpeg', 0.6)
}

const fileDownChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    base64DownUrl.value = reader.result
  }
}

// 图片裁剪选图片
const fileTailorChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imgTailorRef.value.src = reader.result
    setTimeout(() => {
      // drawImage
      const ctx = canvasRef.value.getContext('2d')
      ctx.drawImage(imgTailorRef.value, 0, 0, imgTailorRef.value.width, imgTailorRef.value.height, 0, 0, 100, 100)
    })
  }
}

const fileChange = (e) => {
  const file = e.target.files[0]
  imgZipInfo.originSize = file.size
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    base64Url.value = reader.result
    setTimeout(() => {
      // drawImage 
      const canvas = document.createElement('canvas')
      canvas.width = imgRef.value.width
      canvas.height = imgRef.value.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgRef.value, 0, 0, canvas.width, canvas.height)
      // toBlob
      canvas.toBlob((blob) => {
        imgZipInfo.zipSize = blob.size
      }, 'image/jpeg', 0.6)
    })
  }
}

// 动态截图
const container = ref()
const img1 = ref()
const canvas1 = ref()
const cuter = ref()
const cuterShow = ref(false)
const canMove = ref(false)
const curX = ref(0)
const curY = ref(0)
const disX = ref(0)
const disY = ref(0)

// 开始截图
const beginCuter = () => {
  // 显示红框
  cuterShow.value = true
}

const mouseDown = (e) => {
  canMove.value = true
  const _x = e.clientX
  const _y = e.clientY
  disX.value = _x - container.value.getBoundingClientRect().left - cuter.value.offsetLeft
  disY.value = _y - container.value.getBoundingClientRect().top - 30 - cuter.value.offsetTop
}

const mouseMove = (e) => {
  if (canMove.value) {
    const _x = e.clientX
    const _y = e.clientY
    curX.value = _x - container.value.getBoundingClientRect().left - disX.value + 2
    curY.value = _y - container.value.getBoundingClientRect().top - 30 - disY.value
  }
}

const mouseUp = () => {
  canMove.value = false
  const ctx = canvas1.value.getContext('2d')
  // 等比例缩放
  const height = (200 / img1.value.height) * img1.value.naturalHeight
  const width = (200 / img1.value.width) * img1.value.naturalWidth
  const _x = (curX.value / img1.value.height) * img1.value.naturalHeight
  const _y = (curY.value / img1.value.width) * img1.value.naturalWidth
  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(img1.value, _x, _y, width, height, 0, 0, 200, 200)
}

// 动态截图
const fileChange1 = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    img1.value.src = reader.result
    setTimeout(() => {
      const ctx = canvas1.value.getContext('2d')
      // 等比例缩放
      const height = (200/img1.value.height) * img1.value.naturalHeight
      const width = (200/img1.value.width) * img1.value.naturalWidth
      ctx.drawImage(img1.value, 0, 0, width, height, 0, 0, 200, 200)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.img1 {
  width: 500px;
  height: 500px;
  border: 1px solid skyblue;
}
.cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  .cuter {
    position: absolute;
    border: 1px solid red;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
