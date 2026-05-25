---
sidebar_position: 5
title: 内存管理
description: MyRTOS 内存管理 — 堆分配与内存池
keywords: [内存, 堆, malloc, free, 内存池, memory pool]
---

# 内存管理

MyRTOS 提供堆内存分配和内存池两种内存管理方式。

## 堆内存分配

### 动态分配

```c
/* 分配内存 */
void *ptr = rt_malloc(128);  /* 分配 128 字节 */
if (ptr == RT_NULL)
{
    /* 分配失败 */
    return;
}

/* 使用内存 */
rt_memset(ptr, 0, 128);

/* 释放内存 */
rt_free(ptr);
```

### 重新分配

```c
/* 重新分配内存 */
void *new_ptr = rt_realloc(ptr, 256);  /* 扩展到 256 字节 */
```

### 分配并清零

```c
/* 分配并清零（类似 calloc） */
void *ptr = rt_calloc(10, 32);  /* 分配 10 个 32 字节的块 */
```

## 内存池

内存池适合频繁分配/释放固定大小内存的场景，无碎片，时间确定。

```c
static rt_mp_t mp = RT_NULL;
static rt_uint8_t mp_pool[1024];  /* 内存池缓冲区 */

/* 创建内存池 */
mp = rt_mp_create("my_mp", 10, 64);  /* 10 块，每块 64 字节 */

/* 从内存池分配 */
void *block = rt_mp_alloc(mp, RT_WAITING_FOREVER);

/* 使用内存块 */
/* ... */

/* 归还内存块 */
rt_mp_free(block);
```

## 配置选项

| 配置宏 | 默认值 | 说明 |
|--------|--------|------|
| `RT_HEAP_SIZE` | 10240 | 堆内存大小 (字节) |
| `RT_USING_MEMTRACE` | n | 启用内存追踪 |
| `RT_USING_MEMPOOL` | n | 启用内存池 |

## 注意事项

1. **及时释放**：动态分配的内存必须释放，否则会导致内存泄漏
2. **中断中不要分配**：`rt_malloc()` 不是中断安全的
3. **检查返回值**：分配可能失败，必须检查返回值是否为 `RT_NULL`
