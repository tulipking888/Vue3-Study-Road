# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# Vue3企业开发常见问题记录-Day07


> 本文记录 Day07 Axios + Mock + Element Plus 实战过程中遇到的问题。


---

# 问题一：Element Plus组件无法识别


## 现象


页面没有正常显示表格。


浏览器控制台：

```
[Vue warn]: Failed to resolve component: el-table

[Vue warn]: Failed to resolve component: el-table-column
```


同时：

```
Expected Array, got Object
```


---

# 原因分析


Vue无法识别：

```vue
<el-table>

<el-table-column>
```


说明：

Element Plus组件库没有注册。


虽然项目已经安装：

```bash
npm install element-plus
```


但是安装 ≠ 使用。


Vue3需要在入口文件注册。


---

# 解决方案


修改：

```
src/main.ts
```


增加：


```ts
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'


const app=createApp(App)


app.use(ElementPlus)


app.mount('#app')
```


核心：

```ts
app.use(ElementPlus)
```


---

# 知识总结


Vue第三方组件库使用流程：


```
安装依赖

↓

main.ts注册

↓

页面直接使用组件

```


例如：

Element Plus：

```vue
<el-button>

<el-table>

<el-dialog>
```


---

# 企业项目对应


芋道项目中：

Element Plus通常已经在入口完成配置。


查看：

```
src/main.ts
```


可以看到：

```
app.use(ElementPlus)
```


所以业务页面可以直接使用：

```vue
<el-table>
```


---

---

# 问题二：Axios请求返回HTML页面，而不是JSON


## 现象


Axios打印：


```js
loadData {

data:"<!doctype html>

<html lang=\"en\">

..."

}
```


返回状态：

```
status:200
```


但是数据不是接口返回。


---

# 原因分析


请求：

```
GET /api/role/list
```


期望：

```json
{
 code:0,
 data:[]
}
```


实际：

返回：

```html
<!doctype html>

<html>

<body>

<div id="app"></div>

</body>

</html>
```


说明：

请求没有进入Mock接口。


而是被Vite当成普通页面请求。


---

# 排查步骤


## 1. 检查vite.config.ts


需要：

```ts
import { viteMockServe } from 'vite-plugin-mock'


export default defineConfig({

plugins:[

vue(),

viteMockServe({

enable:true

})

]

})
```


重点：

```ts
viteMockServe()
```


---

## 2. 检查Mock目录位置


正确：


```
项目根目录


├── src

├── mock

│   └── role.ts

├── vite.config.ts

├── package.json

```


注意：

不是：

```
src/mock
```


---

## 3. 检查依赖


安装：


```bash
npm install vite-plugin-mock -D

npm install mockjs -D
```


---

## 4. 修改配置后必须重启Vite


停止：

```
Ctrl + C
```


重新启动：

```bash
npm run dev
```


原因：

vite.config.ts不会热更新。


---

# 问题三：Axios返回数据结构错误


## 现象


接口已经成功返回：

```js
{
 code:0,
 data:[
    {
      id:1,
      name:"战士"
    }
 ]
}
```


但是Element Plus报错：


```
Invalid prop: type check failed for prop "data".

Expected Array, got Object
```


---

# 原因分析


Axios返回结构：

```js
res = {

 data:{

    code:0,

    data:[

    ]

 }

}
```


数据有两层。


---

# 错误代码


```ts
roles.value = res.data
```


此时：

roles：

```js
{
 code:0,
 data:[]
}
```


但是：

el-table要求：

```js
[
 {}
]
```


所以报错。


---

# 正确代码


```ts
roles.value = res.data.data
```


---

# 数据流分析


完整流程：


```
Mock接口

↓

{
 code:0,
 data:[]
}

↓

Axios包装

↓

res

↓

res.data

↓

{
 code:0,
 data:[]
}

↓

res.data.data

↓

数组

↓

roles

↓

el-table显示

```


---

# 企业项目中的优化


芋道为什么很多地方不用：

```ts
res.data.data
```


而是：

```ts
data.list
```


原因：

Axios响应拦截器进行了统一处理。


例如：


```ts
service.interceptors.response.use(

response=>{

    return response.data

}

)
```


处理前：

```ts
res.data.data
```


处理后：

```ts
res.data
```


甚至：

```ts
res.list
```


---

# Day07最终运行链路


现在项目已经跑通：


```
RoleManage.vue

↓

getRoleList()

↓

api/role/index.ts

↓

request.ts

↓

Axios

↓

Mock接口

↓

JSON数据

↓

roles(ref)

↓

el-table

↓

页面刷新

```


---

# 后续开发排查经验


以后遇到接口问题，按照顺序检查：


## 1. 请求有没有发送


浏览器：

```
Network
```


查看：

```
Request URL
```


---

## 2. 返回是不是JSON


正常：

```json
{
code:0,
data:[]
}
```


异常：

```html
<!doctype html>
```


说明：

接口没有匹配。


---

## 3. 数据结构是否正确


检查：

```ts
console.log(res)
```


确认：

应该取：

```ts
res.data

```

还是：

```ts
res.data.data

```


---

## 4. UI组件是否注册


如果看到：

```
Failed to resolve component
```


优先检查：

```
main.ts
```


---

# 总结


Day07虽然只是一个角色列表页面，但是完整经历了企业后台开发中的核心流程：


```
组件库配置

↓

接口封装

↓

请求调试

↓

数据结构处理

↓

页面渲染

```


这些问题在真实Vue企业项目中非常常见。
