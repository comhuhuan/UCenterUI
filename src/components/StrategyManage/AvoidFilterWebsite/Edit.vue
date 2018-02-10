<template lang="html">
    <section class="editPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
        <div class="editorForm">
            <el-form label-width="150px" :model="bodyFilter" ref="bodyFilter" :rules="bodyRules" class="commonForm" :loading="bodyLoading">
                <fieldset :class="{expand: isBodyExpand, active: isBodyActive}">
                    <legend @click="bodyLegendClick">
                        编辑主体
                        <span class="el-icon-caret-right"></span>
                    </legend>
                    <div class="" v-show="isBodyExpand">
                        <el-form-item v-if="bodyFilter.commandId" label="免过滤指令ID：" prop="commandId">
                            <el-input size="mini" v-model="bodyFilter.commandId" disabled></el-input>
                        </el-form-item>                        
                        <el-form-item label="免过滤名称：" prop="name">
                            <el-input size="mini" v-model="bodyFilter.name" placeholder="请输入免过滤名称"></el-input>
                        </el-form-item>
                        <el-form-item label="免过滤原因：" prop="memo">
                            <el-input size="mini" v-model="bodyFilter.memo" placeholder="请输入免过滤原因"></el-input>
                        </el-form-item>
                        <el-form-item label="过期时间：" prop="expiredTime">
    						<el-date-picker size="mini" v-model="bodyFilter.expiredTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.native="saveBodyHandle">确定</el-button>
                            <!-- <el-button type="primary" @click.native="resetForm('bodyFilter')">重置</el-button> -->
                            <!-- <el-button type="primary" @click.native="backHandle">返回</el-button> -->
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
                        <el-form-item label="下发范围：" prop="serviceCodes">
                            <el-select size="mini" multiple v-model="strategyFilter.serviceCodes" placeholder="请选择下发范围" filterable>
                                <el-option v-for="item in parentData.houseList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>                        
                        <el-form-item label="免过滤类型：" prop="type">
                            <el-radio-group v-model="strategyFilter.type" size="mini" >
                                <el-radio :label="1" :disabled="disabledType" >域名</el-radio>
                                <el-radio :label="2" :disabled="disabledType">IP</el-radio>
                            </el-radio-group>
                        </el-form-item>   
                        <el-form-item label="域名：" prop="content" v-if="strategyFilter.type === 1"
                            :rules="[
                                {required: strategyFilter.type === 1, message: '请输入正确的域名', pattern: domainReg, trigger: 'blur'},
                                {max: 128, message: '不能超过128个字符' }
                            ]"
                        >
                            <el-input size="mini" v-model="strategyFilter.content" placeholder="请输入域名"></el-input>
                        </el-form-item>
                        <el-form-item label="IP：" prop="content" v-if="strategyFilter.type === 2"
                            :rules="[
                                {required: strategyFilter.type === 2, message: '请输入IP地址' },
                                {validator: validateIp, trigger: 'blur'},
                                {max: 128, message: '不能超过128个字符' }
                            ]"
                        >
                            <el-tooltip effect="dark" content="IP的格式:192.168.*.*;IP段的格式:192.168.*.*-192.168.*.*" placement="top-start">
                                <el-input size="mini" v-model="strategyFilter.content" placeholder="请输入IP地址"></el-input>
                            </el-tooltip>
                        </el-form-item>                                                                  
                        <el-form-item label="匹配模式：" prop="matchModel" v-show="strategyFilter.type === 1"
                            :rules="[
                                {required: strategyFilter.type === 1 ,message: '请选择匹配模式 ', trigger: 'change'}
                            ]">
                            <el-radio-group v-model="strategyFilter.matchModel" size="mini">
                                <el-radio  v-for="item in matchModeList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                            </el-radio-group>                            
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.native="saveStrategyHandle">添加</el-button>
                            <!-- <el-button type="primary" @click.native="resetForm('strategyFilter')">重置</el-button> -->
                            <!-- <el-button type="primary" @click.native="backHandle">返回</el-button> -->
                        </el-form-item>
                        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight">
                            <el-table-column label="免过滤列表">
                                <el-table-column label="内容" prop="content"></el-table-column>
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
import { getInitEdit, getInitRule, save, saveRule, removeRule } from 'api/fufan/avoidFilterWebsite'
import { domainReg, ipRangeValidate} from 'constants/reg'
import tableMixin from '@/mixins/tableMixin'
import pageMixin from '@/mixins/pageMixin'
import formMixin from '@/mixins/formMixin'
import commonMixin from './commonMixin'
import PanelHead from 'components/Common/PanelHead'

