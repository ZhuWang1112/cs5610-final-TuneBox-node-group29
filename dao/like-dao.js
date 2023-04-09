import likedSongsModel from "./models/likedSongs-model.js";

export const findLikedSongsByUser = (userId) =>
  likedSongsModel.find({ user: userId });
export const updateLikedSongs = (uid, likedSongs) =>
  likedSongsModel.updateOne({ user: uid }, { $set: likedSongs });
export const createLikedSongsList = (likedSong) =>
  likedSongsModel.create(likedSong);