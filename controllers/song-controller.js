import * as songDao from "../dao/song-dao.js"

const findSongById = async (req, res) => {
    const song = await songDao.findSongById(req.params.sid);
    res.json(song);
}

const createSong = async(req, res) => {
    const newSong = req.body;
    const insertedSong = await songDao.createSong(newSong);
    res.json(insertedSong);
}

export default (app) => {
    app.get('/api/songs/:sid', findSongById);
    app.post('/api/songs', createSong);
}