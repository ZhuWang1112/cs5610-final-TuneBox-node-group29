import songPlayModel from "./models/songPlaylist-model.js";
// export const findSongById = (songId) => songModel.find({ _id: songId });
export const findPlaylistByUserSong = (songId, userId) =>
  songPlayModel.find({ songId: songId, userId: userId });
export const createSongPlaylist = (obj) => songPlayModel.create(obj);
export const deleteSongPlaylist = (userId, songId) =>
  songPlayModel.deleteOne({ userId: userId, songId: songId });

export const findSongsByPlaylistId = (playlistId) =>
  songPlayModel.find({ playlistId: playlistId });
