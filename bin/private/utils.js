const nunjucks = require('nunjucks')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
let utils = {
	log: {
		error (err) {
			console.log(chalk.red(err))
		}
	},
	folder: {
		copyDir (src, dest) {
			if (!fs.existsSync(dest)) {
				fs.mkdirSync(dest)
			}
			var files = fs.readdirSync(src);
			for(let i = 0; i < files.length; i++) {
				let current = fs.lstatSync(path.join(src, files[i]))
				if (current.isDirectory()) {
					this.copyDir(path.join(src, files[i]), path.join(dest, files[i]))
				} else if(current.isSymbolicLink()) {
					var symlink = fs.readlinkSync(path.join(src, files[i]))
					fs.symlinkSync(symlink, path.join(dest, files[i]))
				} else {
					utils.file.copy(path.join(src, files[i]), path.join(dest, files[i]))
				}
			}
		}
	},
	file: {
		copy (src, desc) {
			fs.createReadStream(src).pipe(fs.createWriteStream(desc))
		},
		readWrite (fromPath, writeToPath, replaceObj) {
			if (!fs.existsSync(path.resolve(writeToPath, '../'))) { fs.mkdirSync(path.resolve(writeToPath, '../')); }
			fs.writeFileSync(writeToPath, nunjucks.renderString(fs.readFileSync(fromPath, "utf8"), replaceObj), "utf8")
		}
	}
}
module.exports = utils