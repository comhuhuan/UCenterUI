<template>
	<el-container direction="vertical" id="container" :class="{upDown: layout === 'top'}">
		<Header @setLayout="setLayout"/>
		<el-container id="main">
			<div v-if="layout==='left'">
				<Sidebar />
			</div>
			<el-main :class="{'collapsed': is_collapse}">
				<el-tabs type="border-card" @tab-remove="del_tab" :activeName="active_tab.name" @tab-click="setActiveTab">
					<el-tab-pane v-for="tab in tabs_list" :key="tab.name" :name="tab.name" :closable="tab.name !== '首页'">
						<span slot="label">
							<i class="icon iconfont" :class="tab.icon"></i>
							{{tab.name}}
						</span>
						<transition name="fade" mode="out-in">
							<keep-alive>
								<component :is="tab.component" :authorize-btns="tab.button"></component>
							</keep-alive>
							<!-- <router-view></router-view> -->
						</transition>
					</el-tab-pane>

				</el-tabs>
			</el-main>
			<!-- <Footer /> -->
		</el-container>
	</el-container>
</template>

<script>
	import Header from './Header'
	// import Footer from './Footer'
	import Sidebar from './Sidebar'
	import { mapActions, mapGetters } from 'vuex'
	import storage from 'utils/storage'

	export default {
		name: 'Layout',
		data () {
			return {
				layout: storage.get('layout') || 'left',
			}
		},
		components: {
			Header,
			Sidebar,
			// Footer
		},
		created () {
			this.$root.$el.parentNode.className = storage.get('skin') || 'skin-black'
			// this.updateTabsList()
		},
		computed: {
			...mapGetters([
				'tabs_list',
				'active_tab',
				'is_collapse'
			])
		},
		watch: {
			'active_tab': {
				handler(newValue, oldValue) {
					console.log(this.tabs_list)
					// console.log(newValue.path, this.$route.path, newValue.path !== this.$route.path, newValue.path === '/home')
					if(newValue.path !== this.$route.path || newValue.path === '/home') {
						this.$router.push(newValue.path)
					}
				},
				deep: true
			}
		},
		methods: {
			...mapActions([
				'del_tab',
				'set_active_tab'
			]),
			setLayout() {
				this.layout = storage.get('layout')
			},
			setActiveTab (tab) {
				this.tabs_list.forEach(item => {
					if (tab.name === item.name) {
						// this.$router.push(item.path)
						this.set_active_tab(item)
					}
				})
			},
		},
		beforeDestroy() {
			// this.$root.Hub.$off('setLayout')
			// this.$root.Hub.$off('setLayout')
		}
	}


</script>

<style lang="less">

	#container {
		height: 100%;
		#main {
			height: calc(~'100% - 50px');
		}
		&.upDown {
			.el-main {
				width: 100%!important;
				margin: 0!important;
			}
		}
		.el-main {
			// @minWidth: 1366px;
			// @minHeight: 768px;
			// @minWidth: 1280px;
			@minWidth: 1024px;
			// @minHeight: 668px;
			@minHeight: 468px;
			padding: 0;
			margin-left: 180px;
			width: calc(~'100% - 180px');
			&.collapsed {
				margin-left: 50px;
				width: calc(~'100% - 50px');
				>.el-tabs {
					> .el-tabs__content {
						// min-width: calc(~'1366px - 52px');
						.el-tabs__content {
							max-width: calc(~'100vw - 82px');
							// min-width: calc(~'1366px - 82px');
							.el-tab-pane {
								min-width: @minWidth - 82
							}
						}


					}
				}
			}
			/*>.el-tabs {
				overflow: hidden;
				border: none;
				> .el-tabs__content {
					.el-tabs.el-tabs--bottom > .el-tabs__content {


						>.el-tab-pane {
							min-height: @minHeight - 122;
							// height: 100%;
							height: auto;
							// max-height: 100%;
							overflow: auto;

						}
					}
				}
			}*/

			.el-tabs {
				height: 100%;
				// max-height: 100%;
				font-size: 12px;
				overflow: hidden;
				border: none;

				.el-tabs__header {
				    // border-bottom: 1px solid #e4e7ed;
			        // border-bottom: none;
			        margin: 0;
			        padding-top: 3px;

					.el-tabs__item {
						height: 35px;
						line-height: 35px;
						font-size: 12px;

						&.is-active {
							position: relative;
							// border-top: 1px solid #e5d3d1;

							&::before {
								content: '';
								display: inline-block;
								height: 2px;
								width: 100%;
								background-color: rgb(57, 148, 230);
								position: absolute;
								top: 1px;
								left: 0;
							}
							&::after {
								content: '';
								display: inline-block;
								height: 1px;
								width: 100%;
								background-color: #fff;
								position: absolute;
								bottom: -2px;
								left: 0;
							}
						}
					}

				}

				.el-tabs__content {
					height: calc(~'100% - 35px');
					padding: 0;

					.el-tab-pane {
						height: 100%;
						// max-height: 100%;
					}
					.el-tabs.el-tabs--bottom {
						max-height: 100%;
						// overflow: hidden;
						// height: calc(~"100% - 37px");
						max-height: calc(~"100% - 37px");
						overflow: hidden;
						border: none;
						box-shadow: none;

						.el-tabs__header {
							border-top: 1px solid #e5d3d1;
							// background-color: #f6f0ee;
					        padding-top: 0px;
					        position: fixed;
					        bottom: 0;
					        width: 100%;

							.el-tabs__item {

								&.is-active {
									position: relative;

									&::before {
										content: '';
										display: inline-block;
										height: 3px;
										width: 100%;
										background-color: rgb(57, 148, 230);
										position: absolute;
										top: -1px;
										left: 0;
									}
									&::after {
										content: '';
										display: inline-block;
										height: 0px;
										width: 100%;
									}
								}
							}

						}

						.el-tabs__content {
							// height: 100%;
							// max-height: 100%;
							max-height: calc(~"100% - 15px");
							height: calc(~"100% - 15px");
							overflow: auto;
							padding: 15px 15px 0 15px;

							>.el-tab-pane {
								min-height: @minHeight - 122;
								// height: 100%;
								height: auto;
								// max-height: 100%;
								overflow: auto;

							}
						}
					}
				}
			}
		}
	}
</style>
