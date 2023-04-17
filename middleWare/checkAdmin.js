import * as userDao from "../dao/user-dao.js";

const checkAdmin = async (req, res, next) => {
    // console.log("checkAdmin:" + JSON.stringify(req.session.currentUser));
    if (!req.session.currentUser) {
        res.status(401).json({
            error: 'You are not authorized to perform this operation'
        });
        return;
    }
    let uid = req.session.currentUser._id;
    const user = await userDao.findUserById(uid);
    if (user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            error: 'You are not authorized to perform this operation'
        });
    }
};
export default checkAdmin;