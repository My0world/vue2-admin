<template>
    <div class="CommonHeader">
        <div class="container">
            <div class="l-content">
                <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="i in tabsList" :key="i.path" :to="{ path: i.path }">{{ i.label
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="r-content">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-image :src="require('@/assets/user.jpg')" class="userIcon" fit="contain"></el-image>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>


<script>
import { clearSession } from '@/utils/session'
import Cookie from 'js-cookie'
import { mapState } from 'vuex';

// 引入VueRouter
import VueRouter from 'vue-router'
//引入路由
import routes from '@/router/routes'
export default {
    name: "CommonHeader",
    components: {},
    data() {
        return {}
    },
    computed: {
        ...mapState('Tab', ["tabsList", 'menuList'])
    },
    methods: {

        //菜单折叠
        handleMenu() {
            this.$store.dispatch("Tab/setCollapse")
        },

        //退出
        logout() {
            Cookie.remove("token")
            clearSession("menuList")
            clearSession("tabList")
            this.$router.matcher = new VueRouter({
                routes
            }).matcher
            this.$store.dispatch("Tab/clearState")
            this.$router.push({ path: "/login" })

        }
    },
    mounted() {
        // console.log(router);
    }
}
</script>


<style lang="less" scoped>
.CommonHeader {

    .container {
        height: 60px;
        padding: 0px 20px;
        background-color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .l-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                margin: 0 10px;
                color: #fff
            }

            ::v-deep .el-breadcrumb__item {
                .el-breadcrumb__inner {
                    &.is-link {
                        font-weight: normal;
                        color: white;
                    }
                }

                &:last-child {

                    .el-breadcrumb__inner {
                        font-weight: normal;
                        color: rgb(255, 208, 75);
                    }
                }
            }
        }

        .r-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .userIcon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid white;
            }

            .el-dropdown-link {
                cursor: pointer;
            }

            .el-icon-arrow-down {
                font-size: 12px;
            }
        }
    }
}
</style>

