import Product from '../models/Product.js';

const productController = {
    getProduct: async (req, res) => {
        const result = await Product.getAllProduct();
        res.status(200).render('shop/products', {
            path: '/products', 
            pageTitle: 'Products', 
            products: result,
        });
    },
    getLastProduct: async (req, res) => {
        const result = await Product.getLastProduct();
        res.status(200).render('shop/index', {
            path: '/', 
            pageTitle: 'Products', 
            products: result,
        });
    },
    getProductById: async (req, res) => {
        const product = await Product.getProductById(req.params.id);
        res.status(200).render('shop/product_detail', {
            path: '/products', 
            pageTitle: `Detail - ${product.title}`, 
            product,
        });
    }
};
export default productController;