const controllerError = (req, res, next) => {
    res.status(404).render('404', {
        path: '',
        pageTitle: "404 Page Not Found",
    });
};
export default controllerError;