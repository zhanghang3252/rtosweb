---
sidebar_position: 3
title: Shell CLI
description: MyRTOS 交互式命令行
keywords: [Shell, CLI, 命令行, FinSH]
---

# Shell CLI

MyRTOS 内置 FinSH Shell，支持交互式命令行调试。

## 注册自定义命令

```c
#include <finsh.h>

/* 自定义命令函数 */
static int hello(int argc, char **argv)
{
    if (argc == 1)
    {
        rt_kprintf("Hello MyRTOS!\n");
    }
    else
    {
        rt_kprintf("Hello %s!\n", argv[1]);
    }
    return 0;
}
MSH_CMD_EXPORT(hello, say hello to someone);

/* 导出到 msh 命令 */
static int led_control(int argc, char **argv)
{
    if (argc < 3)
    {
        rt_kprintf("Usage: led <on|off> <pin>\n");
        return -1;
    }
    /* ... */
    return 0;
}
MSH_CMD_EXPORT(led_control, control LED);
```

## 内置命令

| 命令 | 说明 |
|------|------|
| `list_thread` | 列出所有任务 |
| `list_sem` | 列出信号量 |
| `list_mutex` | 列出互斥锁 |
| `list_mq` | 列出消息队列 |
| `list_timer` | 列出定时器 |
| `list_device` | 列出设备 |
| `free` | 显示内存使用 |
| `ps` | 显示任务状态 |
| `reboot` | 重启系统 |
| `help` | 显示帮助 |
