const loadMessage = (req, res, next) => {
    res.locals.message = req.flash('message');
    next();
}

module.exports = {
    loadMessage
}