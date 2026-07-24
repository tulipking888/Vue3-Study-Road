import axios from "axios"
//接口统一前缀：/api/user/list
const request = axios.create({
    baseURL:"/api",
    timeout:10000
})
export default request