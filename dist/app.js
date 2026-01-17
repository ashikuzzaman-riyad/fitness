"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const routers_1 = __importDefault(require("./app/routers"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.frontend_url,
    credentials: true,
}));
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Router
app.use("/api/v1", routers_1.default);
app.get("/", (req, res) => {
    res.send({
        message: "Server Is Running..",
        environment: config_1.default.node_env,
        uptime: process.uptime().toFixed(2) + " second",
        timeStamp: new Date().toISOString(),
    });
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Not Found
app.use(notFound_1.default);
exports.default = app;
