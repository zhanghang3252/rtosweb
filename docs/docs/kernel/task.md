---
sidebar_position: 1
title: 任务管理
description: MyRTOS 任务（线程）管理详解 — 创建、调度、删除任务
keywords: [任务, 线程, thread, task, 创建, 调度]
---

# 任务管理

任务（Task/Thread）是 MyRTOS 中最基本的执行单元。每个任务拥有独立的栈空间和优先级。

## 任务状态

```
        ┌──────────┐
        │  创建态   │  task_create()
        └────┬─────┘
             │
             ▼
   ┌──────────────────┐
   │     就绪态        │◄─────────────┐
   └───────┬──────────┘              │
           │ 被调度                    │ 被唤醒 / 超时到期
           ▼                          │
   ┌──────────────────┐              │
   │     运行态        │──────────────┤
   └───────┬──────────┘              │
           │ 等待事件                  │
           ▼                          │
   ┌──────────────────┐              │
   │     阻塞态        │──────────────┘
   └──────────────────┘
           │
           │ task_delete()
           ▼
   ┌──────────────────┐
   │     删除态        │
   └──────────────────┘
```

## 创建任务

```c
#include <rtthread.h>

/* 任务入口函数 */
static void task_entry(void *param)
{
    while (1)
    {
        /* 任务逻辑 */
        rt_kprintf("Hello from task!\n");
        rt_thread_mdelay(1000);  /* 延时 1 秒 */
    }
}

/* 创建并启动任务 */
int create_task_example(void)
{
    rt_thread_t tid;

    /* 动态创建任务 */
    tid = rt_thread_create(
        "my_task",        /* 任务名 */
        task_entry,       /* 入口函数 */
        RT_NULL,          /* 参数 */
        1024,             /* 栈大小 (字节) */
        5,                /* 优先级 (数值越小优先级越高) */
        10                /* 时间片 (tick) */
    );

    if (tid != RT_NULL)
    {
        rt_thread_startup(tid);  /* 启动任务 */
    }

    return 0;
}
```

## 静态创建任务

```c
static struct rt_thread task_tcb;
static rt_uint8_t task_stack[1024];

int create_static_task(void)
{
    rt_err_t result;

    result = rt_thread_init(
        &task_tcb,            /* 任务控制块 */
        "static_task",        /* 任务名 */
        task_entry,           /* 入口函数 */
        RT_NULL,              /* 参数 */
        task_stack,           /* 栈空间 */
        sizeof(task_stack),   /* 栈大小 */
        5,                    /* 优先级 */
        10                    /* 时间片 */
    );

    if (result == RT_EOK)
    {
        rt_thread_startup(&task_tcb);
    }

    return 0;
}
```

## 任务 API 参考

| API | 说明 |
|-----|------|
| `rt_thread_create()` | 动态创建任务 |
| `rt_thread_init()` | 静态初始化任务 |
| `rt_thread_delete()` | 删除任务 |
| `rt_thread_detach()` | 脱离任务（静态） |
| `rt_thread_startup()` | 启动任务 |
| `rt_thread_yield()` | 让出 CPU |
| `rt_thread_delay()` | 延时 (tick) |
| `rt_thread_mdelay()` | 延时 (ms) |
| `rt_thread_suspend()` | 挂起任务 |
| `rt_thread_resume()` | 恢复任务 |
| `rt_thread_self()` | 获取当前任务句柄 |

## 注意事项

1. **栈大小计算**：任务栈需要容纳局部变量 + 函数调用 + 中断嵌套。建议使用 `list_thread` 命令查看实际栈使用量。

2. **优先级设计**：数值越小优先级越高。关键任务使用低数值，后台任务使用高数值。

3. **不要在中断中调用阻塞 API**：`rt_thread_delay()` 等函数只能在任务上下文中调用。
