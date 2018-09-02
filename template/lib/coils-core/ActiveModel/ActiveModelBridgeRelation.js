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
		static findBy (options) { return this.newRelation.findBy(options) }
		static all () { return this.newRelation.all() }
		static where (options) { return this.newRelation.where(options) }
		static minAsync (field, options = {}) { return this.newRelation.minAsync(field, options) }
		static maxAsync (field, options = {}) { return this.newRelation.maxAsync(field, options) }
		static select (attributes) { return this.newRelation.select(attributes) }
		static raw () { return this.newRelation.raw() }
		static lock () { return this.newRelation.lock() }

		// pagination
		static limit (num) { return this.newRelation.limit(num) }
		static offset (num) { return this.newRelation.offset(num) }
		static paginate (page = 1, perPage = 20) { return this.newRelation.paginate(page, perPage) }

		// order
		static order (options) { return this.newRelation.order(options) }

		// group
		static group (fields) { return this.newRelation.group(fields) }
	}
	return ActiveModelBridgeRelation
}