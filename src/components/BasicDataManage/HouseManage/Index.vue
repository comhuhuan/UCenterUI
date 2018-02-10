<template>
	<section class="houseManage content">
		<!--<div class="leftRange" :class="{commonCollapse: !isShowLeftRange}">
			<HouseTree @show-list="showList"></HouseTree>
			<div class="toggleCollapse" @click="isShowLeftRange = !isShowLeftRange">
				<div class="collapseBg">

					<i class="el-icon-d-arrow-left"></i>
				</div>
			</div>
		</div>-->
		<ToggleCollapse class="leftRange" :width="'280px'" :is-collapse="isTreeCollapse">
			<HouseTree @show-list="showList" slot="content" ></HouseTree>
		</ToggleCollapse>

        <div class="rightRange">
			<div class="toolbar">
				<el-button-group>
					<!--<el-dropdown trigger="hover" @command="commandHandle" :hide-on-click="true">
						<el-button type="default">
							<i class="icon iconfont icon-xinzenghuizong"></i>&nbsp;新增
							<i class="el-icon-arrow-down"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown" class="dropdown-menu-common">
							<el-dropdown-item command="house">新增机房</el-dropdown-item>
							<el-dropdown-item command="cabinet">新增机房区域</el-dropdown-item>
							<el-dropdown-item command="ip">新增IP地址段</el-dropdown-item>
							<el-dropdown-item command="network">新增互联网出入口</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>-->
					<el-button type="default" @click.native="addHandle">
						<i class="icon iconfont icon-xinzenghuizong"></i>&nbsp;新增
					</el-button>
					<el-button type="default" @click.native="importHandle">
						<i class="icon iconfont icon-daoru-tianchong"></i>&nbsp;导入
					</el-button>
					<el-button type="default" @click.native="exportHandle">
						<i class="icon iconfont icon-daochu-tianchong"></i>&nbsp;导出
					</el-button>
				</el-button-group>
			</div>
			<div class="wrokPage">
				<Homepage v-show="!isShowEditor && isShowHomePage" @show-detail="showDetail"></Homepage>
				<div class="display" v-show="!isShowEditor && !isShowHomePage">
					<div class="page pageone">
						<div class="panel housePanel" v-if="houseInfo">
							<PanelHead :options="housePanelOpt">
								<div slot="btnGroup">
					                <el-button type="primary" size="mini" @click.native="modifyHandle({subject: 'house', data: houseInfo})">
										<i class="icon iconfont icon-xiugai1"></i>&nbsp;修改
									</el-button>
					            </div>
							</PanelHead>
						  	<ul class="info">
						  		<li><span class="label">机房名称：</span><span class="content">{{houseInfo.houseName}}</span></li>
						  		<li><span class="label">机房编号：</span><span class="content">{{houseInfo.houseCode}}</span></li>
						  		<li><span class="label">IDC经营单位名称：</span><span class="content">{{houseInfo.IDCUnitName}}</span></li>
						  		<li><span class="label">所在区域：</span><span class="content">{{houseInfo.area}}</span></li>
						  		<li><span class="label">机房性质：</span><span class="content">{{houseInfo.houseProp}}</span></li>
						  		<li><span class="label">机房地址：</span><span class="content">{{houseInfo.addr}}</span></li>
						  		<li><span class="label">机房管理员信息：</span><span class="content">{{houseInfo.manager}}</span></li>
						  		<li><span class="label">邮编：</span><span class="content">{{houseInfo.zip}}</span></li>
						  		<li>
									<span class="label">监测状态：</span>
									<span class="content" v-if="houseInfo.monitorStatus || houseInfo.monitorStatus === 0">
										{{houseInfo.monitorStatus === 0 ? '关闭' : '开启' }}
									</span>
								</li>
						  		<li>
									<span class="label">是否上报：</span>
									<span class="content" v-if="houseInfo.isReport || houseInfo.isReport === 0">
										{{houseInfo.isReport === 0 ? '未上报' : '已上报'}}
									</span>
								</li>
						  		<li><span class="label">未上报原因：</span><span class="content">{{houseInfo.noReportReson}}</span></li>
						  		<li>
									<span class="label">回退状态：</span>
									<span class="content" v-if="houseInfo.returnStatus || houseInfo.returnStatus === 0">
										{{houseInfo.returnStatus === 0 ? '异常' : '正常'}}
									</span>
								</li>
								<!-- <li class="text-center"><el-button @click.native="showIpList">查看IP地址段信息</el-button></li>
								<li class="text-center"><el-button @click.native="showNetworkList">查看互联网出入口信息</el-button></li> -->
							</ul>
							<div class="text-right">
								<el-button type="default" @click.native="showIpList(houseInfo)">
									<i class="icon iconfont icon-chakan2"></i>&nbsp;IP
								</el-button>
								<el-button type="default" @click.native="showNetworkList(houseInfo)">
									<i class="icon iconfont icon-chakan2"></i>&nbsp;出入口
								</el-button>
								<el-button type="default" @click.native="showAreaList(houseInfo)">
									<i class="icon iconfont icon-chakan2"></i>&nbsp;机房区域
								</el-button>
								<!--<a href="javascript:;">查看IP地址段信息</a>
								<a href="javascript:;">查看互联网出入口信息</a>-->
							</div>
						</div>
						<div class="panel areaPanel" v-if="areaInfo">
							<PanelHead :options="areaPanelOpt">
								<div slot="btnGroup">
					                <el-button type="primary" size="mini" @click.native="modifyHandle({subject: 'area', data: areaInfo})">
										<i class="icon iconfont icon-xiugai1"></i>&nbsp;修改
									</el-button>
					            </div>
							</PanelHead>
							<ul class="info">
						  		<li><span class="label">机房名称：</span><span class="content">{{areaInfo.houseName}}</span></li>
						  		<li><span class="label">机房片区名称：</span><span class="content">{{areaInfo.houseAreaName}}</span></li>
						  		<li><span class="label">机房片区编号：</span><span class="content">{{areaInfo.houseAreaCode}}</span></li>
						  		<li><span class="label">所在区域：</span><span class="content">{{areaInfo.area}}</span></li>
						  		<li><span class="label">联系人：</span><span class="content">{{areaInfo.contact}}</span></li>
						  		<li><span class="label">机房描述：</span><span class="content">{{areaInfo.desc}}</span></li>
								<!-- <li class="text-center"><el-button @click.native="showCabinetList">查看机柜信息</el-button></li> -->
							</ul>
							<div class="text-right">
								<el-button type="default" @click.native="showCabinetList(areaInfo)">
									<i class="icon iconfont icon-chakan2"></i>&nbsp;机柜
								</el-button>
							</div>
						</div>
					</div>
					<div class="page pagetwo">
						<keep-alive>
							<component :is="curComponent" :params="queryCondition" @show-detail="showAreaDetail"></component>
						</keep-alive>
					</div>
				</div>
				 <!-- :class="{isCollapseEditMenu: isCollapseEditMenu}" -->
				<div class="editor" v-if="isShowEditor" :class="{isCollapseEditMenu: isCollapseEditMenu}">
					<div class="editPanel">
						<PanelHead :options="{title: curEditorOpt.text, hasIcon: true}">
				            <span slot="icon">
				                <a class="el-icon-back icon" href="javascript:;" title="返回" @click="setIsShowEditor(false)"></a>
				            </span>
				        </PanelHead>
						<div class="editComponent">
							<component :is="curEditorOpt.component" :data="modifyData"></component>
						</div>
					</div>
					<!-- width="16%" min-width="160px" -->
					<ToggleCollapse class="editMenu"
						width="180px"
						position="left-top" shape="rectangle"
						@collapse-click="menuCollapseHandle"
					>
					<!-- :is-collapse="" -->
						<div class="" slot="content">
							<ul>
								<li v-for="item in curEditorMenu" :key="item.subject"
									:class="{active: item.subject === curEditorOpt.subject, disabled: curEditorType === 'modify' && item.subject !== curEditorOpt.subject}"
								>
									<a href="javascript:;" @click="setEditor(item.subject)">{{item.text}}</a>
								</li>
							</ul>
						</div>
					</ToggleCollapse>
				</div>
			</div>
		</div>
    </section>
