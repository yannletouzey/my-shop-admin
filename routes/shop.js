import express from 'express';
import productController from '../controllers/product.js';

const router = express.Router();

router.get('/',  productController.getLastProduct);
router.get('/products', productController.getProduct);
router.get('/product_detail/:id', productController.getProductById);
router.get('/checkout', (req, res) => {
    res.status(200).render('shop/checkout', {
        path: '/shop/checkout', 
        pageTitle: 'Checkout',
    });
});

export default router;