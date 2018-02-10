export default {
	data() {
		return {
			activeName: '主页',
			expands: [],
			tableMaxHeight: ''
		}
	},
	mounted() {
        this.$nextTick( _ => {
			 // console.log($(window).height())
			if(this.gap) {
				this.setTableHeight()
	            $(window).on('resize', _ => {
	                 this.setTableHeight()
	            })
			}
        })
    },
	methods: {
		setTableHeight() {
			this.tableMaxHeight = $(window).height() - this.gap
		},
		toggleRowExpansion(row, expandedRows) {
			// console.log(expandedRows)
			if(this.expandsKey) {
				if(this.expands[0] !== row[this.expandsKey]) {
					this.expands = []
					this.expands.push(row[this.expandsKey])
					if(this.detailsIsLoading) {
						this.getDetails(row)
					}

				} else {
					this.expands = []
				}
			}
		},
	}
}
