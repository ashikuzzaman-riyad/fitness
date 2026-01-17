// src/app.ts

import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";
import router from "./app/routers";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// CORS
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  })
);

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "🚀 E-commerce API Server Is Running",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " seconds",
    timestamp: new Date().toISOString(),
    endpoints: {
      users: `/api/v1/users`,
      brands: `/api/v1/brands`,
      categories: `/api/v1/categories`,
      products: `/api/v1/products`,
      orders: `/api/v1/orders`,
    },
  });
});

// API Routes
app.use("/api/v1", router);

// Global Error Handler (must be after routes)
app.use(globalErrorHandler);

// Not Found Handler (must be last)
app.use(notFound);

export default app;