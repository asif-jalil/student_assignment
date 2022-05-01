/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS)
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
};
