const { ActiveModel } = require('../../lib/coils-core')
class ApplicationRecord extends ActiveModel {
	constructor () {
		super (...arguments)
	}
}
module.exports = ApplicationRecord