// src/modules/brand/brand.routes.ts

import { Router } from 'express';
import * as brandController from './brand.controller';

const router = Router();

router.post('/', brandController.createBrand);
router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.get('/slug/:slug', brandController.getBrandBySlug);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

export default router;