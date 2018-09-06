const Coils = require('coils-core')
const CoilsModel = require('coils-model')
const CoilsController = require('coils-controller')
const env = process.env.NODE_ENV || 'development';
const envConfig = require('./env.json') || {}
const initializers = require('./initializers')
class Application extends Coils {
	constructor (cusConfig) {
		super(Object.assign({NODE_ENV: env, envConfig: Object.assign({}, envConfig, envConfig[env])}, cusConfig))
		this.use(initializers)
		this.use(CoilsModel)
		// mount Koa about
		this.use(CoilsController)
		this.setGlobalVars()
	}
}
module.exports = Application