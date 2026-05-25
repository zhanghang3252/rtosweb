---
sidebar_position: 2
title: 调度器
description: MyRTOS 调度器工作原理 — 抢占式优先级调度
keywords: [调度器, scheduler, 抢占, 优先级, 时间片]
---

# 调度器

MyRTOS 调度器负责决定哪个任务获得 CPU 使用权。

## 调度策略

### 抢占式优先级调度

- 高优先级任务就绪时，立即抢占低优先级任务
- 同优先级任务按时间片轮转执行
- 时间片用完后，切换到同优先级的下一个任务

### 调度规则

1. **永远运行最高优先级的就绪任务**
2. **同优先级任务轮流执行**（时间片轮转）
3. **中断可以唤醒更高优先级任务**，导致立即抢占

## 调度器 API

| API | 说明 |
|-----|------|
| `rt_schedule()` | 手动触发调度 |
| `rt_enter_critical()` | 进入临界区（禁止调度） |
| `rt_exit_critical()` | 退出临界区 |
| `rt_critical_level()` | 获取临界区嵌套层数 |

## 临界区保护

```c
void critical_section_example(void)
{
    rt_base_t level;

    /* 进入临界区 — 关闭中断 */
    level = rt_hw_interrupt_disable();

    /* 临界区代码 — 不会被打断 */
    shared_resource++;

    /* 退出临界区 — 恢复中断 */
    rt_hw_interrupt_enable(level);
}
```

## 配置选项

| 配置宏 | 默认值 | 说明 |
|--------|--------|------|
| `RT_MAX_PRIORITY` | 32 | 最大优先级数 |
| `RT_TICK_PER_SECOND` | 1000 | 系统 Tick 频率 (Hz) |
| `RT_USING_SCHEDULER_HOOK` | n | 启用调度器钩子 |
