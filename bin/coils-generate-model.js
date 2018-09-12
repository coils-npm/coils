const path = require('path')
const { exec } = require('child_process')
const utils = require('./private/utils')
var Inflector = require('inflected')
module.exports = function (model, attributes) {
	let modelName = Inflector.singularize(Inflector.camelize(model))
	exec(`sequelize model:generate --name ${model} --attributes ${attributes.join(',')} --underscored`, (err, stdout, stderr) => {
		if (err) {
			return console.error(err)
		} else {
			utils.file.readWrite(path.resolve(__dirname, './private/template/models/template.njk'), path.resolve(process.cwd(), `./app/models/${modelName}.js`), {modelName})
		}
	})
}