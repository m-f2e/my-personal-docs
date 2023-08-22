# Vite PostCss插件
## 1、postcss-px-to-viewport
:::tip
将px转换为vw
:::
### 1.1、安装
```shell
npm i postcss-px-to-viewport -D
```
### 1.2、配置
:::tip
因为`vite`中已经内联了`postcss`，所以并不需要额外的创建`postcss.config.js`文件
:::
vite.config.ts
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postCssPxToViewport from "postcss-px-to-viewport" //插件

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: [
            'ignore-',
            '.ignore',
            ':root',
            '.van-'
          ], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false, // 是否处理横屏情况
          exclude: [/node_modules/], // 忽略某些文件夹
        })
      ]
    }
  },
})
```
vite ts类型声明
```ts
declare module 'postcss-px-to-viewport' {
    type Options = {
        unitToConvert: 'px' | 'rem' | 'cm' | 'em',
        viewportWidth: number,
        viewportHeight: number, // not now used; TODO: need for different units and math for different properties
        unitPrecision: number,
        viewportUnit: string,
        fontViewportUnit: string,  // vmin is more suitable.
        selectorBlackList: string[],
        propList: string[],
        minPixelValue: number,
        mediaQuery: boolean,
        replace: boolean,
        landscape: boolean,
        landscapeUnit: string,
        landscapeWidth: number
    }
 
    export default function(options: Partial<Options>):any
}
```
修改`tsconfig.ts`
```ts
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "postcss-px-to-viewport.d.ts"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```


## 2、postcss-mobile-forever

### 2.1、安装
```shell
npm i postcss-mobile-forever -D
```
### 2.2、配置
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postCssPxToViewport from "postcss-px-to-viewport" //插件

const getIncludesFile = file => {
  return (
    file.includes('hello') ||
    file.includes('card')
  );
};

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    postcss: {
      plugins: [
        mobile({
          rootSelector: '#app',
          viewportWidth: file => (getIncludesFile(file) ? 375 : 750),
          mobileUnit: 'vw',
          disableDesktop: true,
          selectorBlackList: [
            '.ignore',
            '.hairlines',
            ':root',
            '.ignore-',
            '.van-',
          ],
          unitPrecision: 5,
          exclude: [
            /(\/|\\)(node_modules)(\/|\\)/,
            /(\/|\\)(module)(\/|\\)/,
            /(\/|\\)(rule)(\/|\\)/
          ]
        })
      ]
    }
  },
})
```