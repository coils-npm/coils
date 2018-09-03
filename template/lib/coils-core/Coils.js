class Coils {
	constructor (options) {
		for (let key in options) {
			Object.defineProperties(this, { [key]: { "get": () => { return options[key] } } })
		}
	}

	use (module) {
		if (module.mounted) {
			return module.mounted(this)
		} else {
			console.error(`module ${module} must define mounted method`)
		}
	}

	setGlobalVars () {
		Object.defineProperties(global, { "$application": { "get": () => { return application } } })
		for (let model of this['$Models']) {
			Object.defineProperties(global, {
				[model.name]: { "get": () => { return model } }
			})
		}
	}
	
	startKoa (port) {
		port = port || this.envConfig.PORT || 3000
		this.$koa.listen(port, function () {
			console.log(`app start at: http://localhost:${port}`)
		})
	}
}
module.exports = Coils