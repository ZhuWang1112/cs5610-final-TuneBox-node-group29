import * as songDao from "../dao/song-dao.js"

// find a song object by id
const findSongById = async (req, res) => {
    const song = await songDao.findSongById(req.params.sid);
    res.json(song);
}

// create a song object
const createSong = async(req, res) => {
    const newSong = req.body;
    const insertedSong = await songDao.createSong(newSong);
    res.json(insertedSong);
}

export default (app) => {
    app.get('/api/songs/:sid', findSongById);
    app.post('/api/songs', createSong);
}