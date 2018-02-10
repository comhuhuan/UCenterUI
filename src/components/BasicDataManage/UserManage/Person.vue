<template>
    <el-dialog :title="title" :visible.sync="addPerModal" @close="closeDialog" type="table" width="65%" v-loading.fullscreen="loadingFull" id="idcPerson">
        <el-form label-width="auto" inline :model="fromFilters"  ref="fromFilters">
            <el-form-item label="关键字">
                <el-tooltip class="item" effect="dark" content="关键字查询包括：用户单位名称，地址等信息！" placement="top">
                    <el-input size="mini" v-model="fromFilters.keywordQuery" placeholder="关键字"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getTableList">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableList" border :loading="isLoading" highlight-current-row @current-change="handleRowChange" @row-dblclick="addPerEvt" :max-height="300">
            <el-table-column label="用户单位名称" prop="userUnitName" ></el-table-column>
            <el-table-column label="用户类型" prop="userType" show-overflow-tooltip>
                <template slot-scope="scope">
                        <span v-if="scope.row.userType === 1">提供应用服务的用户</span>
                        <span v-if="scope.row.userType === 2">其它用户</span>
                    </template>
            </el-table-column>
            <el-table-column label="证件类型" prop="idenType" ></el-table-column>
            <el-table-column label="证件号码" prop="idenNum" show-overflow-tooltip></el-table-column>
            <el-table-column label="安全责任人" prop="officerName"></el-table-column>
            <el-table-column label="单位地址" prop="unitAddr"></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
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
     import { getUserList } from 'api/dxq/UserManage'
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
            addPerModal: true,
            currentRow: null,
            fromFilters: {
                keywordQuery: '',
            },
            tableList: [],
        }
    },
    created () {
        console.log(storage.get("rowData"))
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
            getUserList(params).then(res => {
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
        },
    }
    }
</script>
<style lang="less">
    #idcPerson{
    .el-form{
        width: 100%;
        margin: 0 auto;
    }
    .el-dialog .el-dialog__body .el-form-item{
        padding-right: 0px;
    }
    }
</style>
