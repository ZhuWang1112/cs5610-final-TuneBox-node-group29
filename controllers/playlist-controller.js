import * as playlistDao from "../dao/playlist-dao.js"

const createPlaylist = async(req, res) => {
    const newPlaylist = req.body;
    const insertedPlaylist = await playlistDao.createPlaylist(newPlaylist);
    res.json(insertedPlaylist);
}
const findPlaylist = async (req, res) => {
    const uid = req.params.uid;
    const playlists = await playlistDao.findPlayListsByUserId(uid);
    res.json(playlists);
}

const deletePlaylist = async (req, res) => {
    const playlistIdToDelete = req.params.pid;
    const status = await playlistDao.deletePlaylist(playlistIdToDelete);
    res.json(status);
}

export default (app) => {
    app.get('/api/playlists', findPlaylist);
    app.delete('/api/playlists/:pid', deletePlaylist);
    app.post('api/playlists', createPlaylist);
}