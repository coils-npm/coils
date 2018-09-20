const Coils = require('coils-core')
const initializers = require('./initializers')
const CoilsEnv = require('coils-env')
const CoilsModel = require('coils-model')
const CoilsController = require('coils-controller')
class Application extends Coils {
	// PORT
	constructor (initOptions = {}) {
		super(initOptions)
		this.use(CoilsEnv)
		this.use(initializers)
		this.use(CoilsModel)
		// mount Koa about
		this.use(CoilsController)
		this.setGlobalVars()
	}
}
module.exports = Application