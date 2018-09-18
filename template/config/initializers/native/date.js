const moment = require('moment')
Date.prototype.toString = function (format = 'YYYY-MM-DD HH:mm:ss') {
	return moment(this).format(format)
}