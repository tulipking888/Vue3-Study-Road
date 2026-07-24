# Day07 Axios接口请求与封装


> Vue3企业开发学习路线
>
> 针对项目：yudao-ui-admin-vue3
>
> 今日目标：
>
> 掌握Vue3项目如何调用后端接口


---

# 今日学习目标


完成今天学习后，你应该掌握：


- 理解前后端分离开发模式
- 理解Axios作用
- 创建Axios请求实例
- 封装request工具
- 编写API接口文件
- 发送GET请求
- 发送POST请求
- 理解请求拦截器
- 理解响应拦截器


今天完成一个实战：


```
角色管理页面

↓

调用后端接口

↓

获取角色列表

```


---

# 一、前后端分离开发


## 1.1 传统开发


以前：

```
浏览器

↓

服务器

↓

返回HTML

```


例如：

Java JSP

PHP模板


---

## 1.2 前后端分离


现在企业项目：

```
Vue前端

↓

HTTP请求

↓

后端接口

↓

返回JSON数据

```


例如：

前端：

```
请求用户列表
```


后端返回：

```json
[
 {
  "id":1,
  "name":"张三"
 }
]
```


Vue负责：

```
显示页面

```


后端负责：

```
数据处理

```


---

# 二、Axios是什么


Axios：

是一个基于Promise的HTTP请求库。


作用：

Vue项目调用后端接口。


例如：

```
Vue页面

↓

Axios

↓

SpringBoot接口

```


---

# 三、为什么不能直接使用Axios


实际企业项目：

不会每个页面直接写：


```ts
axios.get()

axios.post()

```


原因：

每个请求都需要处理：

- token
- 请求地址
- 错误提示
- loading
- 登录失效


所以需要：

统一封装。


---

# 四、安装Axios


执行：


```bash
npm install axios
```


安装后：

package.json：


```json
{
 "axios":"版本号"
}
```


---

# 五、企业项目目录设计


推荐结构：


```
src


├── api

│
├── user

│   └── index.ts

│
├── role

│   └── index.ts


├── utils

│
└── request.ts

```


职责：

```
api

↓

业务接口


utils/request

↓

Axios封装

```


---

# 六、创建Axios实例


创建：


```
src/utils/request.ts
```


代码：


```ts
import axios from 'axios'


const request = axios.create({

baseURL:'/api',

timeout:10000

})


export default request
```


解释：

## baseURL


接口统一前缀：

例如：

```
/api/user/list

```


实际：

```
http://服务器地址/api/user/list

```


---

## timeout


请求超时时间：


```
10秒

```


超过：

认为失败。


---

# 七、创建业务API


例如：

角色接口：


目录：


```
src/api/role/index.ts

```


代码：

```ts
import request from '@/utils/request'


export function getRoleList(){

return request.get(
'/role/list'
)

}
```


含义：


```
页面

↓

调用getRoleList()

↓

request

↓

后端接口

```


---

# 八、页面调用接口


RoleManage.vue：


```vue
<script setup lang="ts">


import {
onMounted
} from 'vue'


import {
getRoleList
} from '@/api/role'



onMounted(()=>{


loadData()


})



async function loadData(){


const res = await getRoleList()


console.log(res)


}



</script>
```


流程：


```
页面加载

↓

onMounted

↓

loadData

↓

API函数

↓

Axios请求

```


---

# 九、GET请求参数


例如查询用户：

接口：

```
/user/list?page=1

```


代码：

```ts
request.get(
'/user/list',
{

params:{

page:1

}

}
)
```


最终：

```
/user/list?page=1

```


---

# 十、POST请求


例如新增角色：

接口：

```
/role/create

```


代码：

```ts
request.post(

'/role/create',

{

name:'战士',

level:10

}

)
```


发送：

JSON数据：

```json
{
"name":"战士",
"level":10
}
```


---

# 十一、async和await


Axios返回Promise。


以前：

```ts
getRoleList()
.then(res=>{

})
```


企业项目更常用：

```ts
const res = await getRoleList()
```


例如：


```ts
async function load(){

const data = await getRoleList()


console.log(data)

}
```


---

# 十二、请求拦截器


作用：

发送请求之前执行。


常用于：

添加Token。


例如：


```ts
request.interceptors.request.use(

config=>{


config.headers.Authorization =
'token'


return config


}

)
```


流程：


```
页面请求

↓

请求拦截器

↓

添加Token

↓

发送服务器

```


---

# 十三、响应拦截器


作用：

统一处理返回结果。


例如：

后端：

```json
{
"code":0,
"data":[]
}
```


统一处理：


```ts
request.interceptors.response.use(

response=>{


return response.data


}

)
```


页面：

直接获得：

```ts
data

```


---

# 十四、芋道源码对应


打开：

```
yudao-ui-admin-vue3
```


重点查看：


```
src/utils/request.ts

```


你会看到类似：


```ts
service.interceptors.request.use()

```


以及：

```ts
service.interceptors.response.use()

```


这就是今天学习内容。


---

# 十五、完整请求流程


企业项目真实流程：


```
Vue页面

↓

调用API

↓

api/user/index.ts

↓

request.ts

↓

axios

↓

SpringBoot Controller

↓

数据库

```


---

# 十六、今日练习


## 练习1：创建角色API


创建：

```
src/api/role/index.ts
```


实现：


```ts
getRoleList()

createRole()

deleteRole()

```


---

## 练习2：角色页面调用接口


修改：

```
RoleManage.vue

```


