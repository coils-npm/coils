const path = require('path')
const fs = require('fs')
var Inflector = require('inflected')
module.exports = function (ctrlPath, args) {
	if (!ctrlPath.match(/Controller$/)) {
		ctrlPath = `${ctrlPath}Controller`
	}
	let filename = Inflector.camelize(ctrlPath.split('/').pop())
	let filePath = path.resolve(process.cwd(), ctrlPath, '../')
	fs.unlinkSync(path.resolve(filePath, `./${filename}.js`));
}