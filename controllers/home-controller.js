import TopMusic from '../TopMusic/TopMusic.json' assert { type: 'json' };
import TopAlbum from '../TopAlbum/TopAlbum.json' assert { type: 'json' };
import * as playlistDao from "../dao/playlist-dao.js";
import * as userDao from "../dao/user-dao.js";
const getTopMusic = (req, res) => {
    res.json(TopMusic);
}
const getTopAlbum = (req, res) => {
    res.json(TopAlbum);
}
const findTopPlaylists = async (req, res) => {
    const playlists = await playlistDao.findTopPlaylists();
    res.json(playlists);
}

const findTopUsers = async (req, res) => {
    const users = await userDao.findTopUsers();
    res.json(users);
}
export default (app) => {
    app.get('/api/home/topmusic', getTopMusic);
    app.get('/api/home/topalbum', getTopAlbum);
    app.get('/api/home/topplaylists', findTopPlaylists);
    app.get('/api/home/topusers', findTopUsers);
}