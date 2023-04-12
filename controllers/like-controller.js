import * as likeDao from "../dao/like-dao.js";
import * as playlistDao from "../dao/playlist-dao.js";
import * as songDao from "../dao/song-dao.js";
import * as songPlaylistDao from "../dao/songPlaylist-dao.js";
import mongoose from "mongoose";

// When a new user register, add one more record with empty likedList in the likedSongs db
const createEmptyLikedList = async (req, res) => {
  const newLikedObject = { user: req.params.uid, likedSongs: [] };
  const likedObject = await likeDao.createLikedSongsList(newLikedObject);
  res.json(likedObject);
};

// Get an array of likedSongs id by userId
const findLikedSongsByUser = async (req, res) => {
  const likedObject = await likeDao.findLikedSongsByUser(req.params.uid);
  res.json(likedObject);
};

const handleLikeSong = async (req, res) => {
  // fetch likesSongs of user
  const user = req.params.uid;
  let likedObj = await likeDao.findLikedSongsByUser(user);
  // TODO: add playlistId for the loginUser
  // if not exist
  // insert into likesSongsList
  // add user, song -> playlist pair

  const newId = req.body.songId;
  console.log(newId);
  let likedList = likedObj[0].likedSongs;
  const index = likedList.indexOf(newId); // find whether liked
  //   const playlists = await playlistDao.findPlaylistById(newPlaylistId);
  //   let songList = playlists.songs;
  if (index === -1) {
    // if not exist
    // insert into likesSongsList
    // add user, song -> playlist pair
    const newObjOId = new mongoose.Types.ObjectId(newId);
    likedList.push(newObjOId);
    songPlaylistDao.createSongPlaylist({
      userId: user,
      songId: newObjOId,
      playlistId: req.body.playlistId,
    });
    console.log("ADDED", req.body.playlistId);
    // insert the song to playlist
  } else {
    // if exist
    // delete from likesSongsList
    // delete user, song -> playlist pair
    likedList.splice(index, 1);
    await songPlaylistDao.deleteSongPlaylist(user, newId);
    console.log("Deleted");
  }

  const newLikeObj = {
    likedSongs: likedList,
  };
  console.log("uid", user);
  console.log("newLikeObj: ", newLikeObj);
  await likeDao.updateLikedSongs(user, newLikeObj);

  //   // find all songs by playlistId
  //   const songObjs = await songDao.findSongByIds(songList);
  //   console.log("songObjs: ", songObjs);
  //   res.json(songObjs);
  res.json("ok");
};
export default (app) => {
    app.get('/api/likedSongs/:uid', findLikedSongsByUser);
    app.put('/api/likedSongs/:uid', handleLikeSong);
    app.post('/api/likedSongs/:uid', createEmptyLikedList);
}