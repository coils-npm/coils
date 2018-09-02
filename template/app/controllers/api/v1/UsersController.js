let ApplicationController = require('../../ApplicationController')
class UsersController extends ApplicationController {
	constructor () {
		super({prefix: '/api/v1/users'})

		this.get('/', async (ctx, next) => {
			console.log(ctx.query)
			ctx.body = await User.all()
		})
	}
}
module.exports = UsersController