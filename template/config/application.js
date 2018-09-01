const { Application, ActiveRecordBase } = require('../lib/coils-core')
class Coils extends Application {
	constructor ({initializers, SequelizeModelsSequelizeModels}) {
		super(...arguments)
		this.use(initializers)
		this.use(ActiveRecordBase)
		this.setGlobalVars()
	}
}
module.exports = Coils