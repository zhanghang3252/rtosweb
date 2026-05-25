---
sidebar_position: 2
title: 安装指南
description: 如何在 Alibaba Cloud Linux 3 / Ubuntu / macOS 上搭建 MyRTOS 开发环境
keywords: [安装, 环境搭建, 工具链, SCons]
---

# 安装指南

本文介绍如何搭建 MyRTOS 开发环境，包括编译工具链、构建系统和烧录工具。

## 系统要求

| 项目 | 最低要求 | 推荐配置 |
|------|---------|---------|
| 操作系统 | Linux / macOS / WSL2 | Alibaba Cloud Linux 3 / Ubuntu 22.04 |
| Python | 3.8+ | 3.10+ |
| SCons | 4.0+ | 4.5+ |
| GCC (ARM) | 10.x | 13.x |
| 磁盘空间 | 2 GB | 10 GB+ |
| RAM | 2 GB | 4 GB+ |

## Alibaba Cloud Linux 3 安装步骤

### 1. 安装基础依赖

```bash
# 更新系统包
sudo dnf update -y

# 安装开发工具组
sudo dnf groupinstall -y "Development Tools"

# 安装 Python 和 SCons
sudo dnf install -y python3 python3-pip
pip3 install scons

# 安装 Git
sudo dnf install -y git

# 验证
python3 --version    # 3.8+
scons --version      # 4.0+
git --version
```

### 2. 安装 ARM 工具链

```bash
# 方式一：从 ARM 官方下载（推荐）
wget https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-x86_64-arm-none-eabi.tar.xz
sudo tar -xf arm-gnu-toolchain-*.tar.xz -C /opt/

# 添加到 PATH
echo 'export PATH=/opt/arm-gnu-toolchain-13.2.Rel1-x86_64-arm-none-eabi/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 验证
arm-none-eabi-gcc --version
```

```bash
# 方式二：使用 dnf（版本可能较旧）
sudo dnf install -y arm-none-eabi-gcc arm-none-eabi-newlib
```

### 3. 安装烧录调试工具

```bash
# OpenOCD（通用 JTAG/SWD 调试器）
sudo dnf install -y openocd

# 或使用 J-Link（从 Segger 官网下载）
# https://www.segger.com/downloads/jlink/
```

## Ubuntu / Debian 安装步骤

```bash
# 基础依赖
sudo apt update
sudo apt install -y build-essential git python3 python3-pip
pip3 install scons

# ARM 工具链
sudo apt install -y gcc-arm-none-eabi

# OpenOCD
sudo apt install -y openocd
```

## macOS 安装步骤

```bash
# 使用 Homebrew
brew install git python3 scons
brew install --cask gcc-arm-embedded

# 或使用 ARM 官方工具链
# 从 https://developer.arm.com/downloads 下载 macOS 版本
```

## 验证环境

```bash
# 创建测试脚本
cat << 'EOF' > test_env.sh
#!/bin/bash
echo "=== MyRTOS 开发环境检查 ==="
echo ""
echo -n "Python:   "; python3 --version 2>&1
echo -n "SCons:    "; scons --version 2>&1 | head -1
echo -n "Git:      "; git --version 2>&1
echo -n "ARM GCC:  "; arm-none-eabi-gcc --version 2>&1 | head -1
echo -n "OpenOCD:  "; openocd --version 2>&1 | head -1
echo ""
echo "=== 检查完成 ==="
EOF

chmod +x test_env.sh
./test_env.sh
```

预期输出：

```
=== MyRTOS 开发环境检查 ===

Python:   Python 3.10.12
SCons:    SCons: v4.5.2
Git:      git version 2.39.2
ARM GCC:  arm-none-eabi-gcc (GNU Arm Embedded Toolchain 13.2.Rel1) 13.2.1 20231009
OpenOCD:  Open On-Chip Debugger 0.12.0

=== 检查完成 ===
```

## 常见问题

### Q: `arm-none-eabi-gcc` 命令找不到？

确保工具链已正确添加到 PATH：

```bash
echo $PATH | tr ':' '\n' | grep arm
```

如果没有输出，需要手动添加 PATH。

### Q: SCons 版本太旧？

```bash
pip3 install --upgrade scons
```

### Q: 权限不足？

不要在全局安装 Python 包，使用 `--user` 参数：

```bash
pip3 install --user scons
```

## 下一步

- **[快速上手](./quick-start.md)** — 编写第一个 MyRTOS 程序
- **[构建指南](./build-guide.md)** — 了解完整的构建流程
