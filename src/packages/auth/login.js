const { BANNED } = require("../../utils/status.const");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const getAuthUser = require("./getAuthUser");
const generateAuthToken = require("../../utils/auth/generateAuthToken");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await models.user.unscoped().findOne({
		attributes: ["id", "email", "password", "status", "createdAt"],
		where: {
			email
		}
	});

	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ email: "Email address is incorrect" });
	}

	const passwordMatched = await user.comparePassword(password);

	if (!passwordMatched) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ password: "Password is incorrect" });
	}

	if (user.status === BANNED) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			email: "This account is not authorized to use this service"
		});
	}

	const authToken = generateAuthToken(user);
	const authUser = await getAuthUser(user.id);

	return res.json({
		token: authToken,
		user: authUser
	});
});
