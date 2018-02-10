<template>
	<el-header height="50px">
		<div class="brand left">
			<a href="javascript:;">
				<i class="icon iconfont icon-xinxianquanguanlitixi"></i>
				信息安全
			</a>
		</div>
		<section class="nav-left">
			<el-menu :default-active="active_tab.path" mode="horizontal" unique-opened router v-if="layout === 'top'">
		        <el-submenu :index="menu.path" v-for="menu in $router.options.routes" :key="menu.path" v-if="!menu.hidden && menu.children">
		          	<template slot="title" v-touch-ripple>
			            <i class="icon iconfont" :class="menu.icon"></i>
			            <!-- <span slot="title">{{menu.name}}</span> -->
		          	</template>
		          	<el-menu-item v-for="submenu in menu.children" v-if="!submenu.hidden"  :key="submenu.path" :index="submenu.path" v-touch-ripple>
			            <i :class="submenu.icon"></i>
			            <span slot="title">{{ submenu.name }}</span>
		          	</el-menu-item>
		        </el-submenu>
		    </el-menu>
		</section>
	    <div class="nav-right">
			<el-dropdown trigger="hover" @command="userHandle">
				<span class="el-dropdown-link">
					<i class="icon iconfont icon-yonghu1"></i>
					&nbsp;&nbsp;Admin
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<!-- <el-dropdown-item>
							<a href="javascript:;"><i class="icon iconfont icon-fanhui1"></i>返回</a>
						</el-dropdown-item>
						<el-dropdown-item>
							<a href="javascript:;"><i class="icon iconfont icon-guanyu"></i>关于</a>
						</el-dropdown-item>
						<el-dropdown-item>
							<a href="javascript:;"><i class="icon iconfont icon-fanhui1"></i>退出</a>
						</el-dropdown-item> -->
					<el-dropdown-item v-for="(item, index) in userList" :key="index" :command="item.command">
						<i class="icon iconfont" :class="item.icon"></i>&nbsp;&nbsp;{{item.label}}
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown trigger="hover" @command="colorHandle">
				<span class="el-dropdown-link">
					系统设置
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<h5 class="setHeader">选择布局</h5>
					<el-dropdown-item command="left">
						<i class="icon iconfont icon-buju"></i>&nbsp;&nbsp;左右布局
					</el-dropdown-item>
					<el-dropdown-item command="top" class="menu-border">
						<i class="icon iconfont icon-buju1"></i>&nbsp;&nbsp;&nbsp;上下布局
					</el-dropdown-item>
					<h5 class="setHeader">系统换肤</h5>
					<el-dropdown-item v-for="(item,index) in themes" :key="index" :command="item.bg">
						<i class="color_item" :style="item.style"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-header>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import storage from 'utils/storage'

export default {
	name: 'Header',
	data () {
		return {
			themes: [
				{
					name: '冷酷黑', style: 'background: #000;', bg: 'skin-black'
				},
				{
					name: '酷炫蓝', style: 'background: #03559e;', bg: 'skin-blue'
				},
				{
					name: '清新绿', style: 'background: #217b2b;', bg: 'skin-green'
				}
			],
			userList: [
				{ icon: 'icon-iconfontfanhui', label: '返回', command: 'goback' },
				{ icon: 'icon-guanyu', label: '关于', command: 'about' },
				{ icon: 'icon-tuichuxitong', label: '退出', command: 'logout' },
			],
			layout: storage.get('layout') || 'left',
			// layout: 'left',
		}
	},
	computed: {
	    ...mapGetters([
	      	'active_tab',
	    ])
  	},
  	mounted() {
      	// this.$nextTick( _ => {

      	// })
    },
	methods: {
		...mapActions([
      		'add_tabs',
      		'active_menu'
    	]),
		colorHandle (command) {
			if (command.indexOf("skin") > -1) {
				//换肤
				this.$root.$el.parentNode.className = command
				storage.set('skin', command)
			} else {
				//布局
				storage.set('layout', command)
				this.layout = command
				this.$emit('setLayout', command)
			}
		},
		userHandle (command) {
			this[command]()
		},
		goback () {
			console.log('goback')
		},
		about () {
			console.log('about')
		},
		logout () {
			console.log('logout')
		}
	}
}
</script>


<style lang="less" scoped>
	.el-header {
		padding: 0;
		color: #fff;
		// display: flex;
		flex-direction: row;

		.brand {
			display: inline-block;
			height: 50px;
			line-height: 50px;
			width: 180px;


			a {
				padding: 0 20px;
				display: block;
				color: #fff;
				font-size: 20px;
				box-sizing: border-box;

				i {
					font-size: 30px;
					padding-right: 10px;
					color: #fff;
				}
			}
		}

        .el-menu {

 	        .el-menu-item {
 	        	color: #fff!important;
 	        	border: none;
 	        	span {
 	        		vertical-align: top;
 	        	}
 	        }

 	        .icon {
 	        	color: #fff!important;
				font-size: 26px;
 	        }
 	        &.el-menu--horizontal {
				border: none;
				// height: 50px;

				.el-submenu {
					height: 50px;
					border: none;

					>.el-menu {
						top: 55px !important;
					}
				}
			}
		}
		.nav-left {
			// width: calc(~'100% - 400px');
			// height: 50px;
	 		// overflow-x: hidden;
	 		// overflow-y: auto;
	 		flex-direction: row;
		 	align-items: center;
	 	    display: flex;
	        flex-wrap: wrap;
	        margin-right: auto !important;
	        float: left;
	    }
		.nav-right {
			flex-direction: row;
   		 	align-items: center;
	 	    display: flex;
 	        flex-wrap: wrap;
 	        margin-left: auto !important;
 	        float: right;
		}
		.el-dropdown {
			color: #fff;
			cursor: pointer;
			padding: 0 15px;
			height: 50px;
			line-height: 50px;
		}

	}
	.color_item {
		display: inline-block;
		width: 15px;
		height: 15px;
		vertical-align: middle;
	}


</style>

<style lang="less">

	.el-header {

	 	.el-menu.el-menu--horizontal {
			// width: 1800px;
			.el-submenu {
				>.el-menu {
					top: 50px !important;
					padding: 0 !important;
				}
				.el-submenu__title {
					height: 50px!important;
					line-height: 50px!important;
	                border-bottom: 0!important;
	                color: #fff!important;
	                padding: 0 15px!important;

	                i {
	                	color: #fff!important;
	                }
					.el-submenu__icon-arrow.el-icon-arrow-down {
						display: none;
					}
				}
			}
	 	}
	}


	/* @media (min-width: 768px) and (max-width: 991px) {
		.el-header {
			.el-menu.el-menu--horizontal {
				max-width: calc
			}
		}
	}
	@media (max-width: 768px) {
		.el-header {
			.el-menu.el-menu--horizontal {
				max-width:
			}
		}
	}
	@media (min-width: 768px) {
		.el-header {
			.el-menu.el-menu--horizontal {
				max-width:
			}
		}
	}
	@media (min-width: 768px) {
		.el-header {
			.el-menu.el-menu--horizontal {
				max-width:
			}
		}
	} */
</style>
