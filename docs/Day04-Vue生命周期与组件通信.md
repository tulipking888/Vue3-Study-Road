# Vue3 企业开发30天教程

# Day04：Vue生命周期与组件通信


> 学习路线：
>
> Vue组件
>
> ↓
>
> 生命周期
>
> ↓
>
> 父子组件通信
>
> ↓
>
> 企业组件封装


---

# 今日学习目标


完成今天学习后，你应该掌握：


- 理解 Vue 组件生命周期
- 掌握 onMounted
- 掌握 onUnmounted
- 理解父组件向子组件传递数据
- 理解子组件向父组件发送事件
- 掌握 props
- 掌握 emit
- 掌握 slot 插槽


今天完成一个实战：


```
角色详情弹窗组件

父组件：

角色列表


↓

点击角色


↓

显示详情组件

```


---

# 一、为什么需要生命周期？


## 1.1 什么是生命周期？


Vue组件：

从创建：

```
组件出现
```


到：

```
组件销毁
```


会经历一些阶段。


例如：


```
创建组件

↓

加载数据

↓

显示页面

↓

用户操作

↓

销毁组件

```


这些阶段：

叫：

> 生命周期。


---

# 二、Cocos生命周期对比


你之前 Cocos：

```ts
start(){

}


update(dt){

}


onDestroy(){

}
```


Vue：

对应：

|Cocos|Vue|
|-|-|
|start|onMounted|
|update|watch/watchEffect|
|onDestroy|onUnmounted|


---

# 三、onMounted


## 3.1 作用


最常用生命周期。


表示：

```
组件已经显示到页面
```


例如：

页面打开后：

请求服务器数据。


---

示例：


```vue
<script setup lang="ts">

import { onMounted } from 'vue'


onMounted(()=>{

  console.log(
    "组件加载完成"
  )

})

</script>
```


执行顺序：

```
组件创建

↓

template渲染

↓

onMounted执行

```


---

# 四、实际项目中的onMounted


例如：

用户列表页面：


```vue
<script setup lang="ts">

import { onMounted } from 'vue'


onMounted(()=>{

  getUserList()

})


function getUserList(){

  console.log(
    "请求用户数据"
  )

}

</script>
```


企业项目：

90%的页面都会有：

```ts
onMounted(()=>{

  loadData()

})
```


---

# 五、onUnmounted


作用：

组件销毁时执行。


例如：

关闭页面：

```
清理定时器

取消监听

释放资源
```


示例：


```ts
import {
  onUnmounted
} from 'vue'


onUnmounted(()=>{

 console.log(
  "组件销毁"
 )

})
```


---

# 六、父组件向子组件传数据


这是 Vue 最重要的通信方式。


关系：

```
父组件

↓

props

↓

子组件
```


类似：

Cocos：

```
父节点

↓

传参数

↓

子节点Component
```


---

# 七、props使用


创建子组件：


```
components/RoleCard.vue
```


代码：


```vue
<template>

<div>

<h2>
角色：

{{name}}

</h2>


<p>
等级：

{{level}}

</p>


</div>

</template>



<script setup lang="ts">


defineProps({

name:String,

level:Number

})


</script>
```


---

父组件：


```vue
<RoleCard

name="战士"

:level="10"

/>
```


效果：


```
角色：战士

等级：10

```


---

# 八、props类型定义


企业项目推荐 TypeScript写法：


```vue
<script setup lang="ts">

interface Props {


name:string


level:number


}


defineProps<Props>()


</script>
```


优点：

- 类型提示
- 防止错误
- IDE自动补全


---

# 九、子组件通知父组件


场景：

子组件按钮点击：

通知父组件。


例如：


```
角色卡片

点击选择


↓

告诉角色列表

```


Vue使用：

```
emit
```


---

# 十、defineEmits


子组件：


```vue
<script setup lang="ts">


const emit = defineEmits([

'select'

])


function selectRole(){


emit(
'select'
)


}


</script>
```


模板：


```vue
<button
@click="selectRole"
>

选择

</button>
```


---

父组件接收：


```vue
<RoleCard

@select="handleSelect"

/>
```


然后：


```ts
function handleSelect(){

 console.log(
 "选择角色"
 )

}
```


---

# 十一、传递参数


实际开发更常见。


子组件：


```ts
emit(
'select',
role
)
```


父组件：


```vue
<RoleCard

@select="handleSelect"

/>
```


```ts
function handleSelect(role){

 console.log(
 role.name
 )

}
```


---

# 十二、综合案例：角色列表和详情


## 12.1 父组件


文件：

```
RoleList.vue
```


```vue
<template>


<div>


<RoleCard

name="战士"

:level="10"

@select="showDetail"

/>


</div>


</template>



<script setup lang="ts">


import RoleCard from './RoleCard.vue'


function showDetail(){

 console.log(
 "打开详情"
 )

}


</script>
```


---

## 12.2 子组件


文件：

```
RoleCard.vue
```


```vue
<template>


<div>


<h2>

{{name}}

</h2>


<p>

等级：

{{level}}

</p>


<button
@click="select"

>

查看详情

</button>


</div>


</template>



<script setup lang="ts">


interface Props{

name:string

level:number

}


defineProps<Props>()



const emit = defineEmits([

'select'

])


function select(){

 emit(
 'select'
 )

}


</script>
```


---

# 十三、slot插槽


## 13.1 为什么需要slot？


组件：

可能结构固定：

但是内容不同。


例如：

弹窗：


```
+-------------+

| 标题         |

|             |

| 内容区域     |

|             |

+-------------+

```


标题一样：

内容不同。


使用：

slot。


---

# 十四、slot基础


组件：


```vue
<div>

<h2>
弹窗

</h2>


<slot />

</div>
```


使用：


```vue
<MyDialog>

角色信息

</MyDialog>
```


显示：


```
弹窗

角色信息

```


---

# 十五、芋道源码关联


今天内容对应：


## 页面加载


大量：


```ts
onMounted(()=>{

  getList()

})
```


---

## 表单组件


例如：


```
UserForm.vue

↓

props

↓

接收用户数据

```


---

## 子组件通知


例如：

关闭弹窗：

```ts
emit('close')
```


---

# 十六、今日练习


## 练习1：角色卡片组件


创建：

```
RoleCard.vue
```


要求：


props：

```
name

level

job
```


显示：

```
角色名称

等级

职业

```


---

## 练习2：点击选择


点击按钮：

子组件通知父组件。


父组件输出：

```
选择了xxx角色
```


要求：

使用：

```
emit
```


---

## 练习3：生命周期


组件加载时：

输出：

```
角色页面打开
```


组件销毁时：

输出：

```
角色页面关闭
```


要求：

使用：

```
onMounted

onUnmounted
```


---

# 十七、今日验收


完成后，你应该可以回答：


## 1

页面加载完成后执行什么？

答案：

```
onMounted
```


---

## 2

父传子使用什么？

答案：

```
props
```


---

## 3

子通知父使用什么？

答案：

```
emit
```


---

## 4

组件内容扩展使用什么？

答案：

```
slot
```


---

# 今日总结


Vue组件通信：

```
父组件

↓

props

↓

子组件


子组件

↓

emit

↓

父组件
```


生命周期：

```
创建

↓

onMounted

↓

运行

↓

onUnmounted

↓

销毁
```


掌握这些以后：

你已经具备阅读企业 Vue 组件代码的能力。


---

# Day05预告


主题：

# Vue Router路由系统


学习：

- 页面路由
- router配置
- 路由跳转
- 参数传递
- 页面布局


实战：

制作：

```
后台管理系统

登录页

首页

角色管理页

```