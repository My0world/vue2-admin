import http from "@/utils/request";

//请求首页数据
export const getData = () => {
    return http.get('/home/getData')
}

//获取用户列表的数据
export const reqUserList = (data) => {
    return http({
        url: "/user/getUserList",
        method: "get",
        params: data
    })
}

//增加用户
export const reqCreateUser = (data) => {
    return http({
        url: "/user/createUser",
        method: "post",
        data
    })
}

//删除一个用户
export const reqDeleteUser = (data) => {
    return http({
        url: "/user/deleteUser",
        method: "post",
        data
    })
}

//批量删除用户
export const reqBatchremove = (data) => {
    return http({
        url: "/user/batchremove",
        method: "post",
        data
    })
}

//修改用户
export const reqUpdateUser = (data) => {
    return http({
        url: "/user/updateUser",
        method: "post",
        data
    })
}

//用户登录获取菜单
export const reqMenu = (data) => {
    return http({
        url: "/permission/getMenu",
        method: "post",
        data
    })
}