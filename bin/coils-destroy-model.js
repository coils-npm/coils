const { exec } = require('child_process')
module.exports = function (model, attributes) {
	exec(`sequelize model:generate --name ${model} --attributes ${attributes.join(',')} --underscored`, (err, stdout, stderr) => {
		if (err) {
			return console.error(err)
		}
	})
}