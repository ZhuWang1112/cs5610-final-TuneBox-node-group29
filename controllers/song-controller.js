import * as songDao from "../dao/song-dao.js"

// find a song object by id
const findSongByIds = async (req, res) => {
  const songList = req.body.songlist;
  const songs = await songDao.findSongByIds(songList);
  res.json(songs);
};

// create a song object
const createSong = async (req, res) => {
  const newSong = req.body;
  const insertedSong = await songDao.createSong(newSong);
  res.json(insertedSong);
};

export default (app) => {
  app.get("/api/songs", findSongByIds);
  app.post("/api/songs", createSong);
};