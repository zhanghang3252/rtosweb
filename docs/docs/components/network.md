---
sidebar_position: 1
title: 网络协议栈
description: MyRTOS 网络协议栈 — lwIP 集成
keywords: [网络, TCP/IP, lwIP, MQTT, HTTP]
---

# 网络协议栈

MyRTOS 集成 lwIP 轻量级 TCP/IP 协议栈。

## 配置

```bash
# menuconfig
RT_USING_LWIP=y
RT_LWIP_ICMP=y
RT_LWIP_UDP=y
RT_LWIP_TCP=y
RT_LWIP_DHCP=y
RT_LWIP_DNS=y
```

## Socket 编程示例

```c
#include <sys/socket.h>

/* TCP 客户端 */
int tcp_client_example(void)
{
    int sock;
    struct sockaddr_in server_addr;
    char buffer[128];

    /* 创建 socket */
    sock = socket(AF_INET, SOCK_STREAM, 0);

    /* 连接服务器 */
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(8080);
    server_addr.sin_addr.s_addr = inet_addr("192.168.1.100");
    connect(sock, (struct sockaddr *)&server_addr, sizeof(server_addr));

    /* 发送数据 */
    send(sock, "Hello Server!", 13, 0);

    /* 接收数据 */
    int len = recv(sock, buffer, sizeof(buffer), 0);

    /* 关闭连接 */
    closesocket(sock);
    return 0;
}
```

## MQTT 客户端

```c
#include <mqtt_client.h>

/* MQTT 连接示例 */
void mqtt_example(void)
{
    rt_mqtt_client_t client;
    
    client = rt_mqtt_client_create("mqtt://broker.example.com:1883");
    rt_mqtt_client_connect(client);
    rt_mqtt_client_subscribe(client, "/rtosweb/data", 1);
    rt_mqtt_client_publish(client, "/rtosweb/status", "online", 6, 0, 0);
}
```
