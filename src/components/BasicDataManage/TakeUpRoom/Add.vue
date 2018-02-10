<template>
    <section id="takeUpRoomAdd">
        <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="180px">
            <el-form-item label="所属用户：" prop="user">
                <el-input v-model="addRuleForm.user" placeholder="请选择所属用户">
                    <el-button slot="append" @click="">选择</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="所属服务：" prop="service">
                <el-select label="所属服务：" v-model="addRuleForm.service" placeholder="请选择所属服务">
                    <el-option
                        v-for="item in serviceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属机房：" prop="room">
                <el-select label="所属机房：" v-model="addRuleForm.room" placeholder="请选择所属机房">
                    <el-option
                        v-for="item in roomList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属片区：" prop="district">
                <el-select label="所属片区：" v-model="addRuleForm.district" placeholder="请选择所属片区">
                    <el-option
                        v-for="item in districtList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属机柜：" prop="rack">
                <el-select label="所属机柜：" v-model="addRuleForm.rack" placeholder="请选择所属机柜">
                    <el-option
                        v-for="item in rackList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="网络带宽：" prop="bandWidth">
                <el-input v-model="addRuleForm.bandWidth" placeholder="请输入网络带宽">
                    <template slot="append">MB</template>
                </el-input>
            </el-form-item>
            <el-form-item label="服务器IP：" prop="serviceIP">
                <el-tooltip class="item" effect="dark" content='格式：外网|内网 12.12.12.12-12.12.12.13|192.1.1.1-192.1.1.3
或只有外网 12.12.12.1-12.12.12.2;12.12.12.3-12.12.12.4|192.1.1.4-192.1.1.5
多个用（英文状态)";"分号隔离' placement="top">
                    <el-input v-model="addRuleForm.serviceIP" type="textarea" :rows="3" placeholder="">
                    </el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="服务器日期：" prop="dateRange">
                <el-date-picker v-model="addRuleForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="服务器描述：" prop="desc">
                <el-tooltip class="item" effect="dark" content='	注：服务器型号、操作系统、硬盘描述、CPU描述、内存描述和服务器描述最大长度不能超过255个字符' placement="top">
                    <el-input v-model="addRuleForm.desc" type="textarea" :rows="3" placeholder="">
                    </el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="">
                <el-button-group>
                    <el-button type="primary" @click="">确定</el-button>
                    <el-button type="primary" @click="">返回</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>

    export default {
        name: 'AddTakeUpRoom',
        data () {
            return {
                addRuleForm: {
                    user: '',
                    service: '',
                    room: '',
                    district: '',
                    rack: '',
                    bandWidth:'',
                    serviceIP: '',
                    desc: '',
                    dateRange: ''
                },
                serviceList: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '即时通讯(2)'},
                    {value: '2', label: '网路新闻(3)'},
                    {value: '3', label: '博客/个人空间(4)'},
                ],
                roomList: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '机房1'},
                    {value: '2', label: '机房2'},
                    {value: '3', label: '机房3'},
                    {value: '4', label: '机房4'},
                ],
                districtList: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '片区1'},
                    {value: '2', label: '片区2'},
                    {value: '3', label: '片区3'},
                    {value: '4', label: '片区4'},
                ],
                rackList: [
                    {value: '0', label: '全部'},
                    {value: '1', label: '机柜1'},
                    {value: '2', label: '机柜2'},
                    {value: '3', label: '机柜3'},
                    {value: '4', label: '机柜4'},
                ],
                addRule: {
                    user: [
                        { required: true, message: '请选择所属用户', trigger: 'blur' }
                    ],
                    service: [
                        { required: true, message: '请选择所属服务', trigger: 'blur' }
                    ],
                    room: [
                        { required: true, message: '请选择所属机房', trigger: 'blur' }
                    ],
                    district: [
                        { required: true, message: '请选择所属片区', trigger: 'blur' }
                    ],
                    rack: [
                        { required: true, message: '请选择所属机柜', trigger: 'blur' }
                    ],
                    bandWidth: [
                        { required: true, message: '请输入网络带宽', trigger: 'blur' }
                    ],
                    serviceIP: [
                        { required: true, message: '请输入服务器IP', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入服务描述', trigger: 'blur' }
                    ],
                    dateRange: [
                        { required: true, message: '请输入服务器开始日期和结束日期', trigger: 'blur' }
                    ]
                }
            }
        }
    }
</script>

<style lang="less">
    #takeUpRoomAdd{
        .el-form{
            width: 55%;
            margin: 0 auto;
        }
    }
</style>
