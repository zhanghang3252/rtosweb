import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/**
 * 文档站首页 Hero 区域
 */
function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/getting-started/introduction">
                        开始阅读 →
                    </Link>
                    <Link
                        className="button button--outline button--secondary button--lg"
                        to="/docs/getting-started/quick-start"
                        style={{ marginLeft: '16px' }}>
                        快速上手
                    </Link>
                </div>
            </div>
        </header>
    );
}

/**
 * 特性亮点
 */
const features = [
    {
        title: '⚡ 硬实时内核',
        description: '基于优先级的抢占式调度，< 1μs 任务切换时间，满足最严苛的实时性要求。',
    },
    {
        title: '🧠 极小内存',
        description: '内核 < 2KB ROM，< 512B RAM。支持静态分配，零碎片。',
    },
    {
        title: '🔧 模块化架构',
        description: 'Kconfig 配置系统，按需裁剪，只编译你需要的组件。',
    },
    {
        title: '🔌 丰富驱动',
        description: '统一设备驱动模型，UART/SPI/I2C/GPIO 等主流外设开箱即用。',
    },
    {
        title: '🌐 网络协议栈',
        description: '内置 lwIP TCP/IP + MQTT/HTTP/CoAP，IoT 连接方案开箱即用。',
    },
    {
        title: '🛡️ 安全可靠',
        description: 'MPU 内存保护、栈溢出检测、看门狗监控，面向安全关键系统。',
    },
];

function Features() {
    return (
        <section className={styles.features}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>核心特性</h2>
                <div className="row">
                    {features.map((feat, idx) => (
                        <div key={idx} className={clsx('col col--4')}>
                            <div className={styles.featureCard}>
                                <h3>{feat.title}</h3>
                                <p>{feat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * 首页组件
 */
export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title="首页" description={siteConfig.tagline}>
            <HomepageHeader />
            <main>
                <Features />
            </main>
        </Layout>
    );
}
