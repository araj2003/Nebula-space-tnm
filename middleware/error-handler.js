const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(err);
	return res
		.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ success: false, msg: 'Internal Server Error', code: '000' });
};

module.exports = errorHandlerMiddleware;
