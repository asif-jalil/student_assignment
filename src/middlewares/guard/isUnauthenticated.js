const getReqAuthToken = require("../../utils/auth/getReqAuthToken");
const UnauthorizedError = require("../../error/Unauthorized.error");

module.exports =  async (req, res, next) => {
	const token = getReqAuthToken(req);

	if (token) {
		return next(new UnauthorizedError("You are already signed in"));
	}
	
	next();
};