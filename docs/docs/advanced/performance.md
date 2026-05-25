---
sidebar_position: 1
title: 性能优化
description: MyRTOS 系统性能优化指南
keywords: [性能, 优化, 调优, benchmark]
---

# 性能优化

## 内核裁剪

通过 Kconfig 裁剪不需要的功能，减小代码体积：

```
# 关闭不需要的内核组件
RT_USING_MUTEX     → n  （如果不需要互斥锁）
RT_USING_EVENT     → n  （如果不需要事件组）
RT_USING_MEMPOOL   → n  （如果不需要内存池）
RT_USING_TIMER     → n  （如果不需要软件定时器）
```

## 编译优化

```bash
# 体积优化
scons --target=mdk5 --opt=size

# 速度优化  
scons --target=mdk5 --opt=speed
```

## 任务栈优化

使用 `list_thread` 命令查看栈使用率：

```
msh > list_thread
thread   pri  status      sp     stack size max used left tick  error
-------- ---  ------- ---------- ---------- ------ ---------- ---
tshell    20  suspend 0x00000048 0x00001000    22% 0x0000000a 000
tidle     31  ready   0x00000028 0x00000200    50% 0x0000000a 000
```

**建议**：栈使用率保持在 70% 以下，留有安全余量。

## 中断优化

- 减少 ISR 中的处理时间
- 将耗时操作放到任务中处理
- 使用 DMA 减少 CPU 负担

## 基准测试

```c
/* 测试任务切换时间 */
rt_tick_t start = rt_tick_get();
for (int i = 0; i < 1000; i++)
{
    rt_schedule();
}
rt_tick_t end = rt_tick_get();
rt_kprintf("Task switch: %d ns\n", (end - start) * 1000000 / RT_TICK_PER_SECOND / 1000);
```
