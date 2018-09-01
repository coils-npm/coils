let ApplicationRecord = require('./applicationrecord')
class User extends ApplicationRecord {
	constructor () {
		super(...arguments)
	}
}
module.exports = User