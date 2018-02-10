export default {
    data() {
        return {

        }
    },
    methods: {
        validateUploadFile(rule, values, callback) {
            // console.log(rule, values, callback)
            if(values.length > 1) {
                return callback('一次只能导入一个文件')
            }

            // const fileNameList = []
            values.some( item => {
                // if(fileNameList.includes(item.name)) {
                //     callback('已存在相同的文件')
                //     return true
                // }
                // fileNameList.push(item.name)

                const supportFiles = ['xls', 'xlsx']
                const extension = item.name.split('.')[1]
                const size = item.size/1024/1024
                // console.log(supportFiles.includes(extension) , size < 0.0001)
                // callback('导入文件只能是 xls、xlsx格式')
                if(!supportFiles.includes(extension)) {
                    callback('导入文件只能是 xls、xlsx格式')
                    return true
                }
                if(size > 10) {
                    callback('文件大小不能超过10M')
                    return true
                }
                return false
            })

            callback()
        },
        validateUploadDispatch(fileList) {
            this.formFilter[this.uploadKey] = fileList
            this.$refs.formFilter.validateField(this.uploadKey)
        },
        uploadChange(file, fileList) {
            // console.log(file, fileList)
            this.validateUploadDispatch(fileList)
        },
        upLoadRemove(file, fileList) {
            this.validateUploadDispatch(fileList)
        },
        // 上传成功后的回调
        uploadSuccess (response, file, fileList) {
            this.$message({
                showClose: true,
                message: '导入成功',
                type: 'success'
            })
            console.log('导入成功', response)
        },
        // 上传错误
        uploadError (response, file, fileList) {
            this.$message({
                showClose: true,
                message: '导入失败',
                type: 'error'
            })
            console.log('导入失败，请重试！')
        },
    }
}
