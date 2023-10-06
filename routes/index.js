import { Router } from 'express';

import CategoryController from '../controllers/categoryController.js';
import ProductController from '../controllers/ProductController.js';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.registerUser);

// Categories Routes
router.post('/categories', CategoryController.newCategory);
router.get('/categories', CategoryController.getAllCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.get('/categories/:id/products', ProductController.getProductByCategory);

// Products Route 
router.get('', ProductController.home);
router.get('/products', ProductController.getAllProduct);
router.post('/products', ProductController.addProduct);
router.post('/products/:id', ProductController.updateProduct);
router.delete('/products/:id',ProductController.deleteProduct);

export default router;