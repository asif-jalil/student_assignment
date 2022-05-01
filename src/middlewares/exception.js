const { StatusCodes } = require("http-status-codes");
const AppError = require("../error/App.error");
const { PRODUCTION } = require("../../config/nodeEnvironments");

module.exports = (err, req, res, next) => {
	let { status, code, message } = err;

	res.status(status || StatusCodes.INTERNAL_SERVER_ERROR);

	// development/test
	if (process.env.NODE_ENV !== PRODUCTION) {
		return res.json({ code, message });
	}

	// Production
	if (err instanceof AppError) {
		return res.json({ code, message });
	}

	return res.json({ message: "Something went wrong" });
};
