export const navZh = [
  { text: "首页", link: "/" },
  { 
    text: "前端", 
    items: [
      {
        text: "前端基础",
        items: [
          { text: "HTML/HTML5", link: "/f2e/html/" },
          { text: "CSS/CSS3", link: "/f2e/css/" },
        ]
      },
      {
        text: "前端框架",
        items: [
          { text: "Vue2/Vue3", link: "/f2e/vue/" },
          { text: "React", link: "/f2e/react/" },
          { text: "Svelte", link: "/f2e/svelte/" },
          { text: "Solid", link: "/f2e/solid/" },
        ]
      }
    ]
  },
  { text: "后端", link: "/guide/test" },
  { 
    text: "云服务",
    items: [
      { 
        text: "云函数", 
        items: [
          { text: "Gitee", link: "https://gitee.com/geeksdidi" }
        ] 
      },
      { 
        text: "云部署", 
        items: [
          { text: "Gitee", link: "https://gitee.com/geeksdidi" }
        ] 
      },
    ]
  },
]