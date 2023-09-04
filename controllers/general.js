const loadMessage = () => {
    return (req, res, next) => {
        res.locals.message = req.flash('message');
        next();
    }
}

module.exports = {
    loadMessage
}