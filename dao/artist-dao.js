import artistModel from "./models/artist-model.js"
import songModel from "./models/song-model.js"
import playlistModel from "./models/playlist-model.js";

export const findAllArtist = () => artistModel.find();
export const findArtistById = (ids) => artistModel.findOne({ _id: { $in: ids } });
export const findArtistByName = (name) => artistModel.findOne({ name: name });

// export const findDAOLocalArtistByName =  (name) => {
//     const artist =  artistModel.findOne({name: name});
//
//     return artist;
// }
export const findDAOLocalArtistByName = (name) => {
    // Create a regex pattern for fuzzy matching
    const fuzzyRegex = new RegExp(name.split('').join('.*'), 'i');

    const artist = artistModel.find({
      name: {
        $regex: fuzzyRegex,
      },
    });

    return artist;
};



// export const findArtistByName = async ({search}) => {
//     const artist = await artistModel.findOne({name: search});
//     return artist;
// }
export const findArtistByArtistId = (api) => artistModel.findOne({ api: api });
export const findDetailsByArtist = (artistName) => {
    const result = songModel.aggregate([
    {
      $lookup: {
        from: 'artists',
        localField: 'artist',
        foreignField: 'name',
        as: 'artistData',
      },
    },
    {
      $match: {
        'artistData.name': artistName,
      },
    },
    {
      $project: {
        songData: '$$ROOT',
        artistData: 1,
      },
    },
  ])

  return result;
};

export const createArtist = async (artist) => {
    const newArtist = await artistModel.create(artist);
    console.log("creating new artist --- artist-dao")
    return newArtist;
};

export const deleteArtist = (artist) => artistModel.deleteOne({ _id: artist });
export const insertArtistIfNotExist = (artist) =>
  artistModel.updateOne(
    { api: artist.api },
    { $set: artist },
    { upsert: true }
  );

