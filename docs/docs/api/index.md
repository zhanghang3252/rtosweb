---
sidebar_position: 1
title: API 参考概览
description: MyRTOS 完整 API 参考手册
keywords: [API, 参考, 手册, 接口]
---

# API 参考概览

本文档提供 MyRTOS 所有内核 API 的完整参考。

## API 分类

### 任务管理
- [任务 API](./task-api.md) — 任务创建、删除、调度

### 同步通信
- [IPC API](./ipc-api.md) — 信号量、互斥锁、消息队列、事件

### 定时器
- [定时器 API](./timer-api.md) — 软件定时器

### 内存管理
- [内存 API](./memory-api.md) — 堆分配、内存池

### 设备驱动
- [设备 API](./device-api.md) — 设备框架接口

## API 命名规范

| 前缀 | 说明 | 示例 |
|------|------|------|
| `rt_` | 内核 API | `rt_thread_create()` |
| `rt_hw_` | 硬件相关 | `rt_hw_interrupt_disable()` |
| `rt_device_` | 设备操作 | `rt_device_find()` |

## 返回值

大多数 API 返回 `rt_err_t` 类型：

| 返回值 | 说明 |
|--------|------|
| `RT_EOK` | 成功 (0) |
| `-RT_ERROR` | 通用错误 |
| `-RT_ETIMEOUT` | 超时 |
| `-RT_EFULL` | 队列/信号量已满 |
| `-RT_EEMPTY` | 队列/信号量为空 |
| `-RT_ENOMEM` | 内存不足 |
| `-RT_ENOSYS` | 功能未实现 |
| `-RT_EBUSY` | 资源忙 |
| `-RT_EINVAL` | 参数无效 |

## 等待时间

大多数阻塞 API 的 `timeout` 参数：

| 值 | 说明 |
|----|------|
| `RT_WAITING_FOREVER` | 永久等待 (-1) |
| `RT_WAITING_NO` | 不等待，立即返回 (0) |
| `N` (正数) | 等待 N 个 tick |
