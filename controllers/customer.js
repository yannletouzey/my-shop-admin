import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

// const id_user = 4 //le parametre sera l'id de l'utilisateur quand la connexion sera mise en place

const customerController = {
  getCart: async (req, res) => {
    console.log(res.locals);
    try {
      const cart = new Cart(res.locals.userId);
      const products = await cart.getCart();
      let price = 0;
      products.forEach(product => {
        price += product.price * product.quantity;
      });
      let pageTitle = '';
      if (products.length > 0) {
        pageTitle = ' - ' + products[0].firstname;
      }
      res.status(200).render('customer/cart', {
        path: '/customer/cart', 
        pageTitle: 'Cart' + pageTitle,
        products: products,
        price: price,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  },
  postAddToCart: async (req, res) => {
    const cart = new Cart(res.locals.userId);
    const result = await cart.addToCart(req.body.id);
    console.log(result);
    res.status(200).redirect('/customer/cart');
  },
  postDeleteToCart: (req, res) => {
    const cart = new Cart();
    const result = cart.removeFromCart(req.body.id);
    res.status(200).redirect('/customer/cart');
  },
  getCheckout: (req, res) => {
    res.status(200).render('shop/checkout', {
      path: '/shop/checkout', 
      pageTitle: 'Checkout',
    });
  },
  getOrders: async (req, res) => {
    const order = new Order(res.locals.userId);
    const result = await order.getCustomer();
    const cart = new Cart(id_user);
    const products = await cart.getCart();
    res.status(200).render('shop/orders', {
      path: '/shop/orders', 
      pageTitle: 'Orders',
      orders: result,
      products,
    });
  },
  postOrders: (req, res) => {
    res.status(200).render('shop/orders', {
      path: '/shop/orders', 
      pageTitle: 'Orders',
    });
  },
  getProductById: (req, res) => {
    // Product.findByPk(req.params.id)
    // .then((result) => {
    //   res.status(200).render('customer/product_detail', {
    //     path: '/customer/cart', 
    //     pageTitle: `Detail - ${result.title}`, 
    //     products: result
    //   });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  },
};

export default customerController;