<template>
	<div id="userManage">
		<div class="tabList" v-show="isTab">
			<ul>
				<li v-for="(item,index) in tabList" :key="index" :class="{'active':index==activeId}" @click="tabEvt(index)">
					<a href="#" >
						{{item.label}}</a>
				</li>
			</ul>
		</div>
        <div class="tableList">
            <user-manage v-if="activeId==0" @tabDis="isTab=false" @tabShow="isTab=true"></user-manage>
            <apply-server v-if="activeId==1" @tabDis="isTab=false" @tabShow="isTab=true"></apply-server>
            <take-room v-if="activeId==2" @tabDis="isTab=false" @tabShow="isTab=true"></take-room>
        </div>
	</div>
</template>

<script>
import userManage from './userManage'
import applyServer from './applyServer'
import takeRoom from './takeRoom'

export default {
	name: 'UserManage',
	components: { userManage, applyServer, takeRoom },
	data () {
		return {
			activeId: 0,
			isTab:true,
			tabList: [
				{ value: '0', label: '用户管理' },
				{ value: '1', label: '应用服务管理' },
				{ value: '2', label: '占用机房管理' },
			]
		}
	},
	methods: {
		tabEvt (index) {
			this.activeId = index
		}
	}
}

</script>

<style lang="less" scope>
#userManage {
    position: relative;
    height:100%;
	.tabList {
        width: 30px;
        height: 100%;
        position: absolute;
        right: 0;
        top:0;
        background: #f8f8f8;
        border-left:1px solid #e0e0e0;
		ul {
			margin: 0;
			padding: 0;
			li {
				text-align: center;
				font-size: 12px;
				cursor: pointer;
				&.active{
                     background-color: #e2eff7;
					a{
						color: #00A1CC;
					}
				}
                &:hover {
                     background-color: #eee;
                 }
				a {
                    width: 16px;
                    line-height: 16px;
                    white-space: normal;
                    word-break: break-all;
					color: #666;
					display: inline-block;
                    padding: 15px 0 10px;
				}
			}
		}
	}
   .tableList{
       width: calc(~'100% - 30px');
       height: 100%;
       float: left;
   }
}
</style>
