export default [
    {
        name: 'layout',//名字
        path: '/',//路径
        redirect:"/home",//重定向
        component: () => import("@/layout/layout"),//组件名称
        meta: {},//路由元信息
        children: [
            // {
            //     name: 'home',//首页
            //     path: 'home',
            //     component: () => import('@/views/Home/Home'),
            //     meta: {},
            //     children: [],
            // },
            // {
            //     name: 'user',//用户管理
            //     path: 'user',
            //     component: () => import('@/views/User/User'),
            //     meta: {},
            //     children: [],
            // },
            // {
            //     name:'mall',//商品管理
            //     path:'mall',
            //     component:() => import('@/views/Mall/Mall'),
            //     meta: {},
            //     children: [],
            // },
            // {
            //     name:'page1',//名字
            //     path:'/page1',//路径
            //     component:() => import('@/views/Page1/Page1'),//组件名称
            //     meta: {},//路由元信息
            //     children: [],//二级路由
            // },
            // {
            //     name:'page2',//名字
            //     path:'/page2',//路径
            //     component:() => import('@/views/Page2/Page2'),//组件名称
            //     meta: {},//路由元信息
            //     children: [],//二级路由
            // }
        ],//二级路由
    },
    {
        name:'login',//名字
        path:'/login',//路径
        component:() => import('@/views/Login/Login'),//组件名称
        meta: {},//路由元信息
        children: [],//二级路由
    }
]
