<template>
    <section id="idcImport">
        <fieldset>
            <legend>导入-IDC经营者信息</legend>
            <el-form :model="importRuleForm" :rules="addRule" ref="importRuleForm" label-width="180px">
                <el-form-item label="类型：">
                    <el-input size="mini" v-model="importRuleForm.kind" placeholder="IDC/ISP经营单位信息"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="字段：" >
                    <el-tooltip class="item" effect="dark"  placement="right">
                        <div slot="content">(1)请按照上面的字段顺序填写<br/>(2)为确保数据格式的准确,可下载模板</div>
                        <el-input size="mini" v-model="importRuleForm.field"
                                  type="textarea"
                                  :rows="6" :disabled="true">
                        </el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="路径：" >
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">(1)xls 或xlsx 文档<br/>(2)支持Excel 97-2003 工作簿 和 Excel 2007</div>
                        <input type="file">
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="" >
                    <el-button size="mini" type="success" round icon="el-icon-download">模板下载</el-button>
                </el-form-item>
                <el-form-item label="">
                    <el-button-group>
                        <el-button type="primary" @click="submitForm('importRuleForm')">确定</el-button>
                        <el-button type="primary" @click="returnEvt">返回</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </fieldset>
    </section>
</template>

<script>
    export default {
        name: 'Import',
        props: {
            tabName: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                importRuleForm: {
                    kind: '',
                    field: `IDC/ISP许可证号, 单位名称, 单位地址, 企业法人, 邮编
    安全责任人姓名, 证件类型(身份证-2 护照-7 军官证-8 台胞证-9), 证件号码, 移动电话, 固定电话, Email地址
    应急联系人姓名, 证件类型(身份证-2 护照-7 军官证-8 台胞证-9), 证件号码, 移动电话, 固定电话, Email地址
    `,
                    route: '',
                },
                myTabName: this.tabName,
                addRule: {
                }
            }
    },
    methods: {
        returnEvt () {
            this.$emit("cancelTab", this.myTabName)
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
    }
</script>

<style lang="less">
    #idcImport{
        .el-form{
            width: 55%;
            margin: 0 auto;
        }
        fieldset {
            border: 1px solid #c7c7c7;
            padding: 10px 10px 0px 10px;
            overflow: hidden;
            transition: all 0.3s ease;
            legend {
                border: none;
                width: auto;
                font-size: 14px;
                padding: 0 5px;
                cursor: pointer;
                color: #999999;
                margin: 0;
            }
        }
    }
</style>
