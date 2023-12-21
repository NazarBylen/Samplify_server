"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const path = require("path");
const db_1 = require("./services/db");
const modules_1 = require("./modules");
const app = express();
const port = 5000;
db_1.dbInstance.initialize()
    .then((source) => {
    console.log(`< MySQL has been connected`);
})
    .catch((error) => console.log(error));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.json());
function errorHandler(error, req, res, next) {
    console.log(`error: ${error.message}; status: ${error.status}`);
    const status = error.status || 400;
    res.status(status).json({ message: error.message });
}
modules_1.default.forEach((module) => {
    app.use(module.route, module.module);
});
app.get('/', (req, res) => {
    res.json({
        name: "API",
        version: '1.0.0'
    });
});
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map