// src/server.ts

import { Server } from "http";
import app from "./app";
import config from "./app/config";

async function bootstrap() {
  let server: Server;
  
  try {
    // Start the server
    server = app.listen(config.port, () => {
      console.log(`\n🚀 Server is running on http://localhost:${config.port}`);
      console.log(`📚 Environment: ${config.node_env}`);
      console.log(`🌐 API Base: http://localhost:${config.port}/api/v1`);
      console.log(`\n📋 Available Endpoints:`);
      console.log(`   Health: http://localhost:${config.port}/`);
      console.log(`   Users: http://localhost:${config.port}/api/v1/users`);
      console.log(`   Brands: http://localhost:${config.port}/api/v1/brands`);
      console.log(`   Categories: http://localhost:${config.port}/api/v1/categories`);
      console.log(`   Products: http://localhost:${config.port}/api/v1/products`);
      console.log(`   Orders: http://localhost:${config.port}/api/v1/orders\n`);
    });

    // Graceful shutdown handler
    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log(`\n✅ Server closed gracefully`);
          process.exit(0); // Changed to 0 for successful shutdown
        });
      } else {
        process.exit(1);
      }
    };

    // Handle process termination signals
    process.on('SIGTERM', () => {
      console.log('⚠️ SIGTERM received');
      exitHandler();
    });

    process.on('SIGINT', () => {
      console.log('\n⚠️ SIGINT received (Ctrl+C)');
      exitHandler();
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: Error) => {
      console.error("❌ Unhandled Rejection detected:");
      console.error(reason);
      console.log("🔄 Closing server...");
      exitHandler();
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      console.error("❌ Uncaught Exception detected:");
      console.error(error);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

bootstrap();