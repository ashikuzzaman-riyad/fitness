"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = (0, express_1.Router)();
const moduleRouters = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRouter,
    },
];
moduleRouters.forEach((route) => router.use(route.path, route.route));
exports.default = router;
