const path = require('path')
const fs = require('fs')
const utils = require('./private/utils')
let templatePath = path.resolve(__dirname, '../template')
module.exports = function (project, options) {
	const projectPath = path.resolve(process.cwd(), `./${project}`)
	if (fs.existsSync(projectPath)) {
		return utils.log.error('project folder exist')
	}
	console.log(`${project}, ${options.db}`)
	// console.log(templatePath)
	// copy package.json
	utils.file.readWrite(path.resolve(templatePath, './package.njk'), path.resolve(projectPath, './package.json'), Object.assign({name: project}, options))
	utils.file.readWrite(path.resolve(templatePath, './.gitignore'), path.resolve(projectPath, './.gitignore'), Object.assign({name: project}, options))
	// copy .sequelize
	utils.file.copy(path.resolve(templatePath, './.sequelizerc'), path.resolve(projectPath, './.sequelizerc'))
	// copy start.js
	utils.file.copy(path.resolve(templatePath, './start.js'), path.resolve(projectPath, './start.js'))
	// copy app folder
	utils.folder.copyDir(path.resolve(templatePath, './app'), path.resolve(projectPath, './app'))
	// copy config folder
	utils.folder.copyDir(path.resolve(templatePath, './config'), path.resolve(projectPath, './config'))
	// copy db folder
	utils.folder.copyDir(path.resolve(templatePath, './db'), path.resolve(projectPath, './db'))
	// copy lib folder
	utils.folder.copyDir(path.resolve(templatePath, './lib'), path.resolve(projectPath, './lib'))
	// copy log folder
	utils.folder.copyDir(path.resolve(templatePath, './log'), path.resolve(projectPath, './log'))
	// copy test folder
	utils.folder.copyDir(path.resolve(templatePath, './test'), path.resolve(projectPath, './test'))
	// copy db:config
	utils.file.readWrite(path.resolve(__dirname, `./private/template/dbs/${options.db}.njk`), path.resolve(projectPath, './config/database.json'), Object.assign({name: project}, options))
}