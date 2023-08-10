import{_ as n,o as l,c as o,k as s,a as p,t as e,S as t}from"./chunks/framework.7f03344f.js";const m=JSON.parse('{"title":"MongoDB 使用记录","description":"","frontmatter":{"title":"MongoDB 使用记录","date":"2016-10-17T20:11:36.000Z","tags":"MongoDB","desc":null,"toc":true,"categories":["数据库"]},"headers":[],"relativePath":"practice/mongodb.md","filePath":"practice/mongodb.md","lastUpdated":null}'),c={name:"practice/mongodb.md"},r={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),y=t(`<p>记录一下mongodb的使用记录，包含常用的启动、操作等命令。</p><h2 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-label="Permalink to &quot;初始化&quot;">​</a></h2><h3 id="文件目录" tabindex="-1">文件目录 <a class="header-anchor" href="#文件目录" aria-label="Permalink to &quot;文件目录&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">-data</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#数据</span></span>
<span class="line"><span style="color:#FFCB6B;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">log</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#日志</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mongod.log</span></span>
<span class="line"><span style="color:#FFCB6B;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">conf</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mongod.conf</span></span>
<span class="line"><span style="color:#FFCB6B;">bin</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#二进制目录</span></span></code></pre></div><h3 id="启动的配置文件" tabindex="-1">启动的配置文件 <a class="header-anchor" href="#启动的配置文件" aria-label="Permalink to &quot;启动的配置文件&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">port</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12345</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#启动端口</span></span>
<span class="line"><span style="color:#FFCB6B;">dbpath</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">data</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#数据路径</span></span>
<span class="line"><span style="color:#FFCB6B;">logpath</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">log/mongod.log</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#日志路径</span></span>
<span class="line"><span style="color:#FFCB6B;">fork</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#表明启动的是后台进程 windows下无效</span></span></code></pre></div><h2 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h2><h3 id="启动数据库" tabindex="-1">启动数据库 <a class="header-anchor" href="#启动数据库" aria-label="Permalink to &quot;启动数据库&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">mongod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">conf/mongod.conf</span></span></code></pre></div><h3 id="连接数据库" tabindex="-1">连接数据库 <a class="header-anchor" href="#连接数据库" aria-label="Permalink to &quot;连接数据库&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">mongo</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">127.0</span><span style="color:#C3E88D;">.0.1:12345/test</span></span></code></pre></div><h2 id="基本操作" tabindex="-1">基本操作 <a class="header-anchor" href="#基本操作" aria-label="Permalink to &quot;基本操作&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">show</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dbs</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#显示所有数据库</span></span>
<span class="line"><span style="color:#FFCB6B;">use</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">company</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#使用company数据库 不存在则自动创建</span></span>
<span class="line"><span style="color:#FFCB6B;">show</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">collections</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#显示所有collection</span></span>
<span class="line"><span style="color:#FFCB6B;">show</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tables</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#效果同上</span></span></code></pre></div><h2 id="crud" tabindex="-1">CRUD <a class="header-anchor" href="#crud" aria-label="Permalink to &quot;CRUD&quot;">​</a></h2><h3 id="插入数据" tabindex="-1">插入数据 <a class="header-anchor" href="#插入数据" aria-label="Permalink to &quot;插入数据&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">db.company_list.insert(</span><span style="color:#A6ACCD;">{name: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">one</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;"># company_list为collection，不存在则自动创建，然后插入一个数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">for</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#FFCB6B;">i&lt;10</span><span style="color:#89DDFF;">;</span><span style="color:#FFCB6B;">i++</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> db.company_list.insert</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">{name: i}) #使用js的语法插入10个数据</span></span></code></pre></div><h3 id="查找数据" tabindex="-1">查找数据 <a class="header-anchor" href="#查找数据" aria-label="Permalink to &quot;查找数据&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">db.company_list.find</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> #显示该collection的所有数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">db.company_list.find</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">{name: &#39;one&#39;}) #显示对应条件的数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">db.company_list.find</span><span style="color:#89DDFF;">()</span><span style="color:#FFCB6B;">.skip(2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">.limit</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">3</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">.sort</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">{name: 1}) #跳过前2个数据，按name排序获取3个数据</span></span></code></pre></div><h3 id="数据更新" tabindex="-1">数据更新 <a class="header-anchor" href="#数据更新" aria-label="Permalink to &quot;数据更新&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">db.company_list.update(</span><span style="color:#A6ACCD;">{x:1}</span><span style="color:#FFCB6B;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{x:1000}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">#第一个参数是查找条件，第二个参数是修改后的数据 注意：修改后的完整数据（即{x:1,y:1} =&gt; {x:1000}）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">db.company_list.update(</span><span style="color:#A6ACCD;">{x:1}</span><span style="color:#FFCB6B;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#A6ACCD;">$set</span><span style="color:#C3E88D;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{x:1000}}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">#只修改x字段</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">db.company_list.update(</span><span style="color:#A6ACCD;">{x:99, </span><span style="color:#C3E88D;">{y:99},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">#修改一个不存在的数据则插入这个数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">db.company_list.update(</span><span style="color:#A6ACCD;">{x:1}</span><span style="color:#FFCB6B;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{y:99},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false</span><span style="color:#C3E88D;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">#批量修改多条数据</span></span></code></pre></div><h3 id="删除数据" tabindex="-1">删除数据 <a class="header-anchor" href="#删除数据" aria-label="Permalink to &quot;删除数据&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">db.company_list.remove(</span><span style="color:#A6ACCD;">{x:1}) </span><span style="color:#676E95;font-style:italic;">#默认删除对应条件的所有数据</span></span>
<span class="line"><span style="color:#82AAFF;">dp.company_list.drop</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> #删除collection</span></span></code></pre></div><h2 id="索引相关" tabindex="-1">索引相关 <a class="header-anchor" href="#索引相关" aria-label="Permalink to &quot;索引相关&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">db.company_list.getIndexes</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> #列出所有索引</span></span>
<span class="line"><span style="color:#A6ACCD;">db.company_list.ensureIndex</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">{x:1}) #设置索引</span></span></code></pre></div><h3 id="索引的类型" tabindex="-1">索引的类型 <a class="header-anchor" href="#索引的类型" aria-label="Permalink to &quot;索引的类型&quot;">​</a></h3><ul><li>_id索引</li><li>单键索引</li><li>多键索引</li><li>复合索引</li><li>过期索引</li><li>全文索引</li><li>地理位置索引</li></ul><h2 id="权限相关" tabindex="-1">权限相关 <a class="header-anchor" href="#权限相关" aria-label="Permalink to &quot;权限相关&quot;">​</a></h2><h3 id="创建用户" tabindex="-1">创建用户 <a class="header-anchor" href="#创建用户" aria-label="Permalink to &quot;创建用户&quot;">​</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">db.createUser(</span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">user:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;name&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">pwd</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;cleartext password&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">customData:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">any</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">information},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">roles:</span><span style="color:#A6ACCD;"> [{</span><span style="color:#FFCB6B;">role:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;role&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">db:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&lt;database&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">}]</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><h3 id="用户类型" tabindex="-1">用户类型： <a class="header-anchor" href="#用户类型" aria-label="Permalink to &quot;用户类型：&quot;">​</a></h3><ul><li>read</li><li>readWrite</li><li>dbAdmin</li><li>dbOwner</li><li>userAdmin</li></ul>`,31);function C(a,D,d,A,h,F){return l(),o("div",null,[s("h1",r,[p(e(a.$frontmatter.title)+" ",1),i]),y])}const b=n(c,[["render",C]]);export{m as __pageData,b as default};