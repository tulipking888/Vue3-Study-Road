# Day09 TypeScript强化


> Vue3企业开发学习路线 Day09
>
> 目标：
>
> 掌握 Vue3 企业项目中 TypeScript 的核心使用方式。


---

# 一、今日学习目标


今天学习：

- TypeScript基础类型
- interface接口
- type类型定义
- 泛型
- 类型推导
- Vue3中的TS写法


最终达到：

能够：

```
看懂芋道Vue3源码中的TS代码

能够给业务模块定义类型

能够减少前端开发中的数据错误

```


对应芋道：

```
yudao-ui-admin-vue3

src/

├ api

├ views

├ stores

├ components

```


---

# 二、为什么Vue3企业项目大量使用TypeScript


传统JavaScript：


```js
const user = {

name:"张三",

age:18

}
```


问题：

如果后面写：

```js
user.age="abc"
```


JavaScript不会提前提醒。


运行：

可能出现：

```
页面异常

接口错误

数据显示错误

```


---

TypeScript：


增加类型检查：


```ts
interface User{

name:string

age:number

}


const user:User={

name:"张三",

age:18

}
```


错误：

```ts
user.age="abc"
```


编辑器直接提示。


---

# 三、TypeScript基础类型


## 1. string


字符串：


```ts
const name:string="战士"
```


---

## 2. number


数字：


```ts
const level:number=10
```


---

## 3. boolean


布尔：


```ts
const online:boolean=true
```


---

## 4. Array


数组：


方式1：


```ts
const roles:string[]=[

"战士",

"法师"

]
```


方式2：


```ts
const roles:Array<string>=[

"战士",

"法师"

]
```


---

## 5. Object


对象：


```ts
const user:object={

name:"张三"

}
```


但是企业项目一般不会直接使用object。


推荐：

interface。


---

# 四、interface接口


interface用于描述对象结构。


例如：

用户信息：


```ts
interface User{


id:number


name:string


level:number


}
```


使用：


```ts
const user:User={


id:1,


name:"张三",


level:10


}
```


---

# 五、企业开发中的interface


后台接口返回：


```json
{

"id":1,

"name":"管理员",

"status":1

}
```


前端应该定义：


```ts
interface Role{


id:number


name:string


status:number


}
```


之后：


```ts
const role:Role=data
```


编辑器会知道：


```
role.id

role.name

role.status

```


---

# 六、type类型


type也可以定义类型。


例如：


```ts
type Role={


id:number


name:string


level:number


}
```


interface和type区别：


简单理解：


| |interface|type|
|-|-|-|
|对象定义|推荐|可以|
|扩展|强|可以|
|联合类型|不方便|强|


企业项目：

对象：

优先interface。


---

# 七、联合类型


一个变量可以有多个类型。


例如：


```ts
let id:number|string


id=1001


id="1001"
```


后台项目常见：


```ts
type ID = number|string
```


因为：

数据库ID：

可能：

```
1001

或者

"1001"

```


---

# 八、泛型 Generic


泛型是企业项目重点。


作用：

让代码可以复用。


例如：


普通函数：


```ts
function getData(data:string){

return data

}
```


只能传字符串。


---

泛型：


```ts
function getData<T>(data:T){

return data

}
```


可以：

```ts
getData<string>("hello")


getData<number>(100)

```


---

# 九、Axios接口中的泛型


企业项目大量出现：


```ts
request.get<Role[]>('/role/list')
```


意思：

告诉TS：


接口返回：

```
Role数组

```


例如：


```ts
interface Role{


id:number

name:string


}


const data = await request.get<Role[]>('/role/list')
```


之后：

```ts
data[0].name
```


自动提示。


---

# 十、Vue3中的TypeScript


## 1. ref类型


之前：


```ts
const count=ref(0)
```


TS自动推断：

```
number
```


---

复杂对象：

需要指定。


例如：


```ts
interface User{


name:string

level:number

}


const user=ref<User>({


name:"",

level:0


})
```


---

# 十一、数组类型


例如角色列表：


```ts
interface Role{


id:number

name:string

level:number


}



const roles=ref<Role[]>([])
```


这就是企业Vue项目常见写法。


---

# 十二、Day07代码优化


之前：


```ts
const roles = ref([])
```


问题：

TS不知道数组里面是什么。


优化：


```ts
interface Role{


id:number

name:string

level:number

}



const roles=ref<Role[]>([])
```


之后：

```ts
roles.value[0].name
```


会自动提示。


---

# 十三、芋道源码对应


打开：

```
yudao-ui-admin-vue3
```


重点看：


## api目录


例如：

```
src/api/system/user/index.ts
```


里面大量：

```ts
export interface UserVO

```


---

## views页面


例如：


```
src/views/system/user

```


可以看到：


```ts
const formData=reactive<UserForm>({
})
```


---

## store


例如：


```
src/store/modules/user.ts

```


大量使用：

```ts
interface

type

```


---

# 十四、完整实战案例


今天优化 Day07 的角色列表。


目标：


给角色接口增加完整类型。


---

## 1. 创建类型文件


目录：


```
src/types

└ role.ts

```


---

role.ts：


```ts
export interface Role{


id:number


name:string


level:number


}

```


---

## 2. API接口


role/index.ts


```ts
import request from '../../utils/request'

import type {Role} from '../../types/role'



export function getRoleList(){


return request.get<Role[]>('/role/list')


}

```


---

## 3. 页面


RoleManage.vue


```ts
import type {Role}

from '../types/role'



const roles=ref<Role[]>([])
```


---

最终效果：


以前：


```
数据是什么不知道

```


现在：


```
roles

↓

Role[]

↓

自动提示字段

```


---

# 十五、Day09练习任务


## 练习1


创建：

```
User接口

```


字段：

```
id

username

avatar

role

```


---

## 练习2


创建：

```
UserList.vue

```


定义：

```ts
ref<User[]>([])
```


显示用户列表。


---

## 练习3


给Day07角色管理增加类型。


要求：

不能出现：

```ts
any
```


---

# 十六、常见问题


## 问题1：interface和type不知道选哪个


建议：


对象：

```
interface

```


联合类型：

```
type

```


---

## 问题2：为什么import type


例如：


```ts
import type {Role}

from './role'
```


原因：

告诉TS：

这个只是类型。


不会打包进JavaScript。


企业项目大量使用。


---

## 问题3：any能不能用


可以：

```ts
const data:any
```


但是：

企业项目尽量避免。


因为：

失去TS意义。


---

# 十七、完成验收标准


完成今天后：

应该达到：


## 1.


能够定义：

```
interface

type

```


---

## 2.


能够理解：


```
ref<T>

reactive<T>

request<T>

```


---

## 3.


能够阅读芋道中的：


```
VO

DTO

interface

```


---

## 4.


能够给Day07角色管理增加完整类型。


---

# 十八、今日总结


今天学习：

```
JavaScript

↓

TypeScript

↓

企业Vue类型系统

```


核心思想：

```
数据结构明确

↓

代码提示增强

↓

减少错误

↓

提高大型项目维护能力

```


对于芋道：

TypeScript不是装饰。

而是大型后台项目能够长期维护的重要基础。
