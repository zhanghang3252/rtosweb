/**
 * Docusaurus 侧边栏配置
 * 
 * 组织结构：
 * - getting-started: 快速入门（安装、配置、第一个项目）
 * - kernel: 内核指南（任务、调度、同步、通信）
 * - api: API 参考手册
 * - porting: 移植指南
 * - advanced: 高级主题
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    tutorialSidebar: [
        // ====== 快速入门 ======
        {
            type: 'category',
            label: '快速入门',
            collapsed: false,
            items: [
                'getting-started/introduction',
                'getting-started/installation',
                'getting-started/quick-start',
                'getting-started/build-guide',
            ],
        },

        // ====== 内核指南 ======
        {
            type: 'category',
            label: '内核指南',
            collapsed: false,
            items: [
                'kernel/overview',
                'kernel/task',
                'kernel/scheduler',
                'kernel/timer',
                'kernel/ipc',
                'kernel/memory',
                'kernel/interrupt',
            ],
        },

        // ====== 组件 ======
        {
            type: 'category',
            label: '组件',
            items: [
                'components/network',
                'components/filesystem',
                'components/shell',
                'components/log',
                'components/utest',
            ],
        },

        // ====== 驱动框架 ======
        {
            type: 'category',
            label: '驱动框架',
            items: [
                'drivers/overview',
                'drivers/uart',
                'drivers/spi',
                'drivers/i2c',
                'drivers/gpio',
                'drivers/adc',
                'drivers/pwm',
            ],
        },

        // ====== 移植指南 ======
        {
            type: 'category',
            label: '移植指南',
            items: [
                'porting/porting-guide',
                'porting/cortex-m',
                'porting/risc-v',
                'porting/new-board',
            ],
        },

        // ====== API 参考 ======
        {
            type: 'category',
            label: 'API 参考',
            items: [
                'api/index',
                'api/task-api',
                'api/ipc-api',
                'api/timer-api',
                'api/memory-api',
                'api/device-api',
            ],
        },

        // ====== 高级主题 ======
        {
            type: 'category',
            label: '高级主题',
            items: [
                'advanced/performance',
                'advanced/debugging',
                'advanced/security',
                'advanced/smp',
            ],
        },
    ],
};

module.exports = sidebars;
