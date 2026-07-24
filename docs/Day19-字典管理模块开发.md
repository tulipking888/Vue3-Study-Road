# Day19 字典管理模块开发（实战版）

# 今日目标

继续围绕三个最终目标学习：

1.  能看懂芋道前端源码
2.  能修改芋道业务模块
3.  能开发企业后台系统

今天学习企业后台非常常见的功能：

    字典管理

完成后能够：

-   理解为什么后台需要字典
-   理解字典和业务数据的关系
-   分析芋道 system/dict 模块设计
-   自己实现一个字典管理页面
-   掌握 CRUD 企业开发流程

最终效果：

    系统字典管理


    用户状态

    ├ 启用

    └ 禁用


    订单状态

    ├ 待支付

    ├ 已支付

    └ 已完成

------------------------------------------------------------------------

# 一、为什么需要字典管理

企业系统中大量字段不是直接显示。

例如数据库：

``` json
{
    "status":1
}
```

页面显示：

    1

用户无法理解。

希望显示：

    启用

所以需要转换：

    数据库值

    ↓

    字典

    ↓

    显示文本

------------------------------------------------------------------------

# 二、企业字典设计

常见结构：

## 字典类型

例如：

    user_status

表示：

用户状态。

------------------------------------------------------------------------

## 字典数据

例如：

    user_status


    1   启用

    0   禁用

完整结构：

    字典类型

    ↓

    字典项

------------------------------------------------------------------------

# 三、芋道源码分析

项目：

    yudao-ui-admin-vue3

重点：

    src

    ├ views

    │  └ system

    │      └ dict

    ├ api

    │  └ system

    │      └ dict

    └ hooks

------------------------------------------------------------------------

# 四、字典在企业项目中的作用

例如用户列表：

后端返回：

``` json
[
 {
  "username":"张三",
  "status":1
 }
]
```

前端：

``` vue
{{status}}
```

显示：

    1

体验不好。

通过字典：

``` json
{
 "value":1,
 "label":"启用"
}
```

显示：

    启用

------------------------------------------------------------------------

# 五、实战项目设计

继续：

    vue-study

创建：

    src

    ├ views

    │  └ system

    │      └ dict

    │          └ index.vue


    └ api

       └ dict.ts

------------------------------------------------------------------------

# 六、实战1：创建字典列表页面

文件：

    src/views/system/dict/index.vue

代码：

``` vue
<template>

<div>

<h2>
字典管理
</h2>


<el-table
:data="dictList"
>


<el-table-column
prop="id"
label="ID"
/>


<el-table-column
prop="name"
label="字典名称"
/>


<el-table-column
prop="type"
label="字典类型"
/>


</el-table>


</div>


</template>


<script setup lang="ts">

import {
ref
} from "vue"


const dictList = ref([

{
id:1,
name:"用户状态",
type:"user_status"
},

{
id:2,
name:"订单状态",
type:"order_status"
}

])


</script>
```

运行：

显示：

    用户状态

    order_status

------------------------------------------------------------------------

# 七、实战2：设计字典数据结构

定义接口：

``` ts
interface DictType {


id:number


name:string


type:string


}
```

字典项：

``` ts
interface DictData {


value:string


label:string


}
```

例如：

``` ts
const statusDict=[

{
value:"1",
label:"启用"
},

{
value:"0",
label:"禁用"
}

]
```

------------------------------------------------------------------------

# 八、实战3：封装字典转换函数

企业项目不会每个页面手写判断。

错误方式：

``` vue
{{status===1?'启用':'禁用'}}
```

正确：

封装：

    utils/dict.ts

代码：

``` ts
export function getDictLabel(
 list:any[],
 value:any
){


const item =
list.find(
 item=>item.value==value
)


return item?
item.label:
value


}
```

使用：

``` ts
getDictLabel(
 statusDict,
 1
)
```

返回：

    启用

------------------------------------------------------------------------

# 九、实战4：Axios请求字典接口

创建：

    src/api/dict.ts

代码：

``` ts
import request from "./request"


export function getDictList(){


return request.get(
"/dict/list"
)


}
```

页面：

``` ts
import {
getDictList
} from "../../api/dict"


import {
onMounted
} from "vue"



onMounted(()=>{

loadData()

})


async function loadData(){


const res =
await getDictList()


dictList.value =
res.data


}
```

流程：

    页面

    ↓

    api

    ↓

    request

    ↓

    后端

    ↓

    字典数据

    ↓

    table展示

------------------------------------------------------------------------

# 十、实战5：新增字典

新增按钮：

``` vue
<el-button>

新增字典

</el-button>
```

表单：

``` vue
<el-dialog
title="新增字典"
>


<el-form>


<el-form-item
label="名称"
>


<el-input
v-model="form.name"
/>


</el-form-item>


</el-form>


</el-dialog>
```

------------------------------------------------------------------------

# 十一、实战6：新增接口

API：

``` ts
export function createDict(
data:any
){

return request.post(
"/dict/create",
data
)

}
```

提交：

``` ts
async function submit(){


await createDict(form.value)


loadData()


}
```

------------------------------------------------------------------------

# 十二、字典和业务页面结合

例如角色列表：

接口返回：

``` json
{
"status":1
}
```

页面：

``` vue
{{getDictLabel(statusDict,row.status)}}
```

显示：

    启用

这就是企业后台大量使用的模式。

------------------------------------------------------------------------

# 十三、芋道源码阅读任务

打开：

    yudao-ui-admin-vue3/src/views/system/dict

重点观察：

1.  字典列表如何实现？

2.  字典项如何维护？

3.  字典缓存在哪里？

4.  页面如何调用字典数据？

------------------------------------------------------------------------

# 十四、今日实操任务

必须完成：

## 基础

-   [ ] 创建字典管理页面
-   [ ] 使用 el-table 展示字典

## 数据

-   [ ] 定义 DictType
-   [ ] 定义 DictData

## 企业能力

-   [ ] 封装字典转换函数
-   [ ] 页面显示 label

## CRUD

-   [ ] 新增字典
-   [ ] 删除字典
-   [ ] 修改字典

------------------------------------------------------------------------

# Day19总结

今天掌握：

    数据库code

    ↓

    字典转换

    ↓

    页面展示label

企业后台开发核心能力：

    列表

    +

    接口

    +

    表单

    +

    字典

    +

    权限

下一章节：

Day20 文件上传模块。

学习：

    el-upload

    ↓

    上传接口

    ↓

    文件地址保存

    ↓

    页面回显
