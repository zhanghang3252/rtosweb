---
sidebar_position: 4
title: I2C 驱动
description: MyRTOS I2C 驱动使用指南
keywords: [I2C, 驱动, 总线]
---

# I2C 驱动

## 使用示例

```c
#include <rtdevice.h>

/* 查找 I2C 总线 */
rt_device_t i2c = rt_device_find("i2c1");

/* 打开设备 */
rt_device_open(i2c, RT_DEVICE_OFLAG_RDWR);

/* 写数据到从设备 (地址 0x50) */
rt_uint8_t reg = 0x00;
rt_uint8_t data[] = {0x11, 0x22, 0x33};
struct rt_i2c_msg msgs[2];

msgs[0].addr  = 0x50;
msgs[0].flags = RT_I2C_WR;
msgs[0].buf   = &reg;
msgs[0].len   = 1;

msgs[1].addr  = 0x50;
msgs[1].flags = RT_I2C_WR;
msgs[1].buf   = data;
msgs[1].len   = sizeof(data);

rt_device_control(i2c, RT_I2C_DEV_CTRL_TRANSFER, msgs);
```
