---
sidebar_position: 2
title: 任务 API
description: MyRTOS 任务管理 API 完整参考
keywords: [API, 任务, thread, task]
---

# 任务 API

## rt_thread_create

动态创建任务。

```c
rt_thread_t rt_thread_create(
    const char *name,           /* 任务名 */
    void (*entry)(void *param), /* 入口函数 */
    void       *param,          /* 参数 */
    rt_uint32_t stack_size,     /* 栈大小 (字节) */
    rt_uint8_t  priority,       /* 优先级 */
    rt_uint32_t tick            /* 时间片 */
);
```

**返回值：** 任务句柄，失败返回 `RT_NULL`

---

## rt_thread_init

静态初始化任务。

```c
rt_err_t rt_thread_init(
    struct rt_thread *thread,    /* 任务控制块 */
    const char       *name,     /* 任务名 */
    void (*entry)(void *param), /* 入口函数 */
    void             *param,    /* 参数 */
    void             *stack_start, /* 栈起始地址 */
    rt_uint32_t       stack_size,  /* 栈大小 */
    rt_uint8_t        priority,    /* 优先级 */
    rt_uint32_t       tick         /* 时间片 */
);
```

**返回值：** `RT_EOK` 或错误码

---

## rt_thread_delete

删除任务。

```c
rt_err_t rt_thread_delete(rt_thread_t thread);
```

---

## rt_thread_startup

启动任务。

```c
rt_err_t rt_thread_startup(rt_thread_t thread);
```

---

## rt_thread_delay / rt_thread_mdelay

任务延时。

```c
rt_err_t rt_thread_delay(rt_int32_t tick);  /* 延时 (tick) */
rt_err_t rt_thread_mdelay(rt_int32_t ms);   /* 延时 (毫秒) */
```

---

## rt_thread_yield

让出 CPU，切换到同优先级的下一个任务。

```c
rt_err_t rt_thread_yield(void);
```

---

## rt_thread_self

获取当前运行任务的句柄。

```c
rt_thread_t rt_thread_self(void);
```
