# xhr简介

## 1、简介
`XMLHttpRequest`(XHR)对象用于与服务器交互。通过`XMLHttpRequest`可以在不刷新页面的情况下请求特定 URL,获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest`在 AJAX 编程中被大量使用。

`XMLHttpRequest`是一组 API 函数集，可被`JavaScript`、`JScript`、`VBScript`以及其它 web浏览器内嵌的脚本语言调用，通过 HTTP 在浏览器和 web服务器之间收发 XML 或其它数据。

## 2、示例
### 2.1、发送请求
```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.baidu.com");
xhr.onload = () => {
  console.log(xhr.responseText);
}
xhr.send();
```
<div>
  <pre>{{baiduValue}}</pre>
  <button :style="{'border': '1px solid red', padding: '5px 10px'}" @click="getBaidu">获取百度</button>
</div>

### 2.2、封装axios
```ts
export const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.send();
    });
  }
}
```
使用
```ts
axios.get("https://www.baidu.com")
```
<div>
  <pre>{{axiosValue}}</pre>
  <button :style="{'border': '1px solid red', padding: '5px 10px'}" @click="axiosGetBaidu">axios获取百度</button>
</div>

<script lang="ts" setup>
import { ref } from 'vue'

const baiduValue = ref('')
const axiosValue = ref('')

const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          // resolve(JSON.parse(xhr.responseText));
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.send();
    });
  }
}

const getBaidu = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/f2e/script/js/xhr简介");
  xhr.onload = () => {
    baiduValue.value = xhr.responseText
  }
  xhr.send();
}

const axiosGetBaidu = async () => {
  const res = await axios.get<string>("/f2e/script/js/xhr简介")
  axiosValue.value = res
}
</script>