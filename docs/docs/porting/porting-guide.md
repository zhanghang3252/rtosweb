---
sidebar_position: 1
title: 移植指南
description: 如何将 MyRTOS 移植到新的硬件平台
keywords: [移植, porting, 新平台, BSP]
---

# 移植指南

本文介绍如何将 MyRTOS 移植到新的硬件平台。

## 移植概述

移植 MyRTOS 到新平台主要涉及以下工作：

1. **实现硬件抽象层 (HAL)** — 时钟、GPIO、中断控制器
2. **实现上下文切换** — 任务切换时的寄存器保存/恢复
3. **实现系统 Tick** — 提供系统时基
4. **实现串口驱动** — 用于 Shell 和调试输出
5. **编写 BSP** — 板级支持包

## 移植步骤

### 1. 创建目录结构

```
myrtos/
└── bsp/
    └── your_board/
        ├── board.h          /* 板级配置 */
        ├── board.c          /* 板级初始化 */
        ├── startup.s        /* 启动代码 */
        ├── linker.ld        /* 链接脚本 */
        ├── Kconfig           /* 板级配置选项 */
        └── SConscript        /* 构建脚本 */
```

### 2. 实现上下文切换

这是移植中最关键的部分，需要使用汇编语言实现：

```asm
; Cortex-M 系列使用 PendSV 实现上下文切换
PendSV_Handler:
    ; 保存当前任务上下文
    MRS     R0, PSP
    STMDB   R0!, {R4-R11}
    
    ; 保存 PSP 到任务控制块
    LDR     R1, =rt_current_task
    LDR     R1, [R1]
    STR     R0, [R1]
    
    ; 调用调度器获取下一个任务
    BL      rt_schedule_get_next_task
    
    ; 恢复新任务上下文
    LDR     R1, =rt_current_task
    LDR     R1, [R1]
    LDR     R0, [R1]
    LDMIA   R0!, {R4-R11}
    MSR     PSP, R0
    
    BX      LR
```

### 3. 实现系统 Tick

```c
void SysTick_Handler(void)
{
    /* 增加系统 tick */
    rt_tick_increase();
    
    /* 检查任务时间片 */
    /* ... */
}
```

### 4. 验证移植

运行 `examples/` 中的基本示例，验证：
- 任务创建和调度
- 延时函数精度
- 中断响应
- 串口输出
