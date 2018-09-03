module.exports = function (Sequelize, sequelize) {
	let ActiveModelBridgeRelation = require('./ActiveModelBridgeRelation')(Sequelize, sequelize)
	class ActiveModelBase extends ActiveModelBridgeRelation {
		// Transaction
		// https://itbilu.com/nodejs/npm/EJO6CcCM-.html
		static transaction (tranCb) {
			return Promise.resolve(sequelize.transaction(tranCb))
		}

		constructor () {
			super(...arguments)
		}
		
		async withLock (asyncCb) {
			await ActiveModelBase.transaction((t) => this.constructor.findOne({where: {id: this.id}, lock: t.LOCK.UPDATE}))
			await ActiveModelBase.transaction(asyncCb)
		}
	}
	return ActiveModelBase
}