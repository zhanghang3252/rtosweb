---
sidebar_position: 1
title: 内核概览
description: MyRTOS 内核架构与核心模块总览
keywords: [内核, 概览, 架构, 模块]
---

# 内核概览

MyRTOS 内核是整个操作系统的核心，负责任务调度、同步通信、内存管理等基础功能。

## 内核架构

```
┌──────────────────────────────────────────┐
│              应用层代码                    │
├──────────────────────────────────────────┤
│          内核 API 接口层                   │
├──────┬──────┬──────┬──────┬──────┬───────┤
│ 任务 │ 信号量│ 互斥锁│ 队列 │ 定时器│ 内存  │
│ 管理 │      │      │      │      │ 管理  │
├──────┴──────┴──────┴──────┴──────┴───────┤
│           调度器 (Scheduler)              │
├──────────────────────────────────────────┤
│        硬件抽象层 (HAL) / BSP            │
└──────────────────────────────────────────┘
```

## 核心模块

| 模块 | 文件 | 说明 |
|------|------|------|
| [任务管理](./task.md) | `kernel/task.c` | 任务创建/删除/调度 |
| [调度器](./scheduler.md) | `kernel/scheduler.c` | 抢占式优先级调度 |
| [软件定时器](./timer.md) | `kernel/timer.c` | 回调式软件定时器 |
| [同步与通信](./ipc.md) | `kernel/ipc.c` | 信号量/互斥锁/消息队列/事件 |
| [内存管理](./memory.md) | `kernel/mem.c` | 堆分配/内存池 |
| [中断管理](./interrupt.md) | `kernel/interrupt.c` | 中断注册/嵌套管理 |

## 内核对象模型

MyRTOS 使用面向对象的设计思想，所有内核对象继承自 `rt_object` 基类：

```c
/* 内核对象基类 */
struct rt_object
{
    char      name[RT_NAME_MAX];  /* 对象名 */
    rt_uint8_t type;              /* 对象类型 */
    rt_uint8_t flag;              /* 对象标志 */

    rt_list_t  list;              /* 对象链表节点 */
};
typedef struct rt_object *rt_object_t;

/* 对象类型枚举 */
enum rt_object_class_type
{
    RT_Object_Class_Thread    = 0,   /* 任务 */
    RT_Object_Class_Semaphore,       /* 信号量 */
    RT_Object_Class_Mutex,           /* 互斥锁 */
    RT_Object_Class_Event,           /* 事件 */
    RT_Object_Class_MailBox,         /* 邮箱 */
    RT_Object_Class_MessageQueue,    /* 消息队列 */
    RT_Object_Class_Timer,           /* 定时器 */
    RT_Object_Class_MemoryPool,      /* 内存池 */
    RT_Object_Class_Device,          /* 设备 */
    RT_Object_Class_Unknown,         /* 未知 */
};
```

## 系统初始化流程

```c
int main(void)
{
    /* 1. 硬件初始化 */
    board_init();

    /* 2. 内核初始化 */
    rt_system_scheduler_init();   /* 调度器初始化 */
    rt_system_timer_init();       /* 定时器系统初始化 */
    rt_system_memory_init();      /* 内存系统初始化 */

    /* 3. 设备框架初始化 */
    rt_device_init_all();

    /* 4. 应用初始化 */
    rt_application_init();

    /* 5. 启动调度器（不会返回） */
    rt_system_scheduler_start();

    return 0;  /* 永远不会执行到这里 */
}
```

## 配置选项

| 配置宏 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `RT_MAX_PRIORITY` | int | 32 | 最大优先级数 |
| `RT_TICK_PER_SECOND` | int | 1000 | 系统 Tick 频率 |
| `RT_USING_HOOK` | bool | n | 启用钩子函数 |
| `RT_USING_OVERFLOW_CHECK` | bool | y | 启用栈溢出检测 |
| `RT_USING_MEMTRACE` | bool | n | 启用内存追踪 |
| `RT_NAME_MAX` | int | 8 | 对象名最大长度 |
| `RT_ALIGN_SIZE` | int | 4 | 内存对齐大小 |

## 深入了解

- **[任务管理](./task.md)** — 创建、调度、管理任务
- **[调度器](./scheduler.md)** — 理解调度算法
- **[同步与通信](./ipc.md)** — 任务间通信机制
- **[内存管理](./memory.md)** — 堆分配与内存池
- **[中断管理](./interrupt.md)** — 中断处理机制
