<template>
    <div class="layout">
        <el-container>
            <el-aside width="auto">
                <CommonAside></CommonAside>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader></CommonHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>


<script>
import CommonAside from './CommonAside/CommonAside';
import CommonHeader from './CommonHeader/CommonHeader';
export default {
    name: "layout",
    components: {
        CommonAside,
        CommonHeader
    },
    data() {
        return {}
    },

    methods: {}
}
</script>


<style lang="less" scoped>
.layout {
    .el-header{
        padding: 0;
    }
    .el-main{
        background: rgb(255, 254, 251);
    }
}
</style>

