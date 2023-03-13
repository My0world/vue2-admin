import { setSession, getSession } from "@/utils/session"
import router from '@/router/index';

const Tab = {
    namespaced: true,
    actions: {
        //设置菜单的显示与隐藏
        setCollapse(context) {
            context.commit("SETCOLLAPSE")
        },
        // 更新面包屑数据
        selectMenu(context, value) {
            context.commit("SELECTMENU", value)
        },
        // 删除指定的面包屑数据
        closeTag(context, value) {
            context.commit("CLOSETAG", value)
        },
        //菜单数据
        setMenu(context, value) {
            context.commit("SETMENU", value)
        },
        clearState(context){
            context.commit("ClEARSTATE")
        }
    },
    mutations: {
        //设置菜单的显示与隐藏
        SETCOLLAPSE(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        SELECTMENU(state, value) {
            let res = state.tabsList.findIndex(item => item.name === value.name)
            if (res === -1) {
                state.tabsList.push(value)
            }
            setSession("tabList", state.tabsList)
        },
        // 删除指定的面包屑数据
        CLOSETAG(state, value) {
            let index = state.tabsList.findIndex(item => {
                return item.name === value.name
            })
            state.tabsList.splice(index, 1)
            setSession("tabList", state.tabsList)
        },
        //菜单数据
        SETMENU(state, value) {
            state.menuList = value
            setSession("menuList", state.menuList)
            let menuArray = []
            state.menuList.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}/${item.url}`)
                        item.path = item.path.replace("/","")
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`@/views/${item.url}/${item.url}`)
                    item.path = item.path.replace("/","")
                    menuArray.push(item)
                }
            });
            menuArray.forEach(item => {
                router.addRoute("layout",item)
            })
        },
        //清空state
        ClEARSTATE(state){
            state.isCollapse = true
            state.tabsList = []
            state.menuList = []
        }

    },
    state: {
        isCollapse: true,//用于控制菜单
        tabsList: getSession("tabList") || [],//菜单数据
        menuList: getSession("menuList") || []
    },
    getters: {},
}
export default Tab