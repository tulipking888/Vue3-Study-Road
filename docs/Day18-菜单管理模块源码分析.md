# Day18 菜单管理模块源码分析（实战版）

# 今日目标

本章节继续按照企业后台开发方式学习。

目标：

-   理解后台菜单管理为什么存在
-   理解菜单、角色、权限、路由关系
-   分析芋道 yudao-ui-admin-vue3 菜单模块
-   自己完成一个菜单管理页面
-   掌握 Tree + Axios + Form + Dialog 的组合开发方式

最终完成：

    游戏后台菜单管理

    游戏管理

    ├ 角色管理

    ├ 装备管理

    └ 技能管理

------------------------------------------------------------------------

# 一、前置知识回顾

前面 Day07 我们完成了：

    Vue页面

    ↓

    API接口

    ↓

    request封装

    ↓

    Axios

    ↓

    后端接口

今天菜单管理依然使用这个模式。

完整流程：

    菜单页面

    ↓

    menu API

    ↓

    request

    ↓

    后端接口

    ↓

    返回菜单树数据

    ↓

    el-tree展示

------------------------------------------------------------------------

# 二、为什么企业后台需要菜单管理

普通网站：

    首页

    商品

    新闻

后台系统：

    系统管理

    ├ 用户管理

    ├ 角色管理

    └ 菜单管理

如果菜单写死：

``` vue
<el-menu>

用户管理

角色管理

</el-menu>
```

会产生问题：

1.  新增功能需要修改前端代码
2.  不同用户看到相同菜单
3.  无法和权限系统结合

企业项目：

    数据库保存菜单

    ↓

    后端返回用户菜单权限

    ↓

    前端动态生成菜单

    ↓

    动态路由

    ↓

    显示页面

------------------------------------------------------------------------

# 三、RBAC权限模型

企业后台常见模型：

    User

    用户

    ↓

    Role

    角色

    ↓

    Permission

    权限

    ↓

    Menu

    菜单

例如：

管理员：

    用户管理

    角色管理

    菜单管理

普通员工：

    订单管理

------------------------------------------------------------------------

# 四、芋道源码分析

项目：

    yudao-ui-admin-vue3

重点目录：

    src

    ├ api

    │  └ system

    │      └ menu

    ├ views

    │  └ system

    │      └ menu

    └ router

阅读目标：

## views/system/menu

负责：

-   页面展示
-   Tree结构
-   新增编辑弹窗

## api/system/menu

负责：

-   查询菜单
-   新增菜单
-   修改菜单
-   删除菜单

------------------------------------------------------------------------

# 五、菜单数据结构

菜单不是普通数组，而是树。

例如：

    游戏管理

    ├ 角色管理

    ├ 装备管理

数据：

``` ts
interface Menu {

 id:number

 name:string

 path:string

 parentId:number

 children?:Menu[]

}
```

------------------------------------------------------------------------

# 六、实战项目创建

继续：

    vue-study

创建：

    src

    ├ views

    │  └ game

    │      └ menu

    │          └ index.vue

    └ api

       └ menu.ts

------------------------------------------------------------------------

# 七、实战1：实现菜单Tree展示

文件：

    src/views/game/menu/index.vue

代码：

``` vue
<template>

<div>

<h2>
游戏菜单管理
</h2>


<el-tree

:data="menuList"

node-key="id"

default-expand-all

/>


</div>


</template>


<script setup lang="ts">

import {
 ref
} from "vue"


interface Menu {

 id:number

 name:string

 children?:Menu[]

}


const menuList = ref<Menu[]>([

{

 id:1,

 name:"游戏管理",

 children:[

 {

 id:2,

 name:"角色管理"

 },


 {

 id:3,

 name:"装备管理"

 },


 {

 id:4,

 name:"技能管理"

 }

 ]

}

])


</script>
```

运行：

页面显示：

    游戏管理

    ├ 角色管理

    ├ 装备管理

    └ 技能管理

------------------------------------------------------------------------

# 八、实战2：模拟后端接口

