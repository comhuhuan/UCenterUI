const baseURL = require('../baseURL').baseURL

const initSub = {
	status: 'success',
	message: {
		admin: true, // true-管理员,false非管理员
		platformUrl: '@url',
		loginUrl: '@url',  //登入页面
		username: '@cname',
		menus:  [
			{
		        path: '/',
		        redirect: '/home',
		        name: '首页',
		        icon: 'icon-homebig',
		        component: 'components/Layout',
		        hidden: true,
		        children: [{
			        path: '/home',
			        name: '首页',
			        icon: '',
			        hidden: true,
			        component: 'components/Home',
					button: '1|2|3|4|5|6|7|8|9'
			    }]
		    }, {
		        path: '/basicDataManage',
			    redirect: '/idcOperator',
			    name: '基础数据管理',
			    icon: 'icon-jichushujuguanli',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/idcOperator',
			            name: 'IDC经营者管理',
			            icon: '',
			            hidden: false,
			            component: 'components/BasicDataManage/IdcOperator',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/houseManage',
			            name: '机房管理',
			            icon: '',
			            hidden: false,
			            component: 'components/BasicDataManage/HouseManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/userManage',
			            name: '用户管理',
			            icon: '',
			            hidden: false,
			            component: 'components/BasicDataManage/UserManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/dutyOfficerManage',
			            name: '责任人管理',
			            icon: '',
			            component: 'components/BasicDataManage/DutyOfficerManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }
			    ]
		    }, {
		    	path: '/strategyManage',
				redirect: '/avoidFilterWebsite',
				name: '策略管理',
				icon: 'icon-celveguanli1',
				hidden: false,
				component: 'components/Layout',
				children: [
					{
						path: '/avoidFilterWebsite',
						name: '免过滤网站',
						icon: '',
						hidden: false,
						component: 'components/StrategyManage/AvoidFilterWebsite',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/illegalWebsite',
						name: '违法网站',
						icon: '',
						hidden: false,
						component: 'components/StrategyManage/IllegalWebsite',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/infoMonitoring',
						name: '信息监测',
						icon: '',
						hidden: false,
						component: 'components/StrategyManage/InfoMonitoring',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/infoFilter',
						name: '信息过滤',
						icon: '',
						hidden: false,
						component: 'components/StrategyManage/InfoFilter',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/activeSourceperiod',
						name: '活跃资源周期',
						icon: '',
						hidden: false,
						component: 'components/StrategyManage/ActiveSourceperiod',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/noRecordAutoBlock',
						name: '未备案自动封堵',
						icon: '',
						hidden: false,
						component: 'components/StrategyManage/NoRecordAutoBlock',
						button: '1|2|3|4|5|6|7|8|9'
					}
				]
		    }, {
		    	path: '/receiveDirManage',
			    redirect: '/receiveDirCheck',
			    name: '接收指令管理',
			    icon: 'icon-zhilingguanli',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/receiveDirCheck',
			            name: '接收指令校验',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/ReceiveDirCheck',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/dataRecordStatistic',
			            name: '数据上报统计',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/DataRecordStatistic',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/basicDataSearchDir',
			            name: '基础数据查询指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/BasicDataSearchDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/VisitLogSearchDir',
			            name: '访问日志查询指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/VisitLogSearchDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/infoSaftyManageDir',
			            name: '信息安全管理指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/InfoSaftyManageDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/ManageDirSearch',
			            name: '管理指令查询指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/ManageDirSearch',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/codeTableIssueDir',
			            name: '代码表发布指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/CodeTableIssueDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/avoidFilterWebsiteDir',
			            name: '免过滤网站指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/AvoidFilterWebsiteDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/illegalWebsiteDir',
			            name: '违法网站指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/IllegalWebsiteDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/activeSourceSearchDir',
			            name: '活跃资源查询指令',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/ActiveSourceSearchDir',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/backDataContentSearch',
			            name: '回退数据内容查询',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveDirManage/BackDataContentSearch',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
		    	path: '/joinSourceManage',
				redirect: '/noRecordDomain',
				name: '接入资源管理',
				icon: 'icon-jieruguanli',
				hidden: false,
				component: 'components/Layout',
				children: [
					{
						path: '/noRecordDomain',
						name: '未备案域名监测',
						icon: '',
						hidden: false,
						component: 'components/JoinSourceManage/NoRecordDomain',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/domainManage',
						name: '域名管理',
						icon: '',
						hidden: false,
						component: 'components/JoinSourceManage/DomainManage',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/ipAddress',
						name: 'IP地址管理',
						icon: '',
						hidden: false,
						component: 'components/JoinSourceManage/IpAddress',
						button: '1|2|3|4|5|6|7|8|9'
					}, {
						path: '/ipAndDomain',
						name: 'IP域名关系',
						icon: '',
						hidden: false,
						component: 'components/JoinSourceManage/IpAndDomain',
						button: '1|2|3|4|5|6|7|8|9'
					}/*, {
						path: '/recordData',
						name: '备案数据',
						icon: '',
						component: RecordData
					}*/
				]
		    }, {
		    	path: '/infoSafeLog',
			    redirect: '/basicDataAbnormal',
			    name: '信安日志',
			    icon: 'icon-xinxianquan1',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/basicDataAbnormal',
			            name: '基础数据异常监测',
			            icon: '',
			            hidden: false,
			            component: 'components/InfoSafeLog/BasicDataAbnormal',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/monitorLog',
			            name: '监测日志',
			            icon: '',
			            hidden: false,
			            component: 'components/InfoSafeLog/MonitorLog',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/filterLog',
			            name: '过滤日志',
			            icon: '',
			            hidden: false,
			            component: 'components/InfoSafeLog/FilterLog',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
		    	path: '/activeLogManage',
			    redirect: '/activeDomainLog',
			    name: '活跃日志',
			    icon: 'icon-huoyuetianshu',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/activeDomainLog',
			            name: '活跃域名日志',
			            icon: '',
			            hidden: false,
			            component: 'components/ActiveLogManage/ActiveDomainLog',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/activeDomain',
			            name: '活跃IP日志',
			            icon: '',
			            hidden: false,
			            component: 'components/ActiveLogManage/ActiveIpLog',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/illegalWebSiteLog',
			            name: '违法违规网站日志',
			            icon: '',
			            hidden: false,
			            component: 'components/ActiveLogManage/IllegalWebSiteLog',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
		    	path: '/visitLogManage',
			    redirect: '/visitLogSearch',
			    name: '访问日志管理',
			    icon: 'icon-fangwenrizhi', // icon-rizhi11
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/visitLogSearch',
			            name: '访问日志查询',
			            icon: '',
			            hidden: false,
			            component: 'components/VisitLogManage/VisitLogSearch',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/visitLog',
			            name: '访问日志',
			            icon: '',
			            hidden: false,
			            component: 'components/VisitLogManage/VisitLog',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
		    	path: '/receiveLogManage',
			    redirect: '/logFileShow',
			    name: '日志接收管理',
			    icon: 'icon-rizhiguanli1', // icon-rizhiguanli2
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/logFileShow',
			            name: '日志文件展示',
			            icon: '',
			            hidden: false,
			            component: 'components/ReceiveLogManage/LogFileShow',
						button: '1|2|3|4|5|6|7|8|9'
			        }
			    ]
		    }, {
		    	path: '/summaryStatistic',
			    redirect: '/receiveDocStatistic',
			    name: '汇总统计',
			    icon: 'icon-huizongtongji',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/receiveDocStatistic',
			            name: '接收文档统计',
			            icon: '',
			            hidden: false,
			            component: 'components/SummaryStatistic/ReceiveDocStatistic',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/logRecordStatistic',
			            name: '日志上报统计',
			            icon: '',
			            hidden: false,
			            component: 'components/SummaryStatistic/LogRecordStatistic',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
				path: '/specialLineManage',
			    redirect: '/specialLineUserManage',
			    name: '专线管理',
			    icon: 'icon-zhuanxian',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/specialLineUserManage',
			            name: '专线用户管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SpecialLineManage/SpecialLineUserManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/specialLineIPManage',
			            name: '专线IP管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SpecialLineManage/SpecialLineIPManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/specialLineWebsiteManage',
			            name: '专线网站管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SpecialLineManage/SpecialLineWebsiteManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/ipCategoryDomainManage',
			            name: 'IP类域名管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SpecialLineManage/IPCategoryDomainManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/specialLineDomainReportManage',
			            name: '专线域名报备管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SpecialLineManage/SpecialLineDomainReportManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/specialLineDomainRecordManage',
			            name: '专线域名备案管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SpecialLineManage/SpecialLineDomainRecordManage',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
		    	path: '/systemConfig',
			    redirect: '/portSystemSafeguard',
			    name: '系统配置',
			    icon: 'icon-xitongpeizhi1',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
			        {
			            path: '/portSystemSafeguard',
			            name: '接口系统维护',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/PortSystemSafeguard',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/paramsConfig',
			            name: '参数配置',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/ParamsConfig',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/euDatabasseSafeguard',
			            name: 'EU数据库维护',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/EUDatabasseSafeguard',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/equipInfoManage',
			            name: '设备信息管理',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/EquipInfoManage',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/euParamsConfig',
			            name: 'EU参数配置',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/EuParamsConfig',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/timingSet',
			            name: '校时设置',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/TimingSet',
						button: '1|2|3|4|5|6|7|8|9'
			        }, {
			            path: '/systemLog',
			            name: '系统日志',
			            icon: '',
			            hidden: false,
			            component: 'components/SystemConfig/SystemLog',
						button: '1|2|3|4|5|6|7|8|9'
			        },
			    ]
		    }, {
		    	path: '/statusMonitor',
			    redirect: '/systemStatusMonitor',
			    name: '状态监控',
			    icon: 'icon-zhuangtaijiankong',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
					{
			            path: '/systemStatusMonitor',
			            name: '系统状态监控',
			            icon: '',
			            hidden: false,
			            component: 'components/StatusMonitor/SystemStatusMonitor',
						button: '1|2|3|4|5|6|7|8|9'
			        }
			    ]
		    }, {
		    	path: '/authorityManagement',
			    redirect: '/myAccount',
			    name: '权限管理',
			    icon: 'icon-quanxianguanli2',
			    hidden: false,
			    component: 'components/Layout',
			    children: [
					{
			            path: '/myAccount',
			            name: '我的账户',
			            icon: '',
			            hidden: false,
			            component: 'components/AuthorityManagement/MyAccount',
						button: '1|2|3|4|5|6|7|8|9'
			        }
			    ]
		    }

		]
	}
}

module.exports = [
	app => {
		app.post(`${baseURL}/sso/sso/initSub.do`, (req, res) => {
	  		res.send(initSub)
		})
	},
]
