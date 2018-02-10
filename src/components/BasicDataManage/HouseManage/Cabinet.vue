<template lang="html">
    <section class="cabinet-page">
        <PanelHead :options="panelOpt">
            <div slot="btnGroup">
                <el-button type="primary" size="mini" @click.native="editHandle"><i class="icon iconfont icon-xinzeng2"></i>&nbsp;新增</el-button>
            </div>
        </PanelHead>
        <!--
            <li><span class="label">ID：</span><span class="content">{{cabinetList.cabId}}</span></li>
            <li><span class="label">机柜名称：</span><span class="content">{{cabinetList.cabName}}</span></li>
            <li><span class="label">机柜编号：</span><span class="content">{{cabinetList.cabCode}}</span></li>
            <li><span class="label">机柜位置：</span><span class="content">{{cabinetList.cabLocation}}</span></li>
            <li><span class="label">使用类型：</span><span class="content">{{cabinetList.cabUseType}}</span></li>
            <li>
                <span class="label">分配状态：</span>
                <span class="content" v-if="cabinetList.cabAssignStatus || cabinetList.cabAssignStatus === 0">
                    {{cabinetList.cabAssignStatus === 0 ? '已分配' : '未分配' }}
                </span>
            </li>
            <li>
                <span class="label">占用状态：</span>
                <span class="content" v-if="cabinetList.cabOccupyStatus || cabinetList.cabOccupyStatus === 0">
                    {{cabinetList.cabOccupyStatus === 0 ? '已占用' : '未占用' }}
                </span>
            </li>
        -->
        <div class="options">
            <el-input placeholder="请输入机柜ID或机柜名称搜索" v-model="query" size="mini">
                <el-button slot="append" icon="el-icon-search" @click.native="getTableList"></el-button>
            </el-input>
        </div>
        <div class="notic">
            <ul>
                <li>说明：</li>
                <li><span class="bg-success"></span> -- 已占用</li>
                <li><span class="bg-info"></span> -- 未占用</li>
                <li><span class="bg-blue"></span> -- 租用</li>
                <li><span class="bg-warning"></span> -- 自建</li>
            </ul>
        </div>
        <div class="container">
            <div class="cabinet" v-for="(cabinet, index) in tableList" :key="cabinet.cabId" :class="{'is-occupy': cabinet.cabOccupyStatus === 0, 'left-pad': index % 3 === 0}" >
                <div class="wrapper">
                    <div class="header">
                        <div class="operate">
                            <span title="编辑" class="icon iconfont icon-xiugai1" @click="editHandle(index, cabinet)"></span>
                            <span title="删除" class="icon iconfont icon-shanchu" @click="delHandle(index, cabinet)"></span>
                        </div>
                        <span class="use-type" :class="cabinet.cabUseType === 0 ? 'bg-blue' : 'bg-warning'">{{cabinet.cabUseType === 0 ? '租' : '自'}}</span>
                    </div>
                    <div class="img left">
                        <i class="icon iconfont icon-cabinet"></i>
                        <div class="assign-status">{{cabinet.cabAssignStatus === 0 ? '已分配' : '未分配'}}</div>
                    </div>
                    <div class="content left">
                        <ul>
                            <li :title="cabinet.cabId"><span class="label">ID：</span><span class="value">{{cabinet.cabId}}</span></li>
                            <li :title="cabinet.cabName"><span class="label">名称：</span><span class="value">{{cabinet.cabName}}</span></li>
                            <li :title="cabinet.cabCode"><span class="label">编号：</span><span class="value">{{cabinet.cabCode}}</span></li>
                            <li :title="cabinet.cabLocation"><span class="label">位置：</span><span class="value">{{cabinet.cabLocation}}</span></li>
                        </ul>
                    </div>
                    <span class="assign"></span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getCabinetList, removeCabinet } from 'api/gjg/houseManage'
import PanelHead from 'components/Common/PanelHead'
import { mapMutations } from 'vuex'

