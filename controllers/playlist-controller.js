import * as playlistDao from "../dao/playlist-dao.js"
import * as songDao from "../dao/song-dao.js";
import * as userDao from "../dao/user-dao.js";
import * as songPlaylistDao from "../dao/songPlaylist-dao.js";
import * as commentDao from "../dao/comment-dao.js";
import checkAdmin from "../middleWare/checkAdmin.js";
import * as artistDao from "../dao/artist-dao.js";

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
const findLatestPlaylists = async (req, res) => {
  const playlists = await playlistDao.findLatestPlaylists();
  res.json(playlists);
};
// get all playlists of one user
const findPlaylistByUser = async (req, res) => {
  const user = req.params.user;
  const playlists = await playlistDao.findPlayListsByUserId({
    user: user,
  });
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

// old: (move all records to the default playlist) delete playlist according to _id field in playlist records
// const deletePlaylist = async (req, res) => {
//   const playlistIdToDelete = req.params.pid;
//   const playlistToDelete = await playlistDao.findPlaylistById(
//     playlistIdToDelete
//   );
//   const user = playlistToDelete.user;
//   // move all songs to default playlist
//   // get default playlist
//   let playlists = await playlistDao.findPlayListsByUserId({
//     user: user,
//   });

//   const defaultIdx = playlists.findIndex((p) => p.isDefault === true);
//   const deletedIdx = playlists.findIndex(
//     (p) => p._id.toString() === playlistIdToDelete
//   );

//   const defaultPlaylist = playlists[defaultIdx];
//   defaultPlaylist.songs = [...defaultPlaylist.songs, ...playlistToDelete.songs];
//   playlists = [
//     ...playlists.slice(0, defaultIdx),
//     defaultPlaylist,
//     ...playlists.slice(defaultIdx + 1),
//   ];
//   playlists.splice(deletedIdx, 1);

//   await playlistDao.updatePlaylist(defaultPlaylist);
//   const status = await playlistDao.deletePlaylist(playlistIdToDelete);
//   res.json(playlists);
// };

// new (remove all songs from likedSongs)
const deletePlaylist = async (req, res) => {
  const { _id } = req.body.playlistObj;
  // console.log("user:" + user);
  // ***************
  const pl = await playlistDao.findPlaylistById(_id);
  const user = pl.user;
  // console.log("user1" + pl.user);
  //********************************
  // delete playlist from playlist
  await playlistDao.deletePlaylist(_id);
  // delete all records in songPlaylist associate with the playlist
  await songPlaylistDao.deleteSongPlaylistById(_id);
  // delete all comments related to the playlist
  await commentDao.deleteComment({ playlist: _id });

  // find remaining likedSongs
  const data = await songPlaylistDao.findSongsByUserId(user);
  const songList = data.map((song) => song.songId);
  res.json(songList);
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

// Return the latest playlists information
// const findLastPageUsers = async (req, res) => {
//   const limit = parseInt(req.query.limit, 10);
//   const lastPage = await playlistDao.findLastPageUsers(limit);
//   res.json(lastPage);
// };
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


const findPlaylistByName = async (req, res) => {
  const searchObj = req.body;
  // console.log("ffffffff: ", searchObj)
  const foundPlaylists = await playlistDao.findPlaylistByName(searchObj.name);
  if (foundPlaylists) {
    res.json(foundPlaylists);
  } else {
    // res.sendStatus(404);
    res.json(null);
  }
};

// const checkSongs = async (req, res) => {
//   const { loginUser, playlist } = req.params;
//   console.log("loginUser: ", loginUser === "null");
//   // get likedSongs object list of targetUser
//   let LikedsongsOfLoginUser = [];
//   if (loginUser !== "null") {
//     const LikedSongs = await likeDao.findLikedSongsByUser(loginUser);
//     LikedsongsOfLoginUser = LikedSongs[0].likedSongs;
//     console.log("fetch");
//   }
//   console.log("LikedsongsOfLoginUser", LikedsongsOfLoginUser);

//   // find songs in songPlaylist
//   const songPlaylistObj = await songPlaylistDao.findSongsByPlaylistId(playlist);
//   const songList = songPlaylistObj.map((item) => item.songId);
//   const songs = await songDao.findSongByIds(songList); // to be return
//   console.log("songs: ", songs);
//   const exist = songs.map((song, id) => {
//     const index = LikedsongsOfLoginUser.indexOf(song._id);
//     return index === -1 ? false : true;
//   });

//   res.json({
//     songs: songs,
//     checkSong: exist,
//   });
// };

export default (app) => {



  app.get("/api/playlists/admin/count", checkAdmin, countPlaylists);
  app.get("/api/playlists/admin/lastpage", checkAdmin, findLatestPlaylists);
  app.get(
    "/api/playlists/admin/pagination",
    checkAdmin,
    findPlaylistsPagination
  );
  app.delete("/api/playlists/admin/:pid", checkAdmin, deletePlaylist);

  app.get("/api/playlists", findPlaylists);
  app.get("/api/playlists/:user", findPlaylistByUser);
  app.get("/api/playlists/details/:pid", findPlaylistDetailsById);
  app.get("/api/playlists/songs/:pid", findSongsByPlaylistId);
  // app.get("/api/playlists/:loginUser/:playlist", checkSongs);
  app.get("/api/playlistsdefault/:uid", findDefaultPlaylistByUser);
  app.delete("/api/playlists", deletePlaylist);
  app.post("/api/playlists", createPlaylist);
  app.put("/api/playlists/:pid", updatePlaylist);

  app.post("/api/local-playlists", findPlaylistByName);
};