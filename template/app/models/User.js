let ApplicationRecord = require('./ApplicationRecord')
class User extends ApplicationRecord {
	constructor () {
		super(...arguments)
	}
}
module.exports = User