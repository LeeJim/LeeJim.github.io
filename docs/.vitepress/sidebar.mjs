// navbar
const mp = {
  text: '小程序',
  items: [
    { text: '如何将 API Promise 化', link: '/miniprogram/api-promisify' },
    { text: '按钮实现的亿点细节', link: '/miniprogram/custom-button' },
    { text: '自定义导航栏的实现', link: '/miniprogram/custom-navigator' },
    { text: '自定义标签栏的实现', link: '/miniprogram/custom-tabbar' },
    { text: '全局变量的管理', link: '/miniprogram/global-variables' },
    { text: '复用函数的五种方式', link: '/miniprogram/method-reuse' },
    { text: '组件透传函数的实践', link: '/miniprogram/function-property' },
    { text: '订阅消息的思考', link: '/miniprogram/subscription' },
    { text: '组件封装的思考', link: '/miniprogram/about-components' },
    { text: '小程序的自动更新机制', link: '/miniprogram/update' },
    { text: '小程序的 Session', link: '/miniprogram/session' },
    { text: '加载性能优化', link: '/miniprogram/performance-optimization' },
    { text: '使用 GitHub Action 完成自动化', link: '/miniprogram/with-github-action' },
    { text: '代码压缩实践', link: '/miniprogram/wxml-minifier' },
    { text: '浅谈小程序的框架设计', link: '/miniprogram/framework-design' },
    { text: '浅谈小程序的错误处理', link: '/miniprogram/error-management' },
    { text: '浅谈小程序路由的设计', link: '/miniprogram/router-design' },
  ]
};
const feBase = {
  text: '前端基础',
  items: [
    { text: '编码规范的一些思考', link: '/fe-base/code-style-guide' },
    { text: 'ES6 Promise', link: '/fe-base/es6-promise' },
    { text: '简单实现前端路由', link: '/fe-base/simple-router' },
    { text: 'HTML5 History API', link: '/fe-base/h5-history-api' },
    { text: '使用 HTML 发送邮件', link: '/fe-base/html-send-email' },
    { text: 'JavaScript 闭包的理解', link: '/fe-base/javascript-closure' },
    { text: 'JavaScript 模块的差异', link: '/fe-base/javascript-modules' },
    { text: '正确使用 JavaScript 数组', link: '/fe-base/javascript-without-loops' },
    { text: 'JavaScript 的数据类型转换', link: '/fe-base/js-data-type-transform' },
    { text: 'JavaScript 数据类型详解', link: '/fe-base/js-data-type' },
    { text: 'JavaScript 内存管理', link: '/fe-base/memory-management' },
    { text: 'Promise 原理 & 宏微任务', link: '/fe-base/promise' },
    { text: '移动端适配的四种方案', link: '/fe-base/responsive-web' },
    { text: '什么是 cookie', link: '/fe-base/cookie' },
    { text: '关于事件绑定的一些知识', link: '/fe-base/browser-event' },
    { text: 'CSS Background 基础知识', link: '/fe-base/css-background' },
    { text: '探索 CSS 盒模型', link: '/fe-base/css-box-model' },
    { text: '我所理解的 BFC', link: '/fe-base/css-bfc' },
    { text: 'CSS 空格和换行', link: '/fe-base/css-white-space' },
  ]
};
const practice = {
  text: '工程实践',
  items: [
    { text: '关于组件库的代码复用', link: '/practice/code-reuse-for-uilib' },
    { text: '开始拥抱 Gulp', link: '/practice/getting-started-with-gulp' },
    { text: 'Web 与原生应用的通信', link: '/practice/interact-with-app' },
    { text: '如果使用 Node.js 的 Buffers', link: '/practice/how-to-use-buffers' },
    { text: 'MongoDB 使用记录', link: '/practice/mongodb' },
    { text: 'HTTP 常用安全头', link: '/practice/http-safe-header' },
  ]
};
const browser = {
  text: '浏览器相关',
  items: [
    { text: '[译文]手把手教你实现一个浏览器引擎（一）Start', link: '/broswer/how-broswers-work-1' },
    { text: '[译文]手把手教你实现一个浏览器引擎（二）HTML', link: '/broswer/how-broswers-work-2' },
    { text: '[译文]手把手教你实现一个浏览器引擎（三）CSS', link: '/broswer/how-broswers-work-3' },
    { text: '[译文]手把手教你实现一个浏览器引擎（四）Style', link: '/broswer/how-broswers-work-4' },
    { text: '[译文]手把手教你实现一个浏览器引擎（五）Boxes', link: '/broswer/how-broswers-work-5' },
    { text: '[译文]手把手教你实现一个浏览器引擎（六）Block Layout', link: '/broswer/how-broswers-work-6' },
    { text: '[译文]手把手教你实现一个浏览器引擎（七）Paint', link: '/broswer/how-broswers-work-7' },
    { text: '使用 Web Storage API', link: '/broswer/storage-api' },
  ],
};
const vue = {
  text: 'Vue',
  items: [
    { text: '由 Proxy 引起的问题', link: '/vue/vue3-with-proxy' },
    { text: '为什么 data 必须为函数', link: '/vue/why-data-must-function' },
  ]
};

const blog = [mp, feBase, vue, practice, browser]

export default {
  '/miniprogram/': blog,
  '/fe-base': blog,
  '/broswer': blog,
  '/practice': blog,
  '/vue/': blog
}