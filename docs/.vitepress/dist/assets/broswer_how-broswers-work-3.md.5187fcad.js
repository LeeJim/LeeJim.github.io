import{_ as n,o as l,c as p,k as s,a as o,t as e,S as t}from"./chunks/framework.7f03344f.js";const B=JSON.parse('{"title":"手把手教你实现一个浏览器引擎（三）CSS","description":"","frontmatter":{"title":"手把手教你实现一个浏览器引擎（三）CSS","date":"2020-02-10T20:49:01.000Z","toc":true,"tags":null,"categories":[["浏览器"],["译文"]]},"headers":[],"relativePath":"broswer/how-broswers-work-3.md","filePath":"broswer/how-broswers-work-3.md","lastUpdated":null}'),c={name:"broswer/how-broswers-work-3.md"},r={id:"frontmatter-title",tabindex:"-1"},D=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),F=t(`<h2 id="第三部分-css" tabindex="-1">第三部分：CSS <a class="header-anchor" href="#第三部分-css" aria-label="Permalink to &quot;第三部分：CSS&quot;">​</a></h2><p>这是关于构建玩具浏览器渲染引擎的系列文章中的第三篇。想要构建你自己的吗？从开始的文章了解更多吧：</p><ul><li><a href="./how-broswers-work-1.html">第一部分：起步</a></li><li><a href="./how-broswers-work-2.html">第二部分：HTML</a></li></ul><p>本文介绍如何关于如何读取并解析 层叠样式表（Cascading Style Sheets，缩写为 CSS）的代码。和往常一样，我不会尝试去涵盖规范中的所有内容。取而代之的是，我会尝试实现这样一个渲染引擎：足以说明一些概念，并为渲染流程的后续阶段提供输入。</p><h2 id="解剖样式" tabindex="-1">解剖样式 <a class="header-anchor" href="#解剖样式" aria-label="Permalink to &quot;解剖样式&quot;">​</a></h2><p>这是CSS源代码的示例：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">h1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">h2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">h3</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#B2CCD6;">margin</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> auto</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">cc0000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#FFCB6B;">div</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">note</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#B2CCD6;">margin-bottom</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20px</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#B2CCD6;">padding</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10px</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">#</span><span style="color:#F78C6C;">answer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#B2CCD6;">display</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> none</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p>接下来，我将通过我的玩具渲染引擎 <a href="https://github.com/mbrubeck/robinson" target="_blank" rel="noreferrer">Robinson</a> 来详细介绍 <a href="https://github.com/mbrubeck/robinson/blob/master/src/css.rs" target="_blank" rel="noreferrer">css module</a>。代码是由 Rust 编写的，尽管这些概念可以轻松地转换成其他编程语言。先阅读前面的文章会帮助你更好理解下面的代码。</p><p>CSS样式表是一系列的规则（上面的示例，每一行包含一条规则）</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Stylesheet</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    rules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Rule</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>一个规则包含一个或多个选择器（由逗号隔开）。后跟着一系列由大括号括起来的声明（declaration）</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Rule</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    selectors</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Selector</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    declarations</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Declaration</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>选择器可以是<a href="http://www.w3.org/TR/CSS2/selector.html#selector-syntax" target="_blank" rel="noreferrer">简单选择器</a>，也可以是通过组合器连接的选择器链。Robinson 目前只支持简单选择器。</p><blockquote><p>令人困惑的是，在较新的 <a href="http://www.w3.org/TR/css3-selectors/" target="_blank" rel="noreferrer">Selectors Level3</a> 标准中，使用了相同的术语表示稍有不同的东西。本文将主要参考 CSS2.1。尽管内容有些过时，但这是一个有用的起点，因为这更小且更独立（与CSS3相比，CSS3分为无数的规范，这些规范和CSS2.1各自相互依赖）</p></blockquote><p>在 Robinson，一个简单选择器可以包括一个标签名，一个带有 <code>#</code> 前缀的ID，任何以 <code>.</code> 为前缀的类名，或者以上的一些组合。如果标签名为空或者是 <code>*</code>，这是一个“通用选择器”，意味着将匹配所有标签。</p><p>还有很多其他类型的选择器（特别是CSS3），不过现在这就可以了。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">enum</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Selector</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">Simple</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">SimpleSelector</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SimpleSelector</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    tag_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Option</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Option</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    class</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>声明（declaration）是一个键值对，由冒号隔开，以分号结尾。举个例子：<code>margin: auto;</code>就是一个声明。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Declaration</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Value</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>我的玩具引擎只支持CSS众多的值类型（value types）的少数。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">enum</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">Keyword</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">Length</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">f32</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Unit</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">ColorValue</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Color</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // insert more values here</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">enum</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Unit</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Px</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // insert more units here</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Color</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    r</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    g</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    b</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    a</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><blockquote><p>Rust提示：u8是一个8位的无符号整型，而 f32 则是 32位浮点型。</p></blockquote><p>其他的所有语法都不支持。包括 @规则，注释，其他上面没提到的选择器，值，单位。</p><h2 id="解析" tabindex="-1">解析 <a class="header-anchor" href="#解析" aria-label="Permalink to &quot;解析&quot;">​</a></h2><p>CSS具有常规的语法，相比起怪异的HTML更易于正确解析。一个符合标准的CSS解析器，遇到解析错误时，会丢弃样式表中不可识别的部分，然后继续处理剩余的部分。这很有用，因为它允许样式表包含新的语法，但仍在较旧的浏览器中产生定义良好的输出。</p><p>Robinson 使用了一个简化的（完全不符合标准的）解析器，和第二部分的HTML解析器构建方式相同。我将不再粘贴所有内容，而只是粘贴一些代码片段。例如，下面是解析单个选择器的代码：</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Parse one simple selector, e.g.: \`type#id.class1.class2.class3\`</span></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">parse_simple_selector</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SimpleSelector</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> selector </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SimpleSelector</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> tag_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">None</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">None</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> class</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eof</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">match</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next_char</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">consume_char</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">                selector</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Some</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse_identifier</span><span style="color:#89DDFF;">());</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">consume_char</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">                selector</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse_identifier</span><span style="color:#89DDFF;">());</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">                // universal selector</span></span>
<span class="line"><span style="color:#A6ACCD;">                self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">consume_char</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            c </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">valid_identifier_char</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                selector</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">tag_name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Some</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse_identifier</span><span style="color:#89DDFF;">());</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            _ </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">break</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> selector</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>需要注意的时，这缺少了错误检查。一些类似 <code>###</code> 或者 <code>*foo*</code> 的错误输入都会被成功解析，然后输出奇怪的结果。一个真正的CSS解析器将会忽略这些无效的选择器。</p><h2 id="明确性-specificity" tabindex="-1">明确性 Specificity <a class="header-anchor" href="#明确性-specificity" aria-label="Permalink to &quot;明确性 Specificity&quot;">​</a></h2><p>明确性是渲染引擎在样式冲突时，决定哪个覆盖哪个的一种方式。</p><p>如果一个样式表中两个规则匹配同一个元素，那么具有较高明确性（high specificity)的匹配选择器的规则可以覆盖具有较低明确性的规则的值。</p><p>选择器的明确性取决于其组成部分。ID选择器比class选择器更明确，而class选择器比tag选择器更明确。重点是，选择器越多越明确。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">pub</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Specificity</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">usize</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">usize</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">usize</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Selector</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">pub</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">specificity</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Specificity</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        // http://www.w3.org/TR/selectors/#specificity</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Selector</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Simple</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">ref</span><span style="color:#A6ACCD;"> simple</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> simple</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">iter</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">count</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> simple</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> c </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> simple</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">tag_name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">iter</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">count</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> c</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>（如果我们支持链式选择器，我们可以通过将各个部分的明确性相加来计算一条链式选择器的明确性）</p><p>每个规则的选择器都存储在有序的数组（译者注：原文为vector，vector在rust表示自增长的数组）中，最具体的放前面。这对于匹配非常重要，我将在下一篇文章介绍。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Parse a rule set: \`&lt;selectors&gt; { &lt;declarations&gt; }\`.</span></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">parse_rule</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Rule</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Rule</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        selectors</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse_selectors</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">        declarations</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse_declarations</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Parse a comma-separated list of selectors.</span></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">parse_selectors</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Selector</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> selectors </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">loop</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        selectors</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Selector</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">Simple</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse_simple_selector</span><span style="color:#89DDFF;">()));</span></span>
<span class="line"><span style="color:#A6ACCD;">        self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">consume_whitespace</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">match</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next_char</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">consume_char</span><span style="color:#89DDFF;">();</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">consume_whitespace</span><span style="color:#89DDFF;">();</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">break</span><span style="color:#89DDFF;">,</span><span style="color:#676E95;font-style:italic;"> // start of declarations</span></span>
<span class="line"><span style="color:#A6ACCD;">            c   </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">panic!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Unexpected character </span><span style="color:#89DDFF;">{}</span><span style="color:#C3E88D;"> in selector list</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> c</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    // Return selectors with highest specificity first, for use in matching.</span></span>
<span class="line"><span style="color:#A6ACCD;">    selectors</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sort_by</span><span style="color:#89DDFF;">(|</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">specificity</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">cmp</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">specificity</span><span style="color:#89DDFF;">()));</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> selectors</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>CSS解析器的剩余部分是相当的直截了当的了。你可以在 <a href="https://github.com/mbrubeck/robinson/blob/master/src/css.rs" target="_blank" rel="noreferrer">GitHub</a> 上看到完整的代码。如果你还没有阅读 <a href="https://developers.weixin.qq.com/community/develop/article/doc/000042df060558bcb3c9361ce5b013" target="_blank" rel="noreferrer">系列文章第二部分</a>，这是一个很好的机会去尝试做一个分析程序生成器（parser generator）。我的手动（译者注：原文为hand-rolled，想表达的意思是作者的解析器是不完善的，只能手动读取文件）解析器可以完成简单文件的解析工作，但是如果你违反了其中的假设，那么将会有很多棘手的地方，且会运行失败。总有一天，我可能会用内置在 <a href="https://github.com/kevinmehall/rust-peg/" target="_blank" rel="noreferrer">rust-peg</a>的东西 或者 类似的东西替换它。</p><p>原文链接：<a href="https://limpet.net/mbrubeck/2014/08/13/toy-layout-engine-3-css.html" target="_blank" rel="noreferrer">https://limpet.net/mbrubeck/2014/08/13/toy-layout-engine-3-css.html</a></p>`,38);function y(a,C,A,i,u,h){return l(),p("div",null,[s("h1",r,[o(e(a.$frontmatter.title)+" ",1),D]),F])}const m=n(c,[["render",y]]);export{B as __pageData,m as default};
