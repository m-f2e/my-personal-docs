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
      link: /markdown-examples
    - theme: alt
      text: View on Github
      link: /api-examples

features:
  - icon: ⚡️
    title: 前端
    details: 记录前端基础及日常使用、注意事项
  - icon: 🖖
    title: 后端
    details: 后端语言基础、框架
  - icon: 🛠️
    title: 云服务
    details: 云服务、云部署平台
---

<h3>程序员的日常🎆</h3>
<div class="coding">
  <pre>
   while (true) {
      eat();
      coding();
      sleep();
    }
  </pre>
</div>


<style scoped>
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 30px;
  }
  .coding {
    border-radius: 8px;
    margin: 16px 30px 0 30px;
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
</style>