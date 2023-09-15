import { Router } from 'express';

const router = Router();

/**
 * v1 routes
 */
router.get('/', (req, res) => res.send('welcome to Web Product Catalog. visit /api/v1 endpoint to perform crud operations'));
module.exports = router;