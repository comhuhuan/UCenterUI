<template>
    <section id="idcAdd">
        <fieldset>
            <legend>新增-IDC经营者信息</legend>
            <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="180px">
                <el-form-item label="IDC/ISP许可证号：" prop="idcId">
                    <el-input size="mini" v-model="addRuleForm.idcId" placeholder="IDC/ISP许可证号"></el-input>
                </el-form-item>
                <el-form-item label="经营者名称：" prop="idcName">
                    <el-tooltip class="item" effect="dark" content="与许可证上名称一致！" placement="right">
                        <el-input size="mini" v-model="addRuleForm.idcName" placeholder="经营者名称"></el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="经营者地址：" prop="idcAdd">
                    <el-input size="mini" v-model="addRuleForm.idcAdd" placeholder="经营者地址"></el-input>
                </el-form-item>
                <el-form-item label="邮政编号：" prop="idcZip">
                    <el-input size="mini" v-model="addRuleForm.idcZip" placeholder="邮政编号"></el-input>
                </el-form-item>
                <el-form-item label="企业法人：" prop="corp">
                    <el-input size="mini" v-model="addRuleForm.corp" placeholder="企业法人"></el-input>
                </el-form-item>
                <el-form-item label="网络信息安全责任人信息：" prop="idcOfficer">
                    <el-input size="mini" v-model="addRuleForm.idcOfficer" placeholder="网络信息安全责任人信息">
                        <el-button slot="append" @click="openForm('网络信息安全责任人信息')">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="应急联系人信息：" prop="emerContact">
                    <el-input size="mini" v-model="addRuleForm.emerContact" placeholder="应急联系人信息">
                        <el-button slot="append" @click="openForm('应急联系人信息')" >选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button-group>
                        <el-button type="primary" @click="okEvt">确定</el-button>
                        <el-button type="primary" @click="returnEvt">返回</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>
            <add-person v-if="addPerModal" :personType="myPersonType"  @cancelClick="closePerForm" @selectUser="selectUser" :formTitle="formTitle"></add-person>
        </fieldset>
    </section>
</template>

<script>
    import { saveIdcOperator } from 'api/xiajun/basicDataManage'
    import AddPerson from './Person.vue'
    export default {
        name: 'AddIdcOperator',
        components: { AddPerson },
        props: {
            tabName: {
                type: String,
                required: true
            }
        },
        data() {
          return {
                addPerModal:false,
                myTabName: this.tabName,
                formTitle:'',
                myPersonType:'',
                addRuleForm: {
                    idcId: '',
                    idcName: '',
                    idcAdd: '',
                    corp: '',
                    idcOfficer: '',
                    emerContact: '',
                    idcZip:''
                },
                addRule: {
                    idcId: [
                        { required: true, message: '请输入IDC/ISP许可证号', trigger: 'blur' }
                    ],
                    idcName: [
                        { required: true, message: '请输入经营者名称', trigger: 'blur' }
                    ],
                    idcAdd: [
                        { required: true, message: '请输入经营者地址', trigger: 'blur' }
                    ],
                    corp: [
                        { required: true, message: '请输入企业法人', trigger: 'blur' }
                    ],
                    idcOfficer: [
                        { required: true, message: '请输入网络信息安全责任人信息', trigger: 'blur' }
                    ],
                    emerContact: [
                        { required: true, message: '请输入应急联系人信息', trigger: 'blur' }
                    ],
                    idcZip: [
                        { required: true, message: '请输入邮政编号', trigger: 'blur' },
                        {pattern: /^[1-9][0-9]{5}$/, message: "邮政编码输入不正确！", trigger: 'blur' }
                    ]
                }
            }
    },
    methods: {
        returnEvt () {
            this.$emit("cancelTab", this.myTabName)
        },
        openForm(name){
            switch (name){
                case '网络信息安全责任人信息':
                  this.myPersonType = 'idcOfficer'
                  break;
                case '应急联系人信息':
                  this.myPersonType = 'emerContact'
                  break;
            }
            this.addPerModal=true
            this.formTitle = name
        },
        okEvt() {
            console.log('okEvt', this.addRuleForm)
            this.isLoading = true
            saveIdcOperator(this.addRuleForm).then(res => {
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
        },
        selectUser(type, user) {
          console.log('selectUser',type,user)
            switch (type){
                case 'idcOfficer':
                  this.addRuleForm.idcOfficer = user.name
                    break;
                case 'emerContact':
                  this.addRuleForm.emerContact = user.name
                    break;
            }

        },
        closePerForm(){
            this.addPerModal=false
        }
    }
    }
</script>

<style lang="less">
    #idcAdd{
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
