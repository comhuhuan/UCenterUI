<template lang="html">
    <section class="editorForm">
        <el-form label-position="right" label-width="150px" :model="formFilter" ref="formFilter" :rules="formRules" class="commonForm" :loading="formLoading">
            <!-- <fieldset> -->
                <!-- <legend>新增IP地址段</legend> -->
                <el-form-item label="带宽：" prop="networkWB">
                    <el-input type="number" placeholder="请输入宽带数值" size="mini" v-model.number="formFilter.networkWB">
                        <el-button slot="append">MB</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="链路类型：" prop="linkType">
                    <el-select placeholder="请选择链路类型" size="mini" v-model="formFilter.linkType">
                        <el-option v-for="item in linkTypeList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="链路接入单位信息：" prop="unitName">
                    <el-input placeholder="请输入链路接入单位信息" size="mini" v-model="formFilter.unitName"></el-input>
                </el-form-item>
                <el-form-item label="网关IP地址：" prop="addr">
                    <el-input placeholder="请输入网关IP地址" size="mini" v-model="formFilter.addr"></el-input>
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

import {ipReg } from 'constants/reg'
import { saveNetwork } from 'api/gjg/houseManage'
import formMixin from '@/mixins/formMixin'
import addMixin from './addMixin'

export default {
    name: 'addIp',
    mixins: [formMixin, addMixin],
    data() {
        return {
            formFilter: {
                networkWB: '',
                linkType: '',
                unitName: '',
                addr: '',
            },
            formRules: {
                networkWB: [{required: true, message: '请输入正确的宽带数值', trigger: 'blur', type: "number"}],
                linkType: [{required: true, message: '请选择链路类型', trigger: 'change'}],
                unitName: [{required: true, message: '请输入链路接入单位信息', trigger: 'blur'}],
                addr: [{required: true, message: '请输入正确的IP地址，如：192.168.0.1', pattern: ipReg, trigger: 'blur'}],
            },
            linkTypeList: [
                {label: '电信', value: 1},
                {label: '联通', value: 2},
                {label: '移动', value: 3},
                {label: '铁通', value: 4},
                {label: '其它', value: 9},
            ],
            idenTypeList: ['工商营业执照号码', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '台胞证', '其它']
        }
    },
    methods: {
        saveHandle() {
            this.validateHandle( 'formFilter', _ => {
                this.formLoading = true
                saveNetwork(this.formFilter).then( res => {
                    const flag = res.status === 'success'
                    const msg = this.curEditorType === 'add' ? '新增互联网出入口成功' : '修改互联网出入口信息成功'
                    console.log(flag)
                    this.$message({
                        showClose: true,
                        message: flag ? '新增成功' : res.message,
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
