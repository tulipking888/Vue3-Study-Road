# Day06 Element Plus组件库与后台页面基础


> Vue3企业开发学习路线
>
> 针对项目：yudao-ui-admin-vue3
>
> 今日目标：掌握企业后台常用UI组件开发


---

# 今日学习目标


完成今天学习后，你应该掌握：


- 理解为什么企业项目需要UI组件库
- 安装Element Plus
- 使用Element Plus常用组件
- 掌握表单数据绑定
- 掌握表格数据展示
- 掌握弹窗组件
- 能够制作简单后台管理页面


今天完成一个实战：


```
角色管理页面

包含：

1. 查询区域
2. 数据列表
3. 新增按钮
4. 新增弹窗

```


---

# 一、为什么需要UI组件库


## 1.1 原生HTML开发的问题


传统开发：

```html
<button>
提交
</button>


<input>
```


需要自己处理：

- 样式
- hover效果
- 禁用状态
- 加载状态
- 表单校验


企业项目开发效率低。


---

## 1.2 UI组件库解决的问题


UI组件库提前封装好了：

```
按钮

输入框

表格

弹窗

表单

分页

菜单

```


开发方式：

以前：

```
写HTML

↓

写CSS

↓

写JS逻辑

```


现在：

```
组合组件

↓

完成页面
```


---

# 二、Element Plus介绍


Element Plus 是 Vue3 生态中非常流行的后台管理组件库。


芋道前端：

```
Vue3

+

TypeScript

+

Element Plus

```


也是目前企业后台常见技术组合。


---

# 三、安装Element Plus


进入项目目录：


```bash
npm install element-plus
```


安装完成后：

package.json：

会出现：

```json
{
  "element-plus": "版本号"
}
```


---

# 四、注册Element Plus


修改：

```
src/main.ts
```


代码：


```ts
import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'


import App from './App.vue'


const app = createApp(App)


app.use(ElementPlus)


app.mount('#app')
```


说明：


```ts
app.use(ElementPlus)
```


表示：

让整个项目可以使用：

```
el-button

el-table

el-dialog

el-form

```


---

# 五、Button按钮组件


## 5.1 基础按钮


代码：

```vue
<template>

<el-button>
普通按钮
</el-button>

</template>
```


效果：

```
普通按钮
```


---

## 5.2 按钮类型


Element Plus提供：

```vue
<template>


<el-button type="primary">

新增

</el-button>


<el-button type="success">

成功

</el-button>


<el-button type="warning">

警告

</el-button>


<el-button type="danger">

删除

</el-button>


</template>
```


后台常见：

```
新增   primary

编辑   primary

删除   danger

```


---

# 六、Input输入框


## 6.1 基础输入框


代码：


```vue
<template>


<el-input

placeholder="请输入名称"

/>


</template>
```


---

## 6.2 v-model绑定


实际项目：

输入框一定会绑定数据。


```vue
<script setup lang="ts">

import {
ref
} from 'vue'


const name = ref('')


</script>


<template>


<el-input

v-model="name"

placeholder="请输入角色名称"

/>


</template>
```


数据变化：


```
用户输入

↓

v-model

↓

name变量更新

```


---

# 七、Form表单组件


后台新增和编辑大量使用。


例如：


```
新增角色

角色名称

等级

职业

```


---

## 7.1 基础Form


```vue
<template>


<el-form>


<el-form-item label="角色名称">


<el-input />


</el-form-item>



<el-form-item label="等级">


<el-input />


</el-form-item>


</el-form>


</template>
```


---

# 八、表单数据管理


推荐使用：

```ts
reactive
```


示例：

```ts
import {
reactive
} from 'vue'


const form = reactive({

name:'',

level:1,

job:''

})
```


绑定：

```vue
<el-input

v-model="form.name"

/>
```


数据结构：

```
form

|

├── name

├── level

└── job

```


---

# 九、Table表格组件


