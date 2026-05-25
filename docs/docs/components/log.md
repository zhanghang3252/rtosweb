---
sidebar_position: 4
title: 日志系统
description: MyRTOS 日志组件 ulog
keywords: [日志, log, ulog]
---

# 日志系统

MyRTOS 集成 ulog 日志框架。

## 配置

```bash
# menuconfig
RT_USING_ULOG=y
ULOG_OUTPUT_LEVEL=6    # 日志级别 (0=off, 7=verbose)
ULOG_USING_COLOR=y     # 彩色输出
```

## 使用

```c
#define LOG_TAG    "main"
#define LOG_LVL    LOG_LVL_DBG
#include <ulog.h>

void app_main(void)
{
    LOG_D("Debug message: x = %d", 42);
    LOG_I("System initialized");
    LOG_W("Memory usage: %d%%", 85);
    LOG_E("Sensor read failed!");
}
```

## 日志级别

| 级别 | 宏 | 说明 |
|------|----|------|
| 0 | `LOG_LVL_ASSERT` | 断言 |
| 1 | `LOG_LVL_ERROR` | 错误 |
| 2 | `LOG_LVL_WARNING` | 警告 |
| 3 | `LOG_LVL_INFO` | 信息 |
| 4 | `LOG_LVL_DBG` | 调试 |
