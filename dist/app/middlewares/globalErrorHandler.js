"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    // Handle known Prisma client errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P1000":
                message = "Authentication failed against the database server.";
                statusCode = http_status_1.default.BAD_GATEWAY;
                break;
            case "P1001":
                message = "Cannot reach the database server. Please check connection.";
                statusCode = http_status_1.default.BAD_GATEWAY;
                break;
            case "P1002":
                message = "The database operation timed out.";
                statusCode = http_status_1.default.REQUEST_TIMEOUT;
                break;
            case "P2000":
                message = "Value too long for a database column.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2001":
                message = "Record not found.";
                statusCode = http_status_1.default.NOT_FOUND;
                break;
            case "P2002":
                message = "Duplicate key error — unique constraint failed.";
                statusCode = http_status_1.default.CONFLICT;
                break;
            case "P2003":
                message = "Foreign key constraint failed.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2004":
                message = "Database constraint failed.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2005":
                message = "Invalid value stored in the database.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2006":
                message = "Invalid value type provided for the field.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2007":
                message = "Data validation error.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2008":
                message = "Query parsing failed.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2009":
                message = "Query validation failed.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2010":
                message = "Raw query failed. Check your query syntax.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2011":
                message = "Null constraint violation — missing required field.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2012":
                message = "Missing required value for a field.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2013":
                message = "Missing required argument for a field.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2014":
                message = "Relation violation between records.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2015":
                message = "Related record not found.";
                statusCode = http_status_1.default.NOT_FOUND;
                break;
            case "P2016":
                message = "Query interpretation error.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2017":
                message = "Record relation inconsistency.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2018":
                message = "Required connected record not found.";
                statusCode = http_status_1.default.NOT_FOUND;
                break;
            case "P2019":
                message = "Input error — invalid data.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2020":
                message = "Value out of range for the column type.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            case "P2021":
                message = "Table not found in the database.";
                statusCode = http_status_1.default.NOT_FOUND;
                break;
            case "P2022":
                message = "Column not found in the database table.";
                statusCode = http_status_1.default.NOT_FOUND;
                break;
            case "P2023":
                message = "Inconsistent column data — check your schema.";
                statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
                break;
            case "P2024":
                message = "Transaction failed due to timeout or rollback.";
                statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
                break;
            case "P2025":
                message = "Record to update/delete does not exist.";
                statusCode = http_status_1.default.NOT_FOUND;
                break;
            case "P2030":
                message = "Database file not found (SQLite specific).";
                statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
                break;
            case "P2033":
                message = "Number out of range for field type.";
                statusCode = http_status_1.default.BAD_REQUEST;
                break;
            default:
                message = `Unexpected Prisma error (code: ${err.code}).`;
                statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
                break;
        }
        error = err.meta || err.message;
    }
    // Prisma Validation Errors
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        message = "Validation error in Prisma operation.";
        error = err.message;
        statusCode = http_status_1.default.BAD_REQUEST;
    }
    // Unknown Prisma Errors
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        message = "Unknown Prisma request error occurred.";
        error = err.message;
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    }
    // Initialization or connection errors
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        message = "Failed to initialize Prisma client — check your DB connection.";
        error = err.message;
        statusCode = http_status_1.default.BAD_GATEWAY;
    }
    // Handle generic JavaScript errors
    else if (err instanceof Error) {
        message = err.message || "An unexpected error occurred.";
        error = err.stack;
    }
    // Send the response
    res.status(statusCode).json({
        success,
        message,
        error,
        stack: config_1.default.node_env === "development" ? err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
