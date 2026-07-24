# Day08 Pinia状态管理


> Vue3企业开发学习路线 Day08
>
> 项目目标：
>
> 掌握企业后台项目中的状态管理方式


---

# 一、今日学习目标


今天学习：

- Pinia基本概念
- Store创建
- State
- Getter
- Action
- 组件读取Store
- 修改Store数据


最终完成：

模拟后台系统：

```
用户登录

↓

保存用户信息

↓

页面读取用户信息

```


对应芋道：

```
src/store

```


---

# 二、为什么需要状态管理


## 1. Vue组件数据传递


之前学习：

父组件：

```
props

↓

子组件

```


子组件：

```
emit

↓

父组件

```


适合：

简单组件。


例如：

```
Role.vue

↓

RoleItem.vue

```


---

但是后台系统：

会出现：


```
用户信息


       Header

          ↑

Sidebar ← 用户状态 → Content


          ↓

       权限按钮

```


多个组件都需要：

- 用户名
- Token
- 权限
- 菜单


如果全部使用props：

会出现：

```
数据层层传递

代码复杂

维护困难

```


所以需要：

```
全局状态管理

```


---

# 三、Pinia是什么


Pinia是：

Vue官方推荐的状态管理工具。


Vue2：

```
Vuex

```


Vue3：

```
Pinia

```


关系：


```
组件

↓

Pinia Store

↓

共享数据

```


---

# 四、安装Pinia


执行：

```bash
npm install pinia
```


---

# 五、注册Pinia


修改：

```
src/main.ts

```


增加：


```ts
import { createPinia } from 'pinia'


const app=createApp(App)


app.use(createPinia())


app.mount('#app')
```


---

# 六、创建第一个Store


目录：


```
src

├ store

│
└ user.ts

```


创建：

```
src/store/user.ts

```


代码：


```ts
import { defineStore } from 'pinia'


export const useUserStore = defineStore(
'user',
{

state:()=>({

username:'',

level:0

})


})
```


---

# 七、Store三个核心概念


Pinia主要包含：

```
State

Getter

Action

```


---

# 1. State


类似：

Vue组件中的：

```
data

```


保存数据。


例如：

```ts
state:()=>({

username:'战士',

level:10

})
```


---

# 2. Getter


类似：

Vue中的：

```
computed

```


用于：

计算数据。


例如：

等级描述：


```ts
getters:{


levelText(state){

    return state.level>=10

    ?

    '高级玩家'

    :

    '普通玩家'

}


}

```


---

# 3. Action


类似：

方法。


用于：

修改数据。


例如：


```ts
actions:{


login(name:string){

    this.username=name

}


}

```


---

# 八、完整User Store


修改：

```
src/store/user.ts

```


完整代码：


```ts
import { defineStore } from 'pinia'


export const useUserStore = defineStore(
'user',
{


state:()=>({


username:'',

level:0


}),



getters:{


levelText(state){


return state.level>=10

?

'高级玩家'

:

'普通玩家'


}


},



actions:{


login(name:string){


this.username=name


this.level=10


}


}


})
```


---

# 九、页面使用Store


创建：

```
views/User.vue

```


代码：


```vue
<template>


<h2>

用户名：

{{user.username}}

</h2>


<h2>

等级：

{{user.level}}

</h2>


<h2>

状态：

{{user.levelText}}

</h2>


<button @click="login">

登录

</button>


</template>



<script setup lang="ts">


import {

useUserStore

}

from '../store/user'



const user=useUserStore()



function login(){


user.login('张三')


}


</script>

```


---

# 十、运行效果


初始：


```
用户名：

等级：0

状态：普通玩家

```


点击：

```
登录

```


变成：

```
用户名：张三

等级：10

状态：高级玩家

```


---

# 十一、理解数据流


整个过程：


```
User.vue


↓

调用


user.login()


↓

Pinia Action


↓

修改State


↓

Getter重新计算


↓

页面自动刷新

```


---

# 十二、企业后台中的Store设计


真实项目不会只有：

```
user.ts

```


通常：


```
store


├ user.ts


├ permission.ts


├ app.ts


├ dict.ts


```


---

# 十三、对应芋道源码


重点查看：

```
src/store

```


通常包含：


## 用户信息


```
user.ts

```


保存：

- 用户信息
- Token


---

## 权限信息


```
permission.ts

```


保存：

- 菜单
- 权限


---

## 页面状态


```
app.ts

```


保存：

- Sidebar状态
- 页面配置


---

# 十四、Day08实战任务


## 实战目标


完成：

模拟后台用户登录状态。


---

## 任务1


创建：

```
store/user.ts

```


包含：


```ts
username

role

token

```


---

## 任务2


创建：

```
views/Profile.vue

```


显示：

```
当前用户

当前角色

```


---

## 任务3


增加按钮：

```
登录

退出登录

```


点击后：

修改Store。


---

# 十五、进阶练习


模拟Token保存。


增加：


```ts
token:''
```


登录：


```ts
this.token='abc123'
```


退出：


```ts
this.token=''
```


---

# 十六、完成验收标准


完成后：

必须达到：


## 1.

多个组件可以共享用户数据。


## 2.

修改Store后页面自动刷新。


## 3.

理解：

```
State

Getter

Action

```


## 4.

能够看懂芋道：

```
src/store

```


---

# 十七、今日总结


今天学习：


```
组件局部状态

↓

Pinia全局状态

↓

企业后台数据管理

```


核心思想：


```
页面负责展示

Store负责管理状态

API负责请求数据

```


这也是Vue企业项目的基本结构。
