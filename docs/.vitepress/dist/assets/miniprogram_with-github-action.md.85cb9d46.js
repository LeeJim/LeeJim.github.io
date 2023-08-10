import{_ as l,o as e,c as t,k as s,a,t as p,S as o}from"./chunks/framework.7f03344f.js";const r="/mp-github-action/dev-flow.png",c="/mp-github-action/github-secrets.png",i="/mp-github-action/github-workflows.png",D="/mp-github-action/miniprogram-version.png",y="/mp-github-action/tdesign-web-preview.png",C="/mp-github-action/github-comment-1.png",A="/mp-github-action/github-comment-2.png",m="/mp-github-action/github-comment-3.png",w=JSON.parse('{"title":"当小程序遇到 GitHub Action","description":"","frontmatter":{"title":"当小程序遇到 GitHub Action"},"headers":[],"relativePath":"miniprogram/with-github-action.md","filePath":"miniprogram/with-github-action.md","lastUpdated":null}'),F={name:"miniprogram/with-github-action.md"},h={id:"frontmatter-title",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),b=o('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>在微信小程序刚发布那会，要想做自动化，都必须有 hack 开发者工具的能力才能做到，而且在 Linux 系统没有开发者工具，需要使用 windows 或 macOS。好在微信也明白开发者的痛点，在小程序发布了 3 年之后的 2020 年提供了 <a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html" target="_blank" rel="noreferrer">CI</a> 的能力。</p><p>在 TDesign 正式开源的前半年，我们投入在自动化这些基础实施的人力比较多，可以分享的内容也挺多，这里主要分享小程序相关的自动化，并且是在 GitHub Actions 上的实现。</p><h2 id="自动上传体验版" tabindex="-1">自动上传体验版 <a class="header-anchor" href="#自动上传体验版" aria-label="Permalink to &quot;自动上传体验版&quot;">​</a></h2><p>在 TDesign 小程序组件库的开发中，比较早期做的CI 能力是自动上传体验版，我也封装了一个 GitHub Actions 可以直接使用：<a href="https://github.com/LeeJim/setup-miniprogram" target="_blank" rel="noreferrer">LeeJim/setup-miniprogram</a>。</p><p>我们的发布流程是这样的：</p><p><img src="'+r+'" alt="开发流程"></p><blockquote><p>其中生成 CHANGELOG 也是发布的痛点，这个能力主要是 @lucaszzhou 实现的，后面他可能会分享了相关实现，我再补充下链接。大家可以期待一下。</p></blockquote><p>可以看到，整个发布流程，我只需要修改 package.json 的版本号，后面的流程几乎都是自动操作的。</p><h3 id="上传密钥" tabindex="-1">上传密钥 <a class="header-anchor" href="#上传密钥" aria-label="Permalink to &quot;上传密钥&quot;">​</a></h3><p>其中，<strong>上传小程序</strong> 这块，需要有上传密钥，具体路径：<a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer">微信公众平台</a> - 开发管理 - 开发设置 - 小程序代码上传密钥。</p><p>由于密钥是敏感的信息，不能放在代码里明文展示，因此需要使用到 GitHub 的 secret。具体路径：Settings - Secrets - Actions - Repository secrets</p><p><img src="'+c+'" alt="GitHub 密钥路径"></p><p>将在微信公众平台下载下来的密钥保存到这里，然后起一个对应的 secret name 即可。使用的时候，在 GitHub Actions 的 <code>yml</code> 文件里可以这样使用，以下以 tdesign-miniprogram 举例：</p><p><img src="'+i+'" alt="miniprogram-action"></p><h3 id="小程序版本关系" tabindex="-1">小程序版本关系 <a class="header-anchor" href="#小程序版本关系" aria-label="Permalink to &quot;小程序版本关系&quot;">​</a></h3><p>小程序的有 3 种版本：开发版、体验版、正式版。体验版和正式版都只有一个，开发版可以有多个，对应的关系是这样的：</p><p><img src="'+D+'" alt="小程序版本关系"></p><p>这里需要特别提醒的一点是，<strong>开发版是可以覆盖的，体验版的关系也会继承</strong>。这里如何决定哪个版本覆盖哪个版本，取决于上传时的 CI 机器人编号，而开发者工具无法选择，因此开发者工具上传的开发版会一直覆盖。</p><p>所以这个流水线的体验版可以自动覆盖，不需要手动选择，也是基于这个原理。</p><h2 id="自动预览" tabindex="-1">自动预览 <a class="header-anchor" href="#自动预览" aria-label="Permalink to &quot;自动预览&quot;">​</a></h2><p>由于 TDesign 小程序组件库的开发环境依赖许多编译工具，因此在验收开发者提交的 PR 时需要 <code>执行构建 - 打开开发者工具 - 点击预览</code> 一系列操作，才能开始扫码体验，较为繁琐。</p><blockquote><p>如果是设计师验收的话，还需要搭开发环境，非常不合理。</p></blockquote><p>另外更麻烦是，小程序的开发版二维码有时效限制（开发者工具显示时效 25 min）。因此没有办法像常规 Web 开发那样，在 PR 的各种检测相关流水通过之后构建出一个产物，后续随时可以验收。</p><h3 id="web-预览方案" tabindex="-1">Web 预览方案 <a class="header-anchor" href="#web-预览方案" aria-label="Permalink to &quot;Web 预览方案&quot;">​</a></h3><p>作为对比，可以先看一下 TDesign Web Vue 的 PR 流程：</p><p><img src="'+y+'" alt="TDesignWeb 预览流程"></p><p>可以看到每当 PR 创建或者同步时，都会触发构建官网，这样每次都能预览该 PR 最新的代码，用以验收。对应的预览评论如下：</p><p><img src="'+C+'" alt="web预览地址"></p><h3 id="小程序预览方案" tabindex="-1">小程序预览方案 <a class="header-anchor" href="#小程序预览方案" aria-label="Permalink to &quot;小程序预览方案&quot;">​</a></h3><p>因为二维码的时效限制，所以小程序的预览不能直接借鉴 Web 的方式，只能在需要验收的时候再构建，这就需要一个触发构建的开关。</p><p>我把这个开关定义成：<strong>在 PR 上评论 “预览” 二字</strong> 。</p><p>以下是触发的过程：</p><p><img src="'+A+'" alt="小程序预览方案1"></p><p>因为构建需要一定的时间，因此先通过 Comment 告知构建已在进行。等构建成功之后，就会用二维码将这个 Comment 替换掉。</p><p><img src="'+m+`" alt="小程序预览方案2"></p><p>以上就是小程序预览方案的大体过程。</p><p>不过在实现这个方案的时候也遇到了不少坑，这里也顺便分享一下。</p><h2 id="github-actions-避坑" tabindex="-1">GitHub Actions 避坑 <a class="header-anchor" href="#github-actions-避坑" aria-label="Permalink to &quot;GitHub Actions 避坑&quot;">​</a></h2><h3 id="获取-pr-对应的代码" tabindex="-1">获取 PR 对应的代码 <a class="header-anchor" href="#获取-pr-对应的代码" aria-label="Permalink to &quot;获取 PR 对应的代码&quot;">​</a></h3><p>因为这个功能使用的是 <code>issue_comment: created</code> 这个触发事件。因此需要判断这个 comment 是属于 PR ，并需要获取 Comment 对应的 PR 信息。</p><p>判断 Comment 是否属于 PR 比较容易，判断这个环境变量是否存在即可：<code>github.event.pull_request</code>。</p><h4 id="获取-pr-信息" tabindex="-1">获取 PR 信息 <a class="header-anchor" href="#获取-pr-信息" aria-label="Permalink to &quot;获取 PR 信息&quot;">​</a></h4><p>但是，可能是因为触发事件的缘故，没法直接通过 <code>github.event.pull_request.head.sha</code> 获取这个 PR 对应的 Commit SHA。</p><p>通过搜索，发现了一个 Action 可以通过 GitHub 的 graphQL 获取对应 PR 的信息：<a href="https://github.com/xt0rted/pull-request-comment-branch" target="_blank" rel="noreferrer">xt0rted/pull-request-comment-branch</a></p><p>但是，这个 Action 又忽略了另外一个重要的问题：<strong>PR 的 base branch 可能是 fork 的仓库</strong>，它没有返回对应的仓库信息。因此我又基于这个 Action 封装了新的 Action：<a href="https://github.com/LeeJim/pull-request-comment-branch" target="_blank" rel="noreferrer">LeeJim/pull-request-comment-branch</a></p><p>至此，基于 <a href="https://github.com/actions/checkout" target="_blank" rel="noreferrer">actions/checkout</a> 和 <a href="https://github.com/LeeJim/pull-request-comment-branch" target="_blank" rel="noreferrer">LeeJim/pull-request-comment-branch</a> 才完成了指定评论对应的 PR 对应的代码克隆工作：</p><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">LeeJim/pull-request-comment-branch@main</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">comment-branch</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/checkout@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">if</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">success()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">ref</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ steps.comment-branch.outputs.head_ref }}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">repository</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ steps.comment-branch.outputs.head_repo_name_with_owner }}</span></span></code></pre></div><h3 id="小程序预览" tabindex="-1">小程序预览 <a class="header-anchor" href="#小程序预览" aria-label="Permalink to &quot;小程序预览&quot;">​</a></h3><p>之前实现小程序发布的时候，因为各种问题也自己实现了一个 Action：<a href="https://github.com/LeeJim/setup-miniprogram" target="_blank" rel="noreferrer">LeeJim/setup-miniprogram</a>。</p><p>因此本次就在这个 Action 的基础上，支持了预览的功能，返回了对应的预览二维码。</p><h3 id="给评论加图片" tabindex="-1">给评论加图片 <a class="header-anchor" href="#给评论加图片" aria-label="Permalink to &quot;给评论加图片&quot;">​</a></h3><p>因为小程序上传之后，可以选择返回 base64 或 jpg 格式的图片，为了避免图床的问题，因此我就想当然地选择 base64。后来才发现 GitHub 的 MarkDown 因为安全限制的问题，不支持 base64 的图片。因此我需要使用另外的图床。</p><h4 id="腾讯云-cos" tabindex="-1">腾讯云 COS <a class="header-anchor" href="#腾讯云-cos" aria-label="Permalink to &quot;腾讯云 COS&quot;">​</a></h4><p>此时，我的想法也很简单，直接使用腾讯云 COS 发布的 Action 上传就完事。结果在 GitHub 上找到的 Action 都是上传完不返回地址的。于是，我又需要创建 一个新的 Action：<a href="https://github.com/LeeJim/tencent-cos-action" target="_blank" rel="noreferrer">LeeJim/tencent-cos-action</a>，将上传的地址返回。</p><h3 id="评论替换" tabindex="-1">评论替换 <a class="header-anchor" href="#评论替换" aria-label="Permalink to &quot;评论替换&quot;">​</a></h3><p>给指定 PR 添加 Comment 使用的 Action：<a href="https://github.com/thollander/actions-comment-pull-request" target="_blank" rel="noreferrer">thollander/actions-comment-pull-request</a>。</p><p>该 Action 提供了 Comment 的功能，但我遇到的坑是文档和版本不一致。所以此刻就觉得 GitHub Actions 设计的巧妙且简单，当遇到问题的时候，可以直接去看对应的代码实现。</p><p>替换的功能是通过 <code>comment_tag</code> 的参数来实现。原理也很简单，就是如果有传 <code>comment_tag</code> 的话，就会查找这个 PR 对应的所有 Comment 是否存在这个 tag，有的话就直接替换，没有就创建一个新的 Comment。</p>`,59),d=o(`<p>以下是 <a href="https://github.com/Tencent/tdesign-miniprogram/blob/develop/.github/workflows/preview.yml" target="_blank" rel="noreferrer">TDesign Miniprogram</a> 自动预览功能的完整实现：</p><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PREVIEW</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">issue_comment</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">types</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#C3E88D;">created</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">request-preview</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">if</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">github.event_name == &#39;issue_comment&#39; &amp;amp;&amp;amp; github.event.issue.pull_request &amp;amp;&amp;amp; github.event.comment.body == &#39;预览&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          timestamp=$(date +%s)</span></span>
<span class="line"><span style="color:#C3E88D;">          echo &quot;timestamp=\${timestamp}&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">time</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Comment PR</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">thollander/actions-comment-pull-request@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">            正在构建预览的二维码，请稍等...</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">comment_tag</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{steps.time.outputs.timestamp}}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">LeeJim/pull-request-comment-branch@main</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">comment-branch</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/checkout@v3</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">if</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">success()</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">ref</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ steps.comment-branch.outputs.head_ref }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">repository</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ steps.comment-branch.outputs.head_repo_name_with_owner }}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./.github/actions/install-dep</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm run build</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">shell</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">bash</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get preview qrcode</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">preview</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">LeeJim/setup-miniprogram@main</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">project_type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">miniProgram</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">action_type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">preview</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">project_path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./_example</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">es6</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">es7</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">minify</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">env</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">MINI_APP_ID</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.TDESIGN_APP_ID }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">MINI_APP_PRIVATE_KEY</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.TDESIGN_MINI_KEY }}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Upload qrcode to Tencent COS</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">LeeJim/tencent-cos-action@main</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cos</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">secretId</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.TENCENT_COS_SECRET_ID }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">secretKey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.TENCENT_COS_SECRET_KEY }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">bucket</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mp-qrcode-1255404841</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">region</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ap-guangzhou</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ steps.preview.outputs.preview-qrcode }}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Comment PR</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">thollander/actions-comment-pull-request@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;img alt=&quot;qrcode&quot; src=&quot;\${{ steps.cos.outputs.url }}&quot; width=&quot;256&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">comment_tag</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{steps.time.outputs.timestamp}}</span></span></code></pre></div><blockquote><p>最后提醒一下，GitHub Actions 对 Public 的仓库是没有 CI 运行累计时长的限制，而 Private 的仓库只能几千分钟的 CI 累计时长，这个需要注意。</p></blockquote>`,3);function g(n,_,q,E,f,P){return e(),t("div",null,[s("h1",h,[a(p(n.$frontmatter.title)+" ",1),u]),b,s("p",null,[a("这里有一个技巧就是：将这个 tag 通过 "),s("code",null,"<!-- $"+p(n.tag)+" -->",1),a(" 包装了，因此在 Comment 也看不到这个 tag。")]),d])}const T=l(F,[["render",g]]);export{w as __pageData,T as default};
