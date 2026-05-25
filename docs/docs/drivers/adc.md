---
sidebar_position: 6
title: ADC 驱动
description: MyRTOS ADC 驱动使用指南
keywords: [ADC, 模数转换, 驱动]
---

# ADC 驱动

```c
#include <rtdevice.h>

/* 查找 ADC 设备 */
rt_device_t adc = rt_device_find("adc1");
rt_device_open(adc, RT_DEVICE_OFLAG_RDONLY);

/* 读取通道 0 */
rt_uint32_t value;
rt_adc_enable(adc, 0);
value = rt_adc_read(adc, 0);
rt_adc_disable(adc, 0);

/* 转换为电压值 (假设参考电压 3.3V，12 位 ADC) */
float voltage = value * 3.3f / 4096.0f;
rt_kprintf("ADC: %d (%.2f V)\n", value, voltage);
```
