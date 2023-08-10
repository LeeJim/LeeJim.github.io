---
title: projects
date: 2020-05-23 13:58:16
layout: page
---

<script setup>
const data = [
  { 
    title: 'Current Focus', 
    items: [
      { 
        title: 'TDesign MiniProgram',
        icon: 'fa-brands fa-weixin fa-xl',
        description: 'A Wechat MiniProgram UI components lib', 
        badge: 'https://img.shields.io/github/stars/tencent/tdesign-miniprogram?logo=github&logoColor=white&color=%23eee'
      },
      { 
        title: 'TDesign Mobile Vue', 
        icon: 'fa-brands fa-vuejs fa-xl',
        description: 'A Vue3.x Mobile UI components lib', 
        badge: 'https://img.shields.io/github/stars/tencent/tdesign-mobile-vue?logo=github&logoColor=white&color=%23eee'
      },
    ]
  },
  {
    title: 'Tools',
    items: [
      { 
        title: 'wxml-parser', 
        icon: 'fa-solid fa-code fa-xl',
        description: '微信小程序 WXML Parser', 
        badge: 'https://img.shields.io/npm/dw/@leejim/wxml-parser?logo=npm&logoColor=white&color=%23eee'
      },
      { 
        title: 'wxml-minifier', 
        icon: 'fa-solid fa-scissors fa-xl',
        description: '微信小程序 WXML 压缩工具；官方 CI 依赖', 
        badge: 'https://img.shields.io/npm/dw/wxml-minifier?logo=npm&logoColor=white&color=%23eee'
      },
      { 
        title: 'smapp', 
        icon: 'fa-solid fa-terminal fa-xl',
        description: '微信小程序 VSCode 插件；提供日常开发需要的功能', 
        badge: 'https://img.shields.io/visual-studio-marketplace/d/leejimqiu.smapp?logo=visualstudiocode&color=%23eee'
      },
    ]
  },
  {
    title: 'Applications',
    items: [
      { 
        title: 'HowToCookOnMiniprogram', 
        icon: 'fa-solid fa-book fa-xl',
        description: '程序员做饭指南 for 小程序', 
        badge: 'https://img.shields.io/github/stars/leejim/howToCookOnMiniprogram?logo=github&logoColor=white&color=%23eee'
      },
      { 
        title: 'web hunter', 
        icon: 'fa-solid fa-clover fa-xl',
        description: '分享实用/有趣/有创意的网站', 
      },
    ]
  }
]
</script>

<h1 class="title">Projects</h1>

<div v-for="section in data">
<h3 class="title title--secondray">{{section.title}}</h3>
<ul class="items">
  <li v-for="p in section.items" class="item">
    <div class="item__left">
      <i v-if="p.icon" :class="p.icon"></i>
    </div>
    <div class="item__right">
      <div class="item__title">
        {{p.title}}
        <img v-if="p.badge" class="tag" alt="GitHub Repo stars" :src="p.badge">
      </div>
      <div class="item__description">{{p.description}}</div>
    </div>
  </li>
</ul>
</div>

<style scoped>
ul {
  padding-left: 0;
}

a {
  text-decoration: none;
}

a:visited {
  color: unset;
}

/* main */

.title {
  text-align: center;
  margin-top: 80px;
  font-size: 20px;
  margin-bottom: 20px;
}

.title--primary {
  font-size: 28px;
  margin-top: 10px;
}

.items {
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.item {
  display: flex;
  width: 400;
  padding: 14px;
  border-radius: 6px;
  opacity: .7;
  transition: all .3s ease;
  margin-top: 0;
  flex: 400px 0 0;
}

.item:hover {
  cursor: pointer;
  opacity: 1;
  background-color: #eee;
}

.item__left {
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.item__title {
  font-size: 18px;
  color: #333;
  margin-bottom: 6px;
}

.item__description {
  font-size: 14px;
  color: #aaa;
}

.tag {
  display: inline;
  margin-left: 4px;
  vertical-align: middle;
}
</style>
