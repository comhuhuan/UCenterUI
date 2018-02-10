import { mapGetters, mapMutations } from 'vuex'

export default {
    /*data() {
        return {

        }
    },*/
    computed: {
        ...mapGetters({
            curEditorType: "curHouseEditorType",
            curEditorOpt: 'curHouseEditorOptions'
        }),
    },
    created() {
        if(this.curEditorType === 'modify') {
            if(this.formFilter) {
                this.formFilter = { ...this.formFilter, ...this.curEditorOpt.data }
            }
        }
    },
    methods: {
        ...mapMutations({
            setIsShowEditor: 'SET_IS_SHOW_HOUSSE_EDITOR'
        }),
    }
}
