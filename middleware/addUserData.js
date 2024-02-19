function addUserData(req, res, next) {
  if (req.session.isLoggedIn) {
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
}

export default addUserData;