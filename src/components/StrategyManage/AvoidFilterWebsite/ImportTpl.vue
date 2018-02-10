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
                    <a href="static/template/免过滤或违法信息.xls">下载模板</a>
                </el-form-item>
                <el-form-item label="免过滤名称：" prop="name">
                    <el-input size="mini" v-model="formFilter.name" placeholder="请输入免过滤名称"></el-input>
                </el-form-item>
                <el-form-item label="下发范围：" prop="serviceCodes">
                    <el-select size="mini" multiple v-model="formFilter.serviceCodes" placeholder="请选择下发范围" filterable>
                        <el-option v-for="item in parentData.houseList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>                   
                <el-form-item label="免过滤原因：" prop="memo">
                    <el-input size="mini" v-model="formFilter.memo" placeholder="请输入免过滤原因"></el-input>
                </el-form-item>                     
                <el-form-item label="免过滤类型：" prop="type">
                    <el-radio-group v-model="formFilter.type" size="mini" >
                        <el-radio :label="1" >域名</el-radio>
                        <el-radio :label="2" >IP</el-radio>
                    </el-radio-group>
                </el-form-item> 
                <el-form-item label="过期时间：" prop="expiredTime">
                    <el-date-picker size="mini" v-model="formFilter.expiredTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="路径：" class="url" prop="url" >
                    <el-upload class="upload"
                        ref="upload"
                        drag multiple
                        v-model="formFilter.url"
                        action="/baseData/houseManage/import.do"
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
                serviceCodes: "",
                memo: "",
                expiredTime: "",
                type: '',
                url: ''
            },
            formRules: {
                name: {required: true, trigger: 'blur', message: '请输入免过滤名称'},
                serviceCodes: {required: true, trigger: 'change', message: '请选择下发范围'},
                type: {required: true, trigger: 'blur', message: '请选择免过滤类型'},
                url: [
                    {required: true, message: '请选择要上传的文件' },
                    {validator: this.validateUploadFile} 
                ]
            },
            uploadKey: 'url'
        }
    },
    methods: {
        importHandle() {
            this.validateHandle( 'formFilter', _ => {
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
