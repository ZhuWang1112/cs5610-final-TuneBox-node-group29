import * as likeDao from "../dao/like-dao.js";
import * as playlistDao from "../dao/playlist-dao.js";
import mongoose from "mongoose";

const createEmptyLikedList = async (req, res) => {
    const newLikedObject = {user: req.params.uid, likedSongs: []}
    const likedObject = await likeDao.createLikedSongsList(newLikedObject);
    res.json(likedObject);
}
const findLikedSongsByUser = async (req, res) => {
    const likedObject = await likeDao.findLikedSongsByUser(req.params.uid);
    res.json(likedObject);
}
export const handleLikeSong = async (req, res) => {
    const user = req.params.uid;
    let likedObj = await likeDao.findLikedSongsByUser(user);
    const newId = req.body.songId;
    const newPlaylistId = req.body.playlistId;
    let likedList = likedObj[0].likedSongs;
    const index = likedList.indexOf(newId);
    const playlists = await playlistDao.findPlaylistById(newPlaylistId);
    let songList = playlists.songs;

    if (index === -1) {
        const newObjOId = new mongoose.Types.ObjectId(newId);
        likedList.push(newObjOId);
        // insert the song to playlist
        songList.push(newObjOId);
    } else {
        likedList.splice(index, 1);
        //remove the song from playlist
        const idInSong = songList.indexOf(newId);
        songList.splice(idInSong, 1);
    }
    const newPlaylist = {_id: playlists._id, songs: songList};
    await playlistDao.updatePlaylist(newPlaylist)

    const newLikeObj = {...likedList, likedSongs: likedList}
    const status = await likeDao.updateLikedSongs(user, newLikeObj);
    res.json(status);
}

export default (app) => {
    app.get('/api/likedSongs/:uid', findLikedSongsByUser);
    app.put('/api/likedSongs/:uid', handleLikeSong);
    app.post('/api/likedSongs/:uid', createEmptyLikedList);
}