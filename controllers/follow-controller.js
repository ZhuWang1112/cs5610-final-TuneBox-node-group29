import * as followDao from "../dao/follow-dao.js";
import * as userDao from "../dao/user-dao.js";
import mongoose from "mongoose";

const handleFollow = async (req, res) => {
    const user = req.params.user;
    const followObj = await followDao.findFollows(user);
    let followList = followObj[0].followeeList;
    const newId = req.body.followId;
    const index = followList.indexOf(newId);
    if (index === -1) {
        followList.push(new mongoose.Types.ObjectId(newId));
    } else {
        followList.splice(index, 1);
    }
    const newFollowObj = {...followObj, followeeList: followList}
    const status = await followDao.updateFollow(user, newFollowObj);
    res.json(status);
}

const findFollowList = async (req, res) => {
    const user = req.params.user;
    const followList = await followDao.findFollows(user);
    res.json(followList);
}

const findFollowObjects = async(req, res) => {
    const user = req.params.user;
    const followObj = await followDao.findFollows(user);
    const followList = followObj[0].followeeList
    const followObjects = await userDao.findUserByIds(followList);
    res.json(followObjects);
}

export default (app) => {
    app.get('/api/follows/:user', findFollowList);
    app.get('/api/followObjects/:user', findFollowObjects);
    app.put('/api/follows/:user', handleFollow)}