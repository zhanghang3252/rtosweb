---
sidebar_position: 4
title: 同步与通信
description: MyRTOS 进程间通信机制 — 信号量、互斥锁、消息队列、事件组
keywords: [IPC, 信号量, 互斥锁, 消息队列, 事件, 同步, 通信]
---

# 同步与通信

MyRTOS 提供多种同步与通信机制，用于任务间的协调和数据传递。

## 信号量 (Semaphore)

用于任务同步和资源计数。

```c
#include <rtthread.h>

static rt_sem_t sem = RT_NULL;

/* 任务 A：等待信号量 */
void task_a(void *param)
{
    while (1)
    {
        /* 等待信号量（阻塞） */
        rt_sem_take(sem, RT_WAITING_FOREVER);
        rt_kprintf("Task A: Got semaphore!\n");
    }
}

/* 任务 B：释放信号量 */
void task_b(void *param)
{
    while (1)
    {
        rt_thread_mdelay(1000);
        rt_sem_release(sem);  /* 释放信号量 */
    }
}

int sem_example(void)
{
    /* 创建信号量，初始值 0 */
    sem = rt_sem_create("my_sem", 0, RT_IPC_FLAG_FIFO);
    /* ... 创建任务 A 和 B ... */
    return 0;
}
```

## 互斥锁 (Mutex)

用于保护共享资源，支持优先级继承。

```c
static rt_mutex_t mutex = RT_NULL;

/* 初始化 */
mutex = rt_mutex_create("my_mutex", RT_IPC_FLAG_PRIO);

/* 加锁 */
rt_mutex_take(mutex, RT_WAITING_FOREVER);
/* 临界区操作 */
shared_data++;
/* 解锁 */
rt_mutex_release(mutex);
```

## 消息队列 (MessageQueue)

用于任务间传递数据。

```c
static rt_mq_t mq = RT_NULL;

/* 创建消息队列 */
mq = rt_mq_create("my_mq", 32, 10, RT_IPC_FLAG_FIFO);
/* 32 字节消息大小，10 条消息容量 */

/* 发送消息 */
rt_mq_send(mq, buffer, length);

/* 接收消息 */
rt_mq_recv(mq, buffer, size, RT_WAITING_FOREVER);
```

## 事件组 (Event)

用于多条件同步。

```c
static rt_event_t event = RT_NULL;

/* 创建事件组 */
event = rt_event_create("my_event", 0, RT_IPC_FLAG_FIFO);

/* 发送事件 */
rt_event_send(event, (1 << 0));  /* 设置 bit 0 */

/* 等待事件 */
rt_uint32_t received;
rt_event_recv(event, (1 << 0) | (1 << 1),
              RT_EVENT_FLAG_OR | RT_EVENT_FLAG_CLEAR,
              RT_WAITING_FOREVER, &received);
```

## API 速查表

| 机制 | 创建 | 获取/P | 释放/V |
|------|------|--------|--------|
| 信号量 | `rt_sem_create()` | `rt_sem_take()` | `rt_sem_release()` |
| 互斥锁 | `rt_mutex_create()` | `rt_mutex_take()` | `rt_mutex_release()` |
| 消息队列 | `rt_mq_create()` | `rt_mq_recv()` | `rt_mq_send()` |
| 事件组 | `rt_event_create()` | `rt_event_recv()` | `rt_event_send()` |
| 邮箱 | `rt_mb_create()` | `rt_mb_recv()` | `rt_mb_send()` |
