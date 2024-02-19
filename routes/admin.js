import express from 'express';
import adminController from '../controllers/admin.js';
import isLogged from '../middleware/isLogged.js';

const router = express.Router()

router.get('/admin', isLogged, adminController.getAdmin)
router.get('/products', adminController.getAllProductsForAdmin)
router.get('/add-product', adminController.getAddProduct)
router.post('/add-product', adminController.postAddProduct)
router.get('/edit-product/:id', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.get('/delete-product/:id', adminController.deleteProduct)

export default router;