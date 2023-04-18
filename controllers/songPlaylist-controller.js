import * as songPlaylistDao from "../dao/songPlaylist-dao.js";

const findPlaylistByUserSong = async (req, res) => {
  const { userId, songId } = req.params;
  const songPlaylistObj = await songPlaylistDao.findPlaylistByUserSong(
    songId,
    userId
  );
  res.json(songPlaylistObj);
};

const createSongPlaylistOfUser = async (req, res) => {
  console.log("createSongPlaylist: ", req.body);
  const songPlaylistObj = await songPlaylistDao.createSongPlaylist(req.body);
  res.json(songPlaylistObj);
};

const deleteSongPlaylist = async (req, res) => {
  const { userId, songId } = req.params;
  const deletedObj = await songPlaylistDao.deleteSongPlaylist(userId, songId);
  res.json(deletedObj);
};

const findSongsByPlaylistId = async (req, res) => {
  console.log(req.params.pid);
  const songPlaylistObj = await songPlaylistDao.findSongsByPlaylistId(
    req.params.pid
  );
  res.json(songPlaylistObj);
};

const findSongNumbersByUserId = async (req, res) => {
  const songNumbers = await songPlaylistDao.findSongNumbersByUserId(
    req.params.uid
  );
  console.log("songNumbers, ", songNumbers);
  res.json(songNumbers);
};

const findCurrentUserSongs = async (req, res) => {
  // get user id from sessions
  let uid = null;
  if (req.session.currentUser) {
    uid = req.session.currentUser._id;
  }
  console.log("uid: ", uid);
  // search likedSongs of current user
  const data = await songPlaylistDao.findSongsByUserId(uid);
  const songList = data.map((song) => song.songId);
  res.json(songList);
};

const findLikedSongsByUser = async (req, res) => {
  console.log("req.params.uid", req.params.uid);
  const data = await songPlaylistDao.findSongsByUserId(req.params.uid);
  res.json(data);
};

const updateSongPlaylist = async (req, res) => {
  const data = await songPlaylistDao.updateSongPlaylist(req.body);
  console.log("data updateSongPlaylist", data);
  res.json(data);
};

export default (app) => {
  app.get("/api/songPlaylist", findCurrentUserSongs);
  app.get("/api/songPlaylist/user/:uid", findLikedSongsByUser);
  app.get("/api/songPlaylist/songNumber/:uid", findSongNumbersByUserId);
  app.get("/api/songPlaylist/:userId/:songId", findPlaylistByUserSong);
  app.get("/api/songPlaylist/:pid", findSongsByPlaylistId);
  app.delete("/api/songPlaylist/:userId/:songId", deleteSongPlaylist);
  app.post("/api/songPlaylist", createSongPlaylistOfUser);
  app.put("/api/songPlaylist", updateSongPlaylist);
};
