import * as playlistDao from "../dao/playlist-dao.js"
import * as songDao from "../dao/song-dao.js";
import * as userDao from "../dao/user-dao.js";
import * as likeDao from "../dao/like-dao.js";
import * as songPlaylistDao from "../dao/songPlaylist-dao.js";
// create a playlist
const createPlaylist = async (req, res) => {
  const newPlaylist = req.body;
  console.log("newPlaylist in createPlaylist", newPlaylist);
  const insertedPlaylist = await playlistDao.createPlaylist(newPlaylist);
  res.json(insertedPlaylist);
};

// get all playlists
const findPlaylists = async (req, res) => {
  const playlists = await playlistDao.findAllPlaylists();
  res.json(playlists);
};

// get all playlists of one user
const findPlaylistByUser = async (req, res) => {
  const user = req.params.user;
  const playlists = await playlistDao.findPlayListsByUserId({
    user: user,
  });
  console.log(playlists);
  res.json(playlists);
};

// find details in a playlist by id
const findPlaylistDetailsById = async (req, res) => {
  const playlist = await playlistDao.findPlaylistById(req.params.pid);
  console.log("playlist-cover-pos:", playlist);
  const songList = playlist.songs;
  const songs = await songDao.findSongByIds(songList);
  playlist.songs = songs;

  const user = await userDao.findUserById(playlist.user);
  res.json({
    playlist: playlist,
    user: { name: user.userName, img: user.img },
  });
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
  let playlists = await playlistDao.findPlayListsByUserId({
    user: user,
  });

  const defaultIdx = playlists.findIndex((p) => p.isDefault === true);
  const deletedIdx = playlists.findIndex(
    (p) => p._id.toString() === playlistIdToDelete
  );

  const defaultPlaylist = playlists[defaultIdx];
  defaultPlaylist.songs = [...defaultPlaylist.songs, ...playlistToDelete.songs];
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

// Return the total number of playlists
const countPlaylists = async (req, res) => {
  const count = await playlistDao.countPlaylists();
  res.json(count);
};

// Return the latest registered user information
const findLastPageUsers = async (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  const lastPage = await playlistDao.findLastPageUsers(limit);
  res.json(lastPage);
};
const findPlaylistsPagination = async (req, res) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);
  const playlists = await playlistDao.findPlaylistsPagination(page, limit);
  res.json(playlists);
};

const findDefaultPlaylistByUser = async (req, res) => {
  const uid = req.params.uid;
  console.log("uid", uid);
  const playlists = await playlistDao.findPlayListsByUserId({
    user: uid,
    isDefault: true,
  });
  console.log("returned, ", playlists[0]);
  res.json(playlists[0]);
};

const checkSongs = async (req, res) => {
  const { loginUser, playlist } = req.params;
  // get likedSongs object list of targetUser
  const LikedSongs = await likeDao.findLikedSongsByUser(loginUser);
  const LikedsongsOfLoginUser = LikedSongs[0].likedSongs;
  console.log("LikedsongsOfLoginUser", LikedsongsOfLoginUser);

  // find songs in songPlaylist
  const songPlaylistObj = await songPlaylistDao.findSongsByPlaylistId(playlist);
  const songList = songPlaylistObj.map((item) => item.songId);
  const songs = await songDao.findSongByIds(songList); // to be return
  console.log("songs: ", songs);
  const exist = songs.map((song, id) => {
    const index = LikedsongsOfLoginUser.indexOf(song._id);
    return index === -1 ? false : true;
  });

  res.json({
    songs: songs,
    checkSong: exist,
  });
};

export default (app) => {
  app.get("/api/playlists", findPlaylists);
  app.get("/api/playlists/:user", findPlaylistByUser);
  app.get("/api/playlists/details/:pid", findPlaylistDetailsById);
  app.get("/api/playlists/songs/:pid", findSongsByPlaylistId);
  app.get("/api/playlists/:loginUser/:playlist", checkSongs);
  app.get("/api/playlistsdefault/:uid", findDefaultPlaylistByUser);
  app.delete("/api/playlists/:pid", deletePlaylist);
  app.post("/api/playlists", createPlaylist);
  app.put("/api/playlists/:pid", updatePlaylist);
  app.get("/api/playlists/admin/count", countPlaylists);
  app.get("/api/playlists/admin/lastpage", findLastPageUsers);
  app.get("/api/playlists/admin/pagination", findPlaylistsPagination);
  app.delete("/api/playlists/admin/:pid", deletePlaylist);
};