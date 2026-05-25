---
sidebar_position: 5
title: 内存 API
description: MyRTOS 内存管理 API 参考
keywords: [API, 内存, malloc, free, 内存池]
---

# 内存 API

## 堆内存

### rt_malloc

```c
void *rt_malloc(rt_size_t nbytes);
```

### rt_free

```c
void rt_free(void *ptr);
```

### rt_realloc

```c
void *rt_realloc(void *ptr, rt_size_t nbytes);
```

### rt_calloc

```c
void *rt_calloc(rt_size_t count, rt_size_t size);
```

---

## 内存池

### rt_mp_create

```c
rt_mp_t rt_mp_create(const char *name,
                     rt_size_t block_count,
                     rt_size_t block_size);
```

### rt_mp_alloc

```c
void *rt_mp_alloc(rt_mp_t mp, rt_int32_t timeout);
```

### rt_mp_free

```c
void rt_mp_free(void *block);
```
