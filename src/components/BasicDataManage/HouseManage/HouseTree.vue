<template lang="html">
    <section class="houseTree">

        <!--<div class="toolbar">
            <div class="icon-item" @click.stop="isShowSearchGroup = true"><i class="el-icon-search" title="搜索机房或机房区域"></i></div>
            <div class="icon-item"><i class="el-icon-search" title="导入机房信息"></i></div>
            <div class="icon-item"><i class="el-icon-search" title="导出机房信息"></i></div>
        </div>-->
        <div class="searchGroup">
            <el-radio-group v-model="isReport" @change="getHouseList">
                <el-radio v-for="item in reportList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
            <el-input placeholder="请输入关键字查询" v-model="searchValue" class="input-with-select" size="mini" clearable>
                <el-select v-model="houseProp" slot="prepend" placeholder="机房性质" @change="getHouseList" popper-class="select-btn">
                      <el-option v-for="item in housePropList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <!--<el-dropdown trigger="hover" slot="prepend" :hide-on-click="true">
                    <el-button type="primary">
                        全部
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="dropdown-menu-common">
                        <el-dropdown-item v-for="item in housePropList" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>-->
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            </el-input>
            <!--<el-input placeholder="请输入关键字查询" v-model="searchValue" class="input-with-select">
                <el-select v-model="multCondition" multiple slot="prepend" placeholder="删选条件">
                    <el-option-group v-for="group in optionsGroup" :key="group.label" :label="group.label">
                      <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-option-group>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>-->
            <!--<el-input placeholder="请输入关键字查询" v-model="searchValue" class="input-with-select">
                <el-select v-model="isReport" slot="prepend" placeholder="机房性质">
                      <el-option v-for="item in reportList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-select v-model="houseProp" slot="prepend" placeholder="机房性质">
                      <el-option v-for="item in housePropList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-input>-->
        </div>
        <!-- <div class="parting-line"></div> -->
        <!-- :data="treeData" :load="loadHandle" lazy-->
        <el-tree class="tree-common"
          :props="treeProps"
          :data="treeData"
          highlight-current
          node-key="id"
          :default-expanded-keys="['root_node']"
          :current-node-key="curNodeKey"
          @node-click="nodeClick"
          ref="tree"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :render-content="renderContent"
          :loading="treeLoading"
          @node-expand="nodeExpand"
          @contextmenu.native="treeMenuHandle"
          accordion
        ></el-tree>
        <ContextMenu ref="treeContextMenu" :menuList="treeMenu" @clickMenu="contextmenuHandle"></ContextMenu>
    </section>
</template>

<script>
import {getHouseList, getHouseAreaList} from 'api/gjg/houseManage'
import * as api from 'api/gjg/houseManage'

import ContextMenu from 'components/Common/ContextMenu'
import { mapGetters, mapMutations } from 'vuex'
import houseMixin from './houseMixin'

