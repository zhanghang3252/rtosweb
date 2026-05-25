---
sidebar_position: 2
title: 文件系统
description: MyRTOS 文件系统组件
keywords: [文件系统, filesystem, FAT, LittleFS]
---

# 文件系统

MyRTOS 支持多种文件系统。

## 支持的文件系统

| 文件系统 | 说明 |
|---------|------|
| FatFS | FAT12/16/32，适合 SD 卡 |
| LittleFS | 适合 NOR Flash |
| RomFS | 只读文件系统 |
| DevFS | 设备文件系统 |

## 使用示例

```c
#include <dfs_fs.h>

/* 挂载文件系统 */
dfs_mount("sd0", "/", "elm", 0, 0);

/* 读写文件 */
int fd = open("/test.txt", O_WRONLY | O_CREAT);
write(fd, "Hello File!", 11);
close(fd);

/* 读取文件 */
fd = open("/test.txt", O_RDONLY);
char buf[32];
read(fd, buf, sizeof(buf));
close(fd);
```
