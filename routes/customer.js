import express from 'express';
import customerController from '../controllers/customer.js';
const router = express.Router();

router.get('/customer/cart', customerController.getCart);
router.post('/customer/cart', customerController.postAddToCart);
router.get('/shop/checkout', customerController.getCheckout);
router.get('/shop/orders', customerController.postOrders);
router.get('/cart/product_detail/:id', customerController.getProductById);
router.post('/cart/delete_to_cart', customerController.postDeleteToCart);
router.get('/orders', customerController.getOrders);

export default router;