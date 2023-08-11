---
title: projects
date: 2020-05-23 13:58:16
layout: page
---

<script setup>
import { Icon } from '@iconify/vue';

const data = [
  { 
    title: 'Current Focus', 
    items: [
      { 
        title: 'TDesign MiniProgram',
        icon: 'tabler:brand-wechat',
        description: 'A Wechat MiniProgram UI components lib', 
        url: 'https://github.com/Tencent/tdesign-miniprogram',
        badge: 'https://img.shields.io/github/stars/tencent/tdesign-miniprogram?logo=github&logoColor=white'
      },
      { 
        title: 'TDesign Mobile Vue', 
        icon: 'tabler:brand-vue',
        description: 'A Vue3.x Mobile UI components lib', 
        url: 'https://github.com/Tencent/tdesign-mobile-vue',
        badge: 'https://img.shields.io/github/stars/tencent/tdesign-mobile-vue?logo=github&logoColor=white'
      },
    ]
  },
  {
    title: 'Tools',
    items: [
      { 
        title: 'wxml-parser', 
        icon: 'tabler:code-off',
        description: '微信小程序 WXML Parser', 
        url: 'https://github.com/LeeJim/wxml-parser',
        badge: 'https://img.shields.io/npm/dw/@leejim/wxml-parser?logo=npm&logoColor=white'
      },
      { 
        title: 'wxml-minifier', 
        icon: 'tabler:scissors',
        description: '微信小程序 WXML 压缩工具；官方 CI 依赖', 
        url: 'https://github.com/LeeJim/wxml-minifier',
        badge: 'https://img.shields.io/npm/dw/wxml-minifier?logo=npm&logoColor=white'
      },
      { 
        title: 'smapp', 
        icon: 'tabler:brand-vscode',
        description: '小程序 VSCode 插件；提供日常开发需要的功能', 
        url: 'https://marketplace.visualstudio.com/items?itemName=leejimqiu.smapp',
        badge: 'https://img.shields.io/visual-studio-marketplace/d/leejimqiu.smapp?logo=visualstudiocode'
      },
    ]
  },
  {
    title: 'Applications',
    items: [
      { 
        title: 'HowToCookOnMiniprogram', 
        icon: 'tabler:book',
        description: '程序员做饭指南 for 小程序', 
        url: 'https://github.com/LeeJim/HowToCookOnMiniprogram',
        // badge: 'https://img.shields.io/github/stars/leejim/howToCookOnMiniprogram?logo=github&logoColor=white&color=%23eee'
      },
      { 
        title: 'web hunter', 
        icon: 'tabler:brand-chrome',
        url: 'http://anyhub.cn/',
        description: '分享实用/有趣/有创意的网站', 
      },
    ]
  }
]
const handleClick = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<h1 class="title">Projects</h1>

<div v-for="section in data">
<h3 class="title title--secondray">{{section.title}}</h3>
<ul class="items">
  <li v-for="p in section.items" class="item" @click="handleClick(p.url)">
    <div class="item__left">
      <Icon v-if="p.icon" :icon="p.icon" height="32" />
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
  opacity: .6;
}

.item__left {
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.item__title {
  font-size: 18px;
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
