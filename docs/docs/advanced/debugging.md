---
sidebar_position: 2
title: 调试技巧
description: MyRTOS 调试工具和技巧
keywords: [调试, debug, trace, log, Shell]
---

# 调试技巧

## Shell 命令

MyRTOS 内置 Shell CLI，提供以下调试命令：

```bash
# 查看所有任务
msh > list_thread

# 查看信号量
msh > list_sem

# 查看互斥锁
msh > list_mutex

# 查看消息队列
msh > list_mq

# 查看定时器
msh > list_timer

# 查看设备
msh > list_device

# 查看内存使用
msh > free
```

## 日志系统

```c
#include <ulog.h>

/* 不同级别的日志 */
LOG_D("Debug: x = %d", x);    /* 调试级别 */
LOG_I("Info: system started"); /* 信息级别 */
LOG_W("Warn: memory low");     /* 警告级别 */
LOG_E("Error: init failed");   /* 错误级别 */
```

## 断言

```c
/* 启用断言检查 */
#define RT_DEBUG_ENABLE

/* 使用断言 */
RT_ASSERT(ptr != RT_NULL);
RT_ASSERT(size > 0 && size <= MAX_SIZE);
```

## Trace 工具

支持 Segger SystemView 和 Percepio Tracealyzer：

```bash
# 启用 SystemView 支持
# menuconfig → RT Kernel → Enable SystemView
```

## GDB 调试

```bash
# 启动 OpenOCD
openocd -f interface/stlink.cfg -f target/stm32f4x.cfg

# 启动 GDB
arm-none-eabi-gdb build/rtosweb.elf
(gdb) target remote :3333
(gdb) monitor reset halt
(gdb) break main
(gdb) continue
```
