# vite-plugin-mini-i18n

## 1、简介
组件i18n国际化插件，组件分离定义国际化

插件详细代码: https://github.com/m-f2e/vite-plugin-mini-i18n

## 2、安装
```shell
npm i @m-f2e/vite-plugin-mini-i18n
```

## 3、插件
```ts
import { Plugin } from "vite";
import useI18n from './usei18n'

const VitePluginMiniI18n = (): Plugin => {
  return {
    name: 'vite-plugin-mini-i18n',
    transform(code, id) {
      if (!/vue&type=i18n/.test(id)) {
        return
      }
      return `export default Comp => {
        Comp.i18n = ${code}
      }`
    }
  }
}

export {
  VitePluginMiniI18n,
  useI18n,
}

export default VitePluginMiniI18n
```

## 4、使用
```vue
<!-- App.vue -->
<template>
  <div>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
    <p>{{ t('hello') }}</p>
  </div>
</template>

<i18n>
  {
    en: {
      language: 'Language',
      hello: 'hello'
    },
    zh: {
      language: '语言',
      hello: '你好'
    }
  }
</i18n>

<script setup lang="ts">
import { useI18n } from '@m-f2e/vite-plugin-mini-i18n'

const { locale, t } = useI18n()

</script>
```