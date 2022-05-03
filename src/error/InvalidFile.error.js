const { StatusCodes } = require("http-status-codes");
const AppError = require("./App.error");

class InvalidFileError extends AppError {
	status = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
	code = "InvalidFile";
}

module.exports = InvalidFileError;
