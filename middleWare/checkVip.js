import * as userDao from "../dao/user-dao.js";

const checkVip = async (req, res, next) => {
    // console.log(req.session.currentUser);

    if (!req.session.currentUser) {
        res.status(401).json({
            error: 'You are not authorized to perform this operation'
        });
        return;
    }
    let uid = req.session.currentUser._id;
    const user = await userDao.findUserById(uid);
    if (user.isVip) {
        next();
    } else {
        res.status(401).json({
            error: 'You are not authorized to perform this operation'
        });
    }
};
export default checkVip;