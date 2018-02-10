export default {
    data() {
        return {
            
        }
    },
    methods: {
			//转义匹配模式
      transMatchMode() {
          for(let i=0;i<this.tableList.length;i++){
              for(let j=0;j<this.matchModeList.length;j++){
                  if(this.tableList[i].matchModel === this.matchModeList[j].value){
                      this.tableList[i].matchModel = this.matchModeList[j].label
                  }                    
              }                
          }
      }              
    }
}
