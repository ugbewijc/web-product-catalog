import { Router } from 'express';

import Auth from '../middleware/auth.js';
import CategoryController from '../controllers/categoryController.js';
import ProductController from '../controllers/ProductController.js';
import UserController from '../controllers/UserController.js';

const router = Router();

// router.get('/', ProductController.getAllProduct);

// user router
router.post('/login', UserController.login);
router.post('/register', UserController.registerUser);

// Categories Routes
router.post('/categories', Auth.protectedRoute, CategoryController.newCategory);
router.get('/categories', Auth.protectedRoute, CategoryController.getAllCategory);
router.put('/categories/:id', Auth.protectedRoute, CategoryController.updateCategory);
router.get('/categories/:id/products', Auth.protectedRoute, ProductController.getProductByCategory);

// Products Route 
router.get('', ProductController.getAllProduct);
router.get('/products', ProductController.getAllProduct);
router.post('/products', Auth.protectedRoute, ProductController.addProduct);
router.post('/products/:id', Auth.protectedRoute, ProductController.updateProduct);
router.delete('/products/:id', Auth.protectedRoute, ProductController.deleteProduct);

export default router;