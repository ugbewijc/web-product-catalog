
import { Router } from 'express';

import express from 'express'

const router = express.Router();

import ProductController from '../controllers/ProductController.js';


router.get('', ProductController.home);

// module.exports = router;
export default router;