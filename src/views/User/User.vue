<template>
    <div class="User">
        <!-- 添加用户的表单 -->
        <!--  -->
        <el-dialog :title="modalType == 0 ? '新增用户' : '更新用户'" :visible.sync="dialogVisible" width="37%"
            :before-close="close">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px" :inline="true">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="form.name" style="width: 217px;"></el-input>
                </el-form-item>
                <el-form-item label="年龄：" prop="age">
                    <el-input v-model="form.age" style="width: 217px;"></el-input>
                </el-form-item>

                <el-form-item label="性别：" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1">男</el-option>
                        <el-option label="女" :value="0">女</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期：" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址：" prop="addr">
                    <el-input v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 面包屑和搜索框 -->
        <el-row :gutter="30" class="header">
            <el-col :span="20">
                <Tag></Tag>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 新增用户 -->
        <el-row :gutter="30" style="margin-bottom: 20px;">
            <el-col :span="24">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">
                    新增
                </el-button>
            </el-col>
        </el-row>
        <!-- 数据展示 -->
        <el-table :data="userList" height="685px" style="width: 100%" border stripe>
            <el-table-column prop="name" label="姓名" width="200" align="center">
            </el-table-column>
            <el-table-column label="性别" width="100" align="center">
                <template slot-scope="{row}">
                    <span>
                        {{ row.sex === 1 ? '男' : '女' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100" align="center">
            </el-table-column>
            <el-table-column prop="birth" label="出生日期" width="200" align="center">
            </el-table-column>
            <el-table-column prop="addr" label="地址" width="width">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="{row}">
                    <el-button type="warning" size="mini" @click="handleEdit(row)" icon="el-icon-edit" title="修改">
                    </el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(row)" icon="el-icon-delete" title="删除">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div style="margin-top: 20px; text-align: center;">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pageData.limit"
                :current-page="pageData.page" @current-change="handlePage">
            </el-pagination>
        </div>
    </div>
</template>


<script>
export default {
    name: "User",
    components: {},
    data() {
        return {
            dialogVisible: false,//对话框的显示与隐藏
            //表单数据
            form: {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: ""
            },
            //校验规则
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                age: [
                    { required: true, message: "请输入年龄", trigger: "blur" }
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "blur" }
                ],
                birth: [
                    { required: true, message: "请选择出生日期", trigger: "blur" }
                ],
                addr: [
                    { required: false }
                ]
            },
            //用户列表
            userList: [],
            //场景 0是新增 1是更新
            modalType: 0,
            //总条数
            total: 0,
            //页码相关数据
            pageData: {
                page: 1,
                limit: 12
            },
            //搜索关键字
            searchKey: ""
        }
    },

    methods: {

        //提交用户信息
        submit() {
            this.$refs.form.validate((valid) => {
                //校验成功
                if (valid) {
                    if (this.modalType == 0) {
                        this.createUser()
                        this.getUserList()
                    } else {
                        this.updateUser()
                        this.getUserList()
                    }
                    //关闭对话框
                    this.close()
                } else {
                    //校验不成功
                    this.$message.error("异常，请仔细检查填写的内容")
                    return false
                }
            })
        },


        //对话框关闭
        close() {
            this.dialogVisible = false
            this.form = {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: ""
            }
        },

        //获取用户列表
        async getUserList() {
            const { pageData } = this
            let res = await this.$Api.reqUserList({ ...pageData, name: this.searchKey })
            if (res.data.code === 200) {
                this.userList = res.data.list
                this.total = res.data.count
            } else {
                this.$message.error("获取用户列表异常，请通知管理员")
            }
        },

        //更新用户
        async updateUser() {
            let res = await this.$Api.reqUpdateUser(this.form)
            if (res.data.code === 200) {
                this.$message.success("修改成功")
            } else {
                this.$message.error("修改用户数据异常，请通知管理员")
            }
        },

        //更新用户
        async createUser() {
            let res = await this.$Api.reqCreateUser(this.form)
            if (res.data.code === 200) {
                this.$message.success("添加成功")
            } else {
                this.$message.error("添加用户异常，请通知管理员")
            }
        },

        //删除用户
        async deleteUser(id) {
            let res = await this.$Api.reqDeleteUser({ id })
            if (res.data.code === 200) {
                this.$message.success("删除成功")
                this.getUserList()
            } else {
                this.$message.error("删除用户异常，请通知管理员")
            }
        },

        //添加用户信息
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },

        //修改用户信息
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            //this.form = row 赋值的是地址
            //需要进行深拷贝
            this.form = { ...row }
        },

        //删除用户
        handleDelete(row) {
            this.$confirm('', '确认删除该用户吗', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteUser(row.id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //切换页码
        handlePage(pageNo) {
            this.pageData.page = pageNo
            this.getUserList()
        },

        //搜索
        search() {
            this.pageData = {
                page: 1,
                limit: 12
            }
            this.getUserList()

        }
    },
    mounted() {
        //获取用户列表
        this.getUserList()
    }
}
</script>


<style lang="less" scoped>
.User {
    .header {
        margin-bottom: 20px;
        height: 40px;
        display: flex;
        align-items: center;

        ::v-deep .el-input__inner {
            transform: translateX(3px);
        }
    }

    ::v-deep .el-input__inner {
        width: 217px;
    }
}
</style>

