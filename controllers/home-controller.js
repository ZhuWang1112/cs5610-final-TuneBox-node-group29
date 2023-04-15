import TopMusic from '../TopMusic/TopMusic.json' assert { type: 'json' };
import TopAlbum from '../TopAlbum/TopAlbum.json' assert { type: 'json' };
import * as playlistDao from "../dao/playlist-dao.js";
import * as userDao from "../dao/user-dao.js";
import checkVip from "../middleWare/checkVip.js";
const getTopMusic = (req, res) => {
    res.json(TopMusic);
}
const getTopAlbum = (req, res) => {
    res.json(TopAlbum);
}
const findTopPlaylists = async (req, res) => {
    let uid = null;
    // logged in
    if (req.session["currentUser"] !== undefined) {
        uid = req.session.currentUser._id;
    }
    // console.log("homecontroller:", req.session.id);
    // console.log(req.session["currentUser"]);
    const playlists = await playlistDao.findTopPlaylists(uid);
    res.json(playlists);
}

// Find out the top five users who create the most playlists
// and have not yet followed
const findTopUsers = async (req, res) => {
    let uid = null;
    if (req.session.currentUser !== undefined) {
        uid = req.session.currentUser._id;
    }
    const users = await userDao.findTopUsers(uid);
    res.json(users);
}
export default (app) => {
    app.get('/api/home/topmusic', checkVip,getTopMusic);
    app.get('/api/home/topalbum', checkVip,getTopAlbum);
    app.get('/api/home/topplaylists', findTopPlaylists);
    app.get('/api/home/topusers', findTopUsers);
}