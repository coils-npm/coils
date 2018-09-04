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
		
		withLock (asyncCb) {
			return ActiveModelBase.transaction(async (t) => {
				await this.constructor.findOne({where: {id: this.id}, lock: t.LOCK.UPDATE})
				await asyncCb(t)
			})
		}
	}
	return ActiveModelBase
}