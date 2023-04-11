import * as userDao from "../dao/user-dao.js"


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
    }
    const deleteUserById = async (req, res) => {
        const id = req.params.id;
        // const user = users.find((user) => user.id === id);
        // const index = users.indexOf(user);
        // users.splice(index, 1);
        const status = await userDao.deleteUser(id);
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
        // console.log(user);
        const foundUser = await userDao.findUserByCredentials(req.body);
        // console.log(foundUser);
        if (foundUser) {
            req.session["currentUser"] = foundUser;
            res.json(foundUser);
        } else {
            res.sendStatus(404);
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
            alert("userName already exist!")
            return;
        }
        console.log("creating new user----user-controller")
        const newUser = await userDao.createUser(user);
        req.session.currentUser = newUser;
        res.json(newUser);
    };

    app.get('/api/users', findUsers);
    app.get('/api/users/:_id', findUserById);

    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.post("/api/users/register", register);
    app.post("/api/users", createUser);

    app.delete("/api/users/:id", deleteUserById);


}

export default UserController;