要求：

页面加载：

自动请求：

```
角色列表

```


---

## 练习3：模拟后端数据


如果没有后端：

先模拟：


```ts
const list=[

{
name:'战士'
}

]

```


显示到：

```
el-table

```


---

# 十七、今日验收


## 1

Vue调用后端接口使用什么？


答案：

```
Axios
```


---

## 2

为什么封装request？


答案：

```
统一处理请求逻辑
```


---

## 3

Token在哪里添加？


答案：

```
请求拦截器
```


---

## 4

接口错误统一处理在哪里？


答案：

```
响应拦截器
```


---

# 今日总结


企业Vue项目请求结构：


```
页面

↓

API

↓

request封装

↓

Axios

↓

后端接口

```


芋道也是这个模式。


---

# Day08预告


主题：

# Pinia状态管理


学习：

- 为什么需要状态管理
- Pinia安装
- Store设计
- 用户信息保存
- Token管理


实战：

实现：

```
登录用户状态管理

```

---

# 十八、完整实战：Axios获取数据并显示到Table


前面学习了：

```
Vue页面

↓

API

↓

Axios

↓

后端

```


现在完整跑通。


目标：


实现：

```
角色管理页面


打开页面

↓

自动请求角色列表

↓

显示到el-table

```


---

# 十九、模拟后端数据


实际开发：

后端SpringBoot返回JSON。


例如：

接口：

```
GET /api/role/list
```


返回：


```json
{
  "code":0,
  "msg":"success",
  "data":[
    {
      "id":1,
      "name":"战士",
      "level":10
    },
    {
      "id":2,
      "name":"法师",
      "level":8
    }
  ]
}
```


字段含义：

```text
code

状态码


msg

提示信息


data

业务数据

```


---

# 二十、创建API接口


目录：

```
src/api/role/index.ts
```


代码：


```ts
import request from '@/utils/request'


export function getRoleList(){

    return request.get('/role/list')

}
```


注意：

API层不要写业务逻辑。


职责：

```
定义接口地址

↓

返回请求结果

```


---

# 二十一、页面调用接口


创建：

```
src/views/RoleManage.vue
```


代码：

```vue
<script setup lang="ts">


import {
    ref,
    onMounted
} from 'vue'


import {
    getRoleList
} from '@/api/role'



const roles = ref([])



onMounted(()=>{

    loadData()

})



async function loadData(){


    const res = await getRoleList()


    console.log(
        "接口返回:",
        res
    )


    roles.value = res.data


}


</script>
```


重点：


初始化：


```ts
const roles = ref([])
```


接口返回后：


```ts
roles.value=res.data
```


Vue自动刷新页面。


---

# 二十二、绑定Table显示数据


template：


```vue
<template>


<el-table

:data="roles"

>


<el-table-column

prop="id"

label="ID"

/>


<el-table-column

prop="name"

label="角色名称"

/>


<el-table-column

prop="level"

label="等级"

/>


</el-table>


</template>
```


最终效果：


|ID|角色名称|等级|
|-|-|-|
|1|战士|10|
|2|法师|8|


---

# 二十三、真实企业接口数据流


完整流程：


```
用户打开页面


↓

RoleManage.vue


↓

onMounted


↓

loadData()


↓

getRoleList()


↓

api/role/index.ts


↓

request.get()


↓

Axios


↓

后端接口


↓

返回JSON


↓

roles.value赋值


↓

el-table刷新


```


这个流程必须熟练。


---

# 二十四、处理分页数据


企业后台不会直接返回数组。


例如芋道：


返回：


```json
{
"code":0,
"data":{

"list":[

{
"id":1,
"name":"管理员"
}

],

"total":100

}
}
```


其中：

list：

数据列表


total：

总数量


---

页面：


```ts
const tableData=ref([])


const total=ref(0)



async function loadData(){


const res=await getRoleList()



tableData.value=res.data.list


total.value=res.data.total


}
```


---

# 二十五、请求异常处理


例如：

服务器错误。


```ts
async function loadData(){


try{


const res=await getRoleList()


roles.value=res.data



}catch(error){


console.log(
"请求失败",
error
)


}


}
```


企业项目：

错误处理一般放：

```
request响应拦截器

```


---

# 二十六、完整练习项目


今天不要只看代码。

要求自己完成：


## 项目：角色管理页面


目录：

```
src

├── api

│   └── role

│       └── index.ts


├── views

│   └── RoleManage.vue


└── utils

    └── request.ts

```


---

## 功能1：加载列表


打开页面：

自动请求角色数据。


要求：

使用：

```
onMounted

axios

ref

el-table

```


---

## 功能2：新增角色


增加按钮：


```
新增角色

```


点击：

打开：

```
el-dialog

```


填写：

```
角色名称

等级

```


点击确定：

调用：

```
createRole()

```


---

## 功能3：删除角色


每行增加：

```
删除按钮

```


点击：

调用：

```
deleteRole(id)

```


---

# 二十七、完成标准


完成后你的页面应该：


打开：

```
角色管理页面

```


自动显示：

```
战士 10

法师 8

```


点击：

```
新增角色

```


弹出：

```
新增弹窗

```


点击：

```
删除

```


调用删除接口。


---

# 二十八、对应芋道源码


以后阅读：

```
system/user/index.vue

```


你会看到类似：


```ts
const getList = async()=>{

const res = await UserApi.getUserPage(params)

tableData.value=res.list

}

```


今天学习的：

完全一致。

