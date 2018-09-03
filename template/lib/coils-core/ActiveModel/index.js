const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelizeConfig = require(path.resolve(process.cwd(), '.sequelizerc'))
const cls = require('continuation-local-storage');
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(process.cwd(), sequelizeConfig.config))[env];
const sequelizeModelsPath = path.resolve(process.cwd(), sequelizeConfig['models-path'])
const modelsPath = path.resolve(process.cwd(), 'app/models')

let namespace = cls.createNamespace('auto-transaction')
Sequelize.useCLS(namespace)

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}
Object.assign(sequelize, {
	define(modelName, attributes, options) {
		options = options || {};
		
		options.modelName = modelName;
		options.sequelize = this;
		
		// override default function
		return {attributes, options}
		// const model = class extends Model {};
		// model.init(attributes, options);
		// return model;
	}
})
// Active Model Base
let ActiveModelBase = require('./ActiveModelBase')(Sequelize, sequelize)
class ActiveModel extends ActiveModelBase {
	static mounted (application) {
		let Models = []
		fs.readdirSync(modelsPath).filter((file) => {
			return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (!path.basename(file).match(/ApplicationRecord/i))
		}).forEach((file) => {
			let {attributes, options} = require(path.resolve(sequelizeModelsPath, file))(sequelize, Sequelize.DataTypes)
			let Model = require(path.resolve(modelsPath, file))
			Model.init(attributes, options)
			Models.push(Model)
		});
		Models.forEach((Model) => {
			if (Model.associate) {
				Model.associate(Models);
			}
		})
		Object.defineProperties(application, {
			'$Models': { "get": () => { return Models } }
		})
		return Models
	}
	static get _sequelize () {
		return sequelize
	}
	static get _Sequelize () {
		return Sequelize
	}

	constructor () {
		super(...arguments)
	}
}

module.exports = ActiveModel