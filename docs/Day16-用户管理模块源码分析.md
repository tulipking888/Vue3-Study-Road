# Day16 用户管理模块源码分析


> Vue3企业开发学习路线 Day16
>
> 目标：
>
> 学习企业后台第一个完整CRUD业务模块。
>
> 通过芋道 system/user 模块，
>
> 掌握后台列表页面开发流程。


---

# 一、今日学习目标


今天学习：

- 后台列表页面结构
- Table组件
- 查询表单
- 分页
- API调用
- Dialog弹窗
- 新增编辑删除流程


最终理解：


```
一个后台模块如何开发

```


完整流程：


```
页面

↓

API

↓

后端接口

↓

数据展示

↓

用户操作

```


对应芋道：


```
src/views/system/user

src/api/system/user

```


---

# 二、企业后台最常见业务模型


90%的后台功能都是：


CRUD


也就是：


Create

创建


Read

查询


Update

修改


Delete

删除


---

例如：

用户管理：


```
用户列表

新增用户

编辑用户

删除用户

```


角色管理：


```
角色列表

新增角色

修改角色

删除角色

```


---

# 三、用户管理页面结构


典型后台页面：


```
+--------------------------------+

| 搜索区域                       |

| 用户名  状态  查询按钮         |

+--------------------------------+

| 表格                           |

| ID | 用户名 | 状态 | 操作      |

|--------------------------------|

| 1  | 张三   | 正常 | 编辑删除 |

+--------------------------------+

| 分页                           |

+--------------------------------+

```


---

# 四、源码位置


打开芋道：


```
src/views/system/user

```


通常：


```
index.vue

```


就是页面入口。


---

API：

```
src/api/system/user

```


---

# 五、页面基本结构


一个后台页面：

通常：


```vue
<template>


<Search />


<Table />


<Dialog />


</template>


<script setup>


调用API


处理数据


</script>

```


---

# 六、查询列表流程


用户打开页面：


```
进入User页面


↓

onMounted()

↓

调用getUserList()

↓

接口返回数据

↓

table显示

```


---

# 七、onMounted加载数据


例如：


```ts
onMounted(()=>{

getList()

})

```


含义：


页面加载完成：

自动请求。


---

# 八、数据定义


例如：


```ts
const list = ref([])


const total = ref(0)

```


list：

保存表格数据。


total：

保存总数量。


---

# 九、Table展示


Element Plus：


```vue
<el-table

:data="list"


>


<el-table-column

prop="username"

label="用户名"

/>


</el-table>

```


---

# 十、分页


后台列表一定有分页。


原因：

数据可能：

几十万条。


---

分页数据：


```ts
const query={


pageNo:1,


pageSize:10


}

```


---

请求：


```ts
getUserPage(query)

```


返回：


```json
{

list:[],

total:100

}

```


---

# 十一、API层


页面：


不要直接Axios。


流程：


```
User.vue

↓

api/user.ts

↓

request.ts

↓

后端

```


---

例如：


```ts
export function getUserPage(params){


return request.get(

'/system/user/page',

{

params

}

)

}

```


---

# 十二、新增用户


流程：


```
点击新增

↓

打开Dialog

↓

填写表单

↓

点击保存

↓

调用createUser

↓

刷新列表

```


---

# 十三、Dialog弹窗


例如：


```vue
<el-dialog>


<el-form>


用户名


密码


</el-form>


</el-dialog>
```


---

# 十四、编辑用户


流程：


```
点击编辑


↓

获取当前数据


↓

填入Form


↓

保存


↓

update接口


```


---

# 十五、删除用户


流程：


```
点击删除


↓

确认框


↓

delete接口


↓

重新查询

```


---

# 十六、芋道源码阅读任务


今天打开：


```
views/system/user/index.vue

```


寻找：


## 任务1


页面结构：

记录：


```
搜索组件：

表格组件：

弹窗组件：

```


---

## 任务2


找到列表加载函数：


例如：

```
getList()

```


记录：


```
数据从哪里来？

```


---

## 任务3


找到API文件：


```
api/system/user

```


记录：

有哪些接口：

```
分页

新增

修改

删除

```


---

# 十七、自己动手实战


今天开始进入自己的模块开发。


不要修改芋道。


创建自己的练习模块：


```
角色管理

```


---

# 十八、创建页面


在芋道工程：


创建：


```
src/views/game/role/index.vue

```


目标：

显示角色列表。


字段：


```
id

name

level

skill

```


---

# 十九、创建API


创建：


```
src/api/game/role.ts

```


例如：


```ts
export function getRoleList(){

return request.get(

'/game/role/list'

)

}

```


---

# 二十、模拟数据


如果没有后端：

先使用Mock。


返回：


```json
{

code:0,

data:[

{

id:1,

name:"战士",

level:10,

skill:"剑气斩"

}

]

}

```


---

# 二十一、完成页面


实现：


```
角色列表

+

表格显示

```


效果：


|ID|名称|等级|技能|
|-|-|-|-|
|1|战士|10|剑气斩|


---

# 二十二、今日实操验收


必须完成：


## 芋道源码


✅ 找到用户管理页面


✅ 找到API


✅ 理解CRUD流程


---

## 自己代码


完成：


✅ 创建game/role页面


✅ 创建role API


✅ Table显示数据


---

# 二十三、常见问题


## 问题1

为什么页面不直接写Axios？


因为：

企业项目分层。


---

## 问题2

为什么新增编辑共用一个Dialog？


减少重复代码。


---

## 问题3

为什么删除后重新请求列表？


保证数据最新。


---

# 二十四、今日总结


今天学习：


```
Vue页面

↓

API

↓

数据展示

↓

CRUD操作

```


这是企业后台开发最核心能力。


后续：

Day17

学习：

角色管理模块。


重点：

```
权限分配

角色绑定菜单

RBAC实际应用

```
