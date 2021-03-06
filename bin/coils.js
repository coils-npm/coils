#!/usr/bin/env node
const commander = require('commander')
const packageJson = require('../package.json');
const { exec } = require('child_process')
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
		let args = process.argv.slice(process.argv.indexOf(model) + 1, process.argv.length)
		switch (cmd) {
			case 'model':
				require('./coils-generate-model')(model, args)
				break;
			case 'controller':
				let path = model
				require('./coils-generate-controller')(path, args)
				break
			case 'seed':
				require('./coils-generate-seed')(model)
				break
		}
		console.log(cmd, model, args)
	});

commander.command('destroy <cmd>')
	.arguments('<cmd> [model][arguments]')
	.action(function (cmd, model) {
		let args = process.argv.slice(process.argv.indexOf(model) + 1, process.argv.length)
		switch (cmd) {
			case 'model':
				require('./coils-destroy-model')(model, args)
				break;
			case 'controller':
				let path = model
				require('./coils-destroy-controller')(path, args)
				break
		}
		console.log(cmd, 1, model, 2, args, 3)
	});

commander.option('-e, --env [v]', 'environment')
	.command('db:create').action(function () {
		let env = commander.env || 'development'
		exec(`sequelize db:create --env ${env}`, function (err) {if (err) {console.error(err)}})
	});

commander.option('-e, --env [v]', 'environment')
	.command('db:drop').action(function () {
	let env = commander.env || 'development'
	exec(`sequelize db:drop --env ${env}`, function (err) {if (err) {console.error(err)}})
});

commander.command('db:migrate').action(function () {exec(`sequelize db:migrate`, function (err) {if (err) {console.error(err)}})});
commander.command('db:rollback').action(function () {exec(`sequelize db:migrate:undo`, function (err) {if (err) {console.error(err)}})});
commander.command('db:rollback:all').action(function () {exec(`sequelize db:migrate:undo:all`, function (err) {if (err) {console.error(err)}})});
commander.command('db:seed').action(function () {exec(`sequelize db:seed:all`, function (err) {if (err) {console.error(err)}})});
commander.command('db:seed:all').action(function () {exec(`sequelize db:seed:all`, function (err) {if (err) {console.error(err)}})});
commander.command('db:seed:undo').action(function () {exec(`sequelize db:seed:undo`, function (err) {if (err) {console.error(err)}})});
commander.command('db:seed:undo:all').action(function () {exec(`sequelize db:seed:undo:all`, function (err) {if (err) {console.error(err)}})});

commander.command('console')
	.action(require('./coils-console'));

commander.parse(process.argv);
