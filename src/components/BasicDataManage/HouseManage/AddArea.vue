<template lang="html">
    <section class="editorForm">
        <!-- <el-form :model="areaFilter" :rules="areaRules" ref="areaFilter" label-width="150px" class="commonForm"> -->
        <el-form label-width="150px" :model="areaFilter" ref="areaFilter" :rules="areaRules" class="commonForm" :loading="areaLoading">
            <fieldset :class="{expand: isAreaExpand, active: isAreaActive}">
                <!-- <legend>机房区域</legend> -->
                <legend @click="areaLegendClick">
                    机房区域
                    <span class="el-icon-caret-right"></span>
                </legend>
                <div class="" v-show="isAreaExpand">
                    <el-form-item label="机房名称：" prop="houseName">
                        <el-select size="mini" v-model="areaFilter.houseName" placeholder="请选择机房名称">
                            <el-option v-for="item in houseNameList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机房片区编号：" prop="houseAreaCode">
                        <el-input size="mini" v-model="areaFilter.houseAreaCode" placeholder="请输入机房片区编号"></el-input>
                    </el-form-item>
                    <el-form-item label="机房片区名称：" prop="houseAreaName">
                        <el-input size="mini" v-model="areaFilter.houseAreaName" placeholder="请输入机房片区名称"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层ID：" prop="floorId">
                         <!-- controls-position="right" -->
                        <el-input-number size="mini" v-model.number="areaFilter.floorId" placeholder="请输入机柜的总行数" :min="0" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="机柜的总行数：" prop="cabTotalRow">
                        <el-input-number size="mini" v-model.number="areaFilter.cabTotalRow" placeholder="请输入机柜的总行数" :min="0" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="机柜的总列数：" prop="cabTotalCol">
                         <!-- controls-position="right" -->
                        <el-input-number size="mini" v-model.number="areaFilter.cabTotalCol" placeholder="请输入机柜的总列数" :min="0" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="所在区域：" prop="area">
                        <el-select size="mini" v-model="areaFilter.area" placeholder="请选择所在区域">
                            <el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contact">
                        <el-input size="mini" v-model="areaFilter.contact" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="mobile">
                        <el-input size="mini" v-model="areaFilter.mobile" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="tel">
                        <el-input size="mini" v-model="areaFilter.tel" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="及时通：" prop="timeCont">
                        <el-input size="mini" v-model="areaFilter.timeCont" placeholder="请输入及时通号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件地址：" prop="email">
                        <el-input size="mini" v-model="areaFilter.email" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="机房描述：" prop="desc">
                        <el-input size="mini" type="textarea" v-model="areaFilter.desc" placeholder="请输入机房描述"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="saveAreaHandle">确定</el-button>
                        <!-- <el-button type="primary" @click.native="setIsShowEditor(false)">返回</el-button> -->
                    </el-form-item>
                </div>
            </fieldset>
        </el-form>
        <el-form label-width="150px" :model="cabinetFilter" ref="cabinetFilter" :rules="cabinetRules" class="commonForm" :loading="cabinetLoading">
            <fieldset :class="{expand: isCabinetExpand, active: !isAreaActive, disabled: !isSaveArea}">
                <legend @click="cabinetLegendClick">
                    机柜
                    <span class="el-icon-caret-right"></span>
                </legend>
                <div class="" v-show="isCabinetExpand">
                    <el-form-item label="机柜编号：" prop="cabCode">
                        <el-input size="mini" v-model="cabinetFilter.cabCode" placeholder="请输入机柜编号"></el-input>
                    </el-form-item>
                    <el-form-item label="机柜名称：" prop="cabName">
                        <el-input size="mini" v-model="cabinetFilter.cabName" placeholder="请输入机柜名称"></el-input>
                    </el-form-item>
                    <el-form-item label="机柜位置：" prop="cabLocation">
                        <el-tooltip effect="dark" content="机柜在机房内的物理位置，格式：行|列(如:第3排第5个机柜，则用'3|5'表示)" placement="top-start">
                            <el-input size="mini" v-model="cabinetFilter.cabLocation" placeholder="请输入机柜位置"></el-input>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="使用类型：" prop="cabUseType">
                        <el-select size="mini" v-model="cabinetFilter.cabUseType" placeholder="请选择使用类型">
                            <el-option v-for="item in useTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分配状态：" prop="cabAssignStatus">
                        <el-select size="mini" v-model="cabinetFilter.cabAssignStatus" placeholder="请选择使用类型">
                            <el-option v-for="item in assignStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="占用状态：" prop="cabOccupyStatus">
                        <el-select size="mini" v-model="cabinetFilter.cabOccupyStatus" placeholder="请选择占用状态">
                            <el-option v-for="item in occupyStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="saveCabinetHandle">确定</el-button>
                        <el-button type="primary" @click.native="resetForm('cabinetFilter')">重置</el-button>
                        <!-- <el-button type="primary" @click.native="setIsShowEditor(false)">返回</el-button> -->
                    </el-form-item>
                    <el-table :data="tableList" border :loading="tableLoading" @selection-change="selectionChange">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column label="机柜ID" prop="cabId"></el-table-column>
                        <el-table-column label="机柜编号" prop="cabCode"></el-table-column>
                        <el-table-column label="机柜名称" prop="cabName"></el-table-column>
                        <el-table-column label="机柜位置" prop="cabLocation" show-overflow-tooltip></el-table-column>
                        <el-table-column label="使用类型" width="70" prop="cabUseType">
                            <template slot-scope="scope">
                                <el-tag size="mini" :type="scope.row.isIssue == 0 ? 'success' : 'warning'">{{ scope.row.isIssue == 0 ? '已上报' : '未上报' }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="分配状态" width="70" prop="cabAssignStatus">
                            <template slot-scope="scope">
                                <el-tag size="mini" :type="scope.row.isIssue == 0 ? 'success' : 'warning'">{{ scope.row.isIssue == 0 ? '已上报' : '未上报' }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="占用状态" width="70" prop="cabOccupyStatus">
                            <template slot-scope="scope">
                                <el-tag size="mini" :type="scope.row.isIssue == 0 ? 'success' : 'warning'">{{ scope.row.isIssue == 0 ? '已上报' : '未上报' }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click.native="editHandle(scope.$index, scope.row)">修改</el-button>
                                <span>&nbsp;|&nbsp;</span>
                                <el-button type="text" size="small" @click.native="delHandle(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="bottom-operate">
                        <el-button type="primary" :disabled="!hasSelected" @click.native="delHandle">批量删除</el-button>
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="pageFilters.pageIndex"
                            :page-size="pageFilters.pageSize"
                            :page-sizes="pageSizes"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>

                </div>
            </fieldset>
        </el-form>
    </section>
</template>

<script>
import { ipReg, emailReg, mobileReg, telReg } from 'constants/reg'
import { saveHouseArea, saveCabinet } from 'api/gjg/houseManage'
import formMixin from '@/mixins/formMixin'
import addMixin from './addMixin'
import cabinetMixin from './cabinetMixin'

export default {
    name: 'addArea',
    mixins: [formMixin, addMixin, cabinetMixin],
    data() {
        return {
            houseNameList: [],
            areaList: [],
            areaFilter: {
                houseName: '',
                houseAreaCode: '',
                houseAreaName: '',
                floorId: '',
                cabTotalRow: '',
                cabTotalCol: '',
                area: '',
                contact: '',
                mobile: '',
                tel: '',
                timeCont: '',
                email: '',
                desc: '',
            },
            areaRules: {
                houseName: [{ required: false, message: '请选择机房名称', trigger: 'change' }],
                houseAreaCode: [{ required: true, message: '请输入机房片区编号', trigger: 'blur' }],
                houseAreaName: [{ required: true, message: '请输入机房片区名称', trigger: 'blur' }],
                floorId: [{ required: false, message: '楼层ID必须为正整数', trigger: 'blur', type: 'number' }],
                cabTotalRow: [{ required: false, message: '机柜的总行数必须为正整数', trigger: 'blur', type: 'number' }],
                cabTotalCol: [{ required: false, message: '机柜的总列数必须为正整数', trigger: 'blur', type: 'number' }],
                area: [{ required: false, message: '请选择所在区域', trigger: 'change' }],
                contact: [{ required: false, message: '请输入联系人', trigger: 'blur' }],
                mobile: [{ required: false, message: '请输入正确的手机号，如：13612345678', trigger: 'blur', pattern: mobileReg }],
                tel: [{ required: false, message: '请输入正确的联系电话，如：0755-12345678', trigger: 'blur', pattern: telReg }],
                timeCont: [{ required: false, message: '请输入及时通', trigger: 'blur' }],
                email: [{ required: false, message: '请输入正确的邮件地址，格式如:abc@163.com', trigger: 'blur', pattern: emailReg }],
                desc: [{ required: false, message: '请输入机房描述信息', trigger: 'blur' }],
            },
            cabinetFilter: {
                cabCode: '',
                cabName: '',
                cabLocation: '',
                cabUseType: '',
                cabAssignStatus: '',
                cabOccupyStatus: '',
            },
            cabinetRules: {
                cabCode: [{ required: true, message: '请输入机柜编号', trigger: 'blur' }],
                cabName: [{ required: true, message: '请输入机柜名称', trigger: 'blur' }],
                cabLocation: [{ required: true, message: '请输入机柜位置', trigger: 'blur' }],
                cabUseType: [{ required: true, message: '请选择使用类型', trigger: 'change' }],
                cabAssignStatus: [{ required: true, message: '请选择分配状态', trigger: 'change' }],
                cabOccupyStatus: [{ required: true, message: '请选择占用状态', trigger: 'change' }],
            },
            useTypeList: [{label: 'test', value: 'test'}],
            assignStatusList: [{label: 'test', value: 'test'}],
            occupyStatusList: [{label: 'test', value: 'test'}],
            isAreaExpand: true,
            isCabinetExpand: false,
            isSaveArea: false,
            areaLoading: false,
            cabinetLoading: false,
            isAreaActive: true
            // tableList: []
        }
    },
    created() {
        if(this.curEditorType === 'modify') {
            if(!this.curEditorOpt.data) return
            const data = this.curEditorOpt.data
            const flag = this.curEditorOpt.isCabinetModify && this.curEditorOpt.data

            this.areaFilter = {
                houseName: data.houseName,
                houseAreaCode: data.houseAreaCode,
                houseAreaName: data.houseAreaName,
                floorId: data.floorId,
                cabTotalRow: data.cabTotalRow,
                cabTotalCol: data.cabTotalCol,
                area: data.area,
                contact: data.contact,
                mobile: data.mobile,
                tel: data.tel,
                timeCont: data.timeCont,
                email: data.email,
                desc: data.desc,
            }
            this.cabinetFilter = {
                cabCode: data.cabCode,
                cabName: data.cabName,
                cabLocation: data.cabLocation,
                cabUseType: data.cabUseType,
                cabAssignStatus: data.cabAssignStatus,
                cabOccupyStatus: data.cabOccupyStatus,
            }
            this.isSaveArea = true
            if(flag) {
                this.isAreaExpand = false
                this.isCabinetExpand = true
                this.isAreaActive = false
            }
        }
    },
    methods: {
        areaLegendClick() {
            if ( this.isSaveArea ) {
                this.isCabinetExpand = !this.isCabinetExpand
                this.isAreaActive = !this.isAreaActive
            }
            this.isAreaExpand = !this.isAreaExpand
        },
        cabinetLegendClick() {
            if ( this.isSaveArea ) {
                this.isCabinetExpand = !this.isCabinetExpand
                this.isAreaExpand = !this.isAreaExpand
                this.isAreaActive = !this.isAreaActive
            } else {
                this.$message({
                    showClose: true,
                    message: '请先完成机房区域信息的填写',
                    type: 'warning'
                })
            }
        },
        saveAreaHandle() {
            this.validateHandle('areaFilter', _ => {
                this.areaLoading = true
                saveHouseArea(this.areaFilter).then( res => {
                    const flag = res.status === 'success'
                    const msg = this.curEditorType === 'add' ? '新增机房区域成功' : '修改机房区域信息成功'

                    // console.log(flag)
                    this.$message({
                        showClose: true,
                        message: flag ? msg : res.message,
                        // duration: 0,
                        type: flag ? 'success' : 'error'
                    })
                    this.areaLoading = false
                    if(flag) {
                        this.isSaveArea = true
                        this.isCabinetExpand = !this.isCabinetExpand
                        this.isAreaExpand = !this.isAreaExpand
                        this.isAreaActive = false
                    }
                }).catch( err => {
                    console.log(err)
                    this.areaLoading = false
                })
            })
        },
        saveCabinetHandle() {
            this.validateHandle('cabinetFilter', _ => {
                this.cabinetLoading = true
                saveCabinet(this.cabinetFilter).then( res => {
                    const flag = res.status === 'success'
                    const msg = this.curEditorType === 'add' ? '新增机柜成功' : '修改机柜信息成功'
                    if(flag) {
                        // this.isSaveArea = true
                        // this.isCabinetExpand = !this.isCabinetExpand
                        // this.isAreaExpand = !this.isAreaExpand
                    }
                    // console.log(flag)
                    this.$message({
                        showClose: true,
                        message: flag ? msg : res.message,
                        // duration: 0,
                        type: flag ? 'success' : 'error'
                    })
                    this.cabinetLoading = false
                    if(flag) {
                        this.getTableList()
                    }
                }).catch( err => {
                    console.log(err)
                    this.cabinetLoading = false
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .editorForm {
        // max-height: calc(~'100% - 12px');
        // height: 100%;
        overflow: auto;
        .el-form.commonForm {
            .el-table {
                box-sizing: border-box;
                /*max-width: calc(~'100% - 40px');
                overflow: auto;*/
            }
        }
    }
</style>
