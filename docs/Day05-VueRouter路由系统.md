# Vue3 企业开发30天教程

# Day05：Vue Router路由系统


> 学习路线：
>
> Cocos Creator 场景切换
>
> ↓
>
> Vue Router 页面路由
>
> ↓
>
> 企业后台页面管理
>
> ↓
>
> 芋道源码路由分析


---

# 今日学习目标


完成今天学习后，你应该掌握：


- 理解前端路由是什么
- 安装并配置 Vue Router
- 理解 router 和 route 的区别
- 实现页面跳转
- 使用 router-link
- 使用 router.push
- 使用动态路由参数
- 理解后台系统页面结构


今天完成一个简单后台：


```
登录页

↓

首页

↓

角色管理页面

```


---

# 一、什么是路由？


## 1.1 传统网页


传统网页：

```
访问地址

↓

服务器返回HTML

```


例如：

```
https://xxx.com/user.html
```


---

## 1.2 Vue单页面应用


Vue项目：

通常只有：

```
index.html
```


页面切换：

不是重新加载网页。


而是：

```
URL变化

↓

Vue Router匹配组件

↓

显示对应页面
```


---

# 二、Cocos与Vue Router对比


Cocos：

```
大厅场景

↓

点击按钮

↓

进入战斗场景

```


Vue：

```
首页

↓

点击菜单

↓

进入用户页面

```


对应关系：

|Cocos|Vue|
|-|-|
|Scene|Page|
|Director.loadScene|router.push|
|Prefab|Component|


---

# 三、安装Vue Router


如果创建项目时没有安装：

执行：

```bash
npm install vue-router
```


---

# 四、创建路由目录


推荐结构：


```
src

├── router

│   └── index.ts

│

├── views

│   ├── Home.vue

│   ├── Login.vue

│   └── Role.vue

│

├── App.vue

└── main.ts

```


---

# 五、创建页面组件


## Home.vue


路径：

```
src/views/Home.vue
```


代码：

```vue
<template>

<h1>
首页
</h1>

</template>


<script setup lang="ts">

</script>
```


---

## Role.vue


路径：

```
src/views/Role.vue
```


代码：

```vue
<template>

<h1>
角色管理
</h1>

</template>
```


---

# 六、配置Router


文件：

```
src/router/index.ts
```


代码：

```ts
import {
  createRouter,
  createWebHistory
} from 'vue-router'


import Home from '../views/Home.vue'

import Role from '../views/Role.vue'


const router = createRouter({

  history:createWebHistory(),

  routes:[

    {
      path:'/home',

      component:Home

    },

    {
      path:'/role',

      component:Role

    }

  ]

})


export default router
```


---

# 七、main.ts注册Router


文件：

```
src/main.ts
```


修改：


```ts
import { createApp } from 'vue'

import App from './App.vue'

import router from './router'


const app=createApp(App)


app.use(router)


app.mount('#app')
```


---

# 八、显示路由页面


App.vue：


```vue
<template>

<router-view />

</template>
```


router-view作用：

```
路由匹配组件

↓

显示的位置

```


类似：

Cocos：

```
场景容器
```


---

# 九、页面跳转


## 方法1：router-link


```vue
<template>

<router-link to="/home">

首页

</router-link>


<router-link to="/role">

角色管理

</router-link>


</template>
```


---

# 十、代码跳转


企业项目更常用。


例如按钮：


```vue
<button
@click="goRole"
>

角色管理

</button>
```


script：

```ts
import {
  useRouter
} from 'vue-router'


const router=useRouter()


function goRole(){

  router.push('/role')

}
```


---

# 十一、动态路由参数


例如：

查看角色详情：


```
/role/1001

```


1001：

角色ID。


---

配置：


```ts
{

path:'/role/:id',

component:Role

}
```


---

获取参数：


```ts
import {
 useRoute
} from 'vue-router'


const route=useRoute()


console.log(
route.params.id
)
```


---

# 十二、后台系统常见结构


芋道类似：


```
Layout.vue


├── Sidebar菜单

├── Header顶部

└── router-view内容区域

```


页面切换：

实际上只是：

```
router-view

替换内容
```


---

# 十三、综合练习


完成一个后台结构：


```
App.vue


Layout.vue


views

├── Home.vue

├── Role.vue

└── User.vue

```


要求：

实现：

```
首页

角色管理

用户管理

```


三个页面切换。


---

# 十四、芋道源码关联


打开芋道：


重点查看：


```
src/router
```


你会看到：

类似：


```ts
{
 path:'/system/user',
 component:User
}
```


本质就是：

今天学习的：

```
routes配置
```


---

# 十五、今日练习


## 练习1


创建：

```
Login.vue
```


实现：

点击按钮：

进入：

```
/home
```


---

## 练习2


创建：

```
RoleDetail.vue
```


访问：

```
/role/1001
```


页面显示：


```
角色ID:1001

```


---

## 练习3


制作菜单：

```
首页

角色

用户

```


点击切换页面。


---

# 十六、今日验收


你应该可以回答：


## 1

Vue页面切换靠什么？


答案：

```
Vue Router
```


---

## 2

显示页面的位置是什么？


答案：

```
router-view
```


---

## 3

代码跳转使用什么？


答案：

```
router.push
```


---

## 4

获取URL参数使用什么？


答案：

```
useRoute
```


---

# 今日总结


Vue Router核心：

```
URL

↓

router匹配

↓

component

↓

router-view显示

```


企业后台：

```
Layout

+

Router

+

Views

+

Components

```


这是芋道前端结构的基础。


---

# Day06预告


主题：

# Vue3表单与组件库Element Plus


学习：

- Element Plus安装
- Button
- Input
- Form
- Table
- Dialog


实战：

制作：

```
用户管理页面
```
