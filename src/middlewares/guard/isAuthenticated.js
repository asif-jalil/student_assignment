const models = require("../../models");
const getReqAuthToken = require("../../utils/auth/getReqAuthToken");
const verifyAuthToken = require("../../utils/auth/verifyAuthToken");
const UnauthenticatedError = require("../../error/Unauthenticated.error");
const { BANNED } = require("../../utils/status.const");

module.exports = async (req, res, next) => {
	const token = getReqAuthToken(req);

	if (!token) {
		return next(new UnauthenticatedError("You need to sign in first"));
	}

	try {
		const authTokenPayload = verifyAuthToken(token);

		const user = await models.user.findOne({
			where: {
				id: authTokenPayload.id
			}
		});

		if (!user || user.status === BANNED) {
			return next(new UnauthenticatedError("You are not authenticated"));
		}

		req.user = user;

		next();
	} catch (e) {
		next(new UnauthenticatedError("The authorization token is invalid"));
	}
};
