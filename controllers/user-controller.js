import * as userDao from "../dao/user-dao.js"

const findUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
}

export default (app) => {
    app.get('/api/users', findUsers);
}