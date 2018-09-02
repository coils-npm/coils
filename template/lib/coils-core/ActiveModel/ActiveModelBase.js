module.exports = function (Sequelize) {
	let ActiveModelBridgeRelation = require('./ActiveModelBridgeRelation')(Sequelize)
	class ActiveModelBase extends ActiveModelBridgeRelation {
		constructor () {
			super(...arguments)
		}
	}
	return ActiveModelBase
}