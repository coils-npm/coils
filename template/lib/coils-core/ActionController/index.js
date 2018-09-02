const fs = require('fs')
const path = require('path')
const isObject = require('../utils/isObject')
const isClass = require('../utils/isClass')
const KoaRouter = require('koa-router')
const Koa = require('koa')
let koa = new Koa()
require('koa-qs')(koa)
class ActionController extends KoaRouter {
	static registerRouter (application, Routers) {
		isObject(Routers) && Object.keys(Routers).forEach((key) => {
			if (isClass(Routers[key])) {
				let router = new Routers[key]()
				if (router instanceof ActionController) {
					application.$koa.use(router.routes()).use(router.allowedMethods());
				}
			} else {
				this.registerRouter(application, Routers[key])
			}
		})
	}
	static mounted (application) {
		koa['defaultUse'] = koa['use']
		koa['use'] = function (middleware) { return koa.defaultUse(middleware.bind(application)) }
		let middlewaresPath = path.resolve(process.cwd(), 'app/middlewares')
		fs.readdirSync(middlewaresPath).sort().forEach(file => {
			koa.use(require(path.resolve(middlewaresPath, file)))
		})
		Object.defineProperties(application, {
			'$koa': { "get": () => { return koa } }
		})
		const Routers = require(path.resolve(process.cwd(), 'app/controllers'))
		ActionController.registerRouter(application, Routers)
	}

	constructor () {
		super(...arguments)
	}
}
module.exports = ActionController