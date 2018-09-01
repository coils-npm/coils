const { ActiveRecordBase } = require('../../lib/coils-core')
class ApplicationRecord extends ActiveRecordBase {
	constructor () {
		super (...arguments)
	}
}
module.exports = ApplicationRecord