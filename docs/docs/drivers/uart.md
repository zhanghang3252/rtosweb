---
sidebar_position: 2
title: UART 驱动
description: MyRTOS UART 串口驱动使用指南
keywords: [UART, 串口, serial, 驱动]
---

# UART 驱动

## 配置

```bash
# menuconfig
RT_USING_UART=y
RT_USING_UART1=y
RT_USING_UART2=y
```

## 使用示例

```c
#include <rtdevice.h>

/* 查找串口设备 */
rt_device_t serial = rt_device_find("uart2");

/* 配置参数 */
struct serial_configure config = {
    BAUD_RATE_115200,
    DATA_BITS_8,
    STOP_BITS_1,
    PARITY_NONE,
    BIT_ORDER_LSB,
    NRZ_NORMAL,
    RT_SERIAL_RB_BUFSZ,
    0
};
rt_device_control(serial, RT_DEVICE_CTRL_CONFIG, &config);

/* 设置接收回调 */
rt_device_set_rx_indicate(serial, rx_callback);

/* 打开设备 */
rt_device_open(serial, RT_DEVICE_FLAG_INT_RX | RT_DEVICE_FLAG_INT_TX);

/* 发送数据 */
char msg[] = "Hello UART!\n";
rt_device_write(serial, 0, msg, sizeof(msg) - 1);
```

## 接收回调

```c
static rt_err_t rx_callback(rt_device_t dev, rt_size_t size)
{
    /* 有数据到达，唤醒处理任务 */
    rt_sem_release(rx_sem);
    return RT_EOK;
}
```
