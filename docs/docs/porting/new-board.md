---
sidebar_position: 4
title: 适配新开发板
description: 如何为新的开发板添加 BSP
keywords: [BSP, 新板子, 适配, 开发板]
---

# 适配新开发板

## 创建 BSP 目录

```bash
mkdir -p bsp/your_board
cd bsp/your_board
```

## 必需文件

### 1. board.h — 板级配置

```c
#ifndef __BOARD_H__
#define __BOARD_H__

/* 时钟频率 */
#define FIN_HZ          8000000      /* 外部晶振 8MHz */
#define FCLK_HZ         168000000    /* 系统时钟 168MHz */
#define FHCLK_HZ        168000000    /* AHB 时钟 */
#define FPCLK1_HZ       42000000     /* APB1 时钟 */
#define FPCLK2_HZ       84000000     /* APB2 时钟 */

/* UART 配置 */
#define RT_CONSOLE_DEVICE_NAME  "uart1"
#define RT_CONSOLE_BAUDRATE     115200

/* 堆内存大小 */
#define RT_HEAP_SIZE    (1024 * 64)  /* 64KB */

#endif
```

### 2. board.c — 板级初始化

```c
#include <rtthread.h>
#include "board.h"

void board_init(void)
{
    /* 系统时钟配置 */
    SystemClock_Config();

    /* GPIO 初始化 */
    MX_GPIO_Init();

    /* UART 初始化 */
    MX_USART1_UART_Init();

    /* SysTick 配置 */
    SysTick_Config(FCLK_HZ / RT_TICK_PER_SECOND);
}

/* 堆内存 */
static rt_uint8_t heap_pool[RT_HEAP_SIZE];

void rt_system_heap_init(void)
{
    rt_system_heap_init(heap_pool, heap_pool + RT_HEAP_SIZE);
}
```

### 3. Kconfig — 板级配置

```kconfig
config BOARD_YOUR_BOARD
    bool "Your Board Name"
    depends on SOC_STM32F407
    select RT_USING_UART1
    select RT_USING_GPIO
```
