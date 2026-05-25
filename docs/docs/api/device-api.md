---
sidebar_position: 6
title: 设备 API
description: MyRTOS 设备驱动框架 API 参考
keywords: [API, 设备, device, 驱动, UART, SPI, I2C]
---

# 设备 API

## 设备注册

```c
rt_err_t rt_device_register(rt_device_t dev,
                            const char *name,
                            rt_uint16_t flags);
```

## 设备查找

```c
rt_device_t rt_device_find(const char *name);
```

## 设备操作

```c
rt_err_t rt_device_init(rt_device_t dev);
rt_err_t rt_device_open(rt_device_t dev, rt_uint16_t oflag);
rt_err_t rt_device_close(rt_device_t dev);
rt_size_t rt_device_read(rt_device_t dev, rt_off_t pos,
                         void *buffer, rt_size_t size);
rt_size_t rt_device_write(rt_device_t dev, rt_off_t pos,
                          const void *buffer, rt_size_t size);
rt_err_t rt_device_control(rt_device_t dev, int cmd, void *args);
```

## 使用示例

```c
/* 查找 UART 设备 */
rt_device_t uart = rt_device_find("uart2");
if (uart == RT_NULL)
{
    rt_kprintf("uart2 not found!\n");
    return;
}

/* 配置串口参数 */
struct serial_configure config = BAUD_RATE_115200 | DATA_BITS_8 | STOP_BITS_1 | PARITY_NONE;
rt_device_control(uart, RT_DEVICE_CTRL_CONFIG, &config);

/* 打开设备 */
rt_device_open(uart, RT_DEVICE_FLAG_INT_RX);

/* 发送数据 */
char *msg = "Hello MyRTOS!\n";
rt_device_write(uart, 0, msg, rt_strlen(msg));
```
