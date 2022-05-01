const dotEnv = require("dotenv");
const express = require("express");
const mapRoutes = require("./routes");
const middlewares = require("./middlewares");
const { TEST } = require("../config/nodeEnvironments");

if (process.env.NODE_ENV !== TEST) {
	dotEnv.config();
}

const app = express();

app.set("trust proxy", true);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(middlewares.cors);

mapRoutes(app);

app.use("*", middlewares.apiNotFound);
app.use(middlewares.exception);

module.exports = app;
