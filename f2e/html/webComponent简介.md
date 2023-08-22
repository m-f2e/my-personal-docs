# WebComponent

## 1、示例
### 1.1、通用
```js
class Btn extends HTMLElement {
  constructor() {
    super()
    const p = this.h('p')
    p.innerText = 'Hello World'
    p.setAttribute('style','height:200px;width:200px;border:1px solid #ccc;background:yellow;')
    //表示 shadow DOM 子树的根节点。
    const shaDow = this.attachShadow({ mode: 'open' })
    shaDow.appendChild(p)
  }
  h(el) {
    return document.createElement(el)
  }
  // 生命周期
  // 当自定义元素第一次被连接到文档 DOM 时被调用
  connectedCallback() {
    console.log('$---', '连接进入了');
  }
  // 当自定义元素与文档 DOM 断开连接时被调用
  disconnectedCallback() {
    console.log('$---', '连接断开了');
  }
  // 当自定义元素被移动到新文档时被调用
  adoptedCallback() {
    console.log('$---', '被移动到新文档了');
  }
  // 当自定义元素的一个属性被增加、移除或更改时被调用
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('$---被改变了', attrName, oldVal, newVal);
  }
}

window.customElements.define('my-btn', Btn)
```

使用
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./btn.js"></script>
</head>
<body>
  <my-btn>111</my-btn>
</body>
</html>
```

### 1.2、template
```js
class MyTemplate extends HTMLElement {
  constructor() {
    super()
    const template = this.h('template')
    template.innerHTML = `
    <p>Hello World</p>
    <style>
      p{
        height: 200px;
        width: 200px;
        border: 1px solid #ccc;
        background: yellow;
      }
    `
    //表示 shadow DOM 子树的根节点。
    const shaDow = this.attachShadow({ mode: 'open' })
    shaDow.appendChild(template.content.cloneNode(true))
  }
  h(el) {
    return document.createElement(el)
  }
  // 生命周期
  // 当自定义元素第一次被连接到文档 DOM 时被调用
  connectedCallback() {
    console.log('$---', '连接进入了');
  }
  // 当自定义元素与文档 DOM 断开连接时被调用
  disconnectedCallback() {
    console.log('$---', '连接断开了');
  }
  // 当自定义元素被移动到新文档时被调用
  adoptedCallback() {
    console.log('$---', '被移动到新文档了');
  }
  // 当自定义元素的一个属性被增加、移除或更改时被调用
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('$---被改变了', attrName, oldVal, newVal);
  }
}

window.customElements.define('my-template', MyTemplate)
```
使用
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./template.js"></script>
</head>
<body>
  <my-template>111</my-template>
</body>
</html>
```