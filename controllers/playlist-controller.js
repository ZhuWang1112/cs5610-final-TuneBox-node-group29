import * as playlistDao from "../dao/playlist-dao.js"
import * as songDao from "../dao/song-dao.js";

// create a playlist
const createPlaylist = async(req, res) => {
    const newPlaylist = req.body;
    const insertedPlaylist = await playlistDao.createPlaylist(newPlaylist);
    res.json(insertedPlaylist);
}

// get all playlists
const findPlaylists = async (req, res) => {
    const playlists = await playlistDao.findAllPlaylists();
    res.json(playlists);
}

// get all playlists of one user
const findPlaylistByUser = async (req, res) => {
  const user = req.params.user;
  const playlists = await playlistDao.findPlayListsByUserId(user);
  console.log(playlists);
  res.json(playlists);
};

// find details in a playlist by id
const findPlaylistDetailsById = async (req, res) => {
  const playlist = await playlistDao.findPlaylistById(req.params.pid);
  console.log(playlist);
  const songList = playlist.songs;
  const songs = await songDao.findSongByIds(songList);
  playlist.songs = songs;
  res.json(playlist);
};

const findSongsByPlaylistId = async (req, res) => {
  const playlist = await playlistDao.findPlaylistById(req.params.pid);
  const songList = playlist.songs;
  const songs = await songDao.findSongByIds(songList);
  res.json(songs);
};

// delete playlist according to _id field in playlist records
const deletePlaylist = async (req, res) => {
  const playlistIdToDelete = req.params.pid;
  const playlistToDelete = await playlistDao.findPlaylistById(
    playlistIdToDelete
  );
  const user = playlistToDelete.user;
  // move all songs to default playlist
  // get default playlist
  let playlists = await playlistDao.findPlayListsByUserId(user);

  const defaultIdx = playlists.findIndex((p) => p.isDefault === true);
  const deletedIdx = playlists.findIndex(
    (p) => p._id.toString() === playlistIdToDelete
  );

  const defaultPlaylist = playlists[defaultIdx];
  defaultPlaylist.songs = [...defaultPlaylist.songs, playlistToDelete.songs];
  playlists = [
    ...playlists.slice(0, defaultIdx),
    defaultPlaylist,
    ...playlists.slice(defaultIdx + 1),
  ];
  playlists.splice(deletedIdx, 1);

  await playlistDao.updatePlaylist(defaultPlaylist);
  const status = await playlistDao.deletePlaylist(playlistIdToDelete);
  res.json(playlists);
};

// update playlist by id
const updatePlaylist = async (req, res) => {
  const newPlaylist = req.body;
  const status = await playlistDao.updatePlaylist(newPlaylist);
  res.json(status);
};
const countPlaylists = async (req, res) => {
    const count = await playlistDao.countPlaylists();
    res.json(count);
}
const findLastPageUsers = async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const lastPage = await playlistDao.findLastPageUsers(limit);
    res.json(lastPage);
}

const findDefaultPlaylistByUser = async (req, res) => {
  const uid = req.params.uid;
  const playlists = await playlistDao.findPlayListsByUserId(uid);
  const defaultPlaylist = playlists.filter((p) => p.isDefault === true)[0];
  res.json(defaultPlaylist);
};

export default (app) => {
  app.get("/api/playlists", findPlaylists);
  app.get("/api/playlists/:user", findPlaylistByUser);
  app.get("/api/playlists/details/:pid", findPlaylistDetailsById);
  app.get("/api/playlists/songs/:pid", findSongsByPlaylistId);
  app.get("/api/playlists/default/:uid", findDefaultPlaylistByUser);
  app.delete("/api/playlists/:pid", deletePlaylist);
  app.post("/api/playlists", createPlaylist);
  app.put("/api/playlists/:pid", updatePlaylist);
  app.get("/api/playlists/admin/count", countPlaylists);
  app.get("/api/playlists/admin/lastpage", findLastPageUsers);
};