<template lang="html">
    <section class="importTpl">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:void(0);" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
        <el-form label-width="120px" class="commonForm" :model="formFilter" :rules="formRules" ref="formFilter">
            <fieldset class="expand active">
                <legend>导入</legend>
                <el-form-item label="模板：" class="tpl">
                    <a href="static/template/机房信息.xls">下载模板</a>
                </el-form-item>
                <el-form-item label="过滤名称：" prop="name" :rules="{required: true, trigger: 'blur', message: '请输入过滤名称'}">
                    <el-input size="mini" v-model="formFilter.name" placeholder="请输入过滤名称"></el-input>
                </el-form-item>
                <el-form-item label="过滤原因：" prop="reason" :rules="{required: true, trigger: 'blur', message: '请输入过滤原因'}">
                    <el-input size="mini" v-model="formFilter.reason" placeholder="请输入过滤原因"></el-input>
                </el-form-item>
                <el-form-item label="过期时间：" prop="expiredTime">
                    <el-date-picker size="mini" v-model="formFilter.expiredTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="过滤描述：" prop="memo">
                    <el-input size="mini" type="textarea" v-model="formFilter.memo" placeholder="请输入描述内容"></el-input>
                </el-form-item>
                <el-form-item label="过滤种类：" prop="rules" :rules="[
                    {required: true, message: '请选择过滤种类', trigger: 'change'},
                    {validator: validateRules}]"
                >
                    <el-tooltip effect="dark" content="最多选择6种组合类型，其中源IP和目的IP不能同时勾选，源端口和目的端口不能同时勾选，且源端口或目的端口必须与传输层协议同时选择！" placement="top-start">
                        <el-select size="mini" multiple v-model="formFilter.rules" placeholder="请选择过滤种类">
                            <el-option v-for="item in rulesList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="匹配范围：" prop="matchRange" v-if="formFilter.rules.includes('keyWord')"
                    :rules="{required: formFilter.rules.includes('keyWord'), message: '请选择匹配范围'}"
                >
                    <el-radio-group v-model="formFilter.matchRange" size="mini">
                        <el-radio-button v-for="item in parentData.matchRangeList" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="路径：" class="url" prop="url"
                    :rules="[{required: true, message: '请选择要上传的文件', }, {validator: validateUploadFile} ]"
                >
                    <el-upload class="upload"
                        ref="upload"
                        drag multiple
                        v-model="formFilter.url"
                        :data="formFilter"
                        action="/act-idc-web/baseData/houseManage/import.do"
                        accept="application/vnd.ms-excel"
                        :auto-upload="false"
                        :onError="uploadError"
                        :onSuccess="uploadSuccess"
                        :onChange="uploadChange"
                        :onRemove="upLoadRemove"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="格式说明：">
                    xls 或xlsx 文档 (支持Excel 97-2003 工作簿 和 Excel 2007)
                </el-form-item>
                <el-form-item class="operate">
                    <el-button type="primary" @click="importHandle">导入</el-button>
                    <el-button type="primary" @click="backHandle">返回</el-button>
                </el-form-item>
            </fieldset>
        </el-form>
    </section>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import uploadMixin from '@/mixins/uploadMixin'
import PanelHead from 'components/Common/PanelHead'

export default {
    name: 'importTpl',
    mixins: [formMixin, uploadMixin],
    components: {
        PanelHead
    },
    props: {
        parentData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            panelOpt: {
                title: this.parentData.name,
                hasIcon: true
            },
            formFilter: {
                name: "",
                reason: "",
                expiredTime: "",
                memo: "",
                rules: '',
                matchRange: '0',
                url: ''
            },
            formRules: {
                /*name: {required: true, trigger: 'blur', message: '请输入过滤名称'},
                reason: {required: true, trigger: 'blur', message: '请输入过滤原因'},
                expiredTime: {required: false, trigger: 'blur', message: '请选择过期时间'},
                memo: "",
                rules: [
                    {required: true, message: '请选择过滤种类', trigger: 'change'},
                    {validator: this.validateRules}
                ]*/
            },
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
            uploadKey: 'url'
        }
    },
    methods: {
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
        importHandle() {
            this.validateHandle( 'formFilter', _ => {
                // console.log(this.$refs.upload)
                this.$refs.upload.submit()
            })
        },
        backHandle() {
            this.$emit('removeTab', this.parentData.name)
        }
    }
}
</script>

<style lang="less">
    .importTpl {
        max-height: 100%;
        overflow: auto;
        margin-top: -10px;
        // background-color: #f5f7fa;
        // padding-bottom: 10px;
            .commonForm {
                margin: 10px ;
            }
    }
</style>
