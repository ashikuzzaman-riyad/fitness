// src/modules/order/order.routes.ts

import { Router } from 'express';
import * as orderController from './order.controller';

const router = Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.get('/number/:orderNumber', orderController.getOrderById);
// router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;