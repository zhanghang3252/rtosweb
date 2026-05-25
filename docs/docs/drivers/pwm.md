---
sidebar_position: 7
title: PWM 驱动
description: MyRTOS PWM 驱动使用指南
keywords: [PWM, 脉宽调制, 驱动]
---

# PWM 驱动

```c
#include <rtdevice.h>

/* 查找 PWM 设备 */
rt_device_t pwm = rt_device_find("pwm1");
rt_device_open(pwm, RT_DEVICE_OFLAG_WRONLY);

/* 设置 PWM 参数 */
struct rt_pwm_configuration cfg;
cfg.channel = 1;              /* 通道 1 */
cfg.period    = 1000000;      /* 周期 1ms (1kHz) */
cfg.pulse     = 500000;       /* 占空比 50% */
rt_device_control(pwm, RT_PWM_CMD_SET, &cfg);

/* 启用 PWM 输出 */
rt_device_control(pwm, RT_PWM_CMD_ENABLE, RT_NULL);

/* 修改占空比为 75% */
cfg.pulse = 750000;
rt_device_control(pwm, RT_PWM_CMD_SET, &cfg);
```
