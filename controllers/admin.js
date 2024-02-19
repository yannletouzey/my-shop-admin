import Product from '../models/Product.js';

const controllerAdmin = {

    getAdmin: (req, res) => {
        res.status(200).render('admin/adminProfile', {
            path: '/admin', 
            pageTitle: 'admin',
        });
    },
    getAllProductsForAdmin: async (req, res) => {
        const result = await Product.getAllProduct();
        res.status(200).render('admin/product_list', {
            path: '/admin/products', 
            pageTitle: 'admin-products',
            products: result,
        });
    },

    postAddProduct: async (req, res) => {
        const product = new Product(req.body.title, req.body.name, req.body.type, req.body.price, req.body.quantity, req.body.img_url, req.body.description);
        const result = await product.addProduct();
        console.log('Added product ' + result + ' ✅');
        res.status(200).redirect('/admin/products');
    },

    getAddProduct: (req, res) => {
        res.status(200).render('admin/handle-product', {
            path: '/admin/handle-product', 
            editing: false,
            pageTitle: 'Add product',
        });
    },

    getEditProduct: async (req, res) => {
        const result = await Product.getProductById(req.params.id);
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/admin/products');
        }
        res.status(200).render('admin/handle-product', {
            path: '/admin/handle_product', 
            pageTitle: `Edit product- ${result.title}`,
            editing: editMode,
            product: result,
        });
    },

    postEditProduct: async (req, res) => {
        const product = new Product(req.body.title, req.body.name, req.body.type, req.body.price, req.body.quantity, req.body.img_url, req.body.description);
        const result = await product.editProduct(req.body.id);
        console.log('Edited product ' + result + ' ✅');
        res.status(200).redirect('/admin/products');
    },

    deleteProduct: (req, res) => {
        const result = Product.deleteProduct(req.params.id);
        console.log('Deleted product ✅');
        res.status(200).redirect('/admin/products');
    }
}
export default controllerAdmin;