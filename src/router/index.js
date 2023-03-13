// 配置路由

//引入vue
import Vue from 'vue'

//引入Cookie
import Cookie from 'js-cookie'

// 引入VueRouter
import VueRouter from 'vue-router'

//使用路由
Vue.use(VueRouter)

//引入路由
import routes from './routes'

//获取路由中原始的push方法
const originalPush = VueRouter.prototype.push

//获取路由中原始的replase方法
const originalReplace = VueRouter.prototype.replace

//修改原始的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//修改原始的replase方法
VueRouter.prototype.replase = function replase(location) {
    return originalReplace.call(this, location).catch(err => err)
}



//配置路由
let router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //判断token是否存在
    let token = Cookie.get("token")
    if (!token && to.name !== 'login') { //token不存在并且去的不是登录页
        next({ name: 'login' })
    } else if (token && to.name === 'login') { //token存在并且去的是登录页
        next(false)
    } else { //去的不是登录页
        next()
    }
})


export default router
