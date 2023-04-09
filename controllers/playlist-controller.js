import * as playlistDao from "../dao/playlist-dao.js"

// create a playlist
const createPlaylist = async(req, res) => {
    const newPlaylist = req.body;
    const insertedPlaylist = await playlistDao.createPlaylist(newPlaylist);
    res.json(insertedPlaylist);
}
// get all playlists of one user
const findPlaylist = async (req, res) => {
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

export default (app) => {
    app.get('/api/playlists/:user', findPlaylist);
    app.delete('/api/playlists/:pid', deletePlaylist);
    app.post('/api/playlists', createPlaylist);
}