</template>

<script>
	import {
        getHouseList,
        removeHouse,
        saveHouse,
        getHouseAreaList,
        removeHouseArea,
        saveHouseArea,
        getHouseCabinetList,
        removeHouseCabinet,
        saveHouseCabinet,
		getIpList,
		removeIp,
		saveIp,
		getNetworkList,
		removeNetwork,
		saveNetwork
    } from 'api/gjg/houseManage'

	import Ip from './Ip'
	import Area from './Area'
	import Network from './Network'
	import Cabinet from './Cabinet'
	import HouseTree from './HouseTree'
	import Homepage from './Homepage'
	import PanelHead from 'components/Common/PanelHead'
	import ToggleCollapse from 'components/Common/ToggleCollapse'
	import { mapGetters, mapMutations } from 'vuex'

	export default {
		name: 'HouseManage',
		components: {
			HouseTree,
			PanelHead,
			Homepage,
			ToggleCollapse
		},
		props: {
			authorizeBtns: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isShowLeftRange: true,
				isShowEditMenu: true,
				houseInfo: null,
				areaInfo: null,
				isShowIpList: false,
				isShowCabinetList: false,
				isShowNetworkList: false,
				ipParams: null,
				areaParams: null,
				networkParams: null,
				cabinetParams: null,
				curComponent: null,
				editComponent: null,
				housePanelOpt: {
					title: '机房信息'
				},
				areaPanelOpt: {
					title: '机房区域信息',
				},
				editPanelOpt: {
	                // title: 'IP地址段信息',
	                title: 'IP地址段信息',
	                hasIcon: true
	            },
				queryCondition: null,
				modifyData: null,
				isTreeCollapse: false,
				isCollapseEditMenu: false
			}
		},
		created() {
			this.setIsShowHomePage(true)
        },
		computed: {
			...mapGetters({
				isShowEditor: 'isShowHouseEditor',
				curEditorMenu: "curHouseEditorMenu",
				curEditorOpt: "curHouseEditorOptions",
				curEditorType: "curHouseEditorType",
				isShowHomePage: 'isShowHomePage'
			})
		},
		mounted() {
			this.$nextTick( _ => {

			})
		},
        watch: {
			/*isCollapseEditMenu(value) {
				console.log(value)
			}*/
        },
        methods: {
			...mapMutations({
	            setIsShowEditor: 'SET_IS_SHOW_HOUSSE_EDITOR',
	            setCurEditor: 'SET_CUR_HOUSE_EDITOR',
				setIsShowHomePage: 'SET_IS_SHOW_HOME_PAGE'
	        }),
			menuCollapseHandle(boolean) {
				console.log(boolean)
				this.isCollapseEditMenu = boolean
			},
			setEditor(subject) {
				const type = this.curEditorType
				if(this.curEditorOpt.subject === subject || type === 'modify') return
				this.setCurEditor({type, subject})
			},
			commandHandle(command) {
				console.log(command)
				// this[`${command}`add]()
			},
			showDetail(data) {
				this.houseInfo = data
				this.setIsShowEditor(false)
				this.setIsShowHomePage(false)
				this.showIpList()
			},
			showAreaDetail(data) {
				this.areaInfo = data
				this.setIsShowEditor(false)
				this.showCabinetList()
			},
			showList(data, node) {
				console.log(data, node)
				const level = node.level
				if( level === 2 ) {
                    this.houseInfo = data
					this.areaInfo = null
					this.showIpList()
                } else if( level === 3 ) {
					if(data.label === 'IP地址段') {
						this.showIpList()
					} else if(data.label === '互联网出入口') {
						this.showNetworkList()
					} else if(data.label === '机房区域') {
						this.showAreaList()
					} else {
						this.showCabinetList()
						this.areaInfo = data
						console.log(this.areaInfo)
					}
					this.houseInfo = node.parent.data
                } else if( level === 4 ) {
					this.showIpList()
                	this.houseInfo = node.parent.parent.data
                }
				this.setIsShowEditor(false)
				this.setIsShowHomePage(false)
			},
			showAreaList(params) {
				this.curComponent = Area
				// this.areaParams = {}
				this.queryCondition = {}
			},
			showCabinetList(params) {
				this.curComponent = Cabinet
				this.isTreeCollapse = true
				// this.cabinetParams = {}
				this.queryCondition = {}
			},
			showIpList(params) {
				this.curComponent = Ip
				// this.ipParams = {}
				this.queryCondition = {}
			},
			showNetworkList(params) {
				this.curComponent = Network
				// this.networkParams = {}
				this.queryCondition = {}
			},
			modifyHandle({ subject, data }) {
				this.setCurEditor({
					type: 'modify',
                    subject,
                    data
				})
			},
			addHandle() {
				// console.log(this.curEditorMenu, this.setIsShowEditor)
				if(this.curEditorType === 'add' && this.isShowEditor) {
					this.$message({
						showClose: true,
						message: '已经进入新增页面',
						type: 'warning'
					})
				} else {
					this.setCurEditor({type: 'add', subject: 'house'})
				}
			},
			importHandle() {
				this.setCurEditor({type: 'import', subject: 'house'})
			},
			exportHandle() {
				this.setCurEditor({type: 'export', subject: 'house'})
			},
			reverseIssue(isReport) {
				return isReport == 0 ? '已上报' : '未上报'
			},
        },
		beforeDestroy() {
			this.setIsShowEditor(false)
		}
	}

