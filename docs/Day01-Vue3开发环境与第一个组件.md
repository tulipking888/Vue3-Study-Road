# Vue3 企业开发30天教程

# Day01：Vue3开发环境与第一个组件


> 学习路线：
>
> Cocos Creator 游戏前端开发
>
> ↓
>
> Vue3 企业级前端开发
>
> ↓
>
> 芋道框架二次开发
>
> ↓
>
> AI 企业应用开发


---

# 今日学习目标

完成今天学习后，你应该：

- 理解 Vue3 是什么
- 理解 Vue 与 Cocos Creator 开发思想的区别
- 掌握 Vue3 项目结构
- 理解 `.vue` 单文件组件结构
- 创建第一个 Vue3 组件
- 理解组件化开发思想


---

# 一、Vue3是什么？

## 1.1 Vue的定位

Vue 是一个用于构建用户界面的 JavaScript 框架。


它解决的问题：

传统 Web 开发：

```
数据变化

↓

找到DOM元素

↓

修改页面内容

↓

页面刷新
```


例如：

```javascript
let score = 0;


function addScore(){

    score++;

    document.querySelector("#score")
        .innerHTML = score;

}
```


开发者需要：

1. 管理数据
2. 查找DOM
3. 更新UI


---

Vue3：

```
数据变化

↓

Vue响应式系统

↓

自动更新页面
```


代码：

```vue
<script setup lang="ts">

import { ref } from "vue"


const score = ref(0)


function addScore(){

    score.value++

}

</script>
```


Vue自动完成：

```
数据

↓

页面
```


---

# 二、Cocos Creator 与 Vue3 思维转换


你之前使用 Cocos Creator：


例如：

```ts
@property(Label)
scoreLabel: Label = null;


score:number = 0;



addScore(){

    this.score++;


    this.scoreLabel.string =this.score.toString();

}
```


流程：

```
数据变化

↓

手动修改UI节点

↓

界面更新
```


---

Vue：

```ts
const score = ref(0)


function addScore(){

    score.value++

}
```


流程：

```
数据变化

↓

Vue自动检测

↓

界面更新
```


---

## 核心区别


| Cocos Creator | Vue3 |
|---|---|
| Node节点驱动 | 数据驱动 |
| 手动刷新UI | 自动刷新UI |
| Component脚本 | Vue组件 |
| Prefab复用 | Component复用 |
| Manager管理状态 | Pinia管理状态 |


---

# 三、Vue3项目结构


一个标准Vue3项目：


```
vue-study

├── node_modules

├── public

├── src
│
│   ├── assets
│   │
│   ├── components
│   │
│   ├── views
│   │
│   ├── router
│   │
│   ├── store
│   │
│   ├── api
│   │
│   ├── App.vue
│   │
│   └── main.ts
│
├── package.json
│
└── vite.config.ts
```


---

# 四、重要目录说明


## src


业务代码目录。


类似 Cocos：

```
assets

├── scripts

├── scenes

├── prefabs

```


Vue：

```
src

├── components

组件

├── views

页面

├── router

路由

├── store

状态管理

├── api

接口
```


---

# 五、main.ts入口文件


Vue应用入口：

```ts
import { createApp } from 'vue'

import App from './App.vue'


createApp(App)
.mount('#app')
```


作用：


```
创建Vue应用

↓

加载App.vue

↓

显示页面
```


类似 Cocos：

```
游戏启动入口

↓

加载主场景

↓

初始化系统
```


---

# 六、第一个Vue项目


## 6.1 创建项目


检查环境：


```bash
node -v

npm -v
```


创建：


```bash
npm create vite@latest vue-study
```


选择：


```
Vue
```


然后：

```
TypeScript
```


进入目录：

```bash
cd vue-study
```


安装：

```bash
npm install
```


启动：

```bash
npm run dev
```


访问：

```
http://localhost:5173
```


---

# 七、Vue单文件组件


Vue组件文件：

```
xxx.vue
```


结构：

```
组件

├── template

页面结构


├── script setup

业务逻辑


└── style

样式
```


---

# 八、第一个组件


修改：

```
src/App.vue
```


内容：


```vue
<template>

<div class="box">

    <h1>
        我的第一个Vue页面
    </h1>

</div>


</template>



<script setup lang="ts">


</script>



<style scoped>


.box{

    width:300px;

    margin:100px auto;

}


</style>
```


运行后：

显示：

```
我的第一个Vue页面
```


---

# 九、template部分


template负责：

页面结构。


例如：


```vue
<template>

<h1>
玩家信息
</h1>


</template>
```


类似 Cocos：

```
Scene节点树
```


---

# 十、script setup部分


script setup负责：

业务逻辑。


例如：


```vue
<script setup lang="ts">


const playerName = "战士"


</script>
```


类似：

Cocos：

```
Player.ts
```


---

# 十一、style部分


负责：

CSS样式。


例如：

```vue
<style scoped>


.title{

    font-size:20px;

}


</style>
```


scoped表示：

当前组件样式隔离。


---

# 十二、Vue组件思想


Vue开发核心：

组件。


例如：

一个后台页面：

```
User.vue

├── Search.vue

├── Table.vue

├── Dialog.vue

└── Pagination.vue
```


类似 Cocos：

```
Hall

├── PlayerInfo

├── BagPanel

├── ShopPanel
```


---

# 十三、第一个业务组件


创建：

```
src/components/Role.vue
```


代码：

```vue
<template>


<div>

<h2>
角色名称：

{{name}}

</h2>


</div>


</template>



<script setup lang="ts">


const name = "战士"


</script>
```


修改：

App.vue


```vue
<template>

<Role />


</template>



<script setup lang="ts">


import Role from "./components/Role.vue"


</script>
```


效果：

```
角色名称：战士
```


---

# 十四、今日练习


## 练习1：角色展示组件


创建：

```
Role.vue
```


显示：


```
角色名称：战士

等级：10

职业：近战
```


要求：

- 使用Vue组件
- 数据写在script setup


---

## 练习2：游戏后台首页


修改：

App.vue


显示：


```
================


游戏管理后台


玩家管理

角色管理

装备管理


================
```


---

## 练习3（挑战）


创建：

```
Menu.vue
```


显示：

```
玩家管理

角色管理

装备管理
```


最终结构：


```
App.vue

├── Menu.vue

└── Role.vue
```


---

# 十五、今日验收


完成后，你应该能回答：

## 1

Vue页面结构在哪里？


答案：

```
template
```


---

## 2

业务逻辑在哪里？


答案：

```
script setup
```


---

## 3

Vue组件类似Cocos什么？


答案：

```
Prefab + Script
```


---

## 4

Vue为什么不用手动刷新UI？


答案：

```
响应式系统
```


---

# 十六、芋道源码关联


今天知识对应芋道：


重点查看：


```
src/main.ts

src/App.vue

src/components
```


阅读目标：

理解：

```
main.ts

↓

创建Vue应用

↓

加载插件

↓

挂载App

↓

显示页面
```


---

# 十七、今日总结


今天掌握：


## Vue核心思想

```
数据驱动页面
```


## Vue开发单位

```
组件
```


## Vue文件结构

```
.vue

├── template

├── script setup

└── style
```


## 与Cocos对应

```
Prefab

≈

Vue Component
```


---

# 明日内容


# Day02：Vue模板语法与数据绑定


学习：

- 插值表达式 {{ }}
- v-if
- v-for
- v-bind
- v-on
- 事件处理


实战：

制作：

```
游戏角色列表

+

背包展示系统
```