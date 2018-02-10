<template>
    <section id="idcAdd">
        <fieldset>
            <legend>修改-IDC经营者信息</legend>
            <el-form :model="editRuleForm" :rules="editRule" ref="editRuleForm" label-width="180px">
                <el-form-item label="IDC/ISP许可证号：" prop="idcId">
                    <el-input size="mini" v-model="editRuleForm.idcId" placeholder="IDC/ISP许可证号"></el-input>
                </el-form-item>
                <el-form-item label="经营者名称：" prop="idcName">
                    <el-tooltip class="item" effect="dark" content="与许可证上名称一致！" placement="right">
                        <el-input size="mini" v-model="editRuleForm.idcName" placeholder="经营者名称"></el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="经营者地址：" prop="idcAdd">
                    <el-input size="mini" v-model="editRuleForm.idcAdd" placeholder="经营者地址"></el-input>
                </el-form-item>
                <el-form-item label="邮政编号：" prop="idcZip">
                    <el-input size="mini" v-model="editRuleForm.idcZip" placeholder="邮政编号"></el-input>
                </el-form-item>
                <el-form-item label="企业法人：" prop="corp">
                    <el-input size="mini" v-model="editRuleForm.corp" placeholder="企业法人"></el-input>
                </el-form-item>
                <el-form-item label="网络信息安全责任人信息：" prop="idcOfficer">
                    <el-input size="mini" v-model="editRuleForm.idcOfficer" placeholder="网络信息安全责任人信息">
                        <el-button slot="append" @click="openForm('网络信息安全责任人信息')">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="应急联系人信息：" prop="emerContact">
                    <el-input size="mini" v-model="editRuleForm.emerContact" placeholder="应急联系人信息">
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
            <add-person v-if="addPerModal" @cancelClick="closePerForm" @selectUser="selectUser" :personType="myPersonType" :formTitle="formTitle"></add-person>
        </fieldset>
    </section>
</template>

<script>
    import { saveIdcOperator } from 'api/xiajun/basicDataManage'
    import AddPerson from './Person.vue'
    export default {
        name: 'EditIdcOperator',
        components: { AddPerson },
        props: {
            tabName: {
                type: String,
                required: true
            },
            params: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                addPerModal:false,
                myPersonType:'',
                formTitle:'',
                editRuleForm: {
                    idcId: this.params.idcId,
                    idcName: this.params.idcName,
                    idcAdd: this.params.idcAdd,
                    corp: this.params.corp,
                    idcOfficer: this.params.idcOfficer,
                    emerContact: this.params.emerContact,
                    idcZip:this.params.idcZip
                },
                editRule: {
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
    created(){
         console.log('params',this.params)
    },
    methods: {
        returnEvt () {
            this.$emit("cancelTab", this.myTabName)
        },
        okEvt() {
            console.log('okEvt', this.editRuleForm)
            this.isLoading = true
            saveIdcOperator(this.editRuleForm).then(res => {
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
        selectUser(type, user) {
            console.log('selectUser',type,user)
            switch (type){
                case 'idcOfficer':
                    this.editRuleForm.idcOfficer = user.name
                    break;
                case 'emerContact':
                    this.editRuleForm.emerContact = user.name
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
    }
</style>
