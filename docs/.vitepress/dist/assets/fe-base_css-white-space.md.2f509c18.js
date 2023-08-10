import{_ as t,o,c as r,k as e,a as d,t as l,S as c}from"./chunks/framework.7f03344f.js";const g=JSON.parse('{"title":"CSS 空格和换行","description":"","frontmatter":{"title":"CSS 空格和换行","date":"2015-10-14T14:25:19.000Z","tags":["CSS"],"desc":"CSS空格和换行,word-break,overflow-wrap,word-wrap,white-space","toc":true,"categories":["CSS"]},"headers":[],"relativePath":"fe-base/css-white-space.md","filePath":"fe-base/css-white-space.md","lastUpdated":null}'),s={name:"fe-base/css-white-space.md"},p={id:"frontmatter-title",tabindex:"-1"},n=e("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),i=c('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>在 WEB 开发当中，往往容易忽略文本样式的控制，关注点常常停留在元素上。最近开发涉及到文本的样式，发现对应的属性的值都挺多的，因此来总结记录一下，以后给自己做参考。</p><h2 id="break-all" tabindex="-1">break-all <a class="header-anchor" href="#break-all" aria-label="Permalink to &quot;break-all&quot;">​</a></h2><p>指定怎么在单词内断行。[<code>初始值normal</code>-<code>继承属性</code>-<code>适用全部元素</code>]</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">work-break: normal | break-all | keep-all;</span></span></code></pre></div><p><code>normal</code>: 使用默认的换行</p><p><code>break-all</code>: 对于non-CJK(中文/日文/韩文)文本，可在任意字符间断行。</p><p><code>keep-all</code>: CJK文本不断行，non-CJK文本的行为则和<code>normal</code>保持一致。</p><p>具体效果可以看这个<a href="https://jsfiddle.net/5psou6y5/" target="_blank" rel="noreferrer">参考例子</a></p><h2 id="overflow-wrap" tabindex="-1">overflow-wrap <a class="header-anchor" href="#overflow-wrap" aria-label="Permalink to &quot;overflow-wrap&quot;">​</a></h2><p>别名：word-wrap</p><p>指定一个不可断句的字符串太长溢出盒子模型时，是否要断行。[<code>初始值normal</code>-<code>继承属性</code>-<code>适用全部元素</code>]</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">overflow-wrap: normal | break-word;</span></span></code></pre></div><p><code>normal</code>: 表示在正常的单词结束处换行。</p><p><code>break-word</code>: 如果一行内无法容下某个单词的话，那就断开这个单词。</p><p><strong>补充</strong>：</p><p>如果不明白<code>break-all</code>和<code>overflow-wrap</code>的差别的话，查看<a href="https://jsfiddle.net/ar6nha8e/" target="_blank" rel="noreferrer">这个例子</a>就可以明白了。</p><hr><h2 id="white-space" tabindex="-1">white-space <a class="header-anchor" href="#white-space" aria-label="Permalink to &quot;white-space&quot;">​</a></h2><p>用来描述要如何处理元素内的空格。[<code>初始值normal</code>-<code>继承属性</code>-<code>适用全部元素</code>]</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">white-space: normal | pre | nowrap | pre-wrap | pre-line;</span></span></code></pre></div><p><code>normal</code>: 连续的空白符会被合并，换行符(Newline characters )会被当作空白符来处理。填充line盒子时，必要的话会换行。</p><p><code>nowrap</code>: 和 <code>normal</code> 一样，连续的空白符会被合并。但文本内的换行无效。</p><p><code>pre</code>: 连续的空白符会被保留。在遇到换行符或者<code>&lt;br&gt;</code>元素时才会换行。</p><p><code>pre-wrap</code>: 连续的空白符会被保留。在遇到换行符或者<code>&lt;br&gt;</code>元素，或者需要为了填充line盒子时才会换行。</p><p><code>pre-line</code>: 连续的空白符会被合并。在遇到换行符或者<code>&lt;br&gt;</code>元素，或者需要为了填充line盒子时会换行。</p><p><strong>各种white-space的值对应的行为如下</strong>：</p><table><thead><tr><th></th><th>换行符</th><th>空白符和制表符</th><th>文字换行</th></tr></thead><tbody><tr><td>normal</td><td>合并</td><td>合并</td><td>转行</td></tr><tr><td>nowrap</td><td>合并</td><td>合并</td><td>不转行</td></tr><tr><td>pre</td><td>保留</td><td>保留</td><td>不转行</td></tr><tr><td>pre-wrap</td><td>保留</td><td>保留</td><td>转行</td></tr><tr><td>pre-line</td><td>保留</td><td>合并</td><td>转行</td></tr></tbody></table><p>效果请看这个<a href="https://jsfiddle.net/hzywLx6u/" target="_blank" rel="noreferrer">MDN的例子</a></p>',29);function h(a,b,w,f,m,_){return o(),r("div",null,[e("h1",p,[d(l(a.$frontmatter.title)+" ",1),n]),i])}const u=t(s,[["render",h]]);export{g as __pageData,u as default};
