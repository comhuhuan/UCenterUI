<template>
    <section id="dutyOfficerAdd">
        <fieldset>
            <legend>新增-责任人信息</legend>
            <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="160px">
                <el-form-item label="姓名：" prop="name">
                    <el-input size="mini" v-model="addRuleForm.name" placeholder="请输入姓名"/>
                </el-form-item>
                <el-form-item label="证件类型：" prop="idenTypeId">
                    <el-select size="mini" v-model="addRuleForm.idenTypeId" placeholder="请选择">
                        <el-option
                            v-for="(value, key) in idenTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码：" prop="idenNum">
                    <el-input size="mini" v-model="addRuleForm.idenNum" placeholder="请输入证件号码"/>
                </el-form-item>
                <el-form-item label="固定电话：" prop="tel">
                    <el-tooltip class="item" effect="dark" content='格式如:0755-12345678' placement="right">
                        <el-input size="mini" v-model="addRuleForm.tel" placeholder="请输入固定电话"/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="移动电话：" prop="mobile">
                    <el-tooltip class="item" effect="dark" content='格式如:13612345678' placement="right">
                        <el-input size="mini" v-model="addRuleForm.mobile" placeholder="请输入移动电话"/>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="Email地址：" prop="email">
                    <el-tooltip class="item" effect="dark" content='格式如:abc@163.com' placement="right">
                        <el-input size="mini" v-model="addRuleForm.email" placeholder="请输入Email地址"/>
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
        name: 'AddDutyOfficer',
        props: {
            tabName: {
                type: String,
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
                addRuleForm: {
                    name: '',
                    idenTypeId: '',
                    idenNum: '',
                    tel: '',
                    email: ''
                },
                addRule: {
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
        },
        methods: {
            returnEvt (val) {
                this.$emit('cancelTab', this.myTabName)
            },
            okEvt() {
                console.log('okEvt', this.addRuleForm)
                this.isLoading = true
                saveDutyOfficer(this.addRuleForm).then(res => {
                    if (res.state === 'success'){
                        this.$message({
                            type: 'success',
                            message: res.message,
                            showClose: true,
                        })
                        setTimeout(() => {
                            this.$emit('cancelTab', this.myTabName)
                        }, 100)

                    }else if (res.state === 'error'){
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
    #dutyOfficerAdd{
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
