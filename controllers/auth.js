import User from '../models/User.js';

const authController = {
  getSignup: (req, res) => {
    let error = "";
    res.status(200).render('customer/signup', {
      path: '/signup', 
      pageTitle: 'Signup',
      error,
    });
  },
  getSignupSuccess: (req, res) => {
    res.status(200).render('customer/confirm_page', {
      path: '/confirm_page', 
      pageTitle: 'Registered Successfully',
    });
  },
  postSignup: async (req, res) => {
    try {
      const errorMessage = [
        "Email and email confirmation are not valid",
        "Password and password confirmation are not same",
        'Password is not strong ex: 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol',
        'Email already exists'
      ]
      const user = new User(req.body);
      const result = await user.signup();
      if (errorMessage.includes(result)) {
        res.status(200).render('customer/signup', {
          path: '/signup', 
          pageTitle: 'Signup',
          error: result,
        });
      } else {
        res.status(200).render('customer/confirm_page', {
          path: '/customer/confirm_page', 
          pageTitle: 'Registered Successfully',
          email: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  },
  getLogin: (req, res) => {
    res.status(200).render('shop/login', {
      path: '/login', 
      pageTitle: 'Login'
    });
  },
  postLogin: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.login(email, password);
    if (user) {
      req.session.isLoggedIn = true;
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      res.status(200).redirect('/');

      // req.session.isLoggedIn = true;
      // req.session.user = login;
      // res.status(200).redirect('/customer/products');

      // if (pass) {
      //     console.log('ok');
      // } else {
      //     console.log('error');
      // }
    }
  }
};

export default authController;