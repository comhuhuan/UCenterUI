<template>
	<section class="detailPage">
        <PanelHead :options="panelOpt">
            <span slot="icon">
                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="backHandle"></a>
            </span>
        </PanelHead>
         <el-table :data="tableList" border :loading="isLoading" :max-height="tableMaxHeight">
                <el-table-column label="名称" prop="netName"></el-table-column>
                <el-table-column label="域名" prop="secondDomain"></el-table-column>
                <el-table-column label="IP地址" prop="ipAddress"></el-table-column>
            </el-table>
        <div class="bottom-operate">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pageFilters.pageIndex"
                :page-size="pageFilters.pageSize"
                :page-sizes="pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
	</section>
</template>

<script>
    import { NoRecordDomainDetail } from 'api/dxq/joinSource'
    import tableMixin from '@/mixins/tableMixin'  //表格操作及高度
    import pageMixin from '@/mixins/pageMixin'   //分页
    import PanelHead from 'components/Common/PanelHead'
	export default {
		name: 'detail',
        mixins: [tableMixin, pageMixin],
        components: {
            PanelHead
        },
        props: {
            tabName: {
                type: String,
                required: true
            },
            params: {
                type: Object,
                required: true
            }
        },
		data() {
			return {
                tableList:[],
                panelOpt: {
                    title: this.params.serviceName,
                    hasIcon: true
                },
                gap: 218
			}
		},
        created () {
            this.getTableList()
            console.log(this.params)
        },
		methods: {
            getTableList () {
                this.isLoading = true
                const par={domainOne:this.params.domainOne,serviceCode:this.params.serviceCode}
                const params = {...par, ...this.pageFilters}
                NoRecordDomainDetail(params).then(res => {
                    if (res.state === 'success') {
                        this.tableList = res.message.rows
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
			backHandle() {
				this.$emit('cancelTab',this.tabName)
			}
		}
	}
</script>

<style lang="less">
    .detailPage {
        max-height: 100%;
        overflow: auto;
        margin-top: -10px;
    .el-table {
        margin-top: 10px;
    }
    }
</style>
