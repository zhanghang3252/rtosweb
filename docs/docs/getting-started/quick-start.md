---
sidebar_position: 3
title: 快速上手
description: 5 分钟创建第一个 MyRTOS 应用程序
keywords: [快速上手, Hello World, 第一个程序]
---

# 快速上手

本教程将指导你创建第一个 MyRTOS 应用程序 — 两个任务交替闪烁 LED。

## 获取源码

```bash
# 克隆仓库
git clone https://github.com/zhanghang3252/rtosweb.git
cd myrtos

# 查看目录结构
ls
# arch/  boards/  components/  drivers/  examples/  kernel/  tools/
```

## 选择目标板

MyRTOS 支持多种开发板，以 STM32F407 为例：

```bash
# 查看支持的开发板
ls boards/
# stm32f103-atk/    stm32f407-atk/    stm32f429-atk/
# esp32-devkit/     gd32vf103-dev/    nrf52840-dk/

# 选择目标板
export RT_BOARD=stm32f407-atk
```

## 配置工程

```bash
# 启动图形化配置（需要 ncurses 库）
scons --menuconfig

# 关键配置项：
# RT Kernel →
#   RT_USING_TASK        [*]  启用任务管理
#   RT_USING_SEMAPHORE   [*]  启用信号量
#   RT_USING_MUTEX       [*]  启用互斥锁
#   RT_USING_QUEUE       [*]  启用消息队列
```

## 编写代码

创建 `applications/main.c`：

```c
/**
 * MyRTOS 快速上手示例
 * 两个任务交替闪烁不同颜色的 LED
 */

#include <rtthread.h>
#include <rtdevice.h>

/* LED GPIO 定义（根据你的开发板修改） */
#define LED_GREEN_PIN    GET_PIN(A, 5)   /* PA5 - 绿色 LED */
#define LED_RED_PIN      GET_PIN(A, 6)   /* PA6 - 红色 LED */

/* 任务栈大小 */
#define TASK_STACK_SIZE  512

/* 任务句柄 */
static rt_task_t led_task_green = RT_NULL;
static rt_task_t led_task_red   = RT_NULL;

/**
 * 绿色 LED 闪烁任务
 * 周期：500ms
 */
static void led_green_entry(void *param)
{
    /* 配置 GPIO 为输出模式 */
    rt_pin_mode(LED_GREEN_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_GREEN_PIN, PIN_HIGH);  /* LED ON  */
        rt_thread_mdelay(500);                    /* 延时 500ms */
        rt_pin_write(LED_GREEN_PIN, PIN_LOW);   /* LED OFF */
        rt_thread_mdelay(500);                    /* 延时 500ms */
    }
}

/**
 * 红色 LED 闪烁任务
 * 周期：1000ms
 */
static void led_red_entry(void *param)
{
    rt_pin_mode(LED_RED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_RED_PIN, PIN_HIGH);    /* LED ON  */
        rt_thread_mdelay(1000);                   /* 延时 1000ms */
        rt_pin_write(LED_RED_PIN, PIN_LOW);     /* LED OFF */
        rt_thread_mdelay(1000);                   /* 延时 1000ms */
    }
}

/**
 * 主函数 — 系统入口
 */
int main(void)
{
    /* 创建绿色 LED 任务，优先级 3 */
    led_task_green = rt_task_create(
        "led_green",         /* 任务名 */
        led_green_entry,     /* 入口函数 */
        RT_NULL,             /* 参数 */
        TASK_STACK_SIZE,     /* 栈大小 */
        3,                   /* 优先级 */
        10                   /* 时间片 (tick) */
    );

    /* 创建红色 LED 任务，优先级 2 */
    led_task_red = rt_task_create(
        "led_red",
        led_red_entry,
        RT_NULL,
        TASK_STACK_SIZE,
        2,                   /* 较低优先级 */
        10
    );

    /* 启动任务 */
    if (led_task_green != RT_NULL)
        rt_task_startup(led_task_green);

    if (led_task_red != RT_NULL)
        rt_task_startup(led_task_red);

    return 0;
}
```

## 编译

```bash
# 编译（自动检测 CPU 核心数）
scons

# 指定并行数
scons -j8

# 编译成功后输出：
# LINK myrtos.elf
# arm-none-eabi-objcopy -O binary myrtos.elf myrtos.bin
# arm-none-eabi-size myrtos.elf
#    text    data     bss     dec     hex filename
#   12345     128    4096   16569    40b9 myrtos.elf
```

## 烧录

```bash
# 方式一：使用 SCons 内置命令
scons --flash

# 方式二：使用 OpenOCD
openocd -f interface/stlink.cfg \
        -f target/stm32f4x.cfg \
        -c "program build/rtosweb.elf verify reset exit"
```

## 运行验证

连接串口终端（波特率 115200）：

```bash
minicom -D /dev/ttyUSB0 -b 115200
```

预期输出：

```
 \ | /
- MyRTOS -     Operating System
 / | \     1.0.0 build May 25 2026
2006 - 2026 Copyright by MyRTOS Team
msh >
```

同时，你应该看到开发板上的绿色和红色 LED 以不同频率交替闪烁！

## 下一步

- **[构建指南](./build-guide.md)** — 深入了解构建系统
- **[任务管理](../kernel/task.md)** — 学习任务 API
- **[内核概览](../kernel/overview.md)** — 全面了解内核功能
