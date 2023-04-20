import * as songDao from "../dao/song-dao.js"
import {findSongs} from "../dao/song-dao.js";

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

const findSongsByApiArtistId = async (req, res) => {
  const apiArtistId = req.params.apiArtistId;
  const songs = await songDao.findSongsByApiArtistId(apiArtistId);
  res.json(songs);
};

const insertSongIfNotExist = async (req, res) => {
  const status = await songDao.insertSongIfNotExist(req.body);
  const song = await songDao.findSongByApiSongId(req.body.apiSongId);
  res.json(song);
};

export default (app) => {
  app.get("/api/songs", findSongByIds);
  app.post("/api/songs", createSong);
  app.get("/api/songsOfArtist/:apiArtistId", findSongsByApiArtistId);
  app.put("/api/songs", insertSongIfNotExist);
};
