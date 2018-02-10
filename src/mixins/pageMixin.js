export default {
    data() {
        return {
            pageFilters: {
                pageIndex: 0,
                pageSize: 20,
            },
            pageSizes: [15, 20, 30, 50],
            total: 0
        }
    },
    methods: {
        //一页显示多少条
        handleSizeChange (val) {
            this.pageFilters.pageSize = val;
            this.handleCurrentChange(1);
        },
        // 上下页
        handleCurrentChange (val) {
            this.pageFilters.pageIndex = val;
            this.getTableList();
        },
    }
}