</script>

<style lang="less" >
	.houseManage {
        height: 100%;
		position: relative;
		display: flex;
		flex: 1;
/*		.commonCollapse {
			.toggleCollapse {
				left: 0;
				.collapseBg {
					border-bottom: 9px solid transparent;
					// border-left: 13px solid #D9DEE4;
					border-left: 13px solid #4d4d4d;
					border-right: 0;
					border-top: 9px solid transparent;
					i {
						margin-left: -13px;
						transform: rotate(180deg);
					}
					&:hover {
						border-left-width: 17px;
						border-left-color: #404040;
						left: 0px;

					}
				}

			}
			&.leftRange {
				width: 0;
			}

		}
		.toggleCollapse {
			position: absolute;
			left: @leftWidth - 13px;
			top: 50%;
			transform: translateY(-50%);
			cursor: pointer;
			z-index: 10;
			.collapseBg {
				position: relative;
				width: 0;
				height: 32px;
				line-height: 32px;
				top: 0;
				left: 0;
				border-bottom: 9px solid transparent;
				// border-right: 13px solid #D9DEE4;
				border-right: 13px solid #4d4d4d;
				border-left: 0;
				border-top: 9px solid transparent;
				transition: all 0.1s ease,0.1s ease;

				i {
					// position: absolute;
					// top: 50%;
					// transform: translateY(-50%);
					transition: all 0.1s ease,0.1s ease;
					color: #ccc;
				}
				&:hover {
					border-right-width: 17px;
					// border-right-color: #ccc;
					border-right-color: #404040;
					left: -5px;
					i {
						// font-weight: bold;
						color: #fff;
					}
				}
			}
		}
*/
		.flow {
			text-align: center;
			.el-button-group {
				margin-bottom: 10px;

				.el-button {
					position: relative;
					padding: 5px 15px!important;
					// background-color: #f5f7fa;
					/*&::before {
						content: "";
						display: inline-block;
						position: absolute;
						height: 10px;
						border-left: 1px solid #aaa;
						left: 50%;
					}*/
				}
	        }
		}

        .leftRange {
            border-right: 1px solid #eaeaea;
        }

        .rightRange {
            width: calc(~'100% - 280px');
            height: 100%;
			flex: 1;
			// float: left;
			box-sizing: border-box;
			position: relative;

			.toolbar {
				height: 36px;
				background-color: #f8f8f8;
				border-bottom: 1px solid #eaeaea;
				// margin-bottom: 1px;

				.el-button-group {
					// padding:
					.el-button {
						border: none;
						background-color: transparent;
						color: #666;
						font-size: 14px;
						line-height: 24px;
						// padding-right: 0!important;

						i {
							font-size: 16px;
							display: inline-block;
							vertical-align: middle;
						}
						&:hover {
							color: #333;
							// background-color: #eee;
						}

						&.is-disabled {
							color: #ccc;
						}

					}
					.el-dropdown {
						float: left;
						.el-button {
							&:hover {
								background-color: #efefef!important;
							}
						}
					}
				}
			}

			.wrokPage {
				height: calc(~"100% - 39px");
				width: 100%;
				position: relative;
				.display {
					height: 100%;
					.page {
						float: left;
						box-sizing: border-box;
						height: 100%;
						// max-height: calc(~"100% - 3px");
						overflow: auto;
						// padding: 0 10px 10px 10px;

					}
					.pageone {
						width: 30%;
						border-right: 1px solid #eaeaea;
					}
					.pagetwo {
						width: 70%;
						padding: 0 10px;
						// padding: 10px;
					}
					.panel {
						padding: 0 10px 10px 10px;
					}
					.areaPanel {
						// margin-top: 10px;
						border-top: 1px solid #eaeaea;
						// padding-top: 10px;
					}
					.info {
						padding: 10px 10px 0 10px;
						// border-bottom: 1px solid #eaeaea;
						li {
							padding-bottom: 5px;
							display: flex;
							&.text-center {
								text-align: center;
								padding-bottom: 10px;
								.el-button {
									padding: 10px!important;
								}
							}
							span {
								// display: inline-block;
								// margin: 0;
								// word-break: break-all;
								// white-space:normal;
								// text-align: justify;
							}
							.label {
								width: 110px;
								text-align: right;

							}
							.content {
								width: calc(~"100% - 118px");
								color: #333;
								flex: 1;
							}
						}
					}
				}
				.editor {
					display: flex;
					// flex: 1;
					// position: absolute;
					// width: 100%;
					height: 100%;

					.editMenu {
						// width: 200px;
						padding-top: 10px;
						// border-right: 1px solid #eaeaea;
						border-left: 1px solid #eaeaea;
						// min-width: 160px;
						// width: 16%;
						li {
							position: relative;
							padding-left: 25px;

							a {
								display: block;
								color: #06f;
								padding: 10px;
							}
							&.active {
								background-color: #ddd;
								a {
									&::before {
										content: '';
										display: inline-block;
										height: 20px;
										width: 0px;
										position: absolute;
										border-left: 3px solid #00A1CC;
										// border-left: 3px solid #f60;
										left: 18px;
										top: 7px;
									}
								}
								&:hover {
									background-color: #ddd;
									a {
										&::before {
											border-color: #0af;
										}
									}
								}

							}
							&:hover {
								background-color: #efefef;

							}
							&.disabled {
								background-color: #f0f5ff;

								a {
									color: #c0c4cc;
									cursor: not-allowed;
								}
							}
						}
					}

					&.isCollapseEditMenu {
						.editPanel {
							max-width: 100%;
						}
					}
					.editPanel {
						flex: 1;
						max-height: 100%;
						// max-width: 100%;
						max-width: calc(~'100% - 180px');
						// max-width: calc(~'100% - 160px');
						// max-width: 84%;

						// background-color: #ededed;
						.editComponent {
							height: calc(~"100% - 42px") ;
							// height: 100% ;
							padding: 10px 20px;
							box-sizing: border-box;
							overflow: auto;
						}
					}
				}
			}
		}
    }
</style>
<style lang="less">

</style>
