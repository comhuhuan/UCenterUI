<template lang="html">
    <section class="editorForm">
        <el-form label-position="right" label-width="150px" :model="formFilter" ref="formFilter" :rules="formRules" class="commonForm" :loading="formLoading">
            <!-- <fieldset> -->
                <!-- <legend>新增IP地址段</legend> -->
                <el-form-item label="IP地址使用方式：" prop="useType">
                    <el-select placeholder="请选择IP地址使用方式" size="mini" v-model="formFilter.useType">
                        <el-option v-for="item in useTypeList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始IP地址：" prop="startIpAddr">
                    <el-input placeholder="请输入起始IP地址" size="mini" v-model="formFilter.startIpAddr"></el-input>
                </el-form-item>
                <el-form-item label="终止IP地址：" prop="endIpAddr">
                    <el-input placeholder="请输入终止IP地址" size="mini" v-model="formFilter.endIpAddr"></el-input>
                </el-form-item>
                <el-form-item label="来源单位：" prop="unitSource">
                    <el-input placeholder="请输入来源单位" size="mini" v-model="formFilter.unitSource"></el-input>
                </el-form-item>
                <el-form-item label="分配单位：" prop="unitAllot">
                    <el-input placeholder="请输入分配单位" size="mini" v-model="formFilter.unitAllot"></el-input>
                </el-form-item>
                <el-form-item label="分配使用时间：" prop="timeAllot">
                     <!-- :editable="false"  -->
                    <el-tooltip placement="top-start" effect="dark" content="注：YYYY-MM-DD格式">
                        <el-date-picker type="date" v-model="formFilter.timeAllot" size="mini" placeholder="选择日期">
                        </el-date-picker>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="证件号码：" prop="idenNum">
                    <el-input placeholder="请输入证件号码" size="mini" v-model="formFilter.idenNum"></el-input>
                </el-form-item>
                <el-form-item label="证件类型：" prop="idenType">
                    <el-select placeholder="请选择证件类型" size="mini" v-model="formFilter.idenType">
                        <el-option v-for="item in idenTypeList" :key="item" :value="item" :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="使用单位名称：" prop="unitName" >
                    <el-input placeholder="请输入使用单位名称" size="mini" v-model="formFilter.unitName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveHandle">确定</el-button>
                    <!-- <el-button type="primary" @click="setIsShowEditor(false)">返回</el-button> -->
                </el-form-item>

            <!-- </fieldset> -->
        </el-form>
    </section>
</template>

<script>
import { ipReg } from 'constants/reg'
import { saveIp } from 'api/gjg/houseManage'
import formMixin from '@/mixins/formMixin'
import addMixin from './addMixin'

export default {
    name: 'addIp',
    mixins: [formMixin, addMixin],
    data() {
        return {
            formFilter: {
                useType: 1,
                startIpAddr: '',
                endIpAddr: '',
                unitName: '',
                unitSource: '',
                useType: '',
                unitAllot: '',
                timeAllot: '',
                idenType: '',
                idenNum: '',
            },
            formRules: {
                useType: [{required: true, message: '请选择IP使用方式', trigger: 'change'}],
                startIpAddr: {required: true, message: '请输入正确的IP地址，如：192.168.0.1', pattern: ipReg, trigger: 'blur'},
                endIpAddr: {required: true, message: '请输入正确的IP地址，如：192.168.0.1',  pattern: ipReg, trigger: 'blur'},
                unitSource: {required: true, message: '请输入来源单位', trigger: 'change'},
                useType: {required: true, message: '请选择使用类型', trigger: 'change'},
                unitAllot: {required: true, message: '请输入分配单位', trigger: 'blur'},
                timeAllot: {required: true, message: '请选择正确的时间', type: 'date', trigger: 'change'},
                idenNum: {required: true, message: '请输入证件号码', trigger: 'blur'},
                idenType: {required: false, message: '', },
                unitName: {required: false, message: '', },
            },
            useTypeList: [
                {label: '静态', value: 1},
                {label: '动态', value: 2},
                {label: '保留', value: 3},
                {label: '专线', value: 4},
            ],
            idenTypeList: ['工商营业执照号码', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '台胞证', '其它']
        }
    },
    methods: {
        saveHandle() {
            this.validateHandle( 'formFilter', _ => {
                this.formLoading = true
                saveIp(this.formFilter).then( res => {
                    const flag = res.status === 'success'
                    const msg = this.curEditorType === 'add' ? '新增IP地址段成功' : '修改IP地址段信息成功'
                    // console.log(flag)
                    this.$message({
                        showClose: true,
                        message: flag ? msg : res.message,
                        // duration: 0,
                        type: flag ? 'success' : 'error'
                    })
                    this.formLoading = false
                    this.setIsShowEditor(false)
                }).catch( err => {
                    console.log(err)
                    this.formLoading = false
                })
            })

        }
    }
}
</script>

<style lang="less" scoped>
.editorForm {
    height: 100%;
}
</style>
