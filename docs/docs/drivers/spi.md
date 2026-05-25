---
sidebar_position: 3
title: SPI 驱动
description: MyRTOS SPI 驱动使用指南
keywords: [SPI, 驱动, 总线]
---

# SPI 驱动

## 使用示例

```c
#include <rtdevice.h>

/* 查找 SPI 设备 */
rt_device_t spi = rt_device_find("spi1");

/* 配置 SPI 参数 */
struct rt_spi_configuration cfg;
cfg.mode = RT_SPI_MASTER | RT_SPI_MODE_0 | RT_SPI_MSB;
cfg.data_width = 8;
cfg.max_hz = 1000000;  /* 1MHz */
rt_device_control(spi, RT_DEVICE_CTRL_SPI_CONFIGURE, &cfg);

/* 打开设备 */
rt_device_open(spi, RT_DEVICE_OFLAG_RDWR);

/* 发送数据 */
rt_uint8_t tx_buf[] = {0x01, 0x02, 0x03};
rt_device_write(spi, 0, tx_buf, sizeof(tx_buf));

/* 接收数据 */
rt_uint8_t rx_buf[3];
rt_device_read(spi, 0, rx_buf, sizeof(rx_buf));
```
