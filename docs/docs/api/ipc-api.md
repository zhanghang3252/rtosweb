---
sidebar_position: 3
title: IPC API
description: MyRTOS 同步与通信 API 参考
keywords: [API, 信号量, 互斥锁, 消息队列, 事件]
---

# IPC API

## 信号量 API

### rt_sem_create

```c
rt_sem_t rt_sem_create(const char *name, rt_uint32_t value, rt_uint8_t flag);
```

### rt_sem_take

```c
rt_err_t rt_sem_take(rt_sem_t sem, rt_int32_t timeout);
```

### rt_sem_release

```c
rt_err_t rt_sem_release(rt_sem_t sem);
```

---

## 互斥锁 API

### rt_mutex_create

```c
rt_mutex_t rt_mutex_create(const char *name, rt_uint8_t flag);
```

### rt_mutex_take

```c
rt_err_t rt_mutex_take(rt_mutex_t mutex, rt_int32_t timeout);
```

### rt_mutex_release

```c
rt_err_t rt_mutex_release(rt_mutex_t mutex);
```

---

## 消息队列 API

### rt_mq_create

```c
rt_mq_t rt_mq_create(const char *name, rt_size_t msg_size,
                      rt_size_t max_msgs, rt_uint8_t flag);
```

### rt_mq_send

```c
rt_err_t rt_mq_send(rt_mq_t mq, void *buffer, rt_size_t size);
```

### rt_mq_recv

```c
rt_err_t rt_mq_recv(rt_mq_t mq, void *buffer,
                    rt_size_t size, rt_int32_t timeout);
```

---

## 事件组 API

### rt_event_create

```c
rt_event_t rt_event_create(const char *name, rt_uint8_t flag);
```

### rt_event_send

```c
rt_err_t rt_event_send(rt_event_t event, rt_uint32_t set);
```

### rt_event_recv

```c
rt_err_t rt_event_recv(rt_event_t event, rt_uint32_t set,
                       rt_uint8_t option, rt_int32_t timeout,
                       rt_uint32_t *recved);
```
