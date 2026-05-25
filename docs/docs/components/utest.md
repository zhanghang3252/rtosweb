---
sidebar_position: 5
title: 单元测试
description: MyRTOS 单元测试框架 utest
keywords: [测试, unit test, utest]
---

# 单元测试框架

MyRTOS 提供 utest 单元测试框架。

## 编写测试用例

```c
#include <utest.h>

/* 测试用例 */
static void test_semaphore(void)
{
    rt_sem_t sem = rt_sem_create("test_sem", 0, RT_IPC_FLAG_FIFO);
    uassert_not_null(sem);

    rt_sem_release(sem);
    rt_err_t err = rt_sem_take(sem, 0);
    uassert_int_equal(err, RT_EOK);

    rt_sem_delete(sem);
}

/* 注册测试用例 */
static rt_err_t utest_tc_init(void)
{
    return RT_EOK;
}

static rt_err_t utest_tc_cleanup(void)
{
    return RT_EOK;
}

static struct utest_tc_descr _tc_list[] = {
    {"test_semaphore", utest_tc_init, utest_tc_cleanup, test_semaphore},
};

/* 导出测试用例 */
UTEST_TC_EXPORT(_tc_list, "myrtos.ipc.semaphore", utest_tc_init, utest_tc_cleanup, 10);
```

## 运行测试

```bash
# 在 Shell 中运行
msh > utest_run myrtos.ipc.semaphore
```
