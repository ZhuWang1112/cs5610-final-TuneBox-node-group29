import * as userDao from "../dao/user-dao.js"

// find all users
const findUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
}

// find an user object by id
const findUserById = async (req, res) => {
    const user = await userDao.findUserById(req.params._id);
    res.json(user);
}

export default (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:_id', findUserById);
}