class ActiveRelationBase {
	get Model () { return this._Model }

	constructor (Model) {
		this._Model = Model
		this._query = {method: 'findOne', options: {}}
	}
	promise () {
		return this.Model[this._query.method](this._query.options)
	}

	set query (query) {
		Object.assign(this._query, query)
	}

	// query
	find (primaryKeyValue) {
		let primaryKey = this.Model.primaryKeyAttributes[0]
		this.query = {method: 'findOne', options: {where: {[primaryKey]: primaryKeyValue}}}
		return this
	}
}
module.exports = ActiveRelationBase