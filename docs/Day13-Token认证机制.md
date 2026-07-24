# Day13 Token认证机制


> Vue3企业开发学习路线 Day13
>
> 目标：
>
> 理解企业后台系统中的Token认证机制。
>
> 掌握芋道 yudao-ui-admin-vue3 中：
>
> Token保存、携带、失效处理流程。


---

# 一、今日学习目标


今天学习：

- 什么是Token
- AccessToken
- RefreshToken
- Token保存
- Axios请求拦截器
- Authorization请求头
- Token失效处理


最终理解：

```
登录一次

↓

保存Token

↓

后续请求自动携带Token

↓

服务器识别用户

```


对应芋道源码：

```
src/utils/auth.ts

src/config/axios/

src/utils/request.ts

```


---

# 二、为什么需要Token


回顾Day12登录：

用户：

```
账号

密码

```

提交：

```
服务器验证

↓

返回Token

```


问题：

登录成功后：

用户访问：

```
用户列表

角色列表

菜单列表

```


服务器怎么知道：

```
这是哪个用户？

```


答案：

Token。


---

# 三、Token是什么


简单理解：


Token就是：

```
用户身份凭证

```


类似：

身份证。


例如：

服务器返回：

```text
eyJhbGciOiJIUzI1Ni...
```


以后请求：

带上：

```
我是这个用户

```


---

# 四、传统Session方式


早期网站：


流程：

```
登录

↓

服务器保存Session

↓

返回SessionId

↓

浏览器保存Cookie

```


访问：

```
携带Cookie

↓

服务器查询Session

```


---

问题：


大型后台：

多服务器：

```
服务器A

服务器B

服务器C

```


Session同步困难。


---

# 五、Token认证方式


现在企业项目常用：


流程：

```
用户登录

↓

服务器生成Token

↓

返回客户端

↓

客户端保存

↓

请求携带Token

↓

服务器验证

```


---

# 六、AccessToken


最常见：

访问Token。


例如：


```json
{
"accessToken":"abc123"
}
```


作用：

访问接口。


例如：

```
GET /system/user/list

```


请求：

携带：

```
Authorization: Bearer abc123

```


---

# 七、RefreshToken


为什么需要RefreshToken？


因为：

AccessToken不能永久有效。


例如：

```
AccessToken

30分钟有效

```


过期：

怎么办？


重新登录体验不好。


所以：

增加：

RefreshToken。


---

流程：


```
AccessToken有效


↓

正常访问


↓

过期


↓

使用RefreshToken换新Token


↓

继续使用

```


---

# 八、Token生命周期


完整流程：


```
登录

↓

AccessToken

↓

访问接口

↓

过期

↓

RefreshToken刷新

↓

新AccessToken

↓

继续访问

```


---

# 九、Token保存


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

XSS风险。


---

## Cookie


优点：

浏览器自动管理。


---

## 企业项目


通常：

封装：

```
auth.ts

```


例如：

```
setToken()

getToken()

removeToken()

```


---

# 十、芋道auth.ts分析


文件：


```
src/utils/auth.ts

```


作用：

统一管理Token。


类似：


```ts
export function getToken(){

return localStorage.getItem(
'TOKEN'
)

}



export function setToken(token){

localStorage.setItem(
'TOKEN',
token
)

}

```


---

页面不要：

直接：


```ts
localStorage.xxx

```


原因：

以后修改存储方式：

只改一个地方。


---

# 十一、Axios请求拦截器


这是企业项目重点。


问题：


如果100个接口：


每个都写：


```ts
axios.get(

'/user',

{

headers:{

Authorization:token

}

}

)
```


太麻烦。


---

解决：

请求拦截器。


---

# 十二、请求拦截流程


```
页面调用接口


↓

Axios


↓

请求拦截器


↓

读取Token


↓

加入Header


↓

发送请求


```


---

# 十三、请求拦截器代码


例如：


```ts
service.interceptors.request.use(

config=>{


const token=getToken()


if(token){


config.headers.Authorization=

'Bearer '+token


}


return config


}

)

```


---

效果：


页面：


```ts
getUserList()

```


不用写Token。


Axios自动添加。


---

# 十四、Authorization请求头


HTTP请求：

例如：


```
GET /api/user/list

```


请求头：


```
Authorization: Bearer abc123

```


服务器：

读取：

```
Authorization

```


知道：

当前用户是谁。


---

# 十五、响应拦截器


除了请求拦截：

还有：

响应拦截。


流程：


```
服务器返回


↓

Axios响应拦截


↓

判断code


↓

成功继续

失败处理

```


---

# 十六、Token失效处理


例如：

服务器返回：

```
401

```


表示：

未登录。


---

处理：


```
401

↓

清除Token

↓

跳转登录页

```


---

代码：


```ts
if(response.status===401){


removeToken()


router.push('/login')


}

```


---

# 十七、芋道源码对应


重点阅读：


## request.ts


位置可能：


```
src/config/axios

```


查看：


请求拦截：


```
interceptors.request.use

```


响应拦截：

```
interceptors.response.use

```


---

## auth.ts


查看：


```
getToken

setToken

```


---

## user store


查看：


```
token保存

用户信息

```


---

# 十八、和Day07 Axios连接


Day07：

你学习：

```
axios实例

↓

请求接口

↓

返回数据

```


Day13增加：


```
Axios实例

↓

请求拦截器

↓

自动增加Token

↓

接口请求

```


---

# 十九、完整企业后台请求流程


最终：


```
用户打开页面


↓

Vue组件


↓

API函数


↓

Axios


↓

请求拦截器


↓

添加Token


↓

后端Controller


↓

验证Token


↓

返回数据


↓

响应拦截器


↓

页面更新

```


---

# 二十、实战任务


继续扩展你的Vue学习项目。


目标：

模拟Token认证。


---

## 任务1


创建：

```
utils/auth.ts

```


实现：


```ts
setToken()

getToken()

removeToken()

```


---

## 任务2


Axios增加请求拦截。


要求：

自动添加：


```
Authorization

```


---

## 任务3


模拟登录：


返回：


```json
{
token:"abc123"
}
```


保存。


---

## 任务4


刷新页面：

仍然保持登录状态。


---

# 二十一、常见问题


## 问题1：为什么不能每次接口手动传Token？


因为：

重复代码。


企业项目：

统一处理。


---

## 问题2：Token放哪里？


小项目：

localStorage。


企业项目：

可能：

- HttpOnly Cookie
- localStorage
- 安全方案


---

## 问题3：Token泄露怎么办？


措施：

- HTTPS
- 短时间AccessToken
- RefreshToken
- 权限校验


---

# 二十二、完成验收标准


完成今天：


能够解释：


```
登录

↓

Token

↓

Axios拦截器

↓

Authorization

↓

接口访问

```


流程。


---

能够看懂芋道：

```
auth.ts

request.ts

axios配置

```


---

能够自己实现：

Token自动携带。


---

# 二十三、今日总结


今天学习：

```
登录认证

↓

Token机制

↓

Axios自动化

↓

企业后台安全基础

```


核心思想：


```
页面只负责调用接口

认证逻辑统一处理

```


下一章：

Day14 路由权限系统。


学习：

```
登录以后

↓

为什么只能看到自己的菜单

↓

权限如何控制页面访问

```
