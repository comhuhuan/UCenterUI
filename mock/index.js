const mockdata = [
	...require('./gjg/'),
	...require('./xueqin/'),
	...require('./xiajun/'),
	...require('./wbj/'),
	...require('./fufan/')
]



module.exports = app => {
	mockdata.forEach( item => {
		item(app)
	})
}
