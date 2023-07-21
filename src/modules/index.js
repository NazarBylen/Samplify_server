"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_module_1 = require("./auth/auth.module");
const API_PREFIX = '/api';
const modules = [
    {
        name: 'auth',
        module: auth_module_1.default.controller,
        entity: auth_module_1.default.entity,
        route: `${API_PREFIX}/auth`
    }
];
exports.default = modules;
//# sourceMappingURL=index.js.map