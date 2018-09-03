#!/usr/bin/env node
const commander = require('commander')
const packageJson = require('../package.json');
commander.version(packageJson.version)

commander.command('new <project>')//.arguments('<project>')
	.option('-d --db <db>', 'db type', /^(sqlite|mysql)$/i, 'sqlite')
	.action(require('./coils-new'));

// Model
// coils generate model user name:string age:integer
// Controller
// coils generate controller api/v1/users index show
commander.command('generate <cmd>')
	.arguments('<cmd> [model][arguments]')
	.action(function (cmd, model) {
		let arguments = process.argv.slice(process.argv.indexOf(model) + 1, process.argv.length)
		switch (cmd) {
			case 'model':
				break;
			case 'controller':
				break
		}
		console.log(cmd, 1, model, 2, arguments, 3)
	});

commander.command('console')
	.action(require('./coils-console'));

commander.parse(process.argv);
