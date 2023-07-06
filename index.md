---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: MZ's 技术指南
  # text: 记录学习、总结及踩坑
  tagline: 记录学习、总结及踩坑
  actions:
    - theme: brand
      text: View on Github
      link: https://github.com/misterZhouZhou
    # - theme: alt
    #   text: View on Github
    #   link: https://github.com/misterZhouZhou

features:
  - icon: 🤖
    title: AI
    details: AI工具整理、AI机器学习
  - icon: ⚡️
    title: 前端
    details: 记录前端基础及日常使用、注意事项
  - icon: 🖖
    title: 后端
    details: 后端语言基础、框架
  - icon: 🛠️
    title: 云服务
    details: 云服务、云部署平台、docker
---

<div class="codeContainer">
  <h3>程序员的日常🎆</h3>
  <div class="coding VPFeatures">
    <pre>
    while (true) {
        eat();
        coding();
        sleep();
      }
    </pre>
  </div>
</div>

<div class="codeContainer">
  <h3>程序员的特点⭐️</h3>
</div>

:::tip 程序员都是好人
他们整天都在思考一个问题：“我又哪里做错了，谁能告诉我啊 ^_^”
:::

:::warning 程序员的爱情观
爱上一个人的时候，那就是常量限定，永远不会改变；女朋友就是私有变量，只有我这个类才能调用 !
:::

:::danger 程序员的笑话
很多男孩子听到Mac觉得是电脑；
很多女孩子听到Mac觉得是口红；
程序员听到Mac觉得是物理地址。
:::

<style scoped>
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
  }
  .coding {
    border-radius: 8px;
    margin: 16px 0 0 0;
    position: relative;
    background-color: var(--vp-code-block-bg);
    overflow-x: auto;
    transition: background-color .5s;
  }
  .coding > pre {
    margin: 0;
    padding-top: 20px;
    line-height: var(--vp-code-line-height);
    font-size: var(--vp-code-font-size);
    color: var(--vp-code-block-color);
    transition: color .5s;
  }
  .codeContainer {
    padding: 0 24px;
    max-width: 1287px;
  }
  @media screen and (min-width: 640px) {
    .codeContainer {
      padding: 0 48px;
    }
    .codeContainer ~ .custom-block {
      margin: 20px 48px;
    }
  }
  @media screen and (min-width: 960px) {
    .codeContainer {
      padding: 0 64px;
      margin: 0 auto;
    }
    .codeContainer ~ .custom-block {
      margin: 20px 64px;
    }
  }
  @media screen and (min-width: 1280px) {
    .codeContainer ~ .custom-block {
      max-width: 1164px;
      margin: 20px auto;
    }
  }
</style>