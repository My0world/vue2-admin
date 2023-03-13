// 引入Vue
import Vue from 'vue'

// 引入Vuex
import Vuex from 'vuex'

//使用Vuex插件
Vue.use(Vuex)

//引入配置文件
import Tab from './Tab'


//创建并暴露store
export default new Vuex.Store({
    modules: {
        //使用
        Tab
        
    }
})