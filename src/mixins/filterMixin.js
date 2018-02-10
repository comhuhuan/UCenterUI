export default {
    filters: {
        executingState(value) {
            if(value === '下发(成功)' || value === '取消(成功)') {
                return 'success'
            } else {
                return 'error'
            }

        }
    }
}
