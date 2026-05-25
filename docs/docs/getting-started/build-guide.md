---
sidebar_position: 4
title: 构建指南
description: MyRTOS 构建系统详解 — SCons、Kconfig、编译选项
keywords: [构建, 编译, SCons, Kconfig, menuconfig]
---

# 构建指南

本文详细介绍 MyRTOS 的构建系统，包括 SCons 构建脚本、Kconfig 配置系统和常用编译选项。

## 构建系统概览

MyRTOS 使用 **SCons** 作为构建工具，**Kconfig** 作为配置系统。

```
myrtos/
├── SConstruct          # 顶层构建脚本（入口）
├── SConscript          # 各模块的构建脚本
├── Kconfig             # 顶层配置文件
├── .config             # 用户配置（menuconfig 生成）
├── rtconfig.h          # 配置头文件（自动生成）
└── build/              # 构建输出目录
```

## 常用构建命令

```bash
# 完整编译
scons

# 并行编译（推荐使用 CPU 核心数）
scons -j$(nproc)

# 清除构建产物
scons --clean

# 强制重新编译
scons --clean && scons -j$(nproc)

# 图形化配置
scons --menuconfig

# 烧录到开发板
scons --flash

# 调试
scons --gdb
```

## Kconfig 配置系统

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `RT_BOARD` | string | `stm32f407-atk` | 目标开发板 |
| `RT_ARCH` | string | `arm` | CPU 架构 |
| `RT_TOOLCHAIN` | string | `gcc` | 编译工具链 |
| `RT_USING_TASK` | bool | `y` | 启用任务管理 |
| `RT_USING_SEMAPHORE` | bool | `y` | 启用信号量 |
| `RT_USING_MUTEX` | bool | `y` | 启用互斥锁 |
| `RT_USING_QUEUE` | bool | `y` | 启用消息队列 |
| `RT_USING_TIMER` | bool | `y` | 启用软件定时器 |
| `RT_USING_MEMPOOL` | bool | `n` | 启用内存池 |
| `RT_USING_DEVICE` | bool | `y` | 启用设备框架 |
| `RT_USING_UART` | bool | `y` | 启用 UART 驱动 |
| `RT_USING_SPI` | bool | `n` | 启用 SPI 驱动 |
| `RT_USING_I2C` | bool | `n` | 启用 I2C 驱动 |
| `RT_TICK_PER_SECOND` | int | `1000` | 系统 Tick 频率 (Hz) |
| `RT_MAIN_THREAD_STACK_SIZE` | int | `2048` | 主线程栈大小 |
| `RT_MAX_PRIORITY` | int | `32` | 最大优先级数 |

### 命令行配置

```bash
# 修改单个配置项
scons --menuconfig
# 导航到对应选项，按 Enter 修改

# 也可以直接编辑 .config 文件
# 修改后需要重新生成 rtconfig.h
scons --target=make
```

## 编译输出

编译成功后，构建产物位于 `build/` 目录：

```
build/
├── myrtos.elf          # ELF 可执行文件（调试用）
├── myrtos.bin          # 二进制固件（烧录用）
├── myrtos.hex          # Intel HEX 格式（烧录用）
├── myrtos.map          # 内存映射文件（分析用）
└── *.o                 # 目标文件
```

### 查看固件大小

```bash
arm-none-eabi-size build/rtosweb.elf

# 输出示例：
#    text     data     bss     dec     hex  filename
#   12345      128    4096   16569    40b9  build/rtosweb.elf
```

| 段 | 说明 |
|------|------|
| text | 代码段（Flash 占用） |
| data | 已初始化数据（Flash + RAM） |
| bss | 未初始化数据（RAM） |

## 自定义构建脚本

在 `applications/` 目录下创建 `SConscript`：

```python
# applications/SConscript
Import('RTT_ROOT')
from building import *

cwd     = GetCurrentDir()
src     = Glob('*.c')
CPPPATH = [cwd]

group = DefineGroup('Applications', src, depend = [''], CPPPATH = CPPPATH)

Return('group')
```

## 常见问题

### Q: 编译报错 "arm-none-eabi-gcc: not found"

工具链未正确安装或未添加到 PATH：

```bash
which arm-none-eabi-gcc
# 如果没有输出，需要添加 PATH
export PATH=/opt/arm-gnu-toolchain/bin:$PATH
```

### Q: 如何切换目标板？

```bash
# 方式一：使用 menuconfig
scons --menuconfig
# 导航到 RT Board → 选择目标板

# 方式二：直接修改 .config
vi .config
# 修改 RT_BOARD="新板子名称"
scons --clean && scons
```

### Q: 如何优化代码体积？

```bash
# menuconfig 中启用优化选项
# RT Kernel → Optimization → Size Optimization
# 或者手动在 rtconfig.h 中添加：
# #define OPTIMIZE_FOR_SIZE
```
