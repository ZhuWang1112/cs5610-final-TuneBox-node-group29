import playlistModel from "./models/playlist-model.js";
import userModel from "./models/user-model.js";

// return array of playlists
export const findPlayListsByUserId = (userId) => playlistModel.find({userId: userId});
export const deletePlaylist = (pid) => playlistModel.deleteOne({_id: pid});
export const createPlaylist = (playlist) => playlistModel.create(playlist);