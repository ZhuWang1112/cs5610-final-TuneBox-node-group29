import * as followDao from "../dao/follow-dao.js";
import * as userDao from "../dao/user-dao.js";
import mongoose from "mongoose";


// When a new user register, add one more record with empty followeeList in the follow db
const createEmptyFolloweeList = async (req, res) => {
  const newFollowObject = { user: req.params.user, followeeList: [] };
  const FollowObject = await followDao.createFolloweeList(newFollowObject);
  res.json(FollowObject);
};

// Follow or unfollow an user depending on whether it exists in one's followeelist
const handleFollow = async (req, res) => {
  const user = req.params.user;
  const followObj = await followDao.findFollows(user);
  console.log("followObj: ", followObj);
  let followList = followObj[0].followeeList;
  //   console.log("followList", followList);
  const newId = req.body.followId;
  const index = followList.indexOf(newId);
  if (index === -1) {
    followList.push(new mongoose.Types.ObjectId(newId));
    console.log("add");
    console.log("after add: ", followList);
  } else {
    followList.splice(index, 1);
    console.log("delete");
    console.log("after delete: ", followList);
  }
  const followObjects = await userDao.findUserByIds(followList);
  const newFollowObj = {
    _id: followObj[0]._id,
    user: followObj[0].user,
    followeeList: followList,
  };
  const status = await followDao.updateFollow(user, newFollowObj);
  res.json(followObjects);
};

// Find followeeList(id) according to userId
const findFollowList = async (req, res) => {
  const user = req.params.user;
  const followList = await followDao.findFollows(user);
  //   console.log("followList", followList);
  res.json(followList);
};

// Find followeeObject according to userId
// Compared to the findFollowList, this function will return all followee objects
const findFollowObjects = async (req, res) => {
  const user = req.params.user;
  const followObj = await followDao.findFollows(user);
  console.log("followObj", followObj);
  const followList = followObj[0].followeeList;
  //   console.log("followList", followList);
  const followObjects = await userDao.findUserByIds(followList);
  console.log("followObjects", followObjects);
  res.json(followObjects);
};

const checkFolloweeList = async (req, res) => {
  const { loginUser, targetUser } = req.params; //user1 is login user, user2 is another user
  // get follow object list of targetUser
  const followObjTarget = await followDao.findFollows(targetUser);
  console.log("followObjTarget", followObjTarget);
  const followListTarget = followObjTarget[0].followeeList;
  console.log("followListTarget", followListTarget);
  const followObjectsTarget = await userDao.findUserByIds(followListTarget);

  // get the followeelist of loginUser
  const followObjLogin = await followDao.findFollows(loginUser);
  const followListLogin = followObjLogin[0].followeeList;
  console.log("followListLogin", followListLogin);
  //   console.log("followList: ", followList);
  const exist = followListTarget.map((id) => {
    const index = followListLogin.indexOf(id);
    return index === -1 ? false : true;
  });

  res.json({
    followeeList: followObjectsTarget,
    checkFollowee: exist,
    isSelf: loginUser === targetUser,
  });
};

export default (app) => {
  app.get("/api/follows/:user", findFollowList);
  app.get("/api/followObjects/:user", findFollowObjects);
  app.get("/api/follows/:loginUser/:targetUser", checkFolloweeList);
  app.post("/api/follows/:user", createEmptyFolloweeList);
  app.put("/api/follows/:user", handleFollow);
};