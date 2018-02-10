<template lang="html">
    <section class="editPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:void(0);" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
        <div class="editorForm">
            <el-form label-width="150px" :model="bodyFilter" ref="bodyFilter" :rules="bodyRules" class="commonForm" :loading="bodyLoading">
                <fieldset :class="{expand: isBodyExpand, active: isBodyActive}">
                    <!-- <legend>机房区域</legend> -->
                    <legend @click="bodyLegendClick">
                        编辑主体
                        <span class="el-icon-caret-right"></span>
                    </legend>
                    <div class="" v-show="isBodyExpand">
                        <el-form-item label="违法网站名称：" prop="name">
                            <el-input size="mini" v-model="bodyFilter.name" placeholder="请输入违法网站名称"></el-input>
                        </el-form-item>
                        <el-form-item label="违法网站原因：" prop="memo">
                            <el-input size="mini" v-model="bodyFilter.memo" placeholder="请输入违法网站原因"></el-input>
                        </el-form-item>
                        <el-form-item label="违法违规情况：" prop="illegalType">
                            <el-select size="mini" v-model="bodyFilter.illegalType" placeholder="请选择违法违规情况">
                                <el-option v-for="item in parentData.illegalTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="过期时间：" prop="expiredTime">
                            <el-date-picker size="mini" v-model="bodyFilter.expiredTime" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveBodyHandle">确定</el-button>
                        </el-form-item>
                    </div>
                </fieldset>
            </el-form>
            <el-form label-width="150px" :model="strategyFilter" ref="strategyFilter" :rules="strategyRules" class="commonForm" :loading="strategyLoading">
                <fieldset :class="{expand: isStrategyExpand, active: !isBodyActive, disabled: !isSaveBody}">
                    <legend @click="strategyLegendClick">
                        编辑策略
                        <span class="el-icon-caret-right"></span>
                    </legend>
                    <div class="" v-show="isStrategyExpand">
                        <el-form-item label="下发范围：" prop="serviceCodes"
                            :rules="{required: true, message: '请选择下发范围', trigger: 'change'}"
                        >
                            <el-select size="mini" multiple v-model="strategyFilter.serviceCodes" placeholder="请选择下发范围">
                                <el-option v-for="item in parentData.serviceCodeList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="违法网站类型：" prop="type"
                            :rules="[
                                {required: true, message: '请选择违法网站类型', trigger: 'change'},
                            ]"
                        >
                            <el-radio-group v-model="strategyFilter.type" size="mini" :disabled="rulesDiabled">
                                <el-radio-button label="域名"></el-radio-button>
                                <el-radio-button label="IP"></el-radio-button>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="违法网站内容：" prop="content" v-if="strategyFilter.type=='域名'"
                                      :rules="[
                                {required: true, message: '请输入正确的域名', pattern: domainReg, trigger: 'blur'},
                            ]"
                        >
                            <el-input type="textarea" :rows="2" size="mini" v-model="strategyFilter.content" placeholder="请输入域名"></el-input>
                        </el-form-item>
                        <el-form-item label="匹配模式：" prop="matchModel" v-if="strategyFilter.type=='域名'"
                                      :rules="{required: true, message: '请选择匹配模式'}"
                        >
                            <el-radio-group v-model="strategyFilter.matchModel" size="mini">
                                <el-radio-button v-for="item in parentData.matchModelList" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="违法网站内容：" prop="content" v-if="strategyFilter.type=='IP'"
                                      :rules="[
                                {required: true, message: '请输入正确的IP', pattern: ipRangeValidate, trigger: 'blur'},
                                {validator: validateIp, trigger: 'blur'}
                            ]"
                        >
                            <el-input type="textarea" :rows="2"  size="mini" v-model="strategyFilter.content" placeholder="请输入IP"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveStrategyHandle">添加</el-button>
                        </el-form-item>

                        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight">
                            <el-table-column label="过滤指令列表">
                                <el-table-column label="违法违规内容" prop="content"></el-table-column>
                                <el-table-column label="匹配模式" prop="matchModel"></el-table-column>
                                <el-table-column label="操作" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click.native="delHandle(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                        <div class="bottom-operate">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="pageFilters.pageIndex"
                                :page-size="pageFilters.pageSize"
                                :page-sizes="pageSizes"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </fieldset>
            </el-form>
        </div>
    </section>
</template>

<script>
import { getInitRule, removeRule, save, saveRule, getInitEdit } from 'api/dxq/illWebsite'
import { domainReg, ipRangeValidate } from 'constants/reg'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import formMixin from '@/mixins/formMixin'
import PanelHead from 'components/Common/PanelHead'

