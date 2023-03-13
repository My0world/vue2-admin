<template>
    <div class="Tag">
        <el-tag v-for="(i, index) in tabsList" :key="i.path" :closable="index !== 0 ? true : false"
            :disable-transitions="false" :effect="$route.name === i.name ? 'dark' : 'plain'" style="margin-right: 10px;"
            @click="changeMenu(i)" @close="handleClose(i, index)">
            {{ i.label }}
        </el-tag>
    </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
    name: "Tag",
    components: {},
    data() {
        return {}
    },
    computed: {
        ...mapState("Tab", ["tabsList"])
    },
    methods: {
        // 点击tag跳转
        changeMenu(item) {
            this.$router.push({ path: item.path })
        },

        //点击tag的删除事件
        handleClose(item, index) {

            // 调用store的closeTag方法进行删除
            this.$store.dispatch("Tab/closeTag", item)
            // 删除之后的操作
            // 删除的标签不是当前的路由的名称
            if (item.name !== this.$route.name) {
                return
            }
            // 删除的是最后一项
            if (index === this.tabsList.length) {
                this.$router.push({ path: this.tabsList[index - 1].path })
            }else{
                this.$router.push({ path: this.tabsList[index].path })
            }
        }
    }
}
</script>


<style>
.Tag {}
</style>

