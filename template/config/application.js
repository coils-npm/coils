const Coils = require('coils-core')
const CoilsModel = require('coils-model')
const CoilsController = require('coils-controller')
const NODE_ENV = process.env.NODE_ENV || 'development'
const EnvConfig = require('./env.json') || {}
const initializers = require('./initializers')
class Application extends Coils {
	constructor (cusConfig) {
		super(Object.assign({NODE_ENV, EnvConfig: Object.assign({}, EnvConfig, EnvConfig[NODE_ENV])}, cusConfig))
		this.use(initializers)
		this.use(CoilsModel)
		// mount Koa about
		this.use(CoilsController)
		this.setGlobalVars()
	}
}
module.exports = Application