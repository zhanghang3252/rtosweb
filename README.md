# ⚡ MyRTOS — 开源实时操作系统

[![Deploy Website](https://github.com/zhanghang3252/rtosweb/actions/workflows/deploy-website.yml/badge.svg)](https://github.com/zhanghang3252/rtosweb/actions/workflows/deploy-website.yml)
[![Deploy Docs](https://github.com/zhanghang3252/rtosweb/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/zhanghang3252/rtosweb/actions/workflows/deploy-docs.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

> 面向嵌入式系统的轻量级实时操作系统，硬实时调度、极小内存占用、模块化架构。

---

## 🌐 官网生态

| 项目 | 地址 | 说明 |
|------|------|------|
| **官方网站** | https://zhanghang3252.github.io/rtosweb/ | RTOS 门户首页 |
| **文档站** | https://zhanghang3252.github.io/rtosweb/docs/ | Docusaurus 技术文档 |
| **论坛** | https://zhanghang3252.github.io/rtosweb/forum/ | Discourse 社区论坛 |
| **GitHub** | https://github.com/zhanghang3252/rtosweb | 源码仓库 |

## 📁 项目结构

```
rtosdoc/
├── website/                     # 官方门户网站（纯静态 HTML/CSS/JS）
│   ├── index.html               # 首页
│   ├── features.html            # 特性页
│   ├── getting-started.html     # 快速开始页
│   ├── download.html            # 下载页
│   ├── community.html           # 社区页
│   └── assets/                  # 静态资源
│       ├── css/style.css        # 主样式表（含深色/浅色模式）
│       ├── js/main.js           # 主脚本
│       └── images/              # 图片资源
├── docs/                        # Docusaurus 文档站
│   ├── docusaurus.config.js     # Docusaurus 配置
│   ├── sidebars.js              # 侧边栏配置
│   ├── package.json             # Node.js 依赖
│   ├── src/                     # 自定义页面和样式
│   └── docs/                    # Markdown 文档
│       ├── getting-started/     # 快速入门
│       ├── kernel/              # 内核指南
│       ├── api/                 # API 参考
│       ├── drivers/             # 驱动框架
│       ├── porting/             # 移植指南
│       └── advanced/            # 高级主题
├── .github/workflows/           # GitHub Actions CI/CD
│   ├── deploy-website.yml       # 部署门户网站
│   └── deploy-docs.yml          # 部署文档站
├── scripts/                     # 部署脚本
│   └── deploy.sh                # 一键部署脚本
├── README.md                    # 项目说明
└── .gitignore                   # Git 忽略规则
```

## 🚀 快速开始

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/zhanghang3252/rtosweb.git
cd rtosweb

# 2. 安装文档站依赖
cd docs && npm install && cd ..

# 3. 本地预览文档站
cd docs && npm run start

# 4. 本地预览门户网站
# 直接用浏览器打开 website/index.html
# 或使用 VS Code Live Server 插件
```

### 部署到 GitHub Pages

```bash
# 方式一：自动部署（推荐）
# 推送到 main 分支后，GitHub Actions 自动构建并部署
git add .
git commit -m "docs: update website"
git push origin main

# 方式二：使用部署脚本
chmod +x scripts/deploy.sh
./scripts/deploy.sh --all
```

## ⚙️ 配置指南

### 1. 替换 GitHub 用户名

在以下文件中将 `zhanghang3252` 替换为你的 GitHub 用户名：

- `website/*.html` — 所有页面中的 GitHub 链接
- `docs/docusaurus.config.js` — 文档站配置
- `.github/workflows/*.yml` — CI/CD 配置（通常不需要修改）
- `README.md` — 项目说明

### 2. 配置 GitHub Pages

1. 进入 GitHub 仓库 → Settings → Pages
2. Source 选择 "GitHub Actions"
3. 推送代码后自动部署

### 3. 自定义域名（可选）

1. 在 `website/` 目录创建 `CNAME` 文件，内容为你的域名
2. 在 DNS 提供商配置 CNAME 记录指向 `zhanghang3252.github.io`

## 🛠️ 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| 门户网站 | HTML + CSS + JavaScript | 纯静态，零依赖 |
| 文档站 | Docusaurus 3.x | React + MDX |
| CI/CD | GitHub Actions | 自动构建部署 |
| 托管 | GitHub Pages | 静态网站托管 |
| 样式 | CSS Variables | 深色/浅色双模式 |

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE) 开源许可证。

---

<p align="center">
  Made with ⚡ by MyRTOS Team
</p>
