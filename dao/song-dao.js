import songModel from "./models/song-model.js";

export const findSongs = (page, limit) => {
    const skipIndex = (page - 1) * limit;
    return songModel.find().skip(skipIndex).limit(limit);
};

export const findSongById = (songId) => songModel.find({_id: songId});
export const findSongByIds = (ids) => songModel.find({ _id: { $in: ids } });
export const createSong = (song) => songModel.create(song);
