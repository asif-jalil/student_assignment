const { ADMIN, MENTOR, STUDENT } = require("../../utils/roles.const");
const UnauthenticatedError = require("../../error/Unauthenticated.error");
const UnauthorizedError = require("../../error/Unauthorized.error");
const getUserRole = require("../../utils/getUserRole");

module.exports =
	(...grantedRoles) =>
	async (req, res, next) => {
		if (!grantedRoles.length) grantedRoles = [ADMIN, MENTOR, STUDENT];

		if (!req.user?.id) {
			return next(new UnauthenticatedError("You need to sign in first"));
		}

		const role = await getUserRole(req.user.id, grantedRoles);

		if (!role) {
			return next(
				new UnauthorizedError("You are not authorized to perform this action")
			);
		}

		req.role = role;
		next();
	};