export default {
    name: 'Edit',
    mixins: [tableMixin, pageMixin, formMixin, commonMixin],
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
                userId: this.$root.r_user_id,
                expiredTime: "",
                commandId: "",
                idcCommandId: "",
                memo: "",
                name: ""
            },
            bodyRules: {
                commandId: {required: true},
                name: {required: true, trigger: 'blur', message: '请输入免过滤名称'},
                memo: {required: false},
                expiredTime: {required: false}
            },
            domainReg,
            strategyFilter: {
                serviceCodes: '',
                matchModel: '',
                content: '',
                type: 2
            },
            strategyRules: { 
                serviceCodes: {required: true, message: '请选择下发范围', trigger: 'change'},
                type: {required: true}
            },
            removeFilters: {
                deleteIds: ''
            },
            isBodyExpand: true,
            isBodyActive: true,
            isStrategyExpand: false,
            isSaveBody: false,
            strategyLoading: false,
            bodyLoading: false,
            gap: 252,
            matchModeList: this.parentData.matchModeList,
            disabledType: false
        }
    },
    watch: {
      tableList(val) {
        if(val.length === 0){
            this.disabledType = false
        }else{
            this.disabledType = true
        }
      }
    },    
    created() {
        console.log(this.parentData)
        if(this.parentData.commandId) {
            this.bodyFilter.commandId = this.parentData.commandId
            this.disabledType = true
            this.getBodyData()
            this.getTableList()
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
        //获取主体基本信息
        getBodyData() {
            this.bodyLoading = true
            const params = {commandId: this.parentData.commandId,operationType: this.parentData.operationType}
            getInitEdit(params).then( res => {
                if( res.status === 'success' ) {
                    Object.assign(this.bodyFilter, res.message)
                    console.log(this.bodyFilter)
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
        //获取策略信息
        getTableList() {
            this.strategyLoading = true
            const params = {...this.pageFilters, commandId: this.bodyFilter.commandId}

            getInitRule(params).then( res => {
                if( res.status === 'success' ) {
                    const data = res.message

                    this.tableList = data.rules.rows
                    console.log(this.tableList)
                    this.total = data.rules.total
                    this.transMatchMode()
                    if(data.serviceCodes) {
                        this.strategyFilter.serviceCodes = data.serviceCodes.split(',')
                        console.log(this.strategyFilter.serviceCodes)
                    }
                    this.strategyFilter.type = data.type
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
        //主体区域点击
        bodyLegendClick() {
            if ( this.isSaveBody ) {
                this.isStrategyExpand = !this.isStrategyExpand
                this.isBodyActive = !this.isBodyActive
            }
            this.isBodyExpand = !this.isBodyExpand
        },
        //策略区域点击
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
        //主体内容提交
        saveBodyHandle() {
            this.validateHandle( 'bodyFilter', _ => {
                save(this.bodyFilter).then( res => {
                    const flag = res.status === 'success'
                    const msg = `${this.parentData.name}主体成功`
                    this.$message({
                        showClose: true,
                        message: flag ? msg : res.message,
                        type: flag ? 'success' : 'error'
                    })

                    if(flag) {
                        this.isSaveBody = true
                        this.isStrategyExpand = !this.isStrategyExpand
                        this.isBodyExpand = !this.isBodyExpand
                        this.isBodyActive = false
                        if(!this.bodyFilter.commandId){
                            this.bodyFilter.commandId = res.message.commandId
                        }
                    }
                }).catch( err => {
                    console.log(err)
                    this.formLoading = false
                })
            })
            // {...this.bodyFilter, {}}
        },
        //策略内容添加
        saveStrategyHandle() {
            this.validateHandle( 'strategyFilter', _ => {
                const params = {
                    rule: {
                        commandId: this.bodyFilter.commandId,
                        matchModel: this.strategyFilter.matchModel,
                        content: this.strategyFilter.content
                    },
                    serviceCodes: this.strategyFilter.serviceCodes.join(','),
                    type: this.strategyFilter.type  
                }
                saveRule(params).then( res => {
                    const flag = res.status === 'success'

                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '新增策略成功' : res.message,
                        showClose: true,
                    })
                    if( flag ) {
                        this.getTableList()
                    }
                }).catch( err => {
                    console.log(err)
                    this.tableLoading = false
                })
            })
        },
        //删除策略
        delHandle(index, row) {
            // console.log(row)
            this.$confirm('请确认是否删除此IP地址段信息吗？', '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = row ? { deleteIds: row.ipId } : this.removeFilters
                this.tableLoading = true

                removeRule(params).then( res => {
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！',
                    showClose: true
                })
            })
        },
        //编辑策略
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
