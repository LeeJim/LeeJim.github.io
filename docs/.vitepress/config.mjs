import { defineConfig } from 'vitepress'

import sidebar from './sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "leejim's blog",
  description: "get to know leejim better",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/miniprogram/performance-optimization' },
      { text: 'About', link: '/about' }
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/leejim' }
    ],

    editLink: {
      pattern: 'https://github.com/leejim/leejim-github-io/edit/main/docs/:path'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
