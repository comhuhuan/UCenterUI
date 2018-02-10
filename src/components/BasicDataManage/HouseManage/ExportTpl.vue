<template lang="html">
    <section class="exportTpl">
        <el-form label-width="120px" label-position="right">
            <fieldset v-for="item in list" :key="item.title"
                :class="{expand: curEditorOpt.subject === item.subject && isExpand, active: curEditorOpt.subject === item.subject}"
            >
                <legend @click="switchHandle(item.subject)">
                    {{item.title}}
                    <span class="el-icon-caret-right"></span>
                </legend>
                <!--<el-form-item label="导出字段选择：" class="" v-if="curEditorOpt.subject === item.subject">
                    <el-checkbox-group v-model="checkedFields" @change="checkedFieldsChange">
                        <el-checkbox v-for="name in item.fields" :label="name" :key="name">{{name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" @change="checkAllChange">全选</el-checkbox>
                </el-form-item>-->
                <el-form-item label="导出字段：" v-if="curEditorOpt.subject === item.subject" class="fields">
                    <span class="field" v-for="field in item.fields" :key="field" v-html="field"></span>
                </el-form-item>
                <el-form-item v-if="curEditorOpt.subject === item.subject">
                    <el-button type="primary" @click.native="exportHandle(item.subject)">导出</el-button>
                    <el-button type="primary" @click.native="setIsShowEditor(false)">返回</el-button>
                </el-form-item>
            </fieldset>
        </el-form>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as api from 'api/gjg/houseManage'

export default {
    name: 'exportTpl',
    data() {
        return {
            list: [
                {
                    title: '导出机房信息',
                    subject: 'house',
                    fields: ['IDC/ISP许可证号', '机房名称', '机房编号', '机房性质', '所在区域', '机房地址', '邮编', '机房管理员姓名', '证件类型', '证件号码', '移动电话', '固定电话', 'Email地址'],
                },
                {
                    title: '导出机房区域信息',
                    subject: 'area',
                    fields: ['机房名称', '机房编号', '机房片区名称', '机房片区编号', '机柜编号', '机柜名称', '使用类型', '分配状态', '占用状态', '楼层ID', '机柜的总行数', '机柜的总列数', '机柜位置'],
                },
                {
                    title: '导出IP地址段信息',
                    subject: 'ip',
                    fields: ['机房名称', '机房编号', '起始IP地址', '终止IP地址', 'IP地址使用方式', '使用单位名', '证件类型', '证件号码', '来源单位', '分配单位', '分配使用时间'],
                },
                {
                    title: '导出互联网出入口信息',
                    subject: 'network',
                    fields: ['机房名称', '机房编号', '网关IP', '带宽', '链路类型', '链路接入单位信息'],
                }
            ],
            checkedFields: [],
            isExpand: true,
            isCheckAll: false,
            isIndeterminate: false,
            fields: null
        }
    },
    computed: {
        ...mapGetters({
            curEditorOpt: "curHouseEditorOptions"
        })
    },
    created() {
        console.log( this.curEditorOpt )
        this.setCurFields()
    },
    methods: {
        ...mapMutations({
            setIsShowEditor: 'SET_IS_SHOW_HOUSSE_EDITOR',
            setCurEditor: 'SET_CUR_HOUSE_EDITOR'
        }),
        setCurFields() {
            this.list.some( item => {
                if( item.subject === this.curEditorOpt.subject) {
                    this.fields = item.fields
                }
            })
        },
        switchHandle(subject) {
            if(this.curEditorOpt.subject !== subject) {
                this.isExpand = true
                this.setCurEditor({
                    type: 'export',
                    subject
                })
                this.setCurFields()
                this.isIndeterminate = false
                this.checkedFields = []
                this.isCheckAll = false
                return
            }
            this.isExpand = !this.isExpand
        },
        checkAllChange(val) {
            // console.log(val)
            this.checkedFields = val ? this.fields : []
            this.isIndeterminate = false
        },
        checkedFieldsChange(value) {
            // console.log(value)
            const count = value.length
            this.isCheckAll = count === this.fields.length
            this.isIndeterminate = count > 0 && count < this.fields.length
        },
        exportHandle(subject) {
            const fields = this.checkedFields
            if(fields.length === 0) {
                this.$message({
                    showClose: true,
                    message: '请先选择需要导出的字段',
                    type: 'error'
                })
                return
            } else {
                subject = subject === 'area' ? 'houseArea' : subject
                const key = `export${subject.substring(0,1).toUpperCase()+subject.substring(1)}`
                const loadingInstance  = this.$loading({
                    fullscreen: true
                })
                api[key](fields).then(res => {
                    const flag = res.status === 'success'
                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '导出成功' : res.message,
                        // message: res.message,
                        showClose: true,
                    })
                    // if( flag ) {
                    //     this.getHouseList()
                    // }
                    loadingInstance.close()
                }).catch( err => {
                    console.log(err)
                    loadingInstance.close()
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.exportTpl {
    .el-form-item {
        .el-form-item__label {
            padding: 0!important;
        }
        .el-checkbox {
            margin-left: 10px!important;
        }
        &.fields {
            .field {
                display: inline-block;

                &:not(:last-child)::after {
                    content: "|";
                    display: inline-block;
                    padding: 0 6px;
                    // color: #f68300;
                }
            }
        }
    }
}
</style>
