# VueUse
## 1、简介
:::tip
`VueUse`是一个基于`Composition API`的实用程序函数集合。
:::

## 2、官网
https://vueuse.org/

## 3、使用要求
:::tip

- 从`v4.0`开始，它通过`vue-demi`的强大功能在单个包中适用于`Vue 2`和`Vue3`

- 从`v6.0`开始，`VueUse`需要`vue >= v3.2`或`@vue/composition-api >= v1.1`
:::

## 4、安装
### 4.1、npm
```shell
npm i @vueuse/core
```

### 4.2、CDN
```html
<script src="https://unpkg.com/@vueuse/shared"></script>
<script src="https://unpkg.com/@vueuse/core"></script>
```
### 4.3、Nuxt
```shell
npm i -D @vueuse/nuxt @vueuse/core
```
Nuxt3
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
})
```

Nuxt2
```ts
// nuxt.config.js
export default {
  buildModules: [
    '@vueuse/nuxt',
  ],
}
```