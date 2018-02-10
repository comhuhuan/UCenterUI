<template>
    <el-dialog :title="title" :visible.sync="selectPersonModal" @close="closeDialog" type="table" v-loading.fullscreen="loadingFull" id="select-person-model">
        <el-tooltip class="item" effect="dark"  content="关键字查询包括：姓名，证件号码，移动电话" placement="right">
            <el-input v-model="keyword" placeholder="关键字查询" size="mini">
                <el-button slot="append" @click="getTableList">选择</el-button>
            </el-input>
        </el-tooltip>
        <el-table :data="tableList" border :loading="isLoading" highlight-current-row @row-dblclick="rowDbClick" @row-click="rowDetailEvt" :max-height="tableMaxHeight">
            <el-table-column label="姓名" prop="name" ></el-table-column>
            <el-table-column label="证件类型" prop="idenType">
                <template slot-scope="scope">
                    {{idenTypeList[scope.row.idenType]}}
                </template>
            </el-table-column>
            <el-table-column label="证件号码" prop="idenNum" show-overflow-tooltip></el-table-column>
            <el-table-column label="固定电话" prop="tel"></el-table-column>
            <el-table-column label="移动电话" prop="mobile"></el-table-column>
            <el-table-column label="Email地址" prop="email" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="bottom-operate">
            <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageFilters.pageIndex"
                :page-size="pageFilters.pageSize" layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitSelectPreson">提 交</el-button>
            <el-button @click.native="closeDialog">关 闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { getDutyOfficerList } from 'api/xiajun/basicDataManage'
    import storage from 'utils/storage'
    import pageMixin from '@/mixins/pageMixin'
    import tableMixin from '@/mixins/tableMixin'

    export default {
        name: 'SelectPersonModal',
        props: {
            params: {
                type: Object,
                default: null
            }
        },
        mixins: [pageMixin, tableMixin],
        data () {
            return {
                title: '责任人列表',
                loadingFull: false,
                isLoading: false,
                selectPersonModal: true,
                currentRow: null,
                curNotify: this.$notify,
                total:0,
                totalPageCount:0,
                idenTypeList: {
                    '0': '全部',
                    '2': '身份证',
                    '7': '护照',
                    '8': '军官证',
                    '9': '台胞证'
                },
                tableList: [],
                keyword: '',
                selectPreson: null,
                gap: $(window).height()*0.15 + 258
            }
        },
        created() {
            this.getTableList()
        },
        methods: {
            getTableList() {
                this.isLoading = true
                const params = {...this.pageFilters, ...{keyword: this.keyword}}
                getDutyOfficerList(params).then( res => {
                    if (res.state === 'success'){
                        this.tableList = res.message.rows
                        this.total = res.message.total
                        // this.totalPageCount = res.message.totalPageCount
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true
                        })
                    }
                    this.isLoading = false
                }).catch( err => {
                    this.$message({
                        type: 'error',
                        message: '请求不成功',
                        showClose: true,
                    })
                    this.isLoading = false
                })
            },
            rowDetailEvt(row, event, column) {
                this.selectPreson = row
                let infoDetailsTpl = `
                <table style="width:200px;" class="select-person-table">
                    <tr><td class="label">姓名：</td><td class="value">${row['name']}</td></tr>
                    <tr><td class="label">证件类型：</td><td class="value">${this.idenTypeList[row['idenType']]}</td></tr>
                    <tr><td class="label">证件号码：</td><td class="value">${row['idenNum']}</td></tr>
                    <tr><td class="label">移动电话：</td><td class="value">${row['mobile']}</td></tr>
                    <tr><td class="label">固定电话：</td><td class="value">${row['tel']}</td></tr>
                    <tr><td class="label">Email：</td><td class="value">${row['email']}</td></tr>
                </table>
                `
                this.curNotify.close()
                this.curNotify = this.$notify({
                    title: '用户详细信息',
                    dangerouslyUseHTMLString: true,
                    position: 'top-right',
                    message: infoDetailsTpl,
                    duration: 10000,
                    type: 'info'
                })
            },
            rowDbClick(row, evt) {
                this.selectPreson = row
                this.submitSelectPreson()
            },
            closeDialog () {
                this.curNotify.close()
                this.$emit("cancelClick")
            },
            /*handleRowChange(val) {
                this.selectPreson = val;
            },*/
            submitSelectPreson() {
                if(this.selectPreson) {
                    this.curNotify.close()
                    this.$emit('selectedPreson', this.selectPreson)
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择责任人',
                        type: 'error'
                    })
                }

            }
        }
    }
</script>
<style lang="less">
#select-person-model{
    .el-dialog {
        width: 64%!important;
    }
    .el-dialog__body {
        padding-top: 10px!important;
    }
    .el-tooltip.el-input {
        margin-bottom: 10px;
        width: 280px;
    }

}
.select-person-table {
    .label {
        text-align: right;
        color: #99a9bf;
        white-space: nowrap;
    }
    .value {
        color: #fa0;
    }
}
</style>
