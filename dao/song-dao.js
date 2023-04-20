import songModel from "./models/song-model.js";

export async function findSongsByApiArtistId(apiArtistId) {
    return songModel.find({ apiArtistId: apiArtistId });
}


export const findSongs = (page, limit) => {
    const skipIndex = (page - 1) * limit;
    return songModel.find().skip(skipIndex).limit(limit);
};

export const insertSongIfNotExist = (song) =>
  songModel.updateOne(
    { apiSongId: song.apiSongId },
    { $set: song },
    { upsert: true }
  );
// export const findSongById = (songId) => songModel.find({ _id: songId });
export const findSongByApiSongId = (apiSongId) =>
  songModel.find({ apiSongId: apiSongId });
export const findSongByIds = (ids) => songModel.find({ _id: { $in: ids } });
export const createSong = (song) => songModel.create(song);
export const findSongByArtist = (artist) => songModel.find({ artist: { $in: artist } });
