export default {
    data() {
        return {
            activeName: '主页',
            tabs_list: [],
        }
    },
    methods: {
        addTab(data) {
            let exist = false
            const name = data.name
            this.tabs_list.some( (item, i) => {
                // console.log(item, name)
                if(item.name === name){
                    exist = true
                    return true
                }
            })
            if(exist) {
                this.removeTabHandle(name)
            }
            // console.log(this.tabs_list)
            setTimeout( _ => {
                this.tabs_list.push( data )
                this.activeName = name
            })
        },
        setActiveTab(tab) {
            this.activeName = tab.name
        },
        removeTabHandle(tabName) {
            const newTabs = []
            this.tabs_list.forEach( item => {
                if(item.name !== tabName){
                    newTabs.push(item)
                }
            })
            const len = newTabs.length
            if(len > 0) {
                this.activeName = newTabs[len - 1].name
                this.tabs_list = newTabs
            } else {
                this.tabs_list = []
                this.activeName = '主页'
            }
            // console.log(this.tabs_list)
        }
    }
}
