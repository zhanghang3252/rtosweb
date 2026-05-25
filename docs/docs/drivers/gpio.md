---
sidebar_position: 5
title: GPIO 驱动
description: MyRTOS GPIO 驱动使用指南
keywords: [GPIO, 引脚, 驱动]
---

# GPIO 驱动

## 使用示例

```c
#include <rtdevice.h>

/* 引脚定义 */
#define LED_PIN    GET_PIN(A, 5)    /* PA5 */
#define KEY_PIN    GET_PIN(C, 13)   /* PC13 */

/* 配置为输出 */
rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

/* 写引脚 */
rt_pin_write(LED_PIN, PIN_HIGH);  /* 高电平 */
rt_pin_write(LED_PIN, PIN_LOW);   /* 低电平 */

/* 配置为输入 */
rt_pin_mode(KEY_PIN, PIN_MODE_INPUT_PULLUP);

/* 读引脚 */
rt_int32_t value = rt_pin_read(KEY_PIN);

/* 配置中断 */
void irq_callback(void *args)
{
    rt_kprintf("Key pressed!\n");
}

rt_pin_attach_irq(KEY_PIN, PIN_IRQ_MODE_FALLING, irq_callback, RT_NULL);
rt_pin_irq_enable(KEY_PIN, PIN_IRQ_ENABLE);
```

## 引脚模式

| 模式 | 说明 |
|------|------|
| `PIN_MODE_OUTPUT` | 推挽输出 |
| `PIN_MODE_OUTPUT_OD` | 开漏输出 |
| `PIN_MODE_INPUT` | 浮空输入 |
| `PIN_MODE_INPUT_PULLUP` | 上拉输入 |
| `PIN_MODE_INPUT_PULLDOWN` | 下拉输入 |
