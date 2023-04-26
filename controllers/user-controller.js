import * as userDao from "../dao/user-dao.js"
import alert from 'alert'
import checkAdmin from "../middleWare/checkAdmin.js";

const UserController = (app) => {
    // find all users
    const findUsers = async (req, res) => {
        const users = await userDao.findAllUsers();
        res.json(users);
    }
// find an user object by id
    const findUserById = async (req, res) => {
      const user = await userDao.findUserById(req.params._id);
      res.json(user);
    };

    const findCurrentUser = async (req, res) => {
      let uid = null;
      if (req.session.currentUser) {
        uid = req.session.currentUser._id;
      }
      const user = await userDao.findUserById(uid);
      res.json(user);
    };

    const deleteUserById = async (req, res) => {
      const userIdToDelete = req.params._id;
      const status = await userDao.deleteUser(userIdToDelete);
      res.json(status);
    };

    const createUser = async (req, res) => {
      // const user = req.body;
      // users.push({ ...user, id: new Date().getTime() });
      const user = await userDao.createUser(req.body);
      res.json(user);
    };

    const login = async (req, res) => {
      const user = req.body;
      console.log("user in login", req.body);
      const foundUser = await userDao.findUserByCredentials(user);
      // console.log(foundUser);
      if (foundUser) {
        req.session["currentUser"] = foundUser;
        // console.log("login: Session ID:", req.session.id);
        res.json(foundUser);
      } else {
        res.json(null);
      }
    };

    const logout = async (req, res) => {
      req.session.destroy();
      res.sendStatus(204);
    };

    const register = async (req, res) => {
      const user = req.body;
      const foundUser = await userDao.findUserByUsername(user.userName);
      if (foundUser) {
        res.sendStatus(409);
        // alert("userName already exist!");
        return;
      }
      const newUser = await userDao.createUser(user);
      req.session.currentUser = newUser;
      res.json(newUser);
    };

    // find user objects by partial name
    const findUserByPartialName = async (req, res) => {
      const user = await userDao.findUserByPartialName(req.params.username);
      res.json(user);
    };

    const findUserByName = async (req, res) => {
      const user = await userDao.findUserByName(req.params.username);
      res.json(user);
    };

    const findUsersPagination = async (req, res) => {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const users = await userDao.findUsersPagination(page, limit);
      res.json(users);
    };

    const updateUserById = async (req, res) => {
      const user = req.body;
      const userIdToUpdate = req.params._id;
      const updatedUser = await userDao.updateUser(userIdToUpdate, user);
      res.json(updatedUser);
    };

    const checkLogin = async (req, res) => {
      const user = req.session.currentUser;
      if (user && user._id === req.params._id) {
        res.json({ login: true });
      } else {
        res.json({ login: false });
      }
    };

    const countUsers = async (req, res) => {
      const count = await userDao.countUsers();
      res.json(count);
    };
    const countAllUsers = async (req, res) => {
        const count = await userDao.countAllUsers();
        res.json(count);
    };
    const countVipUsers = async (req, res) => {
      const count = await userDao.countVipUsers();
      res.json(count);
    };
    const countFemaleUsers = async (req, res) => {
      const count = await userDao.countFemaleUsers();
      res.json(count);
    };

    const countMaleUsers = async (req, res) => {
      const count = await userDao.countMaleUsers();
      res.json(count);
    };

    const findLatestUsers = async (req, res) => {
      const limit = parseInt(req.query.limit, 10);
      const users = await userDao.findLatestUsers(limit);
      res.json(users);
    };

    app.get("/api/users/checkLogin/:_id", checkLogin);
    app.put("/api/users/admin/:_id", checkAdmin, updateUserById);
    app.delete("/api/users/admin/:_id", checkAdmin, deleteUserById);
    app.get("/api/users/admin/name/:username", checkAdmin, findUserByName);
    app.get(
      "/api/users/admin/partialname/:username",
      checkAdmin,
      findUserByPartialName
    );
    app.get("/api/users/admin/pagination", checkAdmin, findUsersPagination);
    app.get("/api/users/admin/count", checkAdmin, countUsers);
    app.get("/api/users/admin/count/all", checkAdmin, countAllUsers);
    app.get("/api/users/admin/vip/count", checkAdmin, countVipUsers);
    app.get("/api/users/admin/female/count", checkAdmin, countFemaleUsers);
    app.get("/api/users/admin/male/count", checkAdmin, countMaleUsers);
    app.get("/api/users/admin/lastpage", checkAdmin, findLatestUsers);

    app.get("/api/users", findUsers);
    app.get("/api/users/currentUser", findCurrentUser);
    app.put("/api/users/:_id", updateUserById);
    app.get("/api/users/:_id", findUserById);
    

    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.post("/api/users/register", register);
    app.post("/api/users", createUser);


}

export default UserController;


