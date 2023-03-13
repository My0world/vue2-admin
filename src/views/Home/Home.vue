<template>
    <div class="Home">
        <el-row :gutter="30" style="margin-bottom: 20px;">

            <el-col :span="24">
                <Tag></Tag>
            </el-col>

        </el-row>
        <el-row :gutter="30">
            <el-col :span="7">
                <el-card shadow="hover" style="height: 253px;">
                    <div class="user">
                        <el-image :src="require('@/assets/user.jpg')" class="userIcon" fit="contain"></el-image>
                        <div class="userInfo">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <hr style="color: #999999">
                    <div class="login-info">
                        <p>
                            上次登录的时间：<span>2017-07-19</span>
                        </p>
                        <p>
                            上次登录的地点：<span>广东</span>
                        </p>
                    </div>
                </el-card>
                <el-card shadow="hover" style="margin-top: 20px; height: 489px;">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column v-for="(key, value) in tableLable" :key="key" :prop="value" :label="key"
                            width="width" align="center">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="17">
                <div class="num">
                    <el-card shadow="hover" v-for="(i, index) in countData" :key="index">
                        <div class="icon" :style="{ background: i.color }">
                            <i :class="`el-icon-${i.icon}`"></i>
                        </div>
                        <div class="detail">
                            <p>￥ <span>{{ i.value }}</span></p>
                            <p>{{ i.name }}</p>
                        </div>
                    </el-card>
                </div>
                <el-card shadow="hover" style="height: 280px ;margin-bottom: 20px;">
                    <div ref="line" style="height: 100%; width: 100%;">

                    </div>
                </el-card>
                <div class="graph">
                    <el-card shadow="hover" style="width: 49%; height: 260px;">
                        <div ref="bar" style="height: 100%; width: 100%;">

                        </div>
                    </el-card>
                    <el-card shadow="hover" style="width: 49%; height: 260px;">
                        <div ref="pie" style="height: 100%; width: 100%;">

                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>

import { mapState } from 'vuex'
export default {
    name: "Home",
    components: {},
    data() {
        return {

            tableData: [],
            orderData: {},
            userData: [],
            videoData: [],
            tableLable: {
                name: "品牌",
                todayBuy: "今日卖出",
                monthBuy: "当月卖出",
                totalBuy: "总卖出"
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        }
    },
    computed: {
        ...mapState('Tab', ["tabsList"])
    },

    methods: {
        //获取数据
        getData() {
            this.$Api.getData().then(({ data }) => {
                if (data.code != 200) {
                    return Promise.reject("出现异常，请通知管理员")
                } else {
                    this.tableData = data.data.tableData
                    this.orderData = data.data.orderData
                    this.userData = data.data.userData
                    this.videoData = data.data.videoData
                    this.drawLine()
                    this.drawBar()
                    this.drawPie()
                }
            }, () => {
                return Promise.reject("出现异常，请通知管理员")
            }).catch((e) => {
                this.$message.error(e)
            })
        },
        //绘制折线图
        drawLine() {
            //获取节点
            let myChart = this.ECharts.init(this.$refs.line)
            let setChart = {}
            //处理数据,和配置
            let xAxis = Object.keys(this.orderData.data[0])
            setChart.xAxis = {
                data: xAxis
            }
            setChart.yAxis = {
                max: function (value) {
                    return value.max + 1000
                }
            }
            setChart.legend = {
                data: xAxis
            }
            setChart.series = []
            xAxis.forEach(key => {
                setChart.series.push({
                    name: key,
                    data: this.orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            myChart.setOption(setChart)

        },
        //绘制柱状图
        drawBar() {
            //获取节点
            let myChart = this.ECharts.init(this.$refs.bar)
            //配置
            myChart.setOption({
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: this.userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        max: function (value) {
                            return value.max + 200
                        }
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: "新增用户",
                        data: this.userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: "活跃用户",
                        data: this.userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            })
        },
        //绘制饼状图
        drawPie() {
            let myChart = this.ECharts.init(this.$refs.pie)
            myChart.setOption(
                {
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [
                        {
                            data: this.videoData,
                            type: "pie"
                        }
                    ],
                }
            )
        }
    },

    mounted() {
        this.getData()

        this.$store.dispatch("Tab/selectMenu", {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
        })
    }
}
</script>


<style lang="less" scoped>
.Home {
    .user {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .userIcon {
            width: 125px;
            height: 125px;
            border-radius: 50%;

        }

        .userInfo {
            margin-left: 35px;

            .name {
                font-size: 32px;
                margin-bottom: 10px;

            }

            .access {
                color: #999999;

            }
        }
    }

    .login-info {
        margin-top: 10px;

        p {
            line-height: 28px;
            color: #999999;
            font-size: 14px;

            span {
                margin-left: 20px;
            }

        }
    }

    .num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
            cursor: pointer;

            ::v-deep .el-card__body {
                width: 100%;
                height: 80px;
                padding: 0;
                display: flex;

                .icon {
                    width: 80px;
                    height: 80px;
                    font-size: 30px;
                    text-align: center;
                    line-height: 80px;
                    color: white;
                }

                .detail {
                    margin-left: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    p:nth-of-type(1) {
                        font-size: 25px;
                        margin-bottom: 10px;
                        height: 30px;
                        line-height: 30px;
                    }

                    p:nth-of-type(2) {
                        font-size: 14px;
                        color: #999999;
                    }
                }
            }
        }


    }

    ::v-deep .el-card__body {
        padding: 10px 20px;
        height: 100%;
    }

    .graph {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 260px;
    }
}
</style>

