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
                        <el-form-item label="监测名称：" prop="name">
                            <el-input size="mini" v-model="bodyFilter.name" placeholder="请输入监测名称"></el-input>
                        </el-form-item>
                        <el-form-item label="监测原因：" prop="reason">
                            <el-input size="mini" v-model="bodyFilter.reason" placeholder="请输入监测原因"></el-input>
                        </el-form-item>
                        <el-form-item label="过期时间：" prop="expiredTime">
    						<el-date-picker size="mini" v-model="bodyFilter.expiredTime" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="监测描述：" prop="memo">
                            <el-input size="mini" type="textarea" v-model="bodyFilter.memo" placeholder="请输入描述内容"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveBodyHandle">确定</el-button>
                            <!-- <el-button type="primary" @click="resetForm('bodyFilter')">重置</el-button> -->
                            <!-- <el-button type="primary" @click="backHandle">返回</el-button> -->
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
                        <el-form-item label="监测种类：" prop="rules"
                            :rules="[
                                {required: true, message: '请选择监测种类', trigger: 'change'},
                                {validator: validateRules}
                            ]"
                        >

                            <el-tooltip effect="dark" content="最多选择6种组合类型，其中源IP和目的IP不能同时勾选，源端口和目的端口不能同时勾选，且源端口或目的端口必须与传输层协议同时选择！" placement="top-start">
                                <el-select size="mini" multiple v-model="strategyFilter.rules" placeholder="请选择监测种类" :disabled="rulesDiabled">
                                    <el-option v-for="item in rulesList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="域名：" prop="domain" v-if="strategyFilter.rules.includes('domain')"
                            :rules="[
                                {required: strategyFilter.rules.includes('domain'), message: '请输入正确的域名', pattern: domainReg, trigger: 'blur'},
                                {validator: validateDomain, trigger: 'blur'}
                            ]"
                        >
                            <el-input size="mini" v-model="strategyFilter.domain" placeholder="请输入域名"></el-input>
                        </el-form-item>
                        <el-form-item label="URL：" prop="url" v-if="strategyFilter.rules.includes('url')"
                            :rules="[
                                {required: strategyFilter.rules.includes('url'), message: '请输入正确的URL', pattern: urlReg, trigger: 'blur'},
                                {validator: validateUrl, trigger: 'blur'}
                            ]"
                        >
                            <el-input size="mini" v-model="strategyFilter.url" placeholder="请输入URL"></el-input>
                        </el-form-item>
                        <el-form-item label="匹配模式：" prop="matchModel" v-if="strategyFilter.rules.includes('url')"
                            :rules="{required: strategyFilter.rules.includes('url'), message: '请选择匹配模式'}"
                        >
                            <el-radio-group v-model="strategyFilter.matchModel" size="mini">
                                <el-radio-button v-for="item in parentData.matchModelList" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="关键字：" prop="keyWord" v-if="strategyFilter.rules.includes('keyWord')"
                            :rules="{required: strategyFilter.rules.includes('keyWord'), message: '请输入关键字', trigger: 'blur'}"
                        >
                            <el-tooltip effect="dark" content="多关键词使用&分割，例如“法轮功&暴力”" placement="top-start">
                                <el-input size="mini" v-model="strategyFilter.keyWord" placeholder="请输入关键字"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="匹配范围：" prop="matchRange" v-if="strategyFilter.rules.includes('keyWord')"
                            :rules="{required: strategyFilter.rules.includes('keyWord'), message: '请选择匹配范围'}"
                        >
                            <el-radio-group v-model="strategyFilter.matchRange" size="mini">
                                <el-radio-button v-for="item in parentData.matchRangeList" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="源IP地址：" prop="sourceIp" v-if="strategyFilter.rules.includes('sourceIp')"
                            :rules="[
                                {required: strategyFilter.rules.includes('sourceIp'), message: '请输入源IP地址' },
                                {validator: validateIp, trigger: 'blur'}
                            ]"
                        >
                            <el-tooltip effect="dark" content="IP的格式:192.168.*.*;IP段的格式:192.168.*.*-192.168.*.*" placement="top-start">
                                <el-input size="mini" v-model="strategyFilter.sourceIp" placeholder="请输入源IP地址"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="目的IP地址：" prop="netIp" v-if="strategyFilter.rules.includes('netIp')"
                            :rules="[
                                {required: strategyFilter.rules.includes('sourceIp'), message: '请输入源IP地址' },
                                {validator: validateIp, trigger: 'blur'}
                            ]"
                        >
                            <el-tooltip effect="dark" content="IP的格式:192.168.*.*;IP段的格式:192.168.*.*-192.168.*.*" placement="top-start">
                                <el-input size="mini" v-model="strategyFilter.netIp" placeholder="请输入目的IP地址"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="源端口：" prop="sourcePort" v-if="strategyFilter.rules.includes('sourcePort')"
                            :rules="[
                                {required: strategyFilter.rules.includes('sourcePort'), message: '请输入源IP地址' },
                                {validator: validatePort, trigger: 'blur'}
                            ]"
                        >
                            <el-tooltip effect="dark" content="注:端口范围:1-65535; 端口的格式:**; 端口段的格式:**-**" placement="top-start">
                                <el-input size="mini" v-model="strategyFilter.sourcePort" placeholder="请输入源端口"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="目的端口：" prop="netPort" v-if="strategyFilter.rules.includes('netPort')"
                            :rules="[
                                {required: strategyFilter.rules.includes('netPort'), message: '请输入源IP地址' },
                                {validator: validatePort, trigger: 'blur'}
                            ]"
                        >
                            <el-tooltip effect="dark" content="注:端口范围:1-65535; 端口的格式:**; 端口段的格式:**-**" placement="top-start">
                                <el-input size="mini" v-model="strategyFilter.netPort" placeholder="请输入目的端口"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="传输层协议：" prop="protocol" v-if="strategyFilter.rules.includes('protocol')"
                            :rules="{required: strategyFilter.rules.includes('protocol'), message: '请选择传输层协议' }"
                        >
                            <el-radio-group v-model="strategyFilter.protocol" size="mini">
                                <el-radio :label="'1'">TCP协议</el-radio>
                                <el-radio :label="'2'">UDP协议</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveStrategyHandle">添加</el-button>
                            <!-- <el-button type="primary" @click="resetForm('strategyFilter')">重置</el-button> -->
                            <!-- <el-button type="primary" @click="backHandle">返回</el-button> -->
                        </el-form-item>
                        <el-table :data="tableList" border :loading="tableLoading" :max-height="tableMaxHeight">
                            <el-table-column label="监测指令列表">
                                <el-table-column label="域名" prop="domain"></el-table-column>
                                <el-table-column label="URL" prop="url"></el-table-column>
                                <el-table-column label="匹配模式" prop="matchModel"></el-table-column>
                                <el-table-column label="关键字" prop="keyWord"></el-table-column>
                                <el-table-column label="源IP" prop="sourceIp"></el-table-column>
                                <el-table-column label="目的IP" prop="netIp"></el-table-column>
                                <el-table-column label="源端口" prop="sourcePort"></el-table-column>
                                <el-table-column label="目的端口" prop="netPort"></el-table-column>
                                <el-table-column label="传输层协议" prop="protocol"></el-table-column>
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
import { getInitRule, removeRule, save, saveRule, getInitEdit } from 'api/gjg/infoMonitoring'
import { domainReg, urlReg, ipRangeValidate, portRangesValidate } from 'constants/reg'
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
                reason: "",
                expiredTime: "",
                memo: "",
            },
            bodyRules: {
                name: {required: true, trigger: 'blur', message: '请输入监测名称'},
                reason: {required: true, trigger: 'blur', message: '请输入监测原因'},
                expiredTime: {required: false, trigger: 'blur'},
                memo: {required: false, trigger: 'blur', message: '请输入描述信息'},
            },
            domainReg,
            urlReg,
            strategyFilter: {
                serviceCodes: '',
                matchRange: '0',
                matchModel: 'approx',
                rules: [],
                domain: '',
                url: '',
                keyWord: '',
                sourceIp: '',
                netIp: '',
                sourcePort: '',
                netPort: '',
                protocol: '1',
            },
            strategyRules: {

            },
            scopeList: null,
            rulesList: [
                {label: '域名', value: 'domain'},
                {label: 'URL', value: 'url'},
                {label: '关键字', value: 'keyWord'},
                {label: '源IP地址', value: 'sourceIp'},
                {label: '目的IP地址', value: 'netIp'},
                {label: '源端口', value: 'sourcePort'},
                {label: '目的端口', value: 'netPort'},
                {label: '传输层协议', value: 'protocol'},
            ],
            ipAddrQuery: '',
            hasSelected: false,
            selectedList: [],
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
            isInit: false,
            rulesDiabled: false,
            isValidatedUrl: false,
            isValidatedDomain: false,
            commandId: ''
        }
    },
    created() {
        const commandId = this.parentData.commandId
        // console.log(this.parentData)
        if(commandId) {
            this.commandId = commandId
            this.isInit = true
            this.getBodyData()
            // this.getStrategyData()
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
        validatePort(rule, value, callback) {
            console.log(portRangesValidate(value))
            // portRangesValidate(value) ? callback() : callback('请输入正确的端口号')
            const result = portRangesValidate(value)
            if( typeof result === 'string') {
                return callback(result)
            }
            callback()
        },
        validateRules(rule, value, callback) {
            if(value.includes('sourceIp') && value.includes('netIp')) {
                return callback('源IP与目的IP不能同时选择')
            }
            if(value.includes('sourcePort') && value.includes('netPort')) {
                return callback('源端口与目的端口不能同时选择')
            }
            if(value.includes('sourcePort') && !value.includes('protocol')) {
                return callback('源端口必须与传输层协议同时选择')
            }
            if(value.includes('netPort') && !value.includes('protocol')) {
                return callback('目的端口必须与传输层协议同时选择')
            }
            if(value.includes('protocol') && !value.includes('netPort') && !value.includes('sourcePort')) {
                return callback('传输层协议必须与源端口或目的端口同时选择')
            }
            callback()
        },
        validateDomain(rule, value, callback) {
            if(this.strategyFilter.rules.includes('url')) {
                if(this.strategyFilter.url.indexOf(value) < 0) {
                    return callback('域名和URL不匹配')
                }
                if(this.isValidatedUrl) { // 如果URL已经验证 就不调用this.$refs.scheduleAttr.validateField('url')
                    this.isValidatedUrl = false
                    return callback()
                }
                this.isValidatedDomain = true
                this.$refs.strategyFilter.validateField('url')

            }
            callback()
        },
        validateUrl(rule, value, callback) {
            if(this.strategyFilter.rules.includes('domain')) {
                if(value.indexOf(this.strategyFilter.domain) < 0) {
                    return callback('域名和URL不匹配')
                }
                if(this.isValidatedDomain) { // 如果域名已经验证 就不调用this.$refs.scheduleAttr.validateField('domain')
                    this.isValidatedDomain = false
                    return callback()
                }
                this.isValidatedUrl = true
                this.$refs.strategyFilter.validateField('domain')
            }
            callback()
        },
        getBodyData() {
            this.bodyLoading = true
            // const params = {...this.pageFilters}
            getInitEdit({commandId: this.parentData.commandId}).then( res => {
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
        // getStrategyData() {
        getTableList() {
            this.strategyLoading = true
            const params = {...this.pageFilters, commandId: this.parentData.commandId}

            getInitRule(params).then( res => {
                if( res.status === 'success' ) {
                    const data = res.message

                    this.tableList = data.rules.rows
                    // console.log(this.tableList)
                    this.total = data.rules.total
                    this.rulesDiabled = true
                    if(this.tableList.length === 1) {
                        this.strategyFilter.matchRange = data.matchRange
                    }
                    if(data.serviceCodes) {
                        this.strategyFilter.serviceCodes = data.serviceCodes.split(',')
                    }
                    if(this.isInit) {
                        const rules = this.tableList[0]
                        if(rules) {
                            for(let rule in rules) {
                                if(rules[rule] && rule !== 'commandId' && rule !== 'matchModel') {
                                    this.strategyFilter.rules.push(rule)
                                }
                            }
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
                    matchRange: this.strategyFilter.matchRange,
                    serviceCodes: this.strategyFilter.serviceCodes,
                    rule: {
                        matchModel: this.strategyFilter.matchModel,
                        domain: this.strategyFilter.domain,
                        url: this.strategyFilter.url,
                        keyWord: this.strategyFilter.keyWord,
                        sourceIp: this.strategyFilter.sourceIp,
                        netIp: this.strategyFilter.netIp,
                        sourcePort: this.strategyFilter.sourcePort,
                        netPort: this.strategyFilter.netPort,
                        protocol: this.strategyFilter.protocol,
                        commandId: this.commandId
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
                        // this.getStrategyData()
                        this.getTableList()
                    }
                    this.tableLoading = false
                }).catch( err => {
                    console.log(err)
                    this.tableLoading = false
                })
            })
        },
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
                        // this.getStrategyData()
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
