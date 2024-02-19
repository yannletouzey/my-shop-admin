function isLogged(req, res, next) {
  if (!req.session.isLoggedIn) {
    res.status(401).render('shop/error', {
      pageTitle: 'Error',
      path: 'shop/error',
      message: 'Vous n\'êtes pas autorisé à accéder à la page demandée.'
    });
  } else {
    next();
  }
}
export default isLogged;