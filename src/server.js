const { Server } = require("http");
const app = require("./app");
const Logger = require("./utils/Logger");

const { API_HOST, API_PORT } = process.env;
const server = Server(app);

server.listen(API_PORT, () => {
	new Logger("server").info(`Api server is running at ${API_HOST}:${API_PORT}`);
});
