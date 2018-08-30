#!/usr/bin/env node
const program = require('./private/cmd')
var packageJson = require('../package.json');
program.commander.version('0.1.0')

// Model
// coils generate model user name:string age:integer
program.commander.command('generate model <cmd>')
	.arguments('<cmd> [model][arguments]')
	.action(function (cmd, model) {
		let arguments = process.argv.slice(process.argv.indexOf(model) + 1, process.argv.length)
		console.log(cmd, 1, model, 2, arguments)
	});

// Controller
// coils generate controller api/v1/users index show
program.commander.command('generate controller <cmd>')
	.arguments('<cmd> [controller][arguments]')
	.action(function (cmd, controller) {
		let arguments = process.argv.slice(process.argv.indexOf(controller) + 1, process.argv.length)
		console.log(cmd, 1, controller, 2, arguments)
	});

program.commander.parse(process.argv);
