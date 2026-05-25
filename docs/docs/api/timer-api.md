---
sidebar_position: 4
title: 定时器 API
description: MyRTOS 软件定时器 API 参考
keywords: [API, 定时器, timer]
---

# 定时器 API

## rt_timer_create

```c
rt_timer_t rt_timer_create(
    const char *name,
    void (*timeout)(void *param),
    void       *param,
    rt_tick_t   time,
    rt_uint8_t  flag
);
```

**flag 选项：**
- `RT_TIMER_FLAG_ONE_SHOT` — 单次触发
- `RT_TIMER_FLAG_PERIODIC` — 周期触发

---

## rt_timer_start

```c
rt_err_t rt_timer_start(rt_timer_t timer);
```

## rt_timer_stop

```c
rt_err_t rt_timer_stop(rt_timer_t timer);
```

## rt_timer_delete

```c
rt_err_t rt_timer_delete(rt_timer_t timer);
```

## rt_timer_control

```c
rt_err_t rt_timer_control(rt_timer_t timer, int cmd, void *arg);
```

**cmd 选项：**
- `RT_TIMER_CTRL_SET_TIME` — 设置超时时间
- `RT_TIMER_CTRL_GET_TIME` — 获取当前超时时间
- `RT_TIMER_CTRL_SET_ONESHOT` — 设置为单次模式
- `RT_TIMER_CTRL_SET_PERIODIC` — 设置为周期模式
