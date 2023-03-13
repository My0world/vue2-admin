import  Mock  from "mockjs"
import homeApi from "./mockServeData/home"
import userApi from "./mockServeData/user"
import permissionApi from './mockServeData/permission'

//定义mock请求拦截

//首页数据
Mock.mock("/api/home/getData",homeApi.getStatisticalData)

//获取用户列表的数据
Mock.mock(/api\/user\/getUserList/,userApi.getUserList)

//增加用户
Mock.mock("/api/user/createUser","post",userApi.createUser)

//删除一个用户
Mock.mock("/api/user/deleteUser","post",userApi.deleteUser)

//批量删除用户
Mock.mock("/api/user/batchremove","post",userApi.batchremove)

//修改用户
Mock.mock("/api/user/updateUser","post",userApi.updateUser)

//登录
Mock.mock(/api\/permission\/getMenu/,"post",permissionApi.getMenu)