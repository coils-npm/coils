const { exec } = require('child_process')
var Inflector = require('inflected')
module.exports = function (model) {
	exec(`sequelize seed:generate --name demo-${Inflector.underscore(Inflector.dasherize(model))}`, function (err) {
		if (err) {
			console.error(err)
		}
	})
}