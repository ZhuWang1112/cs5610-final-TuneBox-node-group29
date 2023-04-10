import * as likeDao from "../dao/like-dao.js";
import * as playlistDao from "../dao/playlist-dao.js";
import * as songDao from "../dao/song-dao.js";
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

// Add/delete the song to/from playlist and likedSongs schema
const handleLikeSong = async (req, res) => {
  const user = req.params.uid;
  let likedObj = await likeDao.findLikedSongsByUser(user);
  //   console.log(req.body);
  const newId = req.body.songId;
  console.log(newId);
  const newPlaylistId = req.body.playlistId;
  console.log(newPlaylistId);
  let likedList = likedObj[0].likedSongs;
  const index = likedList.indexOf(newId);
  const playlists = await playlistDao.findPlaylistById(newPlaylistId);
  let songList = playlists.songs;

  if (index === -1) {
    const newObjOId = new mongoose.Types.ObjectId(newId);
    likedList.push(newObjOId);
    // insert the song to playlist
    songList.push(newObjOId);
    console.log("Added");
    console.log("Songlist: ", songList);
    console.log("likedList: ", likedList);
  } else {
    likedList.splice(index, 1);
    //remove the song from playlist
    const idInSong = songList.indexOf(newId);
    songList.splice(idInSong, 1);
    console.log("Deleted");
  }
  const newPlaylist = { _id: playlists._id, songs: songList };
  console.log("new playlist: ", newPlaylist);
  await playlistDao.updatePlaylist(newPlaylist);

  const newLikeObj = { ...likedList, likedSongs: likedList };
  console.log("newLikeObj: ", newLikeObj);
  await likeDao.updateLikedSongs(user, newLikeObj);

  const songObjs = await songDao.findSongByIds(songList);
  console.log("songObjs: ", songObjs);
  res.json(songObjs);
};

export default (app) => {
    app.get('/api/likedSongs/:uid', findLikedSongsByUser);
    app.put('/api/likedSongs/:uid', handleLikeSong);
    app.post('/api/likedSongs/:uid', createEmptyLikedList);
}