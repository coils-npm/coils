const { Application, ActiveModel } = require('../lib/coils-core')
class Coils extends Application {
	constructor ({initializers, SequelizeModelsSequelizeModels}) {
		super(...arguments)
		this.use(initializers)
		this.use(ActiveModel)
		this.setGlobalVars()
	}
}
module.exports = Coils