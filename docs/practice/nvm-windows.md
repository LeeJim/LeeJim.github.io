---
title: 多版本 Node.js
date: 2016-11-03 17:06:19
tags: Node.js
desc: Windows下安装多版本的Node.js
toc: true
categories:
- Node.js
---

# {{ $frontmatter.title }}

## 前言

最近，Node.js 的 LTS 版本已经升级到 6.9.1 了，最新的版本都已经出到 7.0 了。

然而我还在使用 5.x 版本，于是我将本地开发的 Node.js 升级到 6.9.1。

于是，悲剧发生了，以前的项目在新版本的 Node.js 下运行不了。

所以我发现，拥有多版本的 Node.js 还是很有必要的。

<!-- more -->

## 开发环境

### linux / MacOs

如果是在 `*nux` 的开发环境可以直接安装 `nvm` 即可

### Windows

需要安装 [nvm-window](https://github.com/coreybutler/nvm-windows)

在此我着重说一下 `nvm-windows` 需要注意的地方：

- 安装 `nvm-windows` 之前需把已安装的 Node.js 删除，（比如：如果 `“C:\Program Files\nodejs”` 这个目录存在的话就要删掉，不然 nvm 无法使用）
- 需要把 NPM 删掉(e.g. `"C:\Users<user>\AppData\Roaming\npm"`)
- 对应每 Node.js 版本的全局安装方法都用重新安装，比如：

```sh
nvm use 4.0.0
npm install -g grunt

#切换版本
nvm use 7.0.0
npm install -g grunt
```