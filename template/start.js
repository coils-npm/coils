const Coils = require('./config/application')
const env = process.env.NODE_ENV || 'development';
const envConfig = require('./config/env.json') || {}
const initializers = require('./config/initializers')

new Coils({
	env,
	envConfig: Object.assign({}, envConfig, envConfig[env]),
	initializers
})