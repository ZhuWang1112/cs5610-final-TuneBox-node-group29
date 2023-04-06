import playlistModel from "./models/playlist-model";

// return array of playlists
export const findPlayListsByUserId = (userId) => playlistModel.find({userId: userId});
