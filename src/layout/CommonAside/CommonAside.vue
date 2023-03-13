<template>
    <div class="CommonAside">
        <!--   -->
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" @open="handleOpen"
            @close="handleClose" text-color="#fff" active-text-color="#ffd04b" :default-active="defaultPath">
            <h4 v-show="!isCollapse">通用后台管理</h4>
            <el-menu-item @click="clickMenu(i)" :index="i.path" v-for="i in noChildren" :key="i.name">
                <p style="overflow: hidden; width: 100%;">
                    <i :class="`el-icon-${i.icon}`"></i>
                    <span slot="title">{{ i.label }}</span>
                </p>

            </el-menu-item>
            <el-submenu :index="i.label" v-for="i in hasChildren" :key="i.label">
                <template slot="title">
                    <p style="overflow: hidden; width: 100%;">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </p>

                </template>
                <el-menu-item-group>
                    <el-menu-item :index="i2.path" @click="clickMenu(i2)" v-for="i2 in i.children" :key="i2.name">
                        {{ i2.label }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
    name: "CommonAside",
    components: {},
    data() {
        return {
            defaultPath: "home",
        };
    },
    computed: {
        ...mapState("Tab", ["isCollapse", "menuList"]),
        //没有子菜单
        noChildren() {
            return this.menuList.filter(item => !item.children)
        },
        //有子菜单
        hasChildren() {
            return this.menuList.filter(item => item.children)
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.defaultPath = this.$route.path.replace("/", "")
            }


        }
    },


    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //跳转
        clickMenu(item) {
            console.log(item.path);
            this.$router.push({ path: item.path })
            this.$store.dispatch("Tab/selectMenu", item)
        }
    },
    mounted() {

    },
}
</script>


<style lang="less" scoped>
.CommonAside {
    height: 100%;
    background: rgb(84, 92, 100);

    .el-menu {
        border: none;
        height: 100vh;

        h4 {
            text-align: center;
            line-height: 48px;
            color: #fff;
            font-weight: 400;
        }
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
}
</style>

