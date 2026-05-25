---
sidebar_position: 3
title: 软件定时器
description: MyRTOS 软件定时器使用指南
keywords: [定时器, timer, 软件定时器, 回调]
---

# 软件定时器

软件定时器在系统 Tick 中断中检查超时，适合非精确计时场景。

## 创建定时器

```c
#include <rtthread.h>

/* 定时器回调函数 */
static void timeout_callback(void *param)
{
    rt_kprintf("Timer expired! param = %d\n", (int)param);
}

int timer_example(void)
{
    rt_timer_t timer;

    /* 创建单次定时器 */
    timer = rt_timer_create(
        "my_timer",          /* 定时器名 */
        timeout_callback,    /* 回调函数 */
        (void *)100,         /* 参数 */
        50,                  /* 超时时间 (tick) */
        RT_TIMER_FLAG_ONE_SHOT  /* 单次触发 */
    );

    if (timer != RT_NULL)
    {
        rt_timer_start(timer);  /* 启动定时器 */
    }

    return 0;
}
```

## 定时器标志

| 标志 | 说明 |
|------|------|
| `RT_TIMER_FLAG_ONE_SHOT` | 单次触发 |
| `RT_TIMER_FLAG_PERIODIC` | 周期触发 |
| `RT_TIMER_FLAG_HARD_TIMER` | 硬件定时器模式 |
| `RT_TIMER_FLAG_SOFT_TIMER` | 软件定时器模式（默认） |

## API 参考

| API | 说明 |
|-----|------|
| `rt_timer_create()` | 创建定时器 |
| `rt_timer_init()` | 静态初始化定时器 |
| `rt_timer_start()` | 启动定时器 |
| `rt_timer_stop()` | 停止定时器 |
| `rt_timer_delete()` | 删除定时器 |
| `rt_timer_control()` | 控制定时器（修改超时时间等） |
