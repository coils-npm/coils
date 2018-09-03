const { Coils, ActiveModel, ActionController } = require('../lib/coils-core')
const env = process.env.NODE_ENV || 'development';
const envConfig = require('./env.json') || {}
const initializers = require('./initializers')
class Application extends Coils {
	constructor (cusConfig) {
		super(Object.assign({NODE_ENV: env, envConfig: Object.assign({}, envConfig, envConfig[env])}, cusConfig))
		this.use(initializers)
		this.use(ActiveModel)
		// mount Koa about
		this.use(ActionController)
		this.setGlobalVars()
		this.koaPort = envConfig.PORT || 3000
	}
}
module.exports = Application