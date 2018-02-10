<template>
	<el-aside :width="is_collapse ? '50px' : '180px'">
		<div class="toggler-container menu-border">
	        <a class="sidebar-toggler" :class="is_collapse ? 'sidebar-toggler-col' : 'sidebar-toggler-row'" href="javascript:;" @click="setIsCollapse">
	          <span v-for="num in 3" :key="num" class="item"></span>
	        </a>
	    </div>
	    <!-- 展开的menu -->
	    <transition name="fade" mode="out-in" v-if="!is_collapse">
			<el-menu :default-active="active_tab.path"
				unique-opened
				router
				text-color="#fff"
			>
				<el-submenu :index="menu.path" v-for="menu in $router.options.routes" :key="menu.path" v-if="!menu.hidden && menu.children" class="menu-border">
			  		<template slot="title" v-touch-ripple>
					    <i class="icon iconfont" :class="menu.icon"></i>
					    <span slot="title">{{menu.name}}</span>
			    	</template>
			    	<el-menu-item v-for="submenu in menu.children" :key="submenu.path" :index="submenu.path" v-if="!submenu.hidden" v-touch-ripple>
			    		<i :class="submenu.icon"></i>
				    	<span slot="title">{{ submenu.name }}</span>
				    </el-menu-item>
			  	</el-submenu>
			</el-menu>
		</transition>
		<!-- 折叠的menu -->
		<transition name="fade" mode="out-in" v-else>
			<div class="menu-collapse">
				<ul>
					<li v-for="menu in $router.options.routes"
						:key="menu.path"
						:class="{'is-active': $route.matched[0].redirect === menu.redirect}"
						v-if="!menu.hidden"
						class="menu-border"
					>
						<el-popover placement="right" width="180" trigger="hover" popper-class="menu-popover">
					  		<a href="javascript:;" slot="reference">
					  			<i class="icon iconfont" :class="menu.icon"></i>
					  		</a>
						  	<ul>
						  		<router-link
						  			v-for="submenu in menu.children"
						  			tag="li"
						  			:to="submenu.path"
						  			:key="submenu.path"
									v-if="!submenu.hidden"
					  			>
						  			<a href="" v-touch-ripple>
						  				<i class="icon iconfont" :class="submenu.icon" v-if="submenu.icon"></i>
							  			{{ submenu.name }}
							  		</a>
						  		</router-link>
						  	</ul>
						</el-popover>
					</li>
				</ul>
			</div>
		</transition>
	</el-aside>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from 'vuex'

	export default {
		name: 'Sidebar',
		data() {
			return {
				isCollapse: false,
			}
		},
		created() {
		},
		computed: {
			...mapGetters([
				'active_tab',
				'is_collapse'
			])
		},
		methods: {
			...mapActions([
				'active_menu',
			]),
			...mapMutations({
				'setIsCollapse': 'SET_IS_COLLAPSE'
			})
		}
	}
</script>

<style lang="less" scoped>

	.el-aside {
	    position: fixed;
	    height: 100%;
	    // height: 10000px;
		// height: calc(~"100vh - 50px");
		left: 0;
		// overflow-y: hidden;
		// overflow-y: auto;
		// overflow-x: hidden;

		.sidebar-toggler {
	      	display: flex;
	      	color: #fff !important;
	      	padding: 6px 0;
	      	padding-left: calc(50% - 4px);
	      	font-size: 16px;
	      	.item {
		        display: inline-block;
		        background-color: #fff;
	      	}
	      	&.sidebar-toggler-col {
		        flex-flow: column;
		        .item {
		          	height: 1px;
		          	width: 8px;
		          	margin-bottom: 2px;
		        }
	      	}
	      	&.sidebar-toggler-row {
		        flex-flow: row;
		        .item {
		          	width: 1px;
		          	height: 8px;
		          	margin: 0 1px;
		        }
	      	}
	    }
		.el-menu {
	    	border-right: 0;
	    	max-height: calc(~"100vh - 104px");
	    	overflow-y: auto;
			overflow-x: hidden;
	    }
	    .menu-collapse {
	    	width: 50px;
	    	text-align: center;

	    }
	}

</style>

<style lang="less">
	.el-aside {
		.el-menu {
			.icon {
				padding: 0 5px;
			}
			.icon, .icon:hover, .el-submenu__icon-arrow {
				color: #fff !important;
			}
			.is-active {
				color: #fff;
			}
			.el-menu-item, .el-submenu__title {
	            height: 36px;
	            line-height: 36px;
            }
		}
	}
	.menu-collapse, .menu-popover {
		li {
			a {
                display: block;
                color: #fff;
                height: 40px;
                line-height: 40px;
                font-size: 12px;
                text-decoration: none;
                .icon {
                	font-size: 20px;
                }
            }
		}
	}
	.menu-popover {
	 	padding: 1px!important;

        a {
            padding: 0 15px;
        }
	}
</style>
