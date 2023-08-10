import{_ as n,o as l,c as o,k as s,a as p,t as e,S as t}from"./chunks/framework.7f03344f.js";const c="/components/components-graph.png",r="/components/miniprogram-lifecycle.png",F="/components/vuex.png",v=JSON.parse('{"title":"小程序的组件封装思考","description":"","frontmatter":{"title":"小程序的组件封装思考","desc":"小程序组件封装的思考","tags":["小程序"],"date":"2020-4-8","toc":true,"categories":["小程序"]},"headers":[],"relativePath":"miniprogram/about-components.md","filePath":"miniprogram/about-components.md","lastUpdated":null}'),y={name:"miniprogram/about-components.md"},D={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),C=t('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>在小程序开发的早期，是没有 <strong>自定义组件(component)</strong> ，仅有 <strong>自定义模板(template)</strong> 的。最早接触到组件开发还是在使用 <code>React</code>、<code>Vue</code> 框架的时候，熟悉以上两个框架的读者，对小程序的组件应该会有熟悉的感觉，机制和写法差不多</p><h2 id="为什么要有组件" tabindex="-1">为什么要有组件？ <a class="header-anchor" href="#为什么要有组件" aria-label="Permalink to &quot;为什么要有组件？&quot;">​</a></h2><p>对于这个问题，很多人的第一反应也许是：代码复用</p><p>的确，代码复用是组件的核心职责，但它还有更大的使命：性能</p><p>因为通过组件封装，可以将页面拆分成多个组件，因此较大粒度的页面就被拆分成粒度较小的组件。当一些数据发生变更导致页面变化时，就只需要重新渲染包含该数据的组件即可，而不用渲染整个页面，从而达到了提高渲染性能的效果</p><p><img src="'+c+'" alt=""></p><h2 id="生命周期" tabindex="-1">生命周期 <a class="header-anchor" href="#生命周期" aria-label="Permalink to &quot;生命周期&quot;">​</a></h2><p>在 <code>Vue</code> 中，每个页面是一个 <code>Vue</code> 实例，而组件又是可复用的 <code>Vue</code> 实例，因此可以理解成，页面和组件是相同的生命周期</p><p>而小程序就将页面和组件拆分成两个类：<code>Page</code> 和 <code>Component</code>，因此接收的生命周期函数也是不一样的。比如，<code>Page</code> 接收的是：<code>onLoad</code>、<code>onShow</code>、<code>onReady</code>等函数，而 <code>Component</code> 则接收 <code>created</code>、<code>attached</code>、<code>ready</code> 等函数</p><blockquote><p>命名风格都不一致，真是让人头大</p></blockquote><p><img src="'+r+'" alt=""></p><h2 id="数据传递" tabindex="-1">数据传递 <a class="header-anchor" href="#数据传递" aria-label="Permalink to &quot;数据传递&quot;">​</a></h2><h3 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-label="Permalink to &quot;Vue&quot;">​</a></h3><p><code>Vue</code> 的组件间数据传递的机制是这样的：父组件通过<code>property</code>传递数据给子组件，而子组件通过事件通知的形式传递数据给父组件</p><p>在页面包含的组件结构还比较简单的时候，这样的机制还是比较好用的。但是，随着业务的复杂度逐渐上升，组件嵌套的层数递增，会出现数据层层传递的困境</p><p>为了解决这个问题，<code>Vue</code> 推出了 <code>Vuex</code> 这样的状态管理工具，集中式存储、管理应用的所有组件的状态。并提出了“单向数据流”的理念：</p><p><img src="'+F+`" alt=""></p><h3 id="小程序" tabindex="-1">小程序 <a class="header-anchor" href="#小程序" aria-label="Permalink to &quot;小程序&quot;">​</a></h3><p>小程序同样有类似的机制，<code>property</code>和事件。此外还提供了获取 <strong>子组件实例</strong> 的方法：<code>selectComponent()</code> 和 定义组件间关系的字段 <code>relations</code></p><p>其中常用的就是获取子组件实例，比如:</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">parent-component</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">child-component</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">child</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">child-component</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">parent-component</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>此时，在<code>parent-component</code>组件中可以直接获取<code>child-component</code>的实例：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">attached</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$child</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">selectComponent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#child</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// $child.doSomeThing()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h2 id="实战" tabindex="-1">实战 <a class="header-anchor" href="#实战" aria-label="Permalink to &quot;实战&quot;">​</a></h2><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h3><blockquote><p>制作一个 <strong>对话框(modal)</strong> 组件</p></blockquote><p>也许有的读者会感到困惑，官方不是有提供 <code>wx.showModal</code> 可以直接用吗，为什么要重复造轮子</p><p>其实，当你的产品想要结合 <code>Modal</code> 和 <code>Button</code> 的 <code>open-type</code> 能力时，你就会明白重复造轮子的必要性以及<code>wx.showModal</code>的局限性</p><h3 id="属性定义" tabindex="-1">属性定义 <a class="header-anchor" href="#属性定义" aria-label="Permalink to &quot;属性定义&quot;">​</a></h3><p>对话框的常见属性可以参考<code>wx.showModal</code></p><p>除此以外，其中关键的一个属性就是 表示对话框当前的显示状态：<code>visible</code></p><p>此时，有两种选择，第一种是将这个变量存在页面上，通过<code>property</code>传递给<code>Modal</code>组件；另外一种，就是作为<code>Modal</code>组件<code>data</code>中的一员</p><h3 id="property传递" tabindex="-1">property传递 <a class="header-anchor" href="#property传递" aria-label="Permalink to &quot;property传递&quot;">​</a></h3><p>通过<code>property</code>传递的话，就相当于将 <code>Modal</code> 的控制权交到对应的页面，举例：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- home.wxml --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">modal</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">visible</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{{visible}}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// home.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Page</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">visible</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">toggleModal</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setData</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> visible</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!this.</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">visible</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>此时对应的 <code>Modal</code>：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// modal.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">properties</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">visible</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Boolean</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">observer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">newVal</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">oldVal</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setData</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> visible</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newVal</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><blockquote><p>这里和<code>Vue</code>框架有个差异，<code>Vue</code>对于传进来的property会自动赋值，而小程序则需要自己手动赋值</p></blockquote><h4 id="问题与办法" tabindex="-1">问题与办法 <a class="header-anchor" href="#问题与办法" aria-label="Permalink to &quot;问题与办法&quot;">​</a></h4><p>当 <code>visible</code> 这个变量被 <code>Modal</code> 和 <code>Page</code> 同时使用时，会出现不显示的问题。</p><p>为了便于描述，我通过描述真实场景来讲解：</p><ol><li>当页面需要显示对话框时，<code>Page</code> 传递 <code>visible=true</code> 给 <code>Modal</code></li><li>经过一段时间之后，用户关闭了对话框，此时 <code>Modal</code> 将自身的 <code>visible</code> 设置为 <code>false</code></li><li>当页面需要再次出现对话框时，<code>Page</code> 继续传递<code>visible=true</code> 给 <code>Modal</code>，<strong>此时发现对话框不会显示</strong></li></ol><p>通过分析可以发现，由于 <code>Page</code> 两次传递相同的 <code>visible=true</code> 给 <code>Modal</code> ，因此第二次传递的时候，被 <code>Modal</code> 直接忽略掉了。</p><p>这个问题也很好解决，大致思路就是保证每次传递的值不同即可：</p><ul><li>传递的值前面加上时间戳，组件再将时间戳移除（比较直观，但是不方便）</li><li>利用对象不相等的机制，数据传递只传对象，不传基础数据类型（比如<code>{ visible: true } !== { visible: true }</code>)</li></ul><h3 id="组件自身属性" tabindex="-1">组件自身属性 <a class="header-anchor" href="#组件自身属性" aria-label="Permalink to &quot;组件自身属性&quot;">​</a></h3><p>这种是我推荐的方案。将 <code>visible</code> 属性交由组件 <code>Modal</code> 自行管理：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// modal.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">visible</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">show</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setData</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> visible</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>由于父组件或者当前页面可以直接获取组件的实例，因此可以直接调用组件的<code>setData</code>，如：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> $modal </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">selectComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#modal</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$modal</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setData</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">visible</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>但是不建议这样使用，而是组件暴露方法让外部调用：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> $modal </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">selectComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#modal</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$modal</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">show</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><h3 id="组件的事件" tabindex="-1">组件的事件 <a class="header-anchor" href="#组件的事件" aria-label="Permalink to &quot;组件的事件&quot;">​</a></h3><p>通常，对话框都会有按钮，一个或两个。</p><p>因此 <code>Modal</code> 需要与父组件通过 <strong>事件(event)</strong> 的方式传递信息：当前点击了取消还是确定按钮：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- home.wxml --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">modal</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">modal</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">bind:btntap</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">handleModalTap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// home.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Page</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">showModal</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$modal</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">selectComponent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#modal</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">$modal</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">show</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 其他方法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">handleModalTap</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">detail</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// type = cancel or confirm</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>在 <code>Modal</code> 的构造函数则是这样的：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// modal.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">visible</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">handleBtnTap</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">dataset</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">triggerEvent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">btntap</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- modal.wxml --&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">wrapper</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">&lt;!-- 省略其他结构 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">foot</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">bindtap</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">handleBtnTap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cancel</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">取消</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">confirm</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">确定</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>这样设计 <code>Modal</code> 组件，的确可以满足使用，但是不够好用</p><p>因为展示对话框时使用的是 <code>showModal</code> 而用户操作之后又是通过另外一个方法 <code>handleModalTap</code> 反馈的。当一段时间之后回看这样的代码，会发现这种写法存在思维的中断，不利于代码维护</p><p>所以，我建议结合 <code>Promise</code> 来封装 <code>Modal</code></p><h3 id="省略事件" tabindex="-1">省略事件 <a class="header-anchor" href="#省略事件" aria-label="Permalink to &quot;省略事件&quot;">​</a></h3><p>由于展示对话框之后，用户必然要操作，因此可以在 <code>showModal</code> 的时候，通过 <code>Promise</code> 返回对应的操作信息即可</p><p>另外，需要引入发布订阅机制（以下使用 <code>Node.js</code> 的 <code>Events</code> 举例）：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// modal.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> EventEmitter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">events</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ee </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">EventEmitter</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">visible</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">show</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">setData</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> visible</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">ee</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">on</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cancel</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                    </span><span style="color:#82AAFF;">reject</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">ee</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">on</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">confirm</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                    </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">handleBtnTap</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">dataset</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">ee</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">emit</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">triggerEvent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">btntap</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>此时，在 <code>Page</code> 即可这样展示对话框：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// home.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">Page</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">onLoad</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">$modal</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">selectComponent</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#modal</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">$moda</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">show</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// 当点击确认时</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// 当点击取消时</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>组件是很好用的机制，也是最常用到的能力。因此日常开发中，应该会遇到各种各样组件封装的问题，平时遇到应该多思考总结一下，对团队和自己都很有帮助！</p>`,73);function A(a,d,h,m,u,g){return l(),o("div",null,[s("h1",D,[p(e(a.$frontmatter.title)+" ",1),i]),C])}const E=n(y,[["render",A]]);export{v as __pageData,E as default};