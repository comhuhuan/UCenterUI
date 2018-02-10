<template lang="html">
    <section class="importTpl">
        <el-form label-width="120px" :model="formFilter" ref="formFilter">
            <fieldset v-for="item in list" :key="item.title"
                :class="{expand: curEditorOpt.subject === item.subject && isExpand, active: curEditorOpt.subject === item.subject}"
            >
                <legend @click="switchHandle(item.subject)">
                    {{item.title}}
                    <span class="el-icon-caret-right"></span>
                </legend>
                <div class="" v-if="curEditorOpt.subject === item.subject">
                    <el-form-item label="模板：" class="tpl">
                        <a :href="item.template">下载模板</a>
                    </el-form-item>
                    <el-form-item label="字段：" class="fields">
                        <span class="field" v-for="field in item.fields" :key="field" v-html="field"></span>
                    </el-form-item>
                    <el-form-item label="提示：" class="hint">
                        <ul>
                            <li v-for="hint in item.hints" :key="hint" v-html="hint"></li>
                        </ul>
                    </el-form-item>
                    <el-form-item label="路径：" class="url" :rules="[{required: true, message: '请选择要上传的文件', }, {validator: validateUploadFile} ]" prop="url">
                        <el-upload class="upload"
                            :ref="item.subject"
                            v-model="formFilter.url"
                            drag multiple
                            :action="item.action"
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
                          <!--<div class="el-upload__tip" slot="tip">
                              <a :href="item.template">下载模板</a>
                          </div>-->
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="格式说明：">
                        xls 或xlsx 文档 (支持Excel 97-2003 工作簿 和 Excel 2007)
                    </el-form-item>
                    <el-form-item class="operate">
                        <el-button type="primary" @click="importHandle(item.subject)">导入</el-button>
                        <el-button type="primary" @click.native="setIsShowEditor(false)">返回</el-button>
                    </el-form-item>
                </div>
            </fieldset>
        </el-form>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as api from 'api/gjg/houseManage'
import formMixin from '@/mixins/formMixin'
import uploadMixin from '@/mixins/uploadMixin'

