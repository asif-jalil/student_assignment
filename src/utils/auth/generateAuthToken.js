const jwt = require("jsonwebtoken");

module.exports = user => {
	const payload = {
		id: user.id,
		email: user.email,
		createdAt: user.createdAt
	};

	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
