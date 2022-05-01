const getReqAuthToken = require("../../utils/auth/getReqAuthToken");
const verifyAuthToken = require("../../utils/auth/verifyAuthToken");
const { BANNED } = require("../../utils/status.const");

const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const getAuthUser = require("./getAuthUser");

module.exports = asyncHandler(async (req, res) => {
	const token = getReqAuthToken(req);

	if (!token) {
		return res.json(null);
	}

	const tokenPayload = verifyAuthToken(token);

	const user = await getAuthUser(tokenPayload.id);

	if (user.status === BANNED) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "This account is not authorized to use this service" });
	}

	return res.json({
		user
	});
});