export default {
    name: 'HouseTree',
    mixins: [houseMixin],
    components: {
        ContextMenu
    },
    data() {
        return {
            treeData: [{
                'id': 'root_node',
                'label': '所有机房',
                preIcon: 'icon-jifang',
                // 'isFloder': true,
                'children': []
            }],
            curNodeKey: '',
            searchValue: '',
            multCondition: '',
            treeMenu: [
                {
                    class: '',
                    icon: 'icon iconfont icon-xinzeng11',
                    id: '',
                    contentText: '新增',
                    // event: 'newTaskNode'
                }, {
                    class: '',
                    icon: 'icon iconfont icon-xiugai4',
                    id: '',
                    contentText: '修改',
                    // event: 'delTaskNode'
                }, {
                    class: '',
                    icon: 'icon iconfont icon-delete',
                    id: '',
                    contentText: '删除',
                    // event: 'delTaskNode'
                }
            ],
            optionsGroup: [
                {
                    label: "是否上报",
                    options: [
                        {
                            label: '全部',
                            value: '0'
                        }, {
                            label: '已上报',
                            value: '1'
                        }, {
                            label: '未上报',
                            value: '2'
                        }
                    ]
                }, {
                    label: "机房类型",
                    options: [
                        {
                            label: '全部',
                            value: '0'
                        }, {
                            label: '租用',
                            value: '1'
                        }, {
                            label: '自建',
                            value: '2'
                        }, {
                            label: '其它',
                            value: '3'
                        }
                    ]
                }
            ],
            reportList: [
                {
                    label: '全部',
                    value: '0'
                }, {
                    label: '已上报',
                    value: '1'
                }, {
                    label: '未上报',
                    value: '2'
                }
            ],
            housePropList: [
                {
                    label: '全部',
                    value: '0'
                }, {
                    label: '租用',
                    value: '1'
                }, {
                    label: '自建',
                    value: '2'
                }, {
                    label: '其它',
                    value: '3'
                }
            ],
            houseProp: '0',
            isReport: '0',
            treeLoading: false,
            treeProps: {
                isLeaf: 'leaf'
            },
            treeId: Date.now(),
            isInit: true,
            isShowSearchGroup: false,
            isRightClick: false,
            rightClickType: '',
            isBtnHandle: false
        }
    },
    created() {
        /*if(this.houseList && this.houseList.length === 0) {
            this.getHouseList()
        } else {
            this.getTreeData(this.houseList, this.treeData[0].children)
        }*/
        if(!this.houseList || this.houseList.length !== 0) {
           this.getTreeData(this.houseList, this.treeData[0].children)
        }
    },
    computed: {
        // ...mapGetters(['houseList'])
    },
    watch: {
        searchValue(val) {
            this.$refs.tree.filter(val)
        },
        houseList(val){
            this.getTreeData(val)
        }
    },
    methods: {
        ...mapMutations({
            setIsShowHomePage: 'SET_IS_SHOW_HOME_PAGE',
            setCurEditor: 'SET_CUR_HOUSE_EDITOR',
            setIsShowEditor: 'SET_IS_SHOW_HOUSSE_EDITOR',
        }),
        getTreeData(data) {
            const treeData = this.treeData[0].children = []
            const ipCate = [
                {
                    label: '静态IP',
                    id: ++this.treeId,
                    extraLabel: '',
                    preIcon: 'icon-cloud-ip',
                    nextIcon: '',
                    leaf: true,
                    // leaf: false
                }, {
                    label: '动态IP',
                    id: ++this.treeId,
                    extraLabel: '',
                    preIcon: 'icon-cloud-ip',
                    nextIcon: '',
                    leaf: true,
                    // leaf: false
                }, {
                    label: '保留IP',
                    id: ++this.treeId,
                    extraLabel: '',
                    preIcon: 'icon-cloud-ip',
                    nextIcon: '',
                    leaf: true,
                    // leaf: false
                }
            ]
            const category = [
                {
                    label: 'IP地址段',
                    id: ++this.treeId,
                    extraLabel: '',
                    preIcon: 'icon-cloud-ip',
                    nextIcon: '',
                    leaf: false,
                    children: ipCate
                }, {
                    label: '机房区域',
                    id: ++this.treeId,
                    extraLabel: '',
                    preIcon: 'icon-quyu4',
                    nextIcon: '',
                    leaf: true
                }, {
                    label: '互联网出入口',
                    id: ++this.treeId,
                    extraLabel: '',
                    preIcon: 'icon-churukou',
                    nextIcon: '',
                    leaf: true
                }
            ]
            data.forEach( house => {
                treeData.push({
                    label: house.houseName,
                    id: house.houseCode,
                    extraLabel: '',
                    preIcon: 'icon-jifang',
                    isLoadArea: false,
                    nextIcon: '',
                    // leaf: false,
                    ...house,
                    children: [...category]
                })
            })
            // console.log(treeData)
        },
        getAreaList(data) {
            this.treeLoading = true
            getHouseAreaList().then( res => {
                if( res.status === 'success' ) {
                    if(res.message && res.message.rows) {
                        console.log(data)
                        this.treeData[0].children.some( node => {
                            console.log(node.id, data.id, node.children)
                            if(node.id === data.id) {
                                console.log(node)
                                res.message.rows.forEach( item => {
                                    node.children.push({
                                        label: item.houseAreaName,
                                        id: item.id,
                                        extraLabel: item.area,
                                        leaf: true,
                                        preIcon: 'icon-quyu4',
                                        nextIcon: '',
                                        ...item
                                    })
                                    node.isLoadArea = true
                                })
                                return true
                            }
                        })
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        showClose: true,
                    })
                }
                this.treeLoading = false
            }).catch( err => {
                console.log(err)
                this.treeLoading = false
            })
        },
        getHouseDetailList() {

        },
        commandHandle(command) {

        },
        treeMenuHandle(evt) {
            evt.preventDefault()
            const $node = $(evt.target).closest('.el-tree-node')
            const $node_content = $node.children('.el-tree-node__content')
            if( !!$node_content.text().trim() ) {
                this.$refs.treeContextMenu.showMenu(evt.target, evt)
            }
        },
        contextmenuHandle(type, elem) {
            const $node = $(elem).closest('.el-tree-node')
            switch (type) {
                case '新增':
                    this.rightClickType = 'add'
                    break;
                case '修改':
                    this.rightClickType = 'modify'
                    break;
                case '删除':
                    this.rightClickType = 'delete'
                    break;
            }

            this.isRightClick = true
            $node.trigger('click')
        },
        nodeClick(data, node, treeEl) {
            console.log(data,node, treeEl)
            if(this.isBtnHandle) {
                console.log('isBtnHandle')
                this.isBtnHandle = false
                return
            }
            // console.log(data, node, 'nodeClick')
            if(!this.isRightClick) {
                if(node.level === 1) {
                    this.setIsShowHomePage(true)
                    this.setIsShowEditor(false)
                    return
                }
                this.$emit('show-list', data, node)
            } else {
                this.isRightClick = false
            }

        },
        nodeExpand(data, node) {
            if(this.isBtnHandle) return false
            console.log(data, node, !data.isLoadArea)
            if(node.level === 2 && !data.isLoadArea) {
                this.getAreaList(data)
            }
            // this.treeLoading = false
        },
        renderContent(h, { node, data, store }) {
            // console.log(h, node, data, store)
            const folder = `icon iconfont ${data.preIcon} preIcon`
            const level = node.level
            const label = data.label
            let html
            if(level === 1) {
                // 根节点
                html = (
                    <span class="handle">
                        <span title="新增机房" on-click={() => this.addHandle(data, node, 'house')}>
                            <i class="icon iconfont icon-xinzeng11"></i>
                        </span>
                        <span title="删除所有机房" on-click={ () => this.delHandle({}, 'removeHouse') }>
                            <i class="icon iconfont icon-shequshanchu"></i>
                        </span>
                    </span>
                )
            } else if (level === 2) {
                // 机房层
                /*<span title="下发机房" on-click={() => this.issueHandle(data)}>
                    <i class="icon iconfont icon-xiafashuju"></i>
                </span>*/
                html = (
                    <span class="handle">

                        <span title="修改机房信息" on-click={ () => this.modifyHandle(data, node, 'house') }>
                            <i class="icon iconfont icon-xiugai4"></i>
                        </span>
                        <span title="删除机房" on-click={ () => this.delHandle({deleteIds: data.houseCode}, 'removeHouse', `请确认是否删除机房${label}吗？`) }>
                            <i class="icon iconfont icon-shequshanchu"></i>
                        </span>
                    </span>
                )
            } else if (level === 3) {
                // ip , 出入口, 机房区域

                if( label === 'IP地址段' || label === '互联网出入口') {
                    const subject = label === 'IP地址段' ? 'ip' : 'network'
                    const handle = label === 'IP地址段' ? 'removeIp' : 'removeNetwork'
                    html = (
                        <span class="handle">
                            <span title={'新增'+ label} on-click={ () => this.addHandle(data, node, subject) }>
                                <i class="icon iconfont icon-xinzeng11"></i>
                            </span>
                            <span title={"删除" + label} on-click={ () => this.delHandle({}, handle, `请确认是否删除该机房下所有的${label}吗？`) }>
                                <i class="icon iconfont icon-shequshanchu"></i>
                            </span>
                        </span>
                    )
                } else {
                    html = (
                        <span class="handle">
                            <span title={'修改机房区域信息'} on-click={ () => this.modifyHandle(data, node, 'area') }>
                                <i class="icon iconfont icon-xiugai4"></i>
                            </span>
                            <span title={"删除机房区域"} on-click={ () => this.delHandle({deleteIds: data.houseAreaCode}, 'removeHouseArea', `请确认是否删除该机房下所有的${label}吗？`) }>
                                <i class="icon iconfont icon-shequshanchu"></i>
                            </span>
                        </span>
                    )
                }
            } else if(level === 4) {
                html = (
                    <span class="handle">
                        <span title={'新增' + label} on-click={ () => this.addHandle(data, node, 'ip') }>
                            <i class="icon iconfont icon-xiugai4"></i>
                        </span>
                        <span title={"删除" + label} on-click={ () => this.delHandle({}, 'ip', `请确认是否删除该机房下所有的${label}吗？`) }>
                            <i class="icon iconfont icon-shequshanchu"></i>
                        </span>
                    </span>
                )
            }
            // const arrow = 'icon iconfont arrow'
            return (
                <span>
                    <span class={folder}></span>
                    <span class="label">{label}</span>
                    <span class="extraLabel">{data.extraLabel}</span>
                    {html}
                    {/*<span class="handle">
                        <span title="下发机房" on-click={() => this.issueHandle(data)}>
                            <i class="icon iconfont icon-xiafashuju"></i>
                        </span>
                    </span>*/}
                    {/*<span class="handle">
                        <span on-click={() => this.addHandle(data)}>
                            <i class="icon iconfont icon-xinzeng"></i>
                        </span>
                        <span on-click={ () => this.delHandle(data, node) }>
                            <i class="icon iconfont icon-shequshanchu"></i>
                        </span>
                        <span on-click={ () => this.modifyHandle(data, node) }>
                            <i class="icon iconfont icon-xiugai4"></i>
                        </span>
                    </span>*/}

                </span>
            );
        },
        addHandle(data, node, subject) {
            this.isBtnHandle = true
            this.setCurEditor({
                type: 'add',
                subject
            })
        },
        modifyHandle(data, node, subject) {
            this.isBtnHandle = true
            console.log(data, subject)
            this.setCurEditor({
                type: 'modify',
                subject,
                data
            })
        },
        delHandle(params, handle, notice) {
            this.isBtnHandle = true
            this.$confirm(notice, '提示', {
                comfirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loadingInstance  = this.$loading({
                    fullscreen: true
                })
                // console.log(handle)
                api[handle](params).then(res => {
                    const flag = res.status === 'success'
                    this.$message({
                        type: flag ? 'success' : 'error',
                        message: flag ? '删除成功' : res.message,
                        // message: res.message,
                        showClose: true,
                    })
                    if( flag ) {
                        this.getHouseList()
                    }
                    loadingInstance.close()
                }).catch( err => {
                    console.log(err)
                    loadingInstance.close()
                })
            }).catch( _ => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！',
                    showClose: true
                })
            })
        },
        issueHandle(data) {
            this.isBtnHandle = true
            console.log('下发')
        },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
    }
}
</script>

