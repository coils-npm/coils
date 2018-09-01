class Application {
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
}
module.exports = Application