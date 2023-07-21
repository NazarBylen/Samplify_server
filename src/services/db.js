"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInstance = void 0;
const typeorm_1 = require("typeorm");
const modules_1 = require("../modules");
const entities = modules_1.default.map(module => module.entity);
exports.dbInstance = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "samplify",
    entities,
    synchronize: true,
    logging: false
});
//# sourceMappingURL=db.js.map