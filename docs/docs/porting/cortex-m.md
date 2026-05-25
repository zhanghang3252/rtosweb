---
sidebar_position: 2
title: Cortex-M 移植
description: ARM Cortex-M 系列移植指南
keywords: [Cortex-M, ARM, 移植]
---

# Cortex-M 移植

## 支持的内核

| 内核 | 架构 | 特性 |
|------|------|------|
| Cortex-M0 | ARMv6-M | 无 MPU，无 FPU |
| Cortex-M0+ | ARMv6-M | 可选 MPU |
| Cortex-M3 | ARMv7-M | MPU，位带 |
| Cortex-M4 | ARMv7E-M | DSP，可选 FPU |
| Cortex-M7 | ARMv7E-M | 双精度 FPU，Cache |
| Cortex-M23 | ARMv8-M | TrustZone |
| Cortex-M33 | ARMv8-M | TrustZone，DSP |

## 移植要点

### 1. PendSV 优先级设置

```c
/* 设置 PendSV 为最低优先级 */
#define NVIC_PENDSV_PRI  0xFF
SCB->SHP[10] = NVIC_PENDSV_PRI;
```

### 2. SysTick 配置

```c
/* 配置 SysTick 为 1ms 中断 */
SysTick_Config(SystemCoreClock / RT_TICK_PER_SECOND);
```

### 3. 上下文切换

使用 PendSV 实现，详见 [移植指南](./porting-guide.md)。
