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

const findUserByName = async (req, res) => {
    const user = await userDao.findUserbyName(req.params.username);
    res.json(user);
}

const findUsersPagination = async (req, res) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const users = await userDao.findUsersPagination(page, limit);
    res.json(users);
}

const updateUserById = async (req, res) => {
    const user = req.body;
    const userIdToUpdate = req.params._id;
    const updatedUser = await userDao.updateUser(userIdToUpdate, user);
    res.json(updatedUser);
}

const deleteUserById = async (req, res) => {
    const userIdToDelete = req.params._id;
    const status = await userDao.deleteUser(userIdToDelete);
    res.json(status);
}

const countUsers = async (req, res) => {
    const count = await userDao.countUsers();
    res.json(count);
}

const countVipUsers = async (req, res) => {
    const count = await userDao.countVipUsers();
    res.json(count);
}
const countFemaleUsers = async (req, res) => {
    const count = await userDao.countFemaleUsers();
    res.json(count);
}

const countMaleUsers = async (req, res) => {
    const count = await userDao.countMaleUsers();
    res.json(count);
}

const findLastPageUsers = async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const users = await userDao.findLastPageUsers(limit);
    res.json(users);
}

export default (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:_id', findUserById);
    app.put('/api/users/admin/:_id', updateUserById);
    app.delete('/api/users/admin/:_id', deleteUserById);
    app.get('/api/users/admin/name/:username', findUserByName);
    app.get('/api/users/admin/pagination', findUsersPagination);
    app.get('/api/users/admin/count', countUsers);
    app.get('/api/users/admin/vip/count', countVipUsers);
    app.get('/api/users/admin/female/count', countFemaleUsers);
    app.get('/api/users/admin/male/count', countMaleUsers);
    app.get('/api/users/admin/lastpage', findLastPageUsers);
}