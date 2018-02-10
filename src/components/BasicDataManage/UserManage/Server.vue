<template>
    <el-dialog :title="title" :visible.sync="addSerModal" @close="closeDialog" type="table" width="50%"
               v-loading.fullscreen="loadingFull" id="serverUser">
        <el-row :gutter="20">
            <el-col :span="11">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 30px;">服务内容列表</span>
                    </div>
                    <el-radio-group v-model="radio" size="mini" @change="checkType">
                        <el-radio-button label="全选" ></el-radio-button>
                        <el-radio-button label="全不选" ></el-radio-button>
                        <el-radio-button label="反选"></el-radio-button>
                    </el-radio-group>
                    <ul id="treeDemo" class="ztree" style="height: 300px; margin-top: 10px;"></ul>
                </el-card>
            </el-col>
            <el-col :span="2">
                <el-button type="info" icon="el-icon-d-arrow-right" @click="toRight" style="margin-top: 200px;"></el-button>
            </el-col>
            <el-col :span="11">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 30px;">被选中服务内容列表</span>
                        <el-button type="success" style="float: right; margin-top: 3px;" @click="delEvt">清空</el-button>
                    </div>
                    <ul id="treeRight" class="ztree" style="height: 326px;"></ul>
                </el-card>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="initZTree">提 交</el-button>
            <el-button @click.native="closeDialog">关 闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import storage from 'utils/storage'
    export default {
        name: '',
        data () {
        return {
            title:storage.get("ServerTitle"),
            loadingFull: false,
            isLoading: false,
            addSerModal: true,
            radio:'',
            zTreeSetting: {
                check: {
                    enable: true
                },
                data: {
                    key: {
                        title:"t"
                    },
                    simpleData: {
                        enable: true
                    }
                },
            },
            zTreeNodes: [
                { id:1, pId:0, name:"科室一", open:true},
                { id:11, pId:1, name:"张三", open:true},
                { id:12, pId:1, name:"李四"},
                { id:13, pId:1, name:"赵钱"},

                { id:2, pId:0, name:"科室二", open:true},
                { id:11, pId:2, name:"张三"},
                { id:21, pId:2, name:"王老虎" },
                { id:22, pId:2, name:"吴胖子" },
                { id:23, pId:2, name:"李胖子" },

                { id:3, pId:0, name:"科室三",open:true,  },
                { id:31, pId:3, name:"孙小小" },
                { id:32, pId:3, name:"吴大胖" },
                { id:33, pId:3, name:"李子" }
            ],
        }
    },
    created () {
    },
    mounted () {
        this.$nextTick(function () {
            this.initZTree()
        })
    },
    methods: {
        checkType(val){
            console.log(val)
            if(val=="全选"){
                var treeObj = window.$.fn.zTree.getZTreeObj("treeDemo");
                treeObj.checkAllNodes(true);
            }else if(val=="全不选"){
                var treeObj =  window.$.fn.zTree.getZTreeObj("treeDemo");
                treeObj.checkAllNodes(false);
            }else {
                var treeObj = window.$.fn.zTree.getZTreeObj("treeDemo");
                var CheckNodes = treeObj.getCheckedNodes(true);
                var unCheckNodes = treeObj.getCheckedNodes(false);
                for(var i=0;i<CheckNodes.length;i++){
                    treeObj.checkNode(CheckNodes[i], false, true);
                }
                for(var j=0;j<unCheckNodes.length;j++){
                    treeObj.checkNode(unCheckNodes[j], true, true);
                }
            }
        },
        initZTree () {
           // console.log( window.$.fn.zTree)
           // console.log(this.$refs.treeDemo)
            var obj=$("#treeDemo")
            window.$.fn.zTree.init(obj, this.zTreeSetting, this.zTreeNodes)
        },
        //向右添加
        toRight(){
            var treeObj = window.$.fn.zTree.getZTreeObj("treeDemo");
            var allNode=treeObj.getNodes()
            //获取所有选中的节点
            for(var i=0;i<allNode.length;i++){
                var singleNode=allNode[i].children
                for(var j=0; j<singleNode.length;j++){
                    if(singleNode[j].checked==true){
                        this.qc(singleNode[j].name,singleNode[j].id)
                    }
                }
            }
        },
        //去重
        qc(name,id){
                console.log(name,id)
                var len=$("#treeRight li").length
                var txt="<li dataId="+id+">"+name+"<a href='#' class='closeLi'><i class='el-icon-circle-close'></i></a> </li>"
                if(len>0){
                    var flag=true;
                    for(var i=0;i<len;i++){
                        if($.trim($("#treeRight li").eq(i).text()) == name){
                            flag=false;
                        }
                    }
                    if(flag==true){
                        $("#treeRight").append(txt);
                    }

                }else {
                    $("#treeRight").append(txt)
                }

                $(".closeLi").on("click",function(){
                    $(this).parent().remove()
                })
        },
        //清空按钮
        delEvt(){
            $("#treeRight").html(" ")
            //清空选择的节点
            var treeObj = window.$.fn.zTree.getZTreeObj("treeDemo");
            treeObj.checkAllNodes(false);
        },
        closeDialog () {
            this.$emit("cancelClick")
        },
        //提交
        addPerEvt(){
            storage.set('perName',this.currentRow.userName)
            this.$emit("cancelClick")
        }
    }
    }
</script>
<style lang="less">
    #serverUser{
    .el-card__header{ padding: 5px 20px;}
    #treeRight{
        padding: 10px;
        li{
            background-color: #eff1f1; height: 27px; line-height: 27px; color: #3b6c7c; margin-bottom: 5px; padding: 0 10px; float: left; margin-right: 10px;
            -webkit-border-radius:5px; border-radius:5px;
            .closeLi{
                color: #88b8ca; margin-left: 20px;
            }
         &:hover{
           background-color:#dce4e7;
            .closeLi{
                color: #58889a;
            }
          }
        }
    }
}
</style>
