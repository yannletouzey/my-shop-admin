import express from 'express';
import adminController from './controllers/admin.js';
import productController from './controllers/product.js';
import isLogged from './middleware/isLogged.js';
import authController from './controllers/auth.js';

const router = express.Router()

router.get('/admin', isLogged, adminController.getAdmin)
router.get('/handle-products', isLogged, adminController.getAllProductsForAdmin)
router.get('/add-product', isLogged, adminController.getAddProduct)
router.post('/add-product', isLogged, adminController.postAddProduct)
router.get('/edit-product/:id', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.get('/delete-product/:id', adminController.deleteProduct)

router.get('/',  productController.getLastProduct);
router.get('/product_detail/:id', productController.getProductById);
router.get('/checkout', (req, res) => {
    res.status(200).render('shop/checkout', {
        path: '/shop/checkout', 
        pageTitle: 'Checkout',
    });
});


router.get('/signup', authController.getSignup)
router.get('/customer/confirm_page', authController.getSignupSuccess)
router.post('/signup', authController.postSignup)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

router.get('/logout', isLogged, authController.logout);

router.use((req, res, next) => {
    res.status(404).render('404', {
        path: '',
        pageTitle: "404 Page Not Found",
    });
});
export default router;