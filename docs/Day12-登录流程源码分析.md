# Day12 登录流程源码分析


> Vue3企业开发学习路线 Day12
>
> 目标：
>
> 理解企业后台系统登录完整流程。
>
> 通过芋道 yudao-ui-admin-vue3 源码分析：
>
> 用户如何登录、获取Token、进入后台。


---

# 一、今日学习目标


今天学习：


- Vue登录页面结构
- 表单数据管理
- 登录接口调用
- Axios请求流程
- Token保存
- 登录成功跳转


最终理解：


```
登录按钮点击

↓

调用接口

↓

保存身份信息

↓

进入后台系统

```


对应芋道源码：

```
src/views/Login.vue

src/api/login/

src/utils/auth.ts

src/store/modules/user.ts

```


---

# 二、企业后台登录为什么重要


后台系统几乎都有：

```
用户登录

权限控制

菜单加载

数据访问

```


登录不是简单：

```
输入账号密码

↓

跳转首页

```


真实流程：

```
输入账号密码

↓

服务器验证

↓

返回Token

↓

浏览器保存Token

↓

以后请求携带Token

↓

服务器识别用户

```


---

# 三、整体登录流程图


完整流程：


```
Login.vue


用户输入

账号

密码


↓

点击登录


↓

login API


↓

Axios


↓

后端接口


↓

返回Token


↓

保存Token


↓

获取用户信息


↓

生成菜单权限


↓

进入首页

```


---

# 四、Vue登录页面结构


典型：

```
views/Login.vue

```


一般包含：


```
账号输入框

密码输入框

验证码

登录按钮

```


---

例如：


```vue
<template>


<el-form>


<el-input
v-model="loginForm.username"
/>


<el-input
v-model="loginForm.password"
/>


<el-button
@click="handleLogin"
>

登录

</el-button>


</el-form>


</template>
```


---

# 五、表单数据管理


Vue3：

使用：

```ts
reactive
```


例如：


```ts
const loginForm = reactive({

username:"",

password:""

})
```


数据变化：


```
输入框

↓

loginForm

↓

提交接口

```


---

# 六、登录按钮事件


点击：


```vue
@click="handleLogin"
```


执行：


```ts
function handleLogin(){


login(loginForm)

}
```


---

# 七、API接口层


企业项目不会直接：

```ts
axios.post()
```


而是：

```
Login.vue

↓

api/login.ts

↓

request.ts

```


---

例如：

```
src/api/login/index.ts

```


代码：


```ts
export function login(data){


return request.post(

'/login',

data

)

}

```


---

# 八、Axios请求流程


调用：


```ts
login(loginForm)
```


进入：


```
api

↓

request

↓

axios

```


request负责：


- baseURL
- Token
- 错误处理


---

# 九、登录接口返回数据


后端通常：


```json
{

"code":0,

"data":{

"accessToken":"xxxxx",

"refreshToken":"xxxxx"

}

}

```


---

重点：

Token。


---

# 十、Token是什么


传统Session：


服务器保存：

```
用户登录状态

```


问题：

多服务器不好扩展。


---

Token：

服务器生成字符串：


```
abc123xyz

```


客户端保存。


以后请求：

```
请求

+

Token

```


服务器验证。


---

流程：


```
登录成功


↓

服务器生成Token


↓

浏览器保存


↓

请求接口携带Token

```


---

# 十一、Token保存位置


常见：


## localStorage


例如：


```ts
localStorage.setItem(

'token',

token

)
```


优点：

刷新不丢。


缺点：

安全性一般。


---

## Cookie


服务器管理。


---

## sessionStorage


关闭浏览器失效。


---

企业后台：

通常：

```
localStorage

+
封装方法

```


---

# 十二、芋道auth工具


查看：


```
src/utils/auth.ts

```


通常包含：


```ts
getToken()

setToken()

removeToken()

```


---

例如：


```ts
export function setToken(token:string){


localStorage.setItem(

'TOKEN',

token

)


}

```


---

页面不要直接：

```ts
localStorage.setItem()
```


原因：

统一管理。


---

# 十三、登录成功后的下一步


登录成功：

不是结束。


还需要：


```
获取用户信息

↓

获取权限

↓

生成菜单

```


---

流程：


```
Token

↓

UserInfo接口

↓

Store保存用户

↓

Layout显示用户名

```


---

# 十四、Pinia保存用户信息


对应：

```
store/modules/user.ts

```


保存：


```ts
state:()=>({


nickname:"",

roles:[],

permissions:[]


})
```


---

登录成功：


```ts
userStore.setUserInfo(data)

```


---

之后：

任何页面：


```ts
userStore.nickname

```


都可以使用。


---

# 十五、登录跳转


成功：

```ts
router.push('/')

```


流程：


```
Login.vue

↓

Router

↓

Layout

↓

首页

```


---

# 十六、芋道源码阅读路线


打开：

```
src/views/Login.vue

```


重点找：


## 1.


表单变量：


```ts
loginForm

```


---

## 2.


登录函数：


```ts
handleLogin

```


---

## 3.


API调用：


```ts
LoginApi.login()

```


---

## 4.


Token处理：


```ts
setToken()

```


---

## 5.


跳转：


```ts
router.push()

```


---

# 十七、结合Day07 Axios理解


Day07：

你完成：


```
页面

↓

API

↓

Axios

↓

接口

↓

数据展示

```


登录流程：

本质一样：


```
Login.vue

↓

LoginApi

↓

request.ts

↓

后端

↓

返回数据

```


区别：

角色列表：

返回业务数据。


登录：

返回身份数据。


---

# 十八、实战练习


继续使用自己的Vue学习项目。


实现模拟登录。


---

## 1. 创建Login.vue


包含：


```
用户名

密码

登录按钮

```


---

## 2. 创建API


```
api/login.ts

```


模拟：


```ts
login(){

return Promise.resolve({

token:"abc123"

})

}

```


---

## 3. 创建Store


```
stores/user.ts

```


保存：


```ts
token

username

```


---

## 4. 登录成功跳转


```ts
router.push('/home')

```


---

# 十九、运行效果


登录前：


```
Login页面

```


点击登录：


```
调用接口

↓

保存token

↓

进入Home

```


---

# 二十、常见问题


## 问题1：为什么Token不能每个页面自己保存？


错误：


```
页面A保存token

页面B保存token

页面C保存token

```


导致：

代码重复。


正确：

```
auth.ts统一管理

```


---

## 问题2：为什么登录成功还需要获取用户信息？


因为：

Token只是身份证。


还需要：


```
姓名

角色

权限

菜单

```


---

## 问题3：为什么刷新页面登录状态还存在？


因为：

Token保存到了：

```
localStorage

```


刷新：

重新读取。


---

# 二十一、完成验收标准


完成今天后：


能够解释：


```
Login.vue

↓

API

↓

Axios

↓

Token

↓

Store

↓

Router

```


流程。


---

能够看懂芋道：


```
Login.vue

auth.ts

user store

```


---

能够自己实现：

简单登录功能。


---

# 二十二、今日总结


今天学习：

```
Vue页面

↓

接口调用

↓

身份认证

↓

状态保存

```


这是企业后台最核心业务流程。


后续：

Day13

学习：

```
Token认证机制

↓

Axios自动携带Token

↓

请求权限控制

```

进一步分析企业项目安全体系。
