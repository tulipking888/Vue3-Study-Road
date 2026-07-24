# Day14 路由权限系统


> Vue3企业开发学习路线 Day14
>
> 目标：
>
> 理解企业后台系统中的动态路由和权限控制。
>
> 掌握芋道 yudao-ui-admin-vue3 中：
>
> Router、Permission、Menu、RBAC之间的关系。


---

# 一、今日学习目标


今天学习：


- Vue Router基础回顾
- 静态路由
- 动态路由
- 路由守卫
- 登录权限判断
- 菜单权限生成
- RBAC权限模型


最终理解：


```
用户登录

↓

获取权限

↓

生成菜单

↓

加载页面

↓

访问控制

```


对应芋道源码：


```
src/router

src/store/modules/permission

src/store/modules/user

```


---

# 二、为什么需要权限系统


普通网站：


```
首页

关于我们

联系我们

```


所有用户看到一样。


---

企业后台：


不同角色：

管理员：

```
用户管理

角色管理

权限管理

```


客服：

```
订单管理

客户管理

```


普通员工：

```
个人中心

```


所以需要：

权限系统。


---

# 三、RBAC权限模型


企业后台最常用：

RBAC。


全称：

```
Role Based Access Control

基于角色的访问控制

```


---

关系：


```
用户 User

↓

角色 Role

↓

权限 Permission

↓

菜单 Menu

```


---

例如：


用户：

```
张三

```


拥有：

```
管理员角色

```


管理员角色拥有：


```
用户管理权限

角色管理权限

```


所以：

张三看到这些菜单。


---

# 四、Vue Router回顾


Vue Router负责：

页面跳转。


例如：


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


显示：

User.vue。


---

# 五、静态路由


简单项目：


```ts
const routes=[


{

path:'/login',

component:Login

},


{

path:'/home',

component:Home

}


]

```


所有页面提前写好。


---

问题：


后台系统：

几百个菜单。


不可能全部提前加载。


---

# 六、动态路由


动态路由：


运行时添加。


流程：


```
登录成功

↓

请求菜单权限

↓

生成Route

↓

router.addRoute()

↓

显示页面

```


---

例如：


服务器返回：


```json
[
{
name:"User",
path:"/user"
}
]
```


前端：


```ts
router.addRoute(route)

```


---

# 七、为什么芋道需要动态路由


因为：

后台菜单来自数据库。


例如：

管理员新增：

```
商品管理

```


不需要重新发布前端。


只修改数据库。


登录后：

自动出现菜单。


---

# 八、路由守卫


Vue Router提供：


```ts
router.beforeEach()

```


作用：

进入页面之前执行。


---

例如：


```ts
router.beforeEach((to)=>{


console.log(to.path)


})

```


---

流程：


```
用户访问页面

↓

beforeEach

↓

判断权限

↓

允许进入

↓

页面显示

```


---

# 九、登录判断


常见：


```ts
const token=getToken()


if(!token){


return '/login'


}

```


---

流程：


```
访问后台

↓

检查Token

↓

有Token

↓

进入

```


没有：


```
跳登录页

```


---

# 十、权限加载流程


完整流程：


```
打开系统


↓

main.ts


↓

router


↓

permission守卫


↓

检查Token


↓

获取用户信息


↓

获取菜单权限


↓

生成动态路由


↓

进入首页

```


---

# 十一、菜单和路由关系


后台左侧菜单：

例如：

```
系统管理

 ├ 用户管理

 ├ 角色管理

 └ 菜单管理

```


本质：

也是路由。


例如：


```json
{

path:"/system/user",

component:"User"

}

```


---

# 十二、芋道源码重点


打开：


```
src/router

```


查看：


```
index.ts

guard.ts

```


---

重点寻找：


## 1. 路由创建


例如：

```ts
createRouter()

```


---

## 2. 路由守卫


寻找：

```ts
beforeEach

```


---

## 3. 动态添加


寻找：


```ts
addRoute

```


---

# 十三、Permission Store


位置：


```
src/store/modules/permission

```


作用：


保存：

```
菜单

路由

权限

```


---

例如：


```ts
state:()=>({


routes:[],


menus:[]


})

```


---

# 十四、User Store


位置：


```
src/store/modules/user

```


保存：


```
用户信息

角色

权限

```


例如：


```ts
{

nickname:"管理员",

roles:[

"admin"

]

}

```


---

# 十五、权限按钮控制


除了菜单：

还有按钮。


例如：


删除按钮：

管理员有：

```
删除

```


普通用户没有。


---

常见：


```vue
<el-button

v-hasPermi="['user:delete']"

>

删除

</el-button>
```


---

# 十六、和Cocos Creator类比


你可以这样理解：


## Router


类似：

场景管理。


```
Login场景

↓

Hall场景

↓

Game场景

```


---

## Permission


类似：

玩家权限。


例如：

```
VIP功能

GM功能

普通玩家

```


---

## Store


类似：

GameManager。


保存：

```
玩家信息

权限数据

```


---

# 十七、完整企业后台流程


最终：


```
用户输入账号密码


↓

登录接口


↓

保存Token


↓

获取用户信息


↓

获取菜单权限


↓

生成Router


↓

生成Sidebar


↓

显示页面


↓

按钮权限控制

```


---

# 十八、实战练习


继续你的Vue学习项目。


模拟后台权限。


---

## 任务1


创建用户角色：


```ts
const role='admin'

```


---

## 任务2


创建菜单数据：


```ts
const menus=[


{


path:'/user',

role:'admin'


}


]

```


---

## 任务3


登录后动态生成菜单。


---

## 任务4


实现：


管理员：

看到用户管理。


普通用户：

看不到。


---

# 十九、常见问题


## 问题1：为什么不用v-if隐藏菜单？


小项目可以。


企业项目不行。


原因：

安全问题。


真正控制：

路由权限。


---

## 问题2：前端权限安全吗？


不能完全依赖。


真正安全：


```
前端控制显示

+

后端接口权限验证

```


---

## 问题3：为什么刷新页面权限丢失？


因为：

内存清空。


解决：

重新：

```
读取Token

↓

重新加载权限

```


---

# 二十、完成验收标准


完成今天：


能够解释：


```
Token

↓

User

↓

Permission

↓

Router

↓

Menu

```


关系。


---

能够看懂：


```
router.beforeEach()

router.addRoute()

permission store

```


---

能够实现：

简单动态菜单。


---

# 二十一、今日总结


今天学习：


```
Vue Router

↓

动态路由

↓

权限模型

↓

企业后台架构

```


核心思想：


```
菜单不是写死的

权限不是前端决定的

而是后端数据驱动前端展示

```


下一章：

Day15 Layout布局系统。


学习：

```
Header

Sidebar

Content

↓

为什么所有后台页面都有统一框架

```