<style lang="less">
    .houseTree {
        height: 100%;
        padding: 15px 15px 0 15px;
        box-sizing: border-box;
        overflow: hidden;

        .searchGroup {
			margin-bottom: 10px;
			.el-radio-group {
				margin-bottom: 8px;
				.el-radio + .el-radio {
				    margin-left: 20px;
				}
			}
			.input-with-select {
				>.el-input__inner {
					// width: 148px;
					width: 188px;
					// padding: 10px;
				}
                .el-select {
                    width: 60px;
                }
				.el-input.el-input--suffix  {
					width: 60px;
					// width: 70px;
					>.el-input__inner {
						padding-left: 6px;
						padding-right: 24px;
					}
					.el-input__suffix {
						right: 0;
					}
				}

			}
		}
        .el-tree {
            // margin-top: 10px;
            max-height: calc(~'100% - 65px');
            height: calc(~'100% - 65px');
            max-width: 100%;

			overflow: auto;
            .el-tree-node {
                .el-tree-node__content {
                    /*.el-tree-node__expand-icon {
                        display: none;
                    }*/
                    .el-tree-node__expand-icon.el-icon-caret-right {
                    	color: #606266;
						&::before {
							content: "\E604";
						}
						&:hover {
							cursor: pointer;
						}
						&.is-leaf {
							width: 12px;
							height: 12px;
							&::before {
								content: '';
							}
						}
                    }
                    .el-tree-node__expand-icon.el-icon-caret-right.expanded + span {
                        .iconfont {
                            &.folder::before {
                                content: "\e67f";
                            }
                        }

                    }

                    .handle {
                        display: none;
                        span {
                            display: inline-block;
                            height: 26px;
                            line-height: 26px;
                            padding: 0 2px;
                        }
                    }
                    .label {
                        padding: 0 3px;
                    }
                    .extraLabel {
                        display: inline-block;
                        max-width: 65px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        vertical-align: middle;
                        color: #aaa;
                    }

                    .iconfont {
                        font-size: 14px;
                        color: #597ef7;

                        &.folder::before {
                            content: "\e663";
                        }
                        &.arrow::before {
                            content: "\e81c";
                        }

                    }
                    &:hover {
                        .iconfont {
                            color: #10239e;
                        }
                        .handle {
                            display: inline-block;
                        }
                    }
                }

                &.is-current {
                     .el-tree-node__content {
                        .iconfont {
                            color: #10239e;
                        }
                    }
                }
            }
        }
    }
    .select-btn {
        .popper__arrow {
            margin-left: 60px;
        }
    }
</style>
