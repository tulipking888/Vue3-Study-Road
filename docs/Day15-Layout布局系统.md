# Day15 Layout布局系统


> Vue3企业开发学习路线 Day15
>
> 目标：
>
> 理解企业后台系统的整体页面布局。
>
> 掌握芋道 yudao-ui-admin-vue3 中：
>
> Layout、Sidebar、Header、RouterView之间的关系。


---

# 一、今日学习目标


今天学习：

- 什么是后台Layout
- Layout组件结构
- Header顶部栏
- Sidebar菜单栏
- RouterView内容区域
- Element Plus布局组件


最终理解：


```
浏览器打开后台


↓

Layout


↓

Header + Sidebar


↓

RouterView


↓

业务页面

```


对应芋道源码：


```
src/layouts

```


---

# 二、为什么后台需要Layout


普通Vue项目：

每个页面自己写：

```vue
<div>

页面内容

</div>
```


例如：

```
用户页面

商品页面

订单页面

```


每个页面重复：

```
顶部

菜单

底部

```


---

后台系统：

所有页面共享：


```
顶部导航

左侧菜单

内容区域

```


所以抽出来：

Layout。


---

# 三、Layout是什么


简单理解：

Layout就是：

```
后台系统外壳

```


例如：


```
+--------------------------------+

| Header                         |

+---------+----------------------+

|         |                      |

| Sidebar | RouterView           |

|         |                      |

+---------+----------------------+

```


---

# 四、Vue组件关系


结构：


```
App.vue


↓

Layout.vue


↓

├ Header.vue

├ Sidebar.vue

└ RouterView


       ↓

 User.vue

 Role.vue

 Menu.vue

```


---

# 五、芋道Layout目录分析


打开：


```
src/layouts

```


通常结构类似：


```
layouts


├ index.vue

├ components

│
├ Header.vue

├ Sidebar.vue

└ Content.vue

```


---

# 六、Layout入口


例如：


```vue
<template>


<div class="layout">


<Header />


<Sidebar />


<RouterView />


</div>


</template>
```


含义：


Layout负责组合页面。


---

# 七、RouterView作用


前面Day05学习过Router。


这里再次强化。


例如：

路由：


```ts
{

path:'/user',

component:User

}

```


访问：


```
/user

```


页面会显示在：


```vue
<RouterView />

```


里面。


---

# 八、后台页面切换过程


例如点击：

用户管理。


流程：


```
点击菜单


↓

router.push('/user')


↓

Router匹配


↓

User.vue


↓

显示到RouterView

```


---

# 九、Header顶部区域


Header通常包含：


```
Logo

用户名

消息

退出登录

```


例如：


```vue
<template>

<div>

管理员

退出

</div>

</template>
```


---

# 十、Sidebar菜单区域


Sidebar：

左侧菜单。


例如：


```
系统管理

  用户管理

  角色管理

  菜单管理


订单管理


商品管理

```


---

菜单来源：

通常：

不是写死。


而是：


```
后端返回菜单

↓

Store保存

↓

Sidebar循环显示

```


---

# 十一、菜单渲染


例如：


数据：


```ts
const menus=[


{

title:"用户管理",

path:"/user"

},


{

title:"角色管理",

path:"/role"

}


]

```


---

模板：


```vue
<el-menu>


<el-menu-item

v-for="item in menus"


>


{{item.title}}


</el-menu-item>


</el-menu>
```


---

# 十二、Element Plus布局


后台大量使用：


```
el-container

el-header

el-aside

el-main

```


结构：


```vue
<el-container>


<el-header>


</el-header>


<el-container>


<el-aside>


</el-aside>


<el-main>


</el-main>


</el-container>


</el-container>
```


---

# 十三、和Cocos Creator类比


可以理解成：


## Layout


类似：

游戏主框架。


例如：

```
游戏主场景

+

固定UI

```


---

## Header


类似：

顶部HUD。


例如：

```
金币

头像

设置按钮

```


---

## Sidebar


类似：

功能菜单。


例如：

```
背包

商城

任务

```


---

## RouterView


类似：

动态内容区域。


例如：

切换：

```
背包界面

↓

商城界面

```


---

# 十四、芋道源码阅读任务


打开：


```
yudao-ui-admin-vue3/src/layouts

```


今天重点看：


## 任务1


找到：

```
layouts/index.vue

```


回答：


- 引用了哪些组件？
- RouterView在哪里？


记录：

```
Layout结构：

```


---

## 任务2


找到：

```
Sidebar

```


查看：

菜单数据来自哪里？


记录：

```
菜单来源：

```


---

## 任务3


找到：

```
Header

```


查看：

用户名如何显示。


记录：

```
用户信息来源：

```


---

# 十五、自己动手实操


今天不要只看源码。


我们自己模拟一个后台Layout。


继续使用你的Vue学习项目。


---

# 实操目标


实现：


```
+----------------------+

|      Header          |

+------+---------------+

|      |               |

|菜单  | 页面内容      |

|      |               |

+------+---------------+

```


---

# 十六、创建目录


创建：


```
src/layouts


├ Layout.vue


src/components


├ Header.vue

├ Sidebar.vue

```


---

# 十七、创建Layout.vue


代码：


```vue
<template>

<div>


<Header />


<div class="body">


<Sidebar />


<div class="content">


<RouterView />


</div>


</div>


</div>


</template>


<script setup lang="ts">

import Header from '../components/Header.vue'

import Sidebar from '../components/Sidebar.vue'


</script>
```


---

# 十八、创建Header.vue


实现：


显示：


```
Vue后台系统

管理员

```


示例：


```vue
<template>

<header>

Vue后台系统

</header>

</template>
```


---

# 十九、创建Sidebar.vue


实现菜单：


```vue
<template>


<div>


<div>

首页

</div>


<div>

用户管理

</div>


<div>

角色管理

</div>


</div>


</template>
```


---

# 二十、修改Router


新增：


```ts
{

path:"/",

component:Layout,

children:[


{

path:"home",

component:Home

}


]

}

```


---

# 二十一、运行验证


完成后：

浏览器：

访问：

```
localhost:5173/

```


应该看到：


```
Header

左侧菜单

Home页面

```


---

# 二十二、今日排错记录


## 问题1


RouterView不显示。


检查：

是否配置children。


错误：

```ts
component:Home
```


正确：

```ts
children:[
{
component:Home
}
]

```


---

## 问题2


组件找不到。


检查：

import路径。


---

## 问题3


页面空白。


检查：

浏览器控制台。


---

# 二十三、完成验收标准


今天完成：


## 源码部分


能够找到：


```
Layout

Header

Sidebar

RouterView

```


并理解关系。


---

## 实战部分


自己的项目：

必须实现：


✅ Layout组件


✅ Header组件


✅ Sidebar组件


✅ RouterView显示页面


---

# 二十四、今日总结


今天掌握：

```
企业后台页面骨架

```


核心结构：


```
App.vue

↓

Layout

↓

Header + Sidebar

↓

RouterView

↓

业务页面

```


后面的业务开发：

都会建立在这个结构上。


下一章：

Day16 用户管理模块。


开始进入真正CRUD业务：

```
列表查询

新增

编辑

删除

分页

接口调用

```

对应芋道：

```
system/user

```
