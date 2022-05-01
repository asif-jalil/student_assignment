/* eslint-disable no-unused-vars */

/**
 * Invalid api endpoint handler
 * @param req
 * @param res
 */
module.exports = (req, res) => {
	res.status(404).json({
		status: "This API endpoint does not exist"
	});
};
