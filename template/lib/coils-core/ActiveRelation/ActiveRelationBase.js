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
	findBy (options) {
		this.query = {method: 'findOne', options: {where: options}}
		return this
	}
	all () {
		this.query = {method: 'findAll', options: {where: {}}}
		return this
	}
	where (options) {
		this.query = {method: 'findAll', options: {where: options}}
		return this
	}
	minAsync (field, options = {}) {
		this.query = {method: 'findAll', options: {where: options}}
		return this.Model.min(field, this._query.options)
	}
	maxAsync (field, options = {}) {
		this.query = {method: 'findAll', options: {where: options}}
		return this.Model.max(field, this._query.options)
	}
	select (attributes) {
		this.query = {method: 'findAll', options: {attributes: attributes}}
		return this
	}
	raw () {
		this.query = {method: 'findAll', options: {raw: true}}
		return this
	}

	// pagination
	limit (num) {
		this.query = {method: 'findAll', options: {limit: num}}
		return this
	}
	offset (num) {
		this.query = {method: 'findAll', options: {offset: num}}
		return this
	}
	paginate (page, perPage) {
		let offset = (page - 1) * perPage
		this.query = {method: 'findAll', options: {offset, limit: perPage - 0}}
		return this
	}

	// order
	order (options) {
		this.query = {method: 'findAll', options: {order: options}}
		return this
	}

	// group
	group (fields) {
		this.query = {method: 'findAll', order: fields}
		return this
	}
}
module.exports = ActiveRelationBase