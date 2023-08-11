import{_ as n,o as t,c as p,k as e,a,t as s,S as o}from"./chunks/framework.c5ba3aa3.js";const g=JSON.parse('{"title":"一个小小的优化，能让你的小程序瘦身10%","description":"","frontmatter":{"title":"一个小小的优化，能让你的小程序瘦身10%","date":"2020-01-21T20:39:33.000Z","tags":null,"toc":true,"categories":["小程序"]},"headers":[],"relativePath":"miniprogram/wxml-minifier.md","filePath":"miniprogram/wxml-minifier.md","lastUpdated":1691668833000}'),r={name:"miniprogram/wxml-minifier.md"},c={id:"frontmatter-title",tabindex:"-1"},i=e("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),d=o('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><blockquote><p>我司一直专注于微信小程序（以下简称小程序）开发，可以说是重仓押注在小程序上。\\</p></blockquote><p>但由于小程序的大小有严格的限制(单个分包/主包大小不能超过 2M )。<br> 而我们的业务又相对比较复杂，因此常常会突破小程序的大小限制。因此，我们就不得不思考 <strong>如何优化小程序的大小。</strong></p><h2 id="暴力方式" tabindex="-1">暴力方式 <a class="header-anchor" href="#暴力方式" aria-label="Permalink to &quot;暴力方式&quot;">​</a></h2><p>要优化小程序的大小，最好（最暴力）的方式就是删页面。</p><p>这样来，即高效执行起来也简单：统计下所有页面的 PV、UV，将一些不活跃的页面移除就完事了。</p><p>但是，本文并不是要讲如何移除页面，因为这没什么好讲的。</p><h2 id="分析" tabindex="-1">分析 <a class="header-anchor" href="#分析" aria-label="Permalink to &quot;分析&quot;">​</a></h2><p>讲本文的优化方式之前，先分析一下小程序一般都由哪些文件组成的。</p><p>一般都是由以下几种文件组成：</p><ul><li><code>.js</code> 逻辑文件</li><li><code>.wxml</code> 页面结构文件</li><li><code>.wxss</code> 样式文件</li><li><code>.json</code> 配置文件</li></ul><blockquote><p>也许你会将一些 image 放在小程序里，一般建议放较小且少量的 image，其他都使用网络图片</p></blockquote><p>其中，由于 <code>JavaScript</code> 有一定的兼容问题需要处理，因此在打包和上传小程序时，开发者工具会对 <code>JavaScript</code> 进行 <code>babel</code> 编译处理，故这块可优化的空间比较有限。</p><p>而 <code>JSON</code> 的大小都比较小，且格式较为固定，也没什么可优化的地方。</p><p>接下来就是本文要重点说到的 <code>WXML</code> 了，一般 <code>WXSS</code> 都是和 <code>WXML</code> 配套使用的。这两者占小程序的大小比例也比较高，可优化空间非常大，可优化的思路也非常多。本文先讲一下 <code>WXML</code> 的一个优化技巧。</p><h2 id="试验" tabindex="-1">试验 <a class="header-anchor" href="#试验" aria-label="Permalink to &quot;试验&quot;">​</a></h2><p>其实，小程序最终的执行都是以WEB的形式完成的。因此 <code>WXML</code> 可以理解成类似于 <code>VUE</code> 的语法糖，最终都是要编译成 <code>HTML</code> 的。</p><p>所以，想要压缩 <code>WXML</code> 代码，就可以参考 <code>HTML</code> 的压缩方式。比如移除多余的空格。</p><p>我立马做了个试验，将 <code>WXML</code> 中的部分的空格移除之后，再使用开发者工具上传，发现小程序的大小真的发生了变化，变得更小了。因此可以得出结论，移除 <code>WXML</code> 中的空格是可行的压缩思路。</p><h2 id="自动化" tabindex="-1">自动化 <a class="header-anchor" href="#自动化" aria-label="Permalink to &quot;自动化&quot;">​</a></h2><p>既然移除空格是可以减小小程序代码体积的，那么如何实现自动化移除的。</p><p>首先我想到的是，利用巨人的肩膀：<code>htmlparser2</code>。通过语法分析器，识别 <code>WXML</code> 的空格，并一举歼灭。</p>',22),h=e("code",null,"parser",-1),m=e("code",null,"WXML",-1),A=e("code",null,"<",-1),C=o(`<p>因此需要特制一个识别 <code>WXML</code> 语法的 <code>parser</code>。</p><p>由于这样的 <code>parser</code> 比较简单，因此我就自己上手写了一个：<a href="https://github.com/LeeJim/wxml-parser" target="_blank" rel="noreferrer">wxml-parser</a></p><h2 id="实践" tabindex="-1">实践 <a class="header-anchor" href="#实践" aria-label="Permalink to &quot;实践&quot;">​</a></h2><p>通过上述我写的 <code>parser</code>，写了一个简单的 <code>minifier</code>：<a href="https://github.com/LeeJim/wxml-minifier" target="_blank" rel="noreferrer">wxml-minifier</a></p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">wxml-minifier</span></span></code></pre></div><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> minifier </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wxml-minifier</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> fs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> resource </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readSync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./app.wxml</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 假设输入为：&lt;view class=&quot;home&quot;    &gt;&lt;/view&gt;       &lt;!-- test --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> result </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">minifier</span><span style="color:#A6ACCD;">(resource)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(result) </span><span style="color:#676E95;font-style:italic;">// &lt;view class=&quot;home&quot;&gt;&lt;/view&gt;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>通过将 <code>WXML</code> 中多余的空格移除，可以将小程序的代码减小大概10%。</p><p>其实，从这个角度可以发现，开发者工具在上传 <code>WXML</code> 时，是没有做任何处理的。因此对于 <code>HTML</code> 的任何压缩方式都可以在 <code>WXML</code> 上使用。当然这也是后续我的 <code>wxml-parser</code> 持续更新迭代的方向。</p><p>不知道为什么微信官方在开发者工具上传代码时，不进行简单的简化处理。如果你有答案的话，欢迎在评论中给我回复！</p><p>如果觉得对你有用，希望给我一个 star，感谢！</p>`,13);function y(l,D,u,_,f,b){return t(),p("div",null,[e("h1",c,[a(s(l.$frontmatter.title)+" ",1),i]),d,e("p",null,[a("绝大多数情况下，这个做法是可行的。但是有一种情况，会导致"),h,a("识别出错："),m,a(" 中出现 "),e("code",null,s(),1),a("，且使用了 "),A,a("。")]),C])}const q=n(r,[["render",y]]);export{g as __pageData,q as default};
