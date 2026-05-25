// @ts-check
/**
 * Docusaurus 配置文件
 * 
 * 重要说明：
 * - url: 部署后的完整站点 URL
 * - baseUrl: GitHub Pages 的子路径
 *   - 个人主页仓库 (username.github.io): baseUrl = '/'
 *   - 项目子路径仓库: baseUrl = '/rtosweb/'
 * - organizationName / projectName: 替换为你的 GitHub 用户名和仓库名
 */

const config = {
    title: 'MyRTOS 文档',
    tagline: '开源实时操作系统 — 完整技术文档',
    favicon: 'img/favicon.ico',

    // ====== 部署配置（必须修改） ======
    url: 'https://zhanghang3252.github.io',
    baseUrl: '/rtosweb/',  // 个人主页仓库改为 '/'

    // GitHub 仓库信息
    organizationName: 'zhanghang3252',
    projectName: 'rtosweb',
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans', 'en'],
        localeConfigs: {
            'zh-Hans': { label: '中文' },
            'en': { label: 'English' },
        },
    },

    // ====== 主题配置 ======
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    editUrl: 'https://github.com/zhanghang3252/rtosweb/tree/main/docs/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/zhanghang3252/rtosweb/tree/main/blog/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    // ====== 主题组件 ======
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // 元数据
            metadata: [
                { name: 'keywords', content: 'RTOS, 实时操作系统, 嵌入式开发, 文档' },
                { name: 'description', content: 'MyRTOS 官方文档 — 从入门到精通的完整技术指南' },
            ],

            // 颜色模式（默认深色）
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },

            // 导航栏
            navbar: {
                title: 'MyRTOS',
                logo: {
                    alt: 'MyRTOS Logo',
                    src: 'img/logo.svg',
                },
                style: 'dark',
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: '文档',
                    },
                    { to: '/blog', label: '博客', position: 'left' },
                    {
                        href: 'https://github.com/zhanghang3252/rtosweb',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                ],
            },

            // 页脚
            footer: {
                style: 'dark',
                links: [
                    {
                        title: '文档',
                        items: [
                            { label: '快速开始', to: '/docs/getting-started/installation' },
                            { label: 'API 参考', to: '/docs/api/' },
                            { label: '移植指南', to: '/docs/porting/' },
                        ],
                    },
                    {
                        title: '社区',
                        items: [
                            { label: 'GitHub Discussions', href: 'https://github.com/zhanghang3252/rtosweb/discussions' },
                            { label: '论坛', href: 'https://zhanghang3252.github.io/rtosweb/forum/' },
                            { label: '贡献指南', href: 'https://github.com/zhanghang3252/rtosweb/blob/main/CONTRIBUTING.md' },
                        ],
                    },
                    {
                        title: '更多',
                        items: [
                            { label: '官网', href: 'https://zhanghang3252.github.io/rtosweb/' },
                            { label: 'GitHub', href: 'https://github.com/zhanghang3252/rtosweb' },
                            { label: '博客', to: '/blog' },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} MyRTOS. Released under the Apache License 2.0.`,
            },

            // 代码高亮
            prism: {
                theme: require('prism-react-renderer').themes.github,
                darkTheme: require('prism-react-renderer').themes.dracula,
                additionalLanguages: ['c', 'cmake', 'bash', 'json'],
            },

            // 搜索（可选，使用本地搜索）
            // algolia: {
            //     appId: 'YOUR_APP_ID',
            //     apiKey: 'YOUR_SEARCH_API_KEY',
            //     indexName: 'myrtos',
            // },
        }),
};

module.exports = config;
