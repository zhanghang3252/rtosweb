---
sidebar_position: 4
title: SMP 多核支持
description: MyRTOS 对称多处理 (SMP) 支持
keywords: [SMP, 多核, 多处理器, 负载均衡]
---

# SMP 多核支持

MyRTOS 支持对称多处理 (SMP)，可以在多核处理器上运行。

## SMP 架构

```
┌─────────────────────────────────────┐
│         统一调度器 (SMP)             │
├──────────┬──────────┬───────────────┤
│  Core 0  │  Core 1  │   Core N      │
│  任务集  │  任务集  │   任务集       │
└──────────┴──────────┴───────────────┘
```

## 配置

```bash
# menuconfig 中启用 SMP
RT_USING_SMP=y
RT_CPUS_NR=2          # CPU 核心数
```

## 核心亲和性

```c
/* 将任务绑定到指定核心 */
rt_thread_control(tid, RT_THREAD_CTRL_BIND_CPU, (void *)0);

/* 任务可在任意核心运行（默认） */
rt_thread_control(tid, RT_THREAD_CTRL_BIND_CPU, (void *)RT_CPUS_NR);
```

## 注意事项

1. **共享资源保护**：多核访问共享资源必须使用互斥锁
2. **避免虚假共享**：将频繁访问的变量放在不同的缓存行
3. **中断亲和性**：将外设中断绑定到特定核心
