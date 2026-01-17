
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import brandRoutes from "../modules/brand/brand.routes";
import categoryRoutes from "../modules/category/category.route";
import productRoutes from "../modules/product/product.route";
import orderRoutes from "../modules/order/order.route";

const router = Router();

const moduleRouters = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/brands",
    route: brandRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;

// src/routes/index.ts

// import { Router } from 'express';
// import userRoutes from '../modules/user/user.routes';
// import brandRoutes from '../modules/brand/brand.routes';
// import categoryRoutes from '../modules/category/category.route';
// import productRoutes from '../modules/product/product.route';
// import orderRoutes from '../modules/order/order.route';

// const router = Router();

// // Core routes
// router.use('/users', userRoutes);

// // E-commerce routes
// router.use('/brands', brandRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);


// export default router;