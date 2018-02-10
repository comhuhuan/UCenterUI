<template lang="html">
    <section class="editorForm">
        <el-form label-position="right" label-width="150px" :model="formFilter" ref="formFilter" :rules="formRules" class="commonForm" :loading="formLoading">
            <!-- <fieldset> -->
                <!-- <legend>新增IP地址段</legend> -->
                <el-form-item label="经营者名称：" prop="IDCUnitName">
                    <el-select placeholder="请选择经营者名称" size="mini" v-model="formFilter.IDCUnitName">
                        <el-option v-for="item in IDCUnitList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机房编号：" prop="houseCode">
                    <el-tooltip effect="dark" content="注：联通机房编号为5位" placement="top-start">
                        <el-input placeholder="请输入机房编号" size="mini" v-model="formFilter.houseCode"></el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="机房名称：" prop="houseName">
                    <el-input placeholder="请输入机房名称" size="mini" v-model="formFilter.houseName"></el-input>
                </el-form-item>
                <el-form-item label="所在区域：" prop="area">
                    <el-select placeholder="请选择所在区域" size="mini" v-model="formFilter.area">
                        <el-option v-for="item in areaList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机房性质：" prop="houseProp">
                    <el-select placeholder="请选择机房性质" size="mini" v-model="formFilter.houseProp">
                        <el-option v-for="item in housePropList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机房地址：" prop="addr">
                    <el-input placeholder="请输入机房地址" size="mini" v-model="formFilter.addr"></el-input>
                </el-form-item>
                <el-form-item label="邮政编号：" prop="zip">
                    <el-input placeholder="请输入邮政编号" size="mini" v-model="formFilter.zip"></el-input>
                </el-form-item>
                <!-- 机房网络信息安全责任人信息 -->
                <el-form-item label="网络信息安全责任人：" prop="manager">
                    <el-input placeholder="请输入网络信息安全责任人" size="mini" v-model="formFilter.manager">
                        <el-button slot="append" @click="isShowPersonModal = true">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveHandle">确定</el-button>
                    <!-- <el-button type="primary" @click="setIsShowEditor(false)">返回</el-button> -->
                </el-form-item>

            <!-- </fieldset> -->
        </el-form>
        <SelectPersonModal v-if="isShowPersonModal" @cancelClick="isShowPersonModal = false" @selectedPreson="selectPresonHandle"></SelectPersonModal>
    </section>
</template>

<script>
import { saveHouse } from 'api/gjg/houseManage'
import formMixin from '@/mixins/formMixin'
import addMixin from './addMixin'
import SelectPersonModal from 'components/Common/SelectPersonModal'

export default {
    name: 'addHouse',
    mixins: [formMixin, addMixin],
    components: {
        SelectPersonModal
    },
    data() {
        return {
            formFilter: {
                IDCUnitName: '',
                houseCode: '',
                houseName: '',
                area: '',
                houseProp: '',
                addr: '',
                zip: '',
                manager: ''
            },
            formRules: {
                IDCUnitName: {required: true, message: "请选择经营者名称", trigger: "change"},
                houseCode: {required: true, message: "请输入机房编号", trigger: "blur"},
                houseName: {required: true, message: "请输入机房名称", trigger: "blur"},
                area: {required: true, message: "请选择所在区域", trigger: "change"},
                houseProp: {required: true, message: "请选择机房性质", trigger: "change"},
                addr: {required: true, message: "请输入机房地址请输入邮政编号", trigger: "blur"},
                zip: {required: true, message: "请输入网络信息安全责任人", trigger: "blur"},
                manager: {required: true, message: "请输入网络信息安全责任人", trigger: "blur"},

            },
            housePropList: [],
            IDCUnitList: [],
            areaList: [],
            isShowPersonModal: false
        }
    },
    methods: {
        saveHandle() {
            this.validateHandle( 'formFilter', _ => {
                this.formLoading = true
                saveHouse(this.formFilter).then( res => {
                    const flag = res.status === 'success'
                    const msg = this.curEditorType === 'add' ? '新增机房成功' : '修改机房信息成功'
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
        },
        selectPresonHandle(presonInfo) {
            this.isShowPersonModal = false
            this.formFilter.manager = presonInfo.name
        }
    }
}
</script>

<style lang="less" scoped>
</style>
