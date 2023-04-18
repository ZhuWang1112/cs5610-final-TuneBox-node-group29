import songPlayModel from "./models/songPlaylist-model.js";
import songModel from "./models/song-model.js";
// export const findSongById = (songId) => songModel.find({ _id: songId });
export const findPlaylistByUserSong = (songId, userId) =>
  songPlayModel.find({ songId: songId, userId: userId });
export const createSongPlaylist = (obj) => songPlayModel.create(obj);
export const deleteSongPlaylist = (userId, songId) =>
  songPlayModel.deleteOne({ userId: userId, songId: songId });
export const deleteSongPlaylistById = (playlistId) =>
  songPlayModel.deleteMany({ playlistId: playlistId });
export const findSongsByPlaylistId = (playlistId) =>
  songPlayModel
    .find({ playlistId: playlistId })
    .populate(
      "songId",
      ["apiSongId", "img", "artist", "songName", "duration"],
      songModel
    );
export const findSongNumbersByUserId = (userId) =>
  songPlayModel.countDocuments({ userId: userId });
export const findSongsByUserId = (userId) =>
  songPlayModel
    .find({ userId: userId })
    .populate(
      "songId",
      ["apiSongId", "img", "artist", "songName", "duration"],
      songModel
    );
export const updateSongPlaylist = (obj) =>
  songPlayModel.updateOne({ userId: obj.userId, songId: obj.songId }, { $set: obj });
