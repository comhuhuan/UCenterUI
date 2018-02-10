<template>
    <el-dialog :title="title" :visible.sync="addSaveModal" @close="closeDialog" type="table" width="65%" v-loading.fullscreen="loadingFull" id="idcPerson">
        <el-form label-width="auto" inline :model="fromFilters"  ref="fromFilters">
            <el-form-item label="关键字">
                <el-tooltip class="item" effect="dark" content="关键字查询包括：用户单位名称，地址等信息！" placement="top">
                    <el-input size="mini" v-model="fromFilters.word" placeholder="关键字"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getTableList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableList" border :loading="isLoading" highlight-current-row @current-change="handleRowChange" @row-click="rowDetailEvt" @row-dblclick="addPerEvt" :max-height="300">
            <el-table-column label="姓名" prop="name" ></el-table-column>
            <el-table-column label="证件类型" prop="idenType" ></el-table-column>
            <el-table-column label="证件号码" prop="idenNum"></el-table-column>
            <el-table-column label="固定电话" prop="tel"></el-table-column>
            <el-table-column label="移动电话" prop="mobile"></el-table-column>
            <el-table-column label="Email地址" prop="email" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-bottom: 25px;margin-top: 10px;">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pageFilters.pageIndex"
                :page-size="pageFilters.pageSize"
                :page-sizes="pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addPerEvt">提 交</el-button>
            <el-button @click.native="closeDialog">关 闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { SaverList } from 'api/dxq/UserManage'
    import storage from 'utils/storage'
    import pageMixin from '@/mixins/pageMixin'
    export default {
        name: '',
        mixins: [pageMixin],
        data () {
        return {
            title:storage.get("formTitle"),
            loadingFull: false,
            isLoading: false,
            addSaveModal: true,
            currentRow: null,
            fromFilters: {
                keywordQuery: '',
            },
            tableList: [],
            curNotify:this.$notify,
        }
    },
    created () {
    },
    mounted () {
        this.getTableList()
    },
    methods: {
        getTableList () {
            this.isLoading = true
            const params = {
                ...this.fromFilters,
                ...this.pageFilters
            }
            SaverList(params).then(res => {
                if (res.status === 'success') {
                    this.tableList = res.message && res.message.rows ? res.message.rows : []
                    this.total = res.message.total
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
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
        closeDialog () {
            this.$emit("cancelClick")
        },
        handleRowChange(val) {
            this.currentRow = val;
        },
        //提交
        addPerEvt(){
            storage.set('rowData',this.currentRow)
            this.$emit("cancelClick")
            this.curNotify.close()
        },
        //点击查看详情
        rowDetailEvt(row, event, column){
            console.log(row)
            let infoDetailsTmpl = `
            <table class="saverTab">
                <tr><th >姓名:</th><td >${row['name']}</td></tr>
                <tr><th >证件类型:</th><td >${row['idenType']}</td></tr>
                <tr><th >证件号码:</th><td >${row['idenNum']}</td></tr>
                <tr><th >移动电话:</th><td >${row['mobile']}</td></tr>
                <tr><th >固定电话:</th><td >${row['tel']}</td></tr>
                <tr><th >Email:</th><td >${row['email']}</td></tr>
            </table>
            `
            this.curNotify.close()
            this.curNotify = this.$notify({
                title: '用户详细信息',
                dangerouslyUseHTMLString: true,
                message: infoDetailsTmpl,
                duration: 0
            });
        },
    }
    }
</script>
<style lang="less">
    #idcPerson{
    .el-dialog .el-dialog__body .el-form-item{
        padding-right: 0px;
    }
    }
    .saverTab{
        width:200px;
    th{
        text-align: right;color:#99a9bf;white-space: nowrap;
    }
    td{
        text-align: left;color: red; padding-left: 10px;;
    }
    }
</style>