export default {
    name: 'importTpl',
    mixins: [formMixin, uploadMixin],
    data() {
        return {
            list: [
                {
                    title: '导入机房信息',
                    subject: 'house',
                    fields: [
                        'IDC/ISP许可证号',
                        '机房名称',
                        '机房编号',
                        '机房性质<strong>（1-租用 2-自建 999-其它）</strong>',
                        '机房所在区域<strong>（填写6位的区域号码）</strong>',
                        '机房地址',
                        '邮编安全责任人姓名',
                        '证件类型<strong>（身份证-2 护照-7 军官证-8 台胞证-9）</strong>',
                        '证件号码',
                        '移动电话',
                        '固定电话',
                        'Email地址'
                    ],
                    hints: [
                        '（1）请按照上面的字段顺序填写',
                        '（2）机房性质，证件类型输入相应的代号',
                        '（3）为确保数据格式的准确，可下载<a href="static/template/机房信息.xls"> 模板 </a>'
                    ],
                    template: 'static/template/机房信息.xls',
                    action: '/act-idc-web/baseData/houseManage/import.do'
                    // format: 'xls 或xlsx 文档 （支持Excel 97-2003 工作簿 和 Excel 2007）'
                },
                {
                    title: '导入机房区域信息',
                    subject: 'area',
                    fields: [
                        '机房名称',
                        '机房编号',
                        '机房片区名称',
                        '机房片区编号',
                        '机柜编号',
                        '机柜名称',
                        '使用类型',
                        '分配状态',
                        '占用状态',
                        '楼层ID',
                        '机柜的总行数',
                        '机柜的总列数',
                        '机柜位置'
                    ],
                    hints: [
                        '机柜信息导入，请下载导入<a href="static/template/机柜信息.xls"> 模板 </a>进行导入',
                    ],
                    template: 'static/template/机柜信息.xls',
                    action: '/act-idc-web/baseData/houseAreaManage/import.do'
                    // format: 'xls 或xlsx 文档 （支持Excel 97-2003 工作簿 和 Excel 2007）'
                },
                {
                    title: '导入IP地址段信息',
                    subject: 'ip',
                    fields: [
                        '机房名称',
                        '机房编号',
                        'IP地址使用方式<strong>（0-静态 1-动态 2-保留3-专线）</strong>',
                        '使用单位名称',
                        '证件类型',
                        '证件号码',
                        '来源单位',
                        '分配单位',
                        '分配使用时间<strong>（采用yyyy-MM-dd格式）</strong>',
                        '起始IP地址',
                        '终止IP地址'
                    ],
                    hints: [
                        '（1）请按照上面的字段顺序填写',
                        '（2）IP地址使用方式输入相应的代号',
                        '（3）为确保数据格式的准确，可下载<a href="static/template/IP段信息.xls"> 模板 </a>'
                    ],
                    template: 'static/template/IP段信息.xls',
                    action: '/act-idc-web/baseData/ipManage/import.do'
                    // format: 'xls 或xlsx 文档 （支持Excel 97-2003 工作簿 和 Excel 2007）'
                },
                {
                    title: '导入互联网出入口信息',
                    subject: 'network',
                    fields: [
                        '机房名称',
                        '机房编号',
                        '网关IP',
                        '带宽',
                        '链路类型<strong>（1-电信 2-联通 3-移动 4-铁通 9-其他）</strong>',
                        '链路接入单位信息',
                    ],
                    hints: [
                        '（1）请按照上面的字段顺序填写',
                        '（2）链路类型输入相应的代号',
                        '（3）为确保数据格式的准确，可下载<a href="static/template/出入口信息.xls"> 模板 </a>'
                    ],
                    template: 'static/template/出入口信息.xls',
                    action: '/act-idc-web/baseData/networkManage/import.do'
                    // format: 'xls 或xlsx 文档 （支持Excel 97-2003 工作簿 和 Excel 2007）'
                }
            ],
            isExpand: true,
            formFilter: {
                url: ''
            },
            uploadKey: 'url'
        }
    },
    computed: {
        ...mapGetters({
            curEditorOpt: "curHouseEditorOptions"
        })
    },
    created() {
        // console.log( this.curEditorOpt )
    },
    methods: {
        ...mapMutations({
            setIsShowEditor: 'SET_IS_SHOW_HOUSSE_EDITOR',
            setCurEditor: 'SET_CUR_HOUSE_EDITOR'
        }),
        switchHandle(subject) {
            if(this.curEditorOpt.subject !== subject) {
                this.isExpand = true
                this.setCurEditor({
                    type: 'import',
                    subject
                })
                return
            }
            this.isExpand = !this.isExpand
        },
        importHandle(subject) {
            console.log(this.$refs[subject], subject)
            this.validateHandle( 'formFilter', _ => {
                // this.$refs[`upload${subject}`].submit()
                this.$refs[subject][0].submit()
            })
        },

    }
}
</script>

<style lang="less" scoped>
    .importTpl {
        height: 100%;
        .el-form-item {
            margin-bottom: 14px!important;
            background-color: #FCFAFF!important;
            // background-color: #F2FFEA!important;
            border: 1px solid #eaeaea!important;
            &.hint {
                color: #f68300;
                background-color: #FCF8E2;
                border-color: #FBECCB;

                // color: #090!important;
                // background-color: #F2FFEA!important;
                // border-color: #C7DDB9!important;
                .el-form-item__label {
                    color: #f68300!important;
                }
            }
            .field {
                display: inline-block;

                &:not(:last-child)::after {
                    content: "|";
                    display: inline-block;
                    padding: 0 6px;
                    // color: #f68300;
                }
            }

            &.operate {
                background-color: #fff!important;
                border: none!important;
            }
            &.url {
                padding-top: 5px;
            }
        }
    }
</style>
