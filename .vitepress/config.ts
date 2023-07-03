
import { defineConfig } from 'vitepress'
import { navZh, sidebarZh } from './configs/index'

export default {
  base: process.env.NODE_ENV === 'production' ? '/my-personal-docs/' : '/',
  title: "MZ's 技术指南", // 站点标题
  description: 'MZ的技术指南, 记录学习及日常使用', // mate标签description，多用于搜索引擎抓取摘要
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    siteTitle: "MZ's 技术指南",
    logo: "/logo.png",
    nav: navZh,
    sidebar: sidebarZh,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/misterZhouZhou', },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 MZ, All rights reserved.'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        indexName: 'vitepress'
      }
    },
  },
}