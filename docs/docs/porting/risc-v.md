---
sidebar_position: 3
title: RISC-V 移植
description: RISC-V 架构移植指南
keywords: [RISC-V, 移植, GD32VF103, ESP32-C3]
---

# RISC-V 移植

## 支持的 RISC-V 芯片

| 芯片 | 厂商 | 特性 |
|------|------|------|
| GD32VF103 | 兆易创新 | RV32IMAC, 108MHz |
| CH32V307 | 沁恒 | RV32IMAC, 144MHz |
| BL602 | 博流 | RV32IMAC, WiFi+BLE |
| ESP32-C3 | 乐鑫 | RV32IMC, WiFi+BLE |

## 移植要点

### 1. 中断控制器

RISC-V 使用 PLIC（平台级中断控制器）。

### 2. 上下文切换

使用 `ecall` 指令触发环境调用异常。

### 3. 定时器

使用 RISC-V 的 `mtime` / `mtimecmp` 寄存器实现系统 Tick。