后台最核心组件之一。


例如：

角色列表：

```ts
const roles = [

{
id:1,
name:'战士',
level:10
},

{
id:2,
name:'法师',
level:8
}

]
```


---

## 9.1 基础Table


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


效果：

|ID|角色名称|等级|
|-|-|-|
|1|战士|10|
|2|法师|8|


---

# 十、Table操作列


后台列表通常有：

```
编辑

删除

详情

```


代码：

```vue
<el-table-column

label="操作">


<template #default="scope">


<el-button>

编辑

</el-button>


<el-button type="danger">

删除

</el-button>


</template>


</el-table-column>
```


这里：

```vue
#default
```

就是：

Day04学习过的：

```
slot插槽
```


---

# 十一、Dialog弹窗组件


后台新增编辑常用。


流程：


```
点击新增

↓

打开弹窗

↓

填写表单

↓

提交

↓

关闭弹窗

```


---

## 11.1 Dialog基本使用


```vue
<template>


<el-dialog

v-model="visible"

title="新增角色"

>


角色表单内容


</el-dialog>


</template>
```


---

控制显示：

```ts
import {
ref
} from 'vue'


const visible = ref(false)
```


打开：

```ts
visible.value=true
```


关闭：

```ts
visible.value=false
```


---

# 十二、综合案例：角色管理页面


创建：


```
src/views/RoleManage.vue
```


目标：


```
角色管理


新增按钮


角色列表


新增弹窗

```


---

完整代码：


```vue
<template>


<h2>
角色管理
</h2>



<el-button

type="primary"

@click="openDialog"

>

新增角色

</el-button>



<el-table

:data="roles"

>


<el-table-column

prop="name"

label="角色名称"

/>


<el-table-column

prop="level"

label="等级"

/>


</el-table>




<el-dialog

v-model="visible"

title="新增角色"

>


<el-input

v-model="form.name"

placeholder="角色名称"

/>


</el-dialog>


</template>



<script setup lang="ts">


import {

ref,

reactive

} from 'vue'



const roles=[


{
name:'战士',
level:10
},


{
name:'法师',
level:8
}


]



const visible = ref(false)



const form = reactive({

name:''

})



function openDialog(){


visible.value=true


}


</script>
```


---

# 十三、芋道源码对应位置


以后阅读：

```
yudao-ui-admin-vue3
```


重点关注：

```
src/views/system
```


例如：

用户管理：

```
system/user
```


里面大量出现：

```vue
<el-form>

<el-table>

<el-dialog>

```


今天学习内容全部对应。


---

# 十四、今日练习


## 练习1：用户列表


创建：

```
UserManage.vue
```


要求：

显示：

```
用户名

手机号

状态

```


使用：

```
el-table
```


---

## 练习2：新增用户


点击：

```
新增用户
```


打开：

```
el-dialog
```


包含：

```
用户名

手机号

```


---

## 练习3：搜索区域


增加：

```
输入框

搜索按钮

```


使用：

```
v-model
```


---

# 十五、今日验收


## 1. 为什么使用Element Plus？


答案：

```
提高企业后台开发效率
```


---

## 2. 双向绑定使用什么？


答案：

```
v-model
```


---

## 3. 展示列表使用什么？


答案：

```
el-table
```


---

## 4. 弹窗使用什么？


答案：

```
el-dialog
```


---

# 今日总结


企业后台页面基本结构：


```
查询区域

↓

列表区域

↓

操作按钮

↓

弹窗表单

```


Element Plus核心组件：

```
Button

Input

Form

Table

Dialog

```


掌握这些以后：

你已经具备阅读芋道普通业务页面的基础。


---

# Day07预告


主题：

# Axios接口请求与封装


学习：

- Axios安装
- API目录设计
- GET请求
- POST请求
- request封装
- 请求拦截器
- 响应拦截器


实战：

实现：

```
角色列表接口调用

新增角色接口调用

```

