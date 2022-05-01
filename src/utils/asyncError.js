/**
 * Async error handler
 * @param fn
 * @returns {function(*=, *=, *=)}
 */
module.exports = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
