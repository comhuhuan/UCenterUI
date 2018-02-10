<template>
    <section id="dutyOfficerEdit">
        <fieldset>
            <legend>修改-责任人信息</legend>
            <el-form :model="editRuleForm" :rules="editRule" ref="editRuleForm" label-width="160px">
                <el-form-item label="姓名：" prop="name">
                    <el-input size="mini" v-model="editRuleForm.name" placeholder="请输入姓名"/>
                </el-form-item>
                <el-form-item label="证件类型：" prop="idenTypeId">
                    <el-select size="mini" v-model="editRuleForm.idenTypeId" placeholder="请选择">
                        <el-option
                            v-for="(value, key) in idenTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码：" prop="idenNum">
                    <el-input size="mini" v-model="editRuleForm.idenNum" placeholder="请输入证件号码"/>
                </el-form-item>
                <el-form-item label="固定电话：" prop="tel">
                    <el-tooltip class="item" effect="dark" content='格式如:0755-12345678' placement="right">
                        <el-input size="mini" v-model="editRuleForm.tel" placeholder="请输入固定电话"/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="移动电话：" prop="mobile">
                    <el-tooltip class="item" effect="dark" content='格式如:13612345678' placement="right">
                        <el-input size="mini" v-model="editRuleForm.mobile" placeholder="请输入移动电话"/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="Email地址：" prop="email">
                    <el-tooltip class="item" effect="dark" content='格式如:abc@163.com' placement="right">
                        <el-input size="mini" v-model="editRuleForm.email" placeholder="请输入Email地址"/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="">
                    <el-button-group>
                        <el-button type="primary" @click="okEvt">确定</el-button>
                        <el-button type="primary" @click="returnEvt">返回</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
        </fieldset>
    </section>
</template>
<script>

    import { saveDutyOfficer } from 'api/xiajun/basicDataManage'
    export default {
        name: 'EditDutyOfficer',
        props: {
            tabName: {
                type: String,
                required: true
            },
            params: {
                type: Object,
                required: true
            },
            myIdenTypeList: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                myTabName: this.tabName,
                idenTypeList: this.myIdenTypeList,
                editRuleForm: {
                    name: this.params.name,
                    idenTypeId: this.params.idenTypeId + "",
                    idenNum: this.params.idenNum,
                    mobile: this.params.mobile,
                    tel: this.params.tel,
                    id: this.params.id,
                    email: this.params.email
                },
                editRule: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    idenTypeId: [
                        { required: true, message: '请选择证件类型', trigger: 'blur' }
                    ],
                    idenNum: [
                        { required: true, message: '请输入证件号码', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入固定电话', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入移动电话', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入Email地址', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            console.log(this.tabName, "传参")
            console.log('params',this.params)
        },
        methods: {
            returnEvt (val) {
                console.log('this.myTabName',this.myTabName)
                console.log('this.tabName',this.tabName)
                this.$emit('cancelTab', this.myTabName)
            },
            okEvt() {
                console.log('okEvt', this.editRuleForm)
                this.isLoading = true
                saveDutyOfficer(this.editRuleForm).then(res => {
                    if (res.state === 'success'){
                        this.$message({
                            type: 'success',
                            message: res.message,
                            showClose: true,
                        })
                        setTimeout(() => {
                            this.$emit('cancelTab', this.myTabName)
                        }, 100)

                    }else if(res.state === 'error'){
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true,
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: '请求不成功',
                            showClose: true,
                        })
                    }
                    this.isLoading = false
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '请求不成功',
                        showClose: true,
                    })
                    this.isLoading = false
                })
            }
        }
    }
</script>
<style lang="less">
    #dutyOfficerEdit{
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
