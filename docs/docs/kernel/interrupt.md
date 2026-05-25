---
sidebar_position: 6
title: 中断管理
description: MyRTOS 中断处理机制详解
keywords: [中断, interrupt, ISR, 嵌套中断, 中断安全]
---

# 中断管理

中断是嵌入式系统中处理外部事件的核心机制。

## 中断处理流程

```
硬件中断触发
    │
    ▼
保存上下文（硬件自动）
    │
    ▼
进入 ISR（用户代码）
    │
    ├── 清除中断标志
    ├── 处理中断事件
    └── 唤醒高优先级任务（可选）
    │
    ▼
退出 ISR
    │
    ▼
调度器检查是否需要切换任务
    │
    ▼
恢复上下文 → 返回被中断的任务或切换到更高优先级任务
```

## 中断安全 API

以下 API 可以在中断中安全调用：

| API | 说明 |
|-----|------|
| `rt_sem_release()` | 释放信号量 |
| `rt_mq_send()` | 发送消息 |
| `rt_event_send()` | 发送事件 |
| `rt_mb_send()` | 发送邮箱 |
| `rt_timer_start()` | 启动定时器 |
| `rt_timer_stop()` | 停止定时器 |

:::warning 注意
以下 API **不能**在中断中调用：
- `rt_sem_take()` — 可能阻塞
- `rt_mutex_take()` — 可能阻塞
- `rt_thread_delay()` — 会主动让出 CPU
- `rt_malloc()` / `rt_free()` — 非中断安全
:::

## 中断嵌套

MyRTOS 支持中断嵌套，通过全局变量 `rt_interrupt_nest` 跟踪嵌套层数：

```c
void ISR_Handler(void)
{
    /* 进入中断，嵌套计数 +1 */
    rt_interrupt_enter();

    /* 处理中断 */
    /* ... */

    /* 清除中断标志 */
    /* ... */

    /* 退出中断，嵌套计数 -1 */
    rt_interrupt_leave();
}
```
