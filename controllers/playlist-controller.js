import * as playlistDao from "../dao/playlist-dao.js"
import * as songDao from "../dao/song-dao.js";

// create a playlist
const createPlaylist = async(req, res) => {
    const newPlaylist = req.body;
    const insertedPlaylist = await playlistDao.createPlaylist(newPlaylist);
    res.json(insertedPlaylist);
}
// get all playlists of one user
const findPlaylistByUser = async (req, res) => {
    const user = req.params.user;
    const playlists = await playlistDao.findPlayListsByUserId(user);
    res.json(playlists);
}

// delete playlist according to _id field in playlist records
const deletePlaylist = async (req, res) => {
    const playlistIdToDelete = req.params.pid;
    const status = await playlistDao.deletePlaylist(playlistIdToDelete);
    res.json(status);
}

// find a list of song objects by playlistId
const findSongsByPlaylistId = async (req, res) => {
    const playlist = await playlistDao.findPlaylistById(req.params.pid);
    const songList = playlist.songs;
    const songs = await songDao.findSongByIds(songList);
    res.json(songs);
}

export default (app) => {
    app.get('/api/playlists/:user', findPlaylistByUser);
    app.delete('/api/playlists/:pid', deletePlaylist);
    app.post('/api/playlists', createPlaylist);
    app.get('/api/playlists/songs/:pid', findSongsByPlaylistId);
}