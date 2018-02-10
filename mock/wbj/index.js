module.exports = [
	...require('./receiveDirCheck'),
	...require('./dataRecordStatistic'),
	...require('./basicDataSearchDir'),
	...require('./visitLogSearchDir'),
	...require('./infoSaftyManageDir'),
	...require('./manageDirSearch'),
	...require('./codeTableIssueDir'),
	...require('./avoidFilterWebsiteDir'),
	...require('./illegalWebsiteDir'),
	...require('./backDataContentSearch'),
	...require('./activeSourceSearchDir'),
	...require('./basicDataAbnormal'),
	...require('./monitorLog'),
	...require('./filterLog'),
	...require('./activeDomainLog'),
	...require('./activeIpLog'),
	...require('./illegalWebSiteLog'),
	...require('./visitLogSearch'),
	...require('./visitLog'),
	...require('./logFileShow'),
	...require('./receiveDocStatistic'),
	...require('./logRecordStatistic')
]