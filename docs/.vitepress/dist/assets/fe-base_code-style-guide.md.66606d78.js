import{_ as n,o as l,c as o,k as s,a as e,t as p,S as t}from"./chunks/framework.7f03344f.js";const c="/code-guide/eslint.png",r="/code-guide/htmlhint.png",i="/code-guide/stylelint.png",D="/code-guide/protect-branch.png",d="/code-guide/merge-request.png",_=JSON.parse('{"title":"编码规范的一些思考","description":"","frontmatter":{"title":"编码规范的一些思考","tags":"编码规范","desc":"如何制定前端的编码规范，以及前端工程化","toc":true,"categories":["前端基础"],"date":"2020-4-12"},"headers":[],"relativePath":"fe-base/code-style-guide.md","filePath":"fe-base/code-style-guide.md","lastUpdated":null}'),y={name:"fe-base/code-style-guide.md"},u={id:"frontmatter-title",tabindex:"-1"},F=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),C=t('<h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>古人常说，无规矩不成方圆。在编程的世界里也同样如此。</p><p>从编程语言，到文件的命名，再上升到项目结构都可以提供相关的规范。</p><p>然而，规范的落地往往都会晚于项目的启动，因此每个团队都会有历史代码需要处理，这是工程师无法逾越，也是心中无法抹去的痛苦。</p><h2 id="现实" tabindex="-1">现实 <a class="header-anchor" href="#现实" aria-label="Permalink to &quot;现实&quot;">​</a></h2><p>在笔者呆过的团队，似乎都在重蹈覆辙：</p><ul><li>一开始不重视文档、规范，快速启动，敏捷开发</li><li>等团队日益壮大，开始制定规范，而此时已经存在大量的历史遗留的问题代码</li><li>由于团队会有些人员变动，因此会出现一些无人认领的孤儿代码</li></ul><p>如此往复，无形中浪费了许多因修复历史代码而产生的工作量。</p><p>笔者认为，有可能是以下几种原因导致这种现象：</p><ul><li>团队早期人员少，项目急，人力不足</li><li>前端开发仍不够成熟，没可落地的完整方案</li><li>经验不足，无法意识到规范的重要性</li></ul><h2 id="范围" tabindex="-1">范围 <a class="header-anchor" href="#范围" aria-label="Permalink to &quot;范围&quot;">​</a></h2><p>我们常说的代码规范属于编码规范的子集。</p><p>笔者理解的编码规范包括一下几种：</p><ul><li>代码规范</li><li>文件规范</li><li>项目结构规范</li></ul><p>其中，<strong>代码规范</strong> 并不是编写有效的代码硬性规定，而是统一代码风格、避免出错的最佳实践。</p><p>代码规范往往含有主观性（比如在JavaScript是否需要分号），孰是孰非可以讨论很久，因此建议小范围投票，快速决定，坚决执行即可。</p><p><strong>文件规范</strong> 则包含：文件的命名规范，以及文件的类型规范（如图片）。</p><p><strong>项目结构规范</strong> 是规范化项目的结构，有利于项目的可读性。</p><p>由于篇幅有限，文本将主要阐述 <strong>代码规范</strong> 的制定与落地实施。</p><h2 id="前端的特殊性" tabindex="-1">前端的特殊性 <a class="header-anchor" href="#前端的特殊性" aria-label="Permalink to &quot;前端的特殊性&quot;">​</a></h2><p>若是其他岗位，可能就涉及一种编程语言，因此确定一种代码规范即可。</p><p>但是前端，涉及到编程语言相对较多，并且不同框架或者runtime也可能导致不同的语法风格，因此需要覆盖的规范也比较多：</p><ul><li>编程语言：JavaScript、CSS、HTML</li><li>框架：Vue、React、Angular</li><li>runtime：Node.js、小程序、浏览器</li><li>语法糖：CoffeeScript、TypeScript</li></ul><p>其中JavaScript是一种极度灵活，约束较少，弱类型的动态编程语言，也是前端开发的主要语言。如果不对编码的风格做一定的约束，必然出现千差万别的风格，虽然都是正确可执行的代码，但这会让代码的可阅读性非常差。</p><p>上述的runtime和语法糖都是针对于<code>JavaScript</code>而言，因此确定<code>JavsScript</code>的代码规范是首要任务。</p><blockquote><p>最好的结果就是每个人写得代码都是一样的。</p></blockquote><h2 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to &quot;快速开始&quot;">​</a></h2><p>导致团队的代码规范难以指定的一个很大原因就是无法快速开始。</p><p>因此笔者提供一种思路：工具驱动规范(Tool Drive Specification)</p><p>通过现有的代码检测工具，反向推到出代码的规范，即有可实施的检测工具，又有了现成的文档，一举两得。</p><p>对于<code>JavaScript</code>来说，最强力的代码分析检测工具非<code>ESLint</code>莫属，其涵盖了代码质量和编码风格的检测。</p><h3 id="eslint" tabindex="-1">ESLint <a class="header-anchor" href="#eslint" aria-label="Permalink to &quot;ESLint&quot;">​</a></h3><p><img src="'+c+`" alt=""></p><p>ESLint官方有提供一个推荐方案，通过配置文件<code>.eslintrc</code>：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint:recommended</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>或者采用业界比较出名的公司规范也可以，比如：Google、Airbnb。</p><p>使用<code>ESlint --init</code>即可开启交互式初始化ESLint配置。</p><p>对于不同的runtime、语法糖和框架而言，都可以使用ESLint作为检测工具，其中的差异则是需要依赖不同的第三方插件来扩展检测能力。以下以团队的首选框架<code>Vue</code>举例说明：</p><p><code>Vue</code>官方提供了ESLint的插件：<a href="https://eslint.vuejs.org/" target="_blank" rel="noreferrer">eslint-plugin-vue</a></p><p>通过此插件，可以利用ESLint检测<code>.vue</code>文件的<code>&lt;template&gt;</code>和<code>&lt;script&gt;</code>模块，检测语法错误，以及编码风格。同样地，插件也有推荐的配置：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugin:vue/vue3-recommended</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">rules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><blockquote><p>另外，可以在<code>rules</code>里覆盖推荐的规范</p></blockquote><p>执行检测：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">eslint</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">**</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">.{js,vue}</span></span></code></pre></div><h3 id="htmlhint" tabindex="-1">HTMLHint <a class="header-anchor" href="#htmlhint" aria-label="Permalink to &quot;HTMLHint&quot;">​</a></h3><p><img src="`+r+`" alt=""></p><p>因为<code>HTML</code>不算真正的编程语言，而是标记语言，因此可以检测的规范不会太多，因此可以手动梳理一便，同时也支持自定义规则。全部的规则：<a href="https://github.com/htmlhint/HTMLHint/wiki/Rules" target="_blank" rel="noreferrer">HTMLHint Rules</a></p><p>通过配置文件<code>.htmlhintrc</code>配置，默认配置如下：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">tagname-lowercase</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">attr-lowercase</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">attr-value-double-quotes</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">doctype-first</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">tag-pair</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">spec-char-escape</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">id-unique</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">src-not-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">attr-no-duplication</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">title-require</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>执行检测：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">htmlhint</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">**</span><span style="color:#C3E88D;">/</span><span style="color:#A6ACCD;">*</span><span style="color:#C3E88D;">.html</span></span></code></pre></div><h3 id="stylelint" tabindex="-1">stylelint <a class="header-anchor" href="#stylelint" aria-label="Permalink to &quot;stylelint&quot;">​</a></h3><p><img src="`+i+`" alt=""></p><p><code>stylelint</code>是<code>CSS</code>的代码分析工具，类似于<code>ESLint</code>，<code>stylelint</code>也提供了 <strong>标准配置(standard configuration)</strong>，安装方式：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--save-dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stylelint</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stylelint-config-standard</span></span></code></pre></div><p>在项目根目录创建配置文件<code>.stylelintrc.json</code>：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylelint-config-standard</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>执行检测：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stylelint</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">**/*.css</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h2 id="实施方案" tabindex="-1">实施方案 <a class="header-anchor" href="#实施方案" aria-label="Permalink to &quot;实施方案&quot;">​</a></h2><p>如果只是制定的代码规范文档，但是没有可实施方案，依靠人为的自觉，必然出现不遵守规则的漏网之鱼。因此，必须落地实施方案，拒绝不符合规范的代码合入代码仓库。以<code>GitLab</code>举例：</p><p>每个仓库均可设置多个分支，在<code>GitLab</code>上对关键分支（比如<code>master</code>）的权限做严格把控，比如：</p><ul><li>不允许任何人直接push到关键分支（Allowed to push: No one)</li></ul><p><img src="`+D+'" alt=""></p><ul><li>仅允许通过pipeline的 <strong>合并请求(merge requests)</strong> 进行合并</li></ul><p><img src="'+d+'" alt=""></p><p>最后在pipeline中添加一个Job：执行以上检测脚本。如果代码有不符合规范，则会直接报错从而终止代码继续合并。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>编码规范的重要性在团队建设的前期，往往容易被忽略，带来的后果是需要消耗更多的时间去掩埋一开始挖的坑。并且在无规范的混沌时期，不同的代码风格导致的代码可读性下降，会无形中加重了开发的负担，降低了开发效率。</p><p>另外，需要切记的是，规范文档的落地不一定需要正式的<code>word</code>格式，<code>markdown</code>、<code>html</code>乃至于配置文件的格式都是可以接受的。重要的是代码规范有落地的检测工具。</p>',70);function h(a,A,g,m,q,b){return l(),o("div",null,[s("h1",u,[e(p(a.$frontmatter.title)+" ",1),F]),C])}const f=n(y,[["render",h]]);export{_ as __pageData,f as default};
