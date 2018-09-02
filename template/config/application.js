const { Application, ActiveModel, ActionController } = require('../lib/coils-core')
class Coils extends Application {
	constructor ({initializers, SequelizeModelsSequelizeModels}) {
		super(...arguments)
		this.use(initializers)
		this.use(ActiveModel)
		this.use(ActionController)
		this.setGlobalVars()
		this.$koa.listen(this.envConfig && this.envConfig.PORT || 3000)
	}
}
module.exports = Coils