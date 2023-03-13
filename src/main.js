import Vue from 'vue'

//element-ui组件库
import ElementUI from 'element-ui';
// import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用element-ui
Vue.use(ElementUI);
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);

//路由
import router from './router';

//引入vuex
import store from './store';

//APP组件
import App from './App.vue';

//引入mock
import './api/mock'

//引入api
import * as Api from './api/index'

//引入echarts
import * as ECharts from 'echarts';

// 全局组件
//标签
import tag from '@/components/Tag/Tag.vue'
Vue.component("Tag", tag)

//获取session
import { getSession } from './utils/session';

//适配
// import 'amfe-flexible';


new Vue({
  el: '#app',
  router,
  store,
  created() {
    if(getSession("menuList")){
      this.$store.dispatch("Tab/setMenu",getSession("menuList"))
    }else{
      this.$store.dispatch("Tab/setMenu",[])
    }
    
  },
  beforeMount() {
    Vue.prototype.$Api = Api
    Vue.prototype.ECharts = ECharts
  },
  render: h => h(App)
});