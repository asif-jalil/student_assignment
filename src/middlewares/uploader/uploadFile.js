const path = require("path");
const multer = require("multer");
const bytes = require("bytes");
const { generateFileName, isValidFile } = require("../../utils/uploader");
const InvalidFileError = require("../../error/InvalidFile.error");
const { SUBMISSION_FILE_DIR } = require("../../../config/storage");

module.exports = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			if (!file) cb(null, true);

			cb(null, SUBMISSION_FILE_DIR);
		},
		filename(req, file, cb) {
			if (!file) cb(null, true);

			cb(null, `${generateFileName()}-${file.originalname}`);
		}
	}),
	limits: {
		fileSize: bytes.parse("10MB")
	},
	fileFilter: (req, file, cb) => {
		if (!file) cb(null, true);

		if (isValidFile(file.mimetype)) return cb(null, true);

		return cb(new InvalidFileError("File type is not supported"));
	}
});
