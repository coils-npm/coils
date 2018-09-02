let ActiveRelation = require('../ActiveRelation')
module.exports = function (Sequelize) {
	class ActiveModelBridgeRelation extends Sequelize.Model {
		static get newRelation () {
			return new Proxy(new ActiveRelation(this), {
				get (target, prop) {
					if(target[prop]) {
						return target[prop];
					} else if (prop === 'then') {
						let promise = target.promise()
						return promise.then.bind(promise)
					}
				}
			})
		}
		// query
		static find (primaryKeyValue) { return this.newRelation.find(primaryKeyValue) }
	}
	return ActiveModelBridgeRelation
}