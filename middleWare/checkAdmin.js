const checkAdmin = (req, res, next) => {
    console.log("checkAdmin:" + JSON.stringify(req.session.currentUser));
    if (req.session.currentUser && req.session.currentUser.isAdmin) {
        next();
    } else {
        res.status(401).json({
            error: 'You are not authorized to perform this operation'
        });
    }
};
export default checkAdmin;