import songModel from "./models/song-model.js";

export const findSongs = (page, limit) => {
    const skipIndex = (page - 1) * limit;
    return songModel.find().skip(skipIndex).limit(limit);
};

export const createSong = (song) => songModel.create(song);
