const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");

const isValidFile = mimetype => {
	const mimeTypes = [
		mime.lookup("jpg"),
		mime.lookup("jpeg"),
		mime.lookup("png"),
		mime.lookup("txt"),
		mime.lookup("doc"),
		mime.lookup("docx"),
		mime.lookup("pdf")
	];
	return mimeTypes.includes(mimetype);
};

const generateFileName = () => uuidv4();

module.exports = { isValidFile, generateFileName };
