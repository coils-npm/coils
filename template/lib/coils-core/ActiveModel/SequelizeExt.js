let Sequelize = require('sequelize');
class SequelizeExt extends Sequelize {
	constructor () {
		super(...arguments)
	}

	define(modelName, attributes, options) {
		options = options || {};

		options.modelName = modelName;
		options.sequelize = this;

		return {attributes, options}

		// const model = class extends Model {};
		//
		// model.init(attributes, options);
		//
		// return model;
	}

}
module.exports = SequelizeExt