因为目前没有SpringBoot。

使用Mock模拟。

接口：

    GET /api/menu/list

返回：

``` json
{
 "code":0,
 "data":[
  {
   "id":1,
   "name":"游戏管理",
   "children":[
    {
     "id":2,
     "name":"角色管理"
    }
   ]
  }
 ]
}
```

------------------------------------------------------------------------

# 九、实战3：创建菜单API

创建：

    src/api/menu.ts

代码：

``` ts
import request from "../utils/request"


export function getMenuList(){

 return request.get(
   "/menu/list"
 )

}
```

------------------------------------------------------------------------

# 十、实战4：页面请求菜单数据

修改：

``` ts
<script setup lang="ts">


import {
 ref,
 onMounted
} from "vue"


import {
 getMenuList
} from "../../api/menu"


const menuList = ref([])


onMounted(()=>{

 loadData()

})


async function loadData(){

 const res =
 await getMenuList()


 console.log(res)


 menuList.value =
 res.data

}

</script>
```

流程：

    页面加载

    ↓

    onMounted

    ↓

    loadData

    ↓

    getMenuList

    ↓

    Axios

    ↓

    Mock

    ↓

    更新menuList

    ↓

    Tree刷新

------------------------------------------------------------------------

# 十一、实战5：新增菜单Dialog

企业菜单管理必须支持新增。

增加：

``` vue
<el-button>
新增菜单
</el-button>
```

数据：

``` ts
const form = ref({

 name:"",

 path:""

})
```

弹窗：

``` vue
<el-dialog
title="新增菜单"
>

<el-form>

<el-form-item
label="菜单名称"
>

<el-input
v-model="form.name"
/>

</el-form-item>


</el-form>


</el-dialog>
```

------------------------------------------------------------------------

# 十二、实战6：表单提交

新增API：

``` ts
export function createMenu(data:any){

 return request.post(
  "/menu/create",
  data
 )

}
```

提交：

``` ts
async function submit(){

 await createMenu(form.value)

 loadData()

}
```

流程：

    填写表单

    ↓

    点击确定

    ↓

    POST接口

    ↓

    保存

    ↓

    重新查询

    ↓

    刷新Tree

------------------------------------------------------------------------

# 十三、实战7：删除菜单

接口：

``` ts
export function deleteMenu(id:number){

 return request.delete(
  "/menu/delete/"+id
 )

}
```

页面：

``` ts
async function remove(id:number){

 await deleteMenu(id)

 loadData()

}
```

------------------------------------------------------------------------

# 十四、菜单和动态路由

后台真实流程：

    登录

    ↓

    获取用户权限

    ↓

    获取菜单

    ↓

    转换Route

    ↓

    router.addRoute()

    ↓

    进入页面

菜单：

    path:

    /game/role

对应：

    views/game/role/index.vue

------------------------------------------------------------------------

# 十五、今日完整练习

必须完成：

## 基础

-   [ ] 创建菜单页面
-   [ ] 使用el-tree显示数据

## 接口

-   [ ] 创建menu API
-   [ ] Axios请求菜单

## CRUD

-   [ ] 新增菜单Dialog
-   [ ] 删除菜单
-   [ ] 修改菜单

## 理解

能够说明：

    菜单

    ↓

    权限

    ↓

    路由

    ↓

    页面

------------------------------------------------------------------------

# 十六、芋道源码阅读任务

打开：

    yudao-ui-admin-vue3/src/views/system/menu

观察：

1.  菜单列表如何展示？

2.  新增菜单弹窗如何实现？

3.  API如何调用？

4.  权限字段如何保存？

------------------------------------------------------------------------

# Day18总结

今天完成了企业后台菜单模块开发流程。

掌握：

-   菜单树设计
-   Element Plus Tree
-   Axios接口调用
-   Dialog表单
-   CRUD开发模式
-   动态路由关系

以后开发芋道业务模块：

依然遵循：

    页面

    ↓

    API

    ↓

    request

    ↓

    后端

    ↓

    数据展示

    ↓

    CRUD
