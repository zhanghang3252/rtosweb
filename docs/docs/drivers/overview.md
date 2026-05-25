---
sidebar_position: 1
title: 驱动框架概览
description: MyRTOS 统一设备驱动框架
keywords: [驱动, 设备, 框架, 驱动模型]
---

# 驱动框架概览

MyRTOS 提供统一的设备驱动模型，所有外设驱动遵循相同的接口规范。

## 设备驱动模型

```
┌─────────────────────────────────┐
│          应用层代码              │
├─────────────────────────────────┤
│      Device API (统一接口)       │
│  open / close / read / write    │
├──────┬──────┬──────┬────────────┤
│ UART │ SPI  │ I2C  │ GPIO/ADC.. │
│ 驱动 │ 驱动 │ 驱动 │    驱动    │
├──────┴──────┴──────┴────────────┤
│        硬件抽象层 (HAL)         │
└─────────────────────────────────┘
```

## 支持的设备类型

| 设备类型 | 说明 | 文档 |
|---------|------|------|
| UART | 串口通信 | [UART 驱动](./uart.md) |
| SPI | SPI 总线 | [SPI 驱动](./spi.md) |
| I2C | I2C 总线 | [I2C 驱动](./i2c.md) |
| GPIO | 通用 IO | [GPIO 驱动](./gpio.md) |
| ADC | 模数转换 | [ADC 驱动](./adc.md) |
| PWM | 脉宽调制 | [PWM 驱动](./pwm.md) |
| Timer | 硬件定时器 | — |
| Watchdog | 看门狗 | — |
| RTC | 实时时钟 | — |

## 设备驱动接口

所有设备驱动实现以下接口：

```c
struct rt_device_ops
{
    /* 初始化 */
    rt_err_t (*init)(rt_device_t dev);
    /* 打开 */
    rt_err_t (*open)(rt_device_t dev, rt_uint16_t oflag);
    /* 关闭 */
    rt_err_t (*close)(rt_device_t dev);
    /* 读 */
    rt_size_t (*read)(rt_device_t dev, rt_off_t pos, void *buffer, rt_size_t size);
    /* 写 */
    rt_size_t (*write)(rt_device_t dev, rt_off_t pos, const void *buffer, rt_size_t size);
    /* 控制 */
    rt_err_t (*control)(rt_device_t dev, int cmd, void *args);
};
```
