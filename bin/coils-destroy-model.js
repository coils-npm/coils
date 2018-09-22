const { exec } = require('child_process')
module.exports = function (model, attributes) {
	console.assert(model.match(/^[A-Z]+/), 'Model Name do not allow lowercase')
	exec(`sequelize model:generate --name ${model} --attributes ${attributes.join(',')} --underscored`, (err, stdout, stderr) => {
		if (err) {
			return console.error(err)
		}
	})
}