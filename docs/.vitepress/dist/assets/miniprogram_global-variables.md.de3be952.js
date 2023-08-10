import{_ as l,o,c as n,k as s,a as p,t as e,S as t}from"./chunks/framework.7f03344f.js";const c="/global-window.png",r="/global-global.png",y="/compatibility-symbol.jpg",i="/compatibility-proxy.jpg",_=JSON.parse('{"title":"小程序如何管理全局变量","description":"","frontmatter":{"title":"小程序如何管理全局变量","tags":"小程序","desc":"小程序的全局变量要如何管理","date":"2020-4-7","toc":true,"categories":["小程序"]},"headers":[],"relativePath":"miniprogram/global-variables.md","filePath":"miniprogram/global-variables.md","lastUpdated":null}'),D={name:"miniprogram/global-variables.md"},F={id:"frontmatter-title",tabindex:"-1"},d=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),A=t('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><blockquote><p>在浏览器的环境下有一个全局变量：<code>window</code>。 若定义变量时，遗漏了<code>var</code>，此时声明的变量就变成了全局变量，自动挂载到<code>window</code>下，可当做<code>window</code>的属性来访问，也可以直接访问。</p></blockquote><p>小程序的底层也是通过Web实现的，因此同样存在<code>window</code>对象，但是微信团队做了些处理：</p><p><img src="'+c+'" alt=""></p><p>微信团队将<code>window</code>设置成了<code>writable:false</code>，且值也为<code>undefined</code>。</p><p>即我们无法像在<code>web</code>那样任意声明全局变量。但微信团队提供了其他的全局变量，比如常用的<code>wx</code>、<code>global</code>。</p><h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h2><p>虽然<code>window</code>是只读的，但是<code>global</code>是可写的:</p><p><img src="'+r+`" alt=""></p><p>因此常见的做法，就是将需要全局访问的变量都保存到<code>global</code>下，间接声明了全局变量。</p><p>全局变量的污染，在小团队的项目里可能没什么感知。但是在一个大型的项目里，是非常常见的，一不小心就将别人声明的变量覆盖了。</p><p>另外如果可以随意注册全局变量，又不加以管理的话，有可能会导致内存泄漏，最终导致应用闪退。</p><blockquote><p>同理，setStorage也存在同样的问题。</p></blockquote><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p>简单地将这些变量改成<code>readonly</code>肯定是不可取的，这影响了日常的开发。</p><p>在早期的前端开发中，也有同样类似的全局变量污染的问题，我依稀记得两种解决方案：</p><ul><li>命名空间</li><li>模块化</li></ul><p>其中 <strong>模块化</strong> 明显不是这个问题的解决方案。因为目前的确是需要全局变量的，问题只是如何避免污染和管理全局变量而已。</p><p>因此 <strong>命名空间</strong> 是可以深入探索的思路。</p><h2 id="实践" tabindex="-1">实践 <a class="header-anchor" href="#实践" aria-label="Permalink to &quot;实践&quot;">​</a></h2><h3 id="命名空间" tabindex="-1">命名空间 <a class="header-anchor" href="#命名空间" aria-label="Permalink to &quot;命名空间&quot;">​</a></h3><p>命名空间是一种常用的代码组织形式。</p><p>大致做法是，先通过命名分配空间，再使用空间。</p><blockquote><p>我的习惯是，用业务或者功能来命名空间</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">global</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">localStorage </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">doSet</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">doGet</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">doClear</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">global</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">util </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">format</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">valide</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>命名空间是通过互相约定的方式来工作的，因此仍然会存在覆盖的问题。</p><h3 id="symbol" tabindex="-1">Symbol <a class="header-anchor" href="#symbol" aria-label="Permalink to &quot;Symbol&quot;">​</a></h3><p><code>Symbol</code>是ES2015中新增的基本数据类型。这个类型有个特别之处，每个<code>Symbol()</code>返回的值都是独一无二的，举个例子：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">Symbol</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Symbol</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// false</span></span></code></pre></div><p>因此通过<code>Symbol</code>的方式，可以完美避免变量被覆盖：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// car.js</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> car </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Symbol</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">global[car] </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// health.js</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> health </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Symbol</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">global[health] </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><p>由于每个<code>Symbol</code>返回的值是唯一的，因此这个<code>Symbol</code>可以单独保存，以便各个文件引用。</p><blockquote><p>由于 <code>Symbol</code> 属于新特性，因此需要关注下兼容性</p></blockquote><p><img src="`+y+`" alt=""></p><h3 id="管理声明" tabindex="-1">管理声明 <a class="header-anchor" href="#管理声明" aria-label="Permalink to &quot;管理声明&quot;">​</a></h3><p>通过<code>Symbol</code>的方式解决了变量的污染问题，但仍然无法对全局变量的声明进行管理。</p><p>我想到的办法就是给 <code>global</code> 增加个代理，对 <code>global</code> 的任何操作，都先经过代理检测，这样就有了强力的保障。</p><p>因此，可以使用新特性：<code>Proxy</code> 来监听 <code>global</code> 的变更，举例说明：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">global </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#A6ACCD;">(global</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">prop</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">val</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">prop</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">throw</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">TypeError</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">prop</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">: 该属性已定义！</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 可以做其他策略</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 或者上报数据，让你知道有哪些人偷偷定义了全局对象</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">prop</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">val</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><blockquote><p>由于 <code>Proxy</code> 属于新特性，因此需要关注下兼容性</p></blockquote><p><img src="`+i+'" alt=""></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>使用 <code>Proxy</code> 之后，能对 <code>global</code> 的各种操作（设置属性，设置原型等13种操作）进行监控，即能避免重复定义变量，也可以很好的管理全局变量，两全其美。</p>',43);function C(a,b,h,m,g,u){return o(),n("div",null,[s("h1",F,[p(e(a.$frontmatter.title)+" ",1),d]),A])}const k=l(D,[["render",C]]);export{_ as __pageData,k as default};
