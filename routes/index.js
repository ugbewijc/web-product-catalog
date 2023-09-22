import { Router } from 'express';

import ProductController from '../controllers/ProductController.js';
import UserController from '../controllers/UserController.js';
import CategoryController from '../controllers/categoryController.js';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.registerUser);

// categories routes
router.post('/categories', CategoryController.newCategory)
router.get('/categories', CategoryController.getAllCategory)
router.put('/categories/:id', CategoryController.updateCategory)

// 
router.get('', ProductController.home);

export default router;