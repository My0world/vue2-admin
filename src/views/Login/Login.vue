<template>
    <div class="Login">
        <div class="login-main">
            <h1 style="margin-top: 20px; font-size:20px">系统登录</h1>
            <el-form ref="form" :model="user" :rules="rules">
                <el-form-item label="用户名:" prop="username" label-width="80px">
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password" label-width="80px">
                    <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>

                <el-form-item style="text-align: center;">
                    <el-button type="primary" @click.prevent="submit" size="mini">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>


<script>
import Cookie from 'js-cookie'
import Mock from 'mockjs';
export default {
    name: "Login",
    components: {},
    data() {
        return {
            user: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        // // //token信息
        // // const token = Mock.Random.guid()
        // // //token信息存入cookie
        // // Cookie.set('token',token)
        // // 登录接口
        // this.$Api.reqMenu()
        // //跳转
        // this.$router.push({path:"/"})

        // 登录
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.getMenu()
                } else {
                    this.$message.error("请输入用户名和密码")
                }
            })
        },
        //用户登录获取菜单
        async getMenu() {
            let res = await this.$Api.reqMenu(this.user)
            //登录成功
            if (res.data.code == 200) {
                //使用随机数产生token
                const token = Mock.Random.guid()
                // token信息存入cookie
                Cookie.set('token', token)
                //保存接口传来的菜单数据
                this.$store.dispatch("Tab/setMenu",res.data.data.menu)
                //跳转
                this.$router.push({ path: "/" })
            } else {//登录失败
                this.$message.error(res.data.data.message)
            }
        }
    }
}
</script>


<style lang="less" scoped>
.Login {
    height: 100vh;
    background: lightblue;

    .login-main {
        position: absolute;
        z-index: 99;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 330px;
        height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background: white;
        background: linear-gradient(to right bottom, rgba(255, 255, 255, .7), rgba(255, 255, 255, .3));
        box-shadow: 5px 7px 20px rgba(0, 0, 0, .3);
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-right: none;
        border-bottom: none;
        border-radius: 10px;
    }

    ::v-deep .el-form-item__label:before {
        content: '' !important;
        margin-right: 0 !important;
    }
}
</style>

