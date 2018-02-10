<template>
    <section id="idcExport">
        <fieldset>
            <legend>导出-IDC经营者信息</legend>
            <el-form :model="exportRuleForm" ref="addRuleForm" label-width="180px">
                <el-form-item label="导出操作：">
                    <el-checkbox size="mini" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    &nbsp;&nbsp;&nbsp;<el-radio size="mini" v-model="radio" label="1">导出excel</el-radio>
                </el-form-item>
                <el-form-item label="导出字段选择：" prop="code">
                    <el-checkbox-group size="mini" v-model="exportRuleForm.field" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="item in fields" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="">
                    <el-button-group>
                        <el-button type="primary" @click="submitForm('exportRuleForm')">确定</el-button>
                        <el-button type="primary" @click="returnEvt">返回</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </fieldset>
    </section>
</template>

<script>
    export default {
        name: 'Add',
        props: {
            tabName: {
                type: String,
                required: true
            }
        },
        data () {
        return {
            radio: '1',
            checkAll:false,
            isIndeterminate: true,
            myTabName: this.tabName,
            exportRuleForm: {
                field: [],
            },
            fields:["IDC/ISP许可证号","经营者名称","经营者地址","企业法人","邮政编码","安全责任人姓名","证件类型","证件号码",
        "移动电话","固定电话","安全责任人Email地址","应急联系人姓名","证件类型2","证件号码2","移动电话2","固定电话2","应急联系人Email地址"]
        }
    },
    methods: {
        handleCheckAllChange(val) {
            this.exportRuleForm.field = val ? this.fields : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.fields.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.fields.length;
        },
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
    #idcExport{
        .el-form{
            width: 55%;
            margin: 0 auto;
        }
        .el-checkbox{ width: 180px; float: left;}
        .el-checkbox + .el-checkbox{
            margin-left: 0;
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
