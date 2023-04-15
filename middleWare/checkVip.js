const checkVip = (req, res, next) => {
    // console.log(req.session.currentUser);
    if (req.session.currentUser && req.session.currentUser.isVip) {
        next();
    } else {
        res.status(401).json({
            error: 'You are not authorized to perform this operation'
        });
    }
};
export default checkVip;