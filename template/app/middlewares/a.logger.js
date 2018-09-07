const winston = require('winston')
const path = require('path')
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.json(),
		winston.format.timestamp()
	),
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log`
		// - Write all logs error (and below) to `error.log`.
		//
		new winston.transports.File({ filename: path.resolve(process.cwd(), 'log/error.log'), level: 'error' }),
		new winston.transports.File({ filename: path.resolve(process.cwd(), `log/${process.env.NODE_ENV || 'development'}.log`) })
	]
})
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
}

module.exports = async function (ctx, next) {
	let start = Date.now();
	try {
		logger.info(`Start ${ctx.method} "${ctx.originalUrl}" for ${ctx.request.ip}`)
		await next();
	} catch (err) {
		logger.error(`Error ${ctx.method} "${ctx.originalUrl}" ${err.isBoom ? err.output.statusCode : err.status || 500} ${err.stack}`)
		throw err
	}
	let ms = Date.now() - start;
	logger.info(`Completed ${ctx.status || 404} OK in ${ms}ms ${ctx.response && ctx.response.length || '-'}`)
}
