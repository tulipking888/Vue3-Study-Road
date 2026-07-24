import request from "../../utils/request";
//角色接口

export function getRoleList() {
    return request.get('/role/list')
}