export default {
    name: 'Cabinet',
    props: {
        params: {
            type: Object,
            default: {}
        }
    },
    components: {
        PanelHead
    },
    data() {
        const expandsKey = 'ipId'
        return {
            tableList: [],
            isLoading: false,
            panelOpt: {
                title: '机柜列表'
            },
            query: '',
            cabinetList: {},
            removeFilters: {
                deleteIds: ''
            }
        }
    },
    created() {
        this.getTableList()
    },
    methods: {
        ...mapMutations({
            setCurEditor: 'SET_CUR_HOUSE_EDITOR'
        }),
        getTableList() {
            this.isLoading = true
            getCabinetList(this.params).then( res => {
                if( res.status === 'success' ) {
                    this.tableList = res.message.rows
                    console.log(this.tableList)
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.isLoading = false
            }).catch( err => {
                console.log(err)
                this.isLoading = false
            })
        },
        delHandle(index, data) {
            this.$confirm('请确认是否删除此机柜信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableLoading = true
                // console.log(this.removeFilters)
                const params = data ? { deleteIds: data.cabId } : this.removeFilters
                removeCabinet(params).then( res => {
                    const flag = res.status === 'success'
                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '删除成功' : res.message,
                        // message: res.message,
                        showClose: true,
                    })
                    if( flag ) {
                        this.getTableList()
                    }
                    this.tableLoading = false
                }).catch( err => {
                    console.log(err)
                    this.tableLoading = false
                })
            }).catch( _ => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！',
                    showClose: true
                })
            })
        },
        editHandle(index, data) {
            if(data) {
                this.setCurEditor({
                    type: 'modify',
                    subject: 'area',
                    data,
                    // isCabinetModify: true
                })
            } else {
                this.setCurEditor({
                    type: 'add',
                    subject: 'area',
                    // data: this.params,
                    // isCabinetModify: true
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .cabinet-page {
        height: 100%;
        min-width: 520px;
        @success: #67c23a;
        @info: #909399;
        @warning: #E6A23C;
        @blue: #409EFF;
        span {
            display: inline-block;
            vertical-align: middle;
        }
        .bg-success {
            background-color: @success;
        }
        .bg-info {
            background-color: @info;
        }
        .bg-warning {
            background-color: @warning;
            opacity: 0.7;
        }
        .bg-blue {
            background-color: @blue;
            opacity: 0.7;
        }
        .options {
            .el-input {
                margin-top: 10px;
                width: 285px;
            }
        }
        .notic {
            margin-top: 10px;
            background-color: #F2FFEA;
            border: 1px solid #ededed;
            padding: 5px;
            // margin-left: 10px;
            li {
                display: inline-block;
                &:not(:first-child) {
                    padding-right: 5px;
                }
            }
            span {
                width: 18px;
                height: 12px;
                border-radius: 2px;
            }

        }
        .container {
            max-height: calc(~'100% - 41px');
            // margin-top: 10px;
            overflow: auto;

            .cabinet {
                float: left;
                width: 33.33%;
                padding-top: 10px;
                box-sizing: border-box;

                &:not(.left-pad) {
                    padding-left: 10px;
                }
                /*.left-pad {
                    padding-left: 0px;
                }*/
                .wrapper {
                    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                    border-radius: 4px;
                    // border: 1px solid @info;
                    border: 1px solid #ddd;
                    background-color: #fff;
                    padding: 10px;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    &:hover {
                        background-color: #ececec;
                        .img {
                            border-color: #ddd;
                        }
                    }
                }
                .header {
                    height: 16px;
                    .operate {
                        position: absolute;
                        right: 2px;
                        top: 0px;
                        .icon {
                            cursor: pointer;
                            color: #aaa;
                            margin-right: 3px;

                            // padding: 2px;
                            &:hover {
                                color: #333;
                            }
                        }
                    }
                    .use-type {
                        height: 16px;
                        width: 24px;
                        text-align: center;
                        // padding: 1px 5px;
                        // background-color: @success;
                        color: #fff;
                        border-radius: 3px;
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        opacity: 0.7;
                    }
                }
                .img {
                    padding-right: 10px;
                    margin-right: 10px;
                    border-right: 1px solid #eaeaea;
                    .icon {
                        font-size: 50px;
                        color: @info;
                    }
                    .assign-status {
                        text-align: center;
                        margin-top: -9px;
                    }
                }
                .content {
                    width: calc(~'100% - 71px');
                    padding: 2px 0;
                    li {
                        padding: 1px;
                    }
                    .label {
                        width: 36px;
                        text-align: right;
                        color: #58666e;
                    }
                    .value {
                        width: calc(~'100% - 36px');
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        color: #333;
                    }
                }

                &.is-occupy {
                    .wrapper {
                        border-color: @success;
                        .img {
                            .icon {
                                color: @success;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
