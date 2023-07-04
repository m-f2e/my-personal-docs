---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: MZ's 技术指南
  # text: 记录学习、总结及踩坑
  tagline: 记录学习、总结及踩坑
  actions:
    - theme: brand
      text: 查看文档
      link: /
    - theme: alt
      text: View on Github
      link: https://github.com/misterZhouZhou

features:
  - icon: ⚡️
    title: 前端
    details: 记录前端基础及日常使用、注意事项
  - icon: 🖖
    title: 后端
    details: 后端语言基础、框架
  - icon: 🛠️
    title: 云服务
    details: 云服务、云部署平台、docker
  - icon: 🤖
    title: AI
    details: AI工具整理、AI机器学习
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
  }
  @media screen and (min-width: 960px) {
    .codeContainer {
      padding: 0 64px;
      margin: 0 auto;
    }
  }
</style>