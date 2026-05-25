/**
 * MyRTOS 官网主脚本
 * 
 * 功能：
 * - 深色/浅色主题切换（默认深色，记忆用户偏好）
 * - 终端打字机动画
 * - 导航栏滚动效果
 * - 移动端菜单
 * - 代码复制按钮
 */

(function () {
    'use strict';

    /* ==========================================================
     * 1. 主题切换
     * ========================================================== */
    const THEME_KEY = 'myrtos-theme';   // localStorage 键名
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    /**
     * 应用主题
     * @param {'dark'|'light'} theme
     */
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    /**
     * 初始化主题：优先读取本地存储，否则默认深色
     */
    function initTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        applyTheme(saved || 'dark');
    }

    // 绑定切换按钮
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = html.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    initTheme();

    /* ==========================================================
     * 2. 终端打字机动画
     * ========================================================== */
    const typewriterEl = document.getElementById('typewriterText');

    if (typewriterEl) {
        const commands = [
            'git clone https://github.com/rtosweb/rtosweb.git',
            'cd myrtos && scons --menuconfig',
            'scons -j$(nproc)',
            'myrtos flash --port=/dev/ttyUSB0',
        ];
        let cmdIndex = 0;   // 当前命令索引
        let charIndex = 0;  // 当前字符索引
        let isDeleting = false;
        let pauseTimer = 0;

        /**
         * 打字机动画主循环
         */
        function typeLoop() {
            const current = commands[cmdIndex];

            if (!isDeleting) {
                // 打字阶段
                typewriterEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === current.length) {
                    // 打完，暂停后开始删除
                    pauseTimer = setTimeout(function () {
                        isDeleting = true;
                        typeLoop();
                    }, 2000);
                    return;
                }
                setTimeout(typeLoop, 50 + Math.random() * 40);
            } else {
                // 删除阶段
                typewriterEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    cmdIndex = (cmdIndex + 1) % commands.length;
                    setTimeout(typeLoop, 500);
                    return;
                }
                setTimeout(typeLoop, 25);
            }
        }

        // 页面加载后延迟启动动画
        setTimeout(typeLoop, 800);
    }

    /* ==========================================================
     * 3. 导航栏滚动效果
     * ========================================================== */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        let ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ==========================================================
     * 4. 移动端菜单
     * ========================================================== */
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarNav = document.getElementById('navbarNav');

    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', function () {
            navbarNav.classList.toggle('open');
            // 动画汉堡图标
            this.classList.toggle('active');
        });

        // 点击链接后关闭菜单
        navbarNav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navbarNav.classList.remove('open');
                navbarToggle.classList.remove('active');
            });
        });
    }

    /* ==========================================================
     * 5. 代码复制按钮
     * ========================================================== */
    window.copyCode = function (btn) {
        const codeBlock = btn.closest('.code-block');
        if (!codeBlock) return;

        const codeEl = codeBlock.querySelector('code');
        if (!codeEl) return;

        // 获取纯文本（去掉 HTML 标签）
        const text = codeEl.textContent;

        navigator.clipboard.writeText(text).then(function () {
            const original = btn.textContent;
            btn.textContent = '已复制 ✓';
            btn.style.color = 'var(--accent)';
            setTimeout(function () {
                btn.textContent = original;
                btn.style.color = '';
            }, 2000);
        }).catch(function () {
            // 降级方案
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            const original = btn.textContent;
            btn.textContent = '已复制 ✓';
            setTimeout(function () {
                btn.textContent = original;
            }, 2000);
        });
    };

    /* ==========================================================
     * 6. 平滑滚动到锚点
     * ========================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

})();
