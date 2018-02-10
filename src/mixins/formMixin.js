export default {
    data() {
        return {
            formLoading: false
        }
    },
    methods: {
        validateHandle(formName, fn) {
			this.$refs[formName].validate( valid => {
                // console.log(valid)
				if(valid) {
					fn && fn()
				}
			})
		},
		resetForm(formName) {
			if(this.$refs[formName]) {
				this.$refs[formName].resetFields()
			}
		}
    }
}
