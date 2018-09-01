const moment = require('moment')
Date.prototype.toString = function () {
	return moment(this).format('YYYY-MM-DD HH:mm:ss')
}