export const navZh = [
  { text: "首页", link: "/" },
  { 
    text: "AI",
    activeMatch: '/ai/',
    items: [
      { 
        text: "免费AI平台", 
        items: [
          { text: "免费可用AI工具", link: "/ai/免费可用AI工具" },
        ] 
      },
      { 
        text: "AI机器学习", 
        items: [
          { text: "AI机器学习", link: "/ai/AI机器学习" },
        ] 
      },
    ]
  },
  {
    text: "移动端",
    activeMatch: '/phone/',
    items: [
      {
        text: "Objective-C/C++",
        items: [
          { text: "Objective-C", link: "/phone/oc/" },
        ]
      },
      {
        text: "Swift",
        items: [
          { text: "Swift", link: "/phone/swift/" },
        ]
      }
    ]
  },
  { 
    text: "前端", 
    activeMatch: '/f2e/',
    items: [
      {
        text: "前端基础",
        items: [
          { text: "HTML/HTML5", link: "/f2e/html/" },
          { text: "CSS/CSS3", link: "/f2e/css/" },
          { text: "JavaScript/TypeScript", link: "/f2e/script/js/" },
        ]
      },
      {
        text: "前端框架",
        items: [
          { text: "Vue2/Vue3", link: "/f2e/vue/vue3/vue3基础知识.md" },
          { text: "Nuxt3", link: "/f2e/vue/nuxt/nuxt3简介.md" },
          { text: "React", link: "/f2e/react/" },
          { text: "Svelte", link: "/f2e/svelte/" },
          { text: "Solid", link: "/f2e/solid/" },
          { text: "微信小程序", link: "/f2e/wechat/" },
          { text: "鸿蒙系统", link: "/f2e/harmonyOS/" },
        ]
      },
      {
        text: "打包工具",
        items: [
          { text: "unbuild", link: "/f2e/bundle/unbuild打包.md" },
          { text: "tsup", link: "/f2e/bundle/tsup打包.md" },
          { text: "Vite", link: "/f2e/bundle/vite简介.md" },
        ]
      },
    ]
  },
  { 
    text: "后端",
    activeMatch: '/backend/',
    items: [
      {
        text: "NodeJS", 
        items: [
          { text: "NodeJS", link: "/backend/nodejs/nodejs简介.md" },
          { text: "Express", link: "/backend/express/express简介.md" },
        ]
      },
      {
        text: "Python", 
        items: [
          { text: "Python2/Python3", link: "https://gitee.com/geeksdidi" }
        ]
      },
      {
        text: "Golang", 
        items: [
          { text: "Gitee", link: "https://gitee.com/geeksdidi" }
        ]
      },
      {
        text: "Rust", 
        items: [
          { text: "Rust", link: "/backend/rust/rust简介.md" }
        ]
      }
    ]
  },
  { 
    text: "云服务",
    activeMatch: '/serverless/',
    items: [
      { 
        text: "云计算", 
        items: [
          { text: "云计算简介", link: "/serverless/service/云计算简介" },
          { text: "其他", link: "/serverless/service/云函数简介" }
        ] 
      },
      { 
        text: "云部署", 
        items: [
          { text: "Vercel", link: "/serverless/deploy/Vercel简介" },
          { text: "Cloudflare", link: "/serverless/deploy/cloudflare简介" },
          { text: "其他", link: "/serverless/deploy/Replit简介" }
        ] 
      },
      { 
        text: "操作系统|服务器|容器", 
        items: [
          { text: "Linux", link: "/serverless/system/linux简介" },
          { text: "Nginx", link: "/serverless/system/nginx简介" },
        ] 
      },
    ]
  },
  { 
    text: "软件工具",
    activeMatch: '/tool/',
    items: [
      { 
        text: "网站导航", 
        items: [
          { text: "网站导航", link: "/tool/site/" },
        ] 
      },
      { 
        text: "编程软件", 
        items: [
          { text: "VSCode", link: "/tool/vscode/" },
        ] 
      },
      { 
        text: "效率提升", 
        items: [
          { text: "pnpm", link: "/tool/efficiency/pnp简介.md" },
          { text: "nvm", link: "/tool/efficiency/nvm简介.md" },
          { text: "nrm", link: "/tool/efficiency/nrm简介.md" },
        ] 
      },
    ]
  },
]