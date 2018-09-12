const path = require('path')
const { exec } = require('child_process')
const utils = require('./private/utils')
var Inflector = require('inflected')
module.exports = function (ctrlPath, args) {
	if (!ctrlPath.match(/Controller$/)) {
		ctrlPath = `${ctrlPath}Controller`
	}
	let filename = Inflector.camelize(ctrlPath.split('/').pop())
	let filenameSimple = filename.replace('Controller', '')
	let prefix = ctrlPath.replace('Controller', '').split('/').map(item => Inflector.underscore(item)).join('/')
	console.log(filename, prefix, args)
	let filePath = path.resolve(process.cwd(), ctrlPath, '../')
	exec(`mkdir -p ${filePath}`, function (err) {
		let options = {}
		args.forEach(key => {
			options[key] = true
		})
		options.maySingularize = Inflector.singularize(filenameSimple) === filenameSimple && !options.index
		options.mayPluralize = Inflector.pluralize(filenameSimple) === filenameSimple
		utils.file.readWrite(path.resolve(__dirname, './private/template/controllers/template.njk'), path.resolve(filePath, `./${filename}.js`), Object.assign({filename, prefix}, options))
	})
}