export default {
    name: 'Edit',
    mixins: [tableMixin, pageMixin, formMixin],
    props: {
        parentData: {
            type: Object,
            default: {}
        }
    },
    components: {
        PanelHead
    },
    data() {
        return {
            tableList: [],
            tableLoading: false,
            panelOpt: {
                title: this.parentData.name,
                hasIcon: true
            },
            bodyFilter: {
                name: "",
                memo: "",
                illegalType: "",
                expiredTime: "",
                userId: this.$root.r_user_id,
            },
            bodyRules: {
                name: {required: true, trigger: 'blur', message: '请输入违法网站名称'},
                illegalType: {required: true, trigger: 'blur', message: '请选择违法违规情况'},
                expiredTime: {required: false, trigger: 'blur'},
                memo: {required: false, trigger: 'blur',},
            },
            domainReg,
            ipRangeValidate,
            strategyFilter: {
                serviceCodes: '',
                type:'域名',
                content:'',
                matchModel:'',
                commandId:'',
            },
            strategyRules: {

            },
            isBodyExpand: true,
            isBodyActive: true,
            isStrategyExpand: false,
            isSaveBody: false,
            strategyLoading: false,
            bodyLoading: false,
            gap: 252,
            isInit: false,
            rulesDiabled: false,
            commandId: ''
        }
    },
    created() {
        const commandId = this.parentData.commandId
        if(commandId) {
            this.commandId = commandId
            this.isInit = true
            this.getBodyData()
            this.getStrategyData()
        }
    },

    methods: {
        validateIp(rule, value, callback) {
            const result = ipRangeValidate(value)
            if( typeof result === 'string') {
                return callback(result)
            }
            callback()
        },
        getBodyData() {
            this.bodyLoading = true
             const params = {
                 commandId: this.parentData.commandId,
                 operationType: this.parentData.operationType
             }
            getInitEdit(params).then( res => {
                if( res.status === 'success' ) {
                    this.bodyFilter = {...res.message}
                    this.isSaveBody = true
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.bodyLoading = false
            }).catch( err => {
                console.log(err)
                this.bodyLoading = false
            })
        },
        getStrategyData() {
            this.strategyLoading = true
            const params = {...this.pageFilters, commandId: this.parentData.commandId}

            getInitRule(params).then( res => {
                if( res.status === 'success' ) {
                    const data = res.message

                    this.tableList = data.rules.rows
                    this.total = data.rules.total

                    this.rulesDiabled = true   //标志哪些是不能修改的

                    if(data.type) {
                        this.strategyFilter.type = data.type
                    }
                    if(data.serviceCodes) {
                        this.strategyFilter.serviceCodes = data.serviceCodes.split(',')
                    }
                    //如果是修改进来
                    if(this.isInit) {
                        const rules = this.tableList[0]
                        console.log(rules)
                        if(rules) {
                            this.strategyFilter.content = rules.content
                            this.strategyFilter.matchModel = rules.matchModel
                        }
                        this.init = false
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.strategyLoading = false
            }).catch( err => {
                console.log(err)
                this.strategyLoading = false
            })
        },
        bodyLegendClick() {
            if ( this.isSaveBody ) {
                this.isStrategyExpand = !this.isStrategyExpand
                this.isBodyActive = !this.isBodyActive
            }
            this.isBodyExpand = !this.isBodyExpand
        },
        strategyLegendClick() {
            if ( this.isSaveBody ) {
                this.isStrategyExpand = !this.isStrategyExpand
                this.isBodyExpand = !this.isBodyExpand
                this.isBodyActive = !this.isBodyActive
            } else {
                this.$message({
                    showClose: true,
                    message: '请先完成主体信息的填写',
                    type: 'warning'
                })
            }
        },
        saveBodyHandle() {
            this.validateHandle( 'bodyFilter', _ => {
                save(this.bodyFilter).then( res => {
                    // console.log(res)
                    const flag = res.status === 'success'
                    const msg = `${this.parentData.name}主体成功`
                    this.$message({
                        showClose: true,
                        message: flag ? msg : res.message,
                        type: flag ? 'success' : 'error'
                    })

                    if(flag) {
                        this.commandId = res.message.commandId // 新增或修改成功后，获取commandId
                        this.isSaveBody = true
                        this.isStrategyExpand = !this.isStrategyExpand
                        this.isBodyExpand = !this.isBodyExpand
                        this.isBodyActive = false
                    }
                }).catch( err => {
                    console.log(err)
                    this.formLoading = false
                })
            })
            // {...this.bodyFilter, {}}
        },
        saveStrategyHandle() {
            console.log(this.strategyFilter)
            this.validateHandle('strategyFilter', _ => {
                console.log(this.strategyFilter)
                const params = {
                    serviceCodes: this.strategyFilter.serviceCodes,
                    type: this.strategyFilter.type,
                    rule: {
                        commandId: this.commandId,
                        content: this.strategyFilter.content,
                        matchModel: this.strategyFilter.matchModel,
                    }
                }
                this.tableLoading = true
                saveRule(params).then( res => {
                    const flag = res.status === 'success'

                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '新增策略成功' : res.message,
                        showClose: true,
                    })
                    if( flag ) {
                        this.getStrategyData()
                    }
                    this.tableLoading = false
                }).catch( err => {
                    console.log(err)
                    this.tableLoading = false
                })
            })
        },
        delHandle(index, row) {
             console.log(row)
            this.$confirm('请确认是否删除此信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = {
                    rule: {
                        commandId: row.commandId,
                        content: row.content,
                        matchModel: row.matchModel,
                    }
                }
                this.tableLoading = true
                removeRule(params).then( res => {
                    const flag = res.status === 'success'
                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '删除成功' : res.message,
                        showClose: true,
                    })
                    if( flag ) {
                        this.getStrategyData()
                    }
                    this.tableLoading = false
                }).catch( err => {
                    console.log(err)
                    this.tableLoading = false
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！',
                    showClose: true
                })
            })
        },
        editHandle(index, row) {

        },
        backHandle() {
            this.$emit('removeTab', this.parentData.name)
        }
    }
}
</script>

<style lang="less">
    .editPage {
        // height: 100%;
        max-height: 100%;
        overflow: auto;
        margin-top: -10px;
        // background-color: #f5f7fa;
        // padding-bottom: 10px;
        .editorForm {
            // max-height: calc(~'100% - 41px');
            // overflow: auto;
            .commonForm {
                margin: 10px ;
            }

        }

    }
</style>
