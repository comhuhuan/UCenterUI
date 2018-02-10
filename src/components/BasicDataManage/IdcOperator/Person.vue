<template>
    <el-dialog :title="title" :visible.sync="addPerModal" @close="closeDialog" type="table" width="65%" v-loading.fullscreen="loadingFull" id="idcPerson">
        <el-form label-width="auto" inline :model="fromFilters"  ref="fromFilters" style="float: left;">
            <el-form-item label="关键字">
                <el-tooltip class="item" effect="dark" content="关键字查询包括：姓名，证件号码，移动电话！" placement="top">
                    <el-input v-model="fromFilters.keywordQuery" placeholder="关键字"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableList" border :loading="isLoading" highlight-current-row @current-change="handleRowChange" @row-dblclick="rowDbClick" @row-click="rowDetailEvt">
            <el-table-column label="姓名" prop="name" ></el-table-column>
            <el-table-column label="证件类型" prop="idenTypeId" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{idenTypeList[scope.row.idenTypeId]}}
                </template>
            </el-table-column>
            <el-table-column label="证件号码" prop="idenNum"></el-table-column>
            <el-table-column label="固定电话" prop="tel"></el-table-column>
            <el-table-column label="移动电话" prop="mobile"></el-table-column>
            <el-table-column label="Email地址" prop="email" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-bottom: 15px;margin-top: 5px;">
            <el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="fromFilters.pageIndex" :page-size="fromFilters.pageSize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addPerEvt">提 交</el-button>
            <el-button @click.native="closeDialog">关 闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { findUser, findIdenTypeById } from 'api/xiajun/basicDataManage'
    import storage from 'utils/storage'
    export default {
        name: 'idcPerson',
        props: {
            personType: {
                type: String,
                required: true
            },
            formTitle: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                title:this.formTitle,
                loadingFull: false,
                isLoading: false,
                addPerModal: true,
                currentRow: null,
                curNotify:this.$notify,
                currRow:{},
                total:0,
                totalPageCount:0,
                btnFlag:false,
                userType: this.personType,
                idenTypeList: {
                    0: '全部',
                },
                fromFilters: {
                    keywordQuery: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableList: []
            }
    },
    created() {
        this.isLoading = true
        findIdenTypeById({}).then(res => {
            if (res.state === 'success'){
                let idenObj = {}
                res.message.forEach( item => {
                    idenObj[item.idenTypeId] = item.idenTypeName
                })
                Object.assign(this.idenTypeList, idenObj)
                console.log(this.idenTypeList)
                this.getList()
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
    methods: {
        getList() {
            this.isLoading = true
            findUser(this.fromFilters).then( res => {
                if (res.state === 'success'){
                    this.tableList = res.message.rows
                    this.total = res.message.total
                    this.totalPageCount = res.message.totalPageCount
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
            this.currRow = row
            let infoDetailsTmpl = `
            <table style="width:200px;">
                <tr><td style="text-align: right;color:#99a9bf;white-space: nowrap;">姓名:</td><td style="text-align: left;color: red;">${row['name']}</td></tr>
                <tr><td style="text-align: right;color:#99a9bf;white-space: nowrap;">证件类型:</td><td style="text-align: left;color: red;">${this.idenTypeList[row['idenTypeId']]}</td></tr>
                <tr><td style="text-align: right;color:#99a9bf;white-space: nowrap;">证件号码:</td><td style="text-align: left;color: red;">${row['idenNum']}</td></tr>
                <tr><td style="text-align: right;color:#99a9bf;white-space: nowrap;">移动电话:</td><td style="text-align: left;color: red;">${row['mobile']}</td></tr>
                <tr><td style="text-align: right;color:#99a9bf;white-space: nowrap;">固定电话:</td><td style="text-align: left;color: red;">${row['tel']}</td></tr>
                <tr><td style="text-align: right;color:#99a9bf;">Email:</td><td style="text-align: left;color: red;">${row['email']}</td></tr>
            </table>
            `
            this.curNotify.close()
            this.curNotify = this.$notify({
                title: '用户详细信息',
                dangerouslyUseHTMLString: true,
                position: 'top-right',
                message: infoDetailsTmpl,
                duration: 0
            });

        },
        rowDbClick(row, evt) {
            this.$emit('selectUser',this.userType,{name:row.name})
            this.closeDialog()
        },
        closeDialog () {
            this.curNotify.close()
            this.$emit("cancelClick")
        },
        handleRowChange(val) {
            this.currentRow = val;
        },
        //一页显示多少条
        handleSizeChange (val) {
            this.fromFilters.page_size = val;
            this.handleCurrentChange(1);
        },
        //上下页
        handleCurrentChange (val) {
            this.fromFilters.pageNo = val;
            this.getList();
        },
        //提交
        addPerEvt(){
            this.$emit('selectUser',this.userType,{name:this.currRow.name})
            this.closeDialog()
        }
    }
    }
</script>
<style lang="less">
    #idcPerson{
        .el-form{
            width: 40%;
            margin: 0 auto;
        }
        .el-dialog .el-dialog__body .el-form-item{
            padding-right: 0px;
        }
    }
</style>
