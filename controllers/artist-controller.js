import * as artistDao from "../dao/artist-dao.js"
import * as songDao from "../dao/song-dao.js";

console.log("controller");


const ArtistController = (app) => {
    // find all artists
    const findArtists = async (req, res) => {
        const artists = await artistDao.findAllArtist();
        res.json(artists);
    }
    const findArtistById = async (req, res) => {
        const artist = await artistDao.findArtistById(req.params._id);
        res.json(artist);
    }
    const findArtistByName = async (req, res) => {
        const artist = await artistDao.findArtistByName(req.params.name);
        res.json(artist);
    }
    const findDetailsByArtist = async (req, res) => {
        const artist = await artistDao.findDetailsByArtist(req.params.name);
        res.json(artist);
    }
    
    //
    const findPlayListByArtistName = async (req, res) => {
        const songs = await songDao.findSongByArtist(req.params.name);
        const artist = await artistDao.findArtistByName(req.params.name);
        res.json({
            playlist: {
                songs: songs,
                user: "None",
            },
            artist: artist
        });
    }

    const findSongsByArtistApiId = async (req, res) => {
      const songs = await songDao.findSongsByApiArtistId(req.params.api);
      const artist = await artistDao.findArtistByArtistId(req.params.api);

      res.json({
        songs: songs,
        artist: artist,
      });
    };

    const createArtist = async (req, res) => {
      const artist = await artistDao.createArtist(req.body);
      res.json(artist);
    };
    const deleteArtistById = async (req, res) => {
      const artistIdToDelete = req.params._id;
      const status = await artistDao.deleteArtist(artistIdToDelete);
      res.json(status);
    };

    const insertArtistIfNotExist = async (req, res) => {
      const status = await artistDao.insertArtistIfNotExist(req.body);
      const artist = await artistDao.findArtistByArtistId(req.body.api);
      res.json(artist);
    };

    app.get("/api/artists", findArtists);
    app.post("/api/artists", createArtist);
    app.get("/api/artists/searchByName/:name", findArtistByName);
    app.get("/api/artists/details/:name", findDetailsByArtist);
    app.get("/api/artists/:_id", findArtistById);
    app.get("/api/artist/detailsPlayList/:name", findPlayListByArtistName);
    app.get("/api/artist/artistSongs/:api", findSongsByArtistApiId);
    app.delete("/api/artists/admin/:_id", deleteArtistById);
    app.put("/api/artists", insertArtistIfNotExist);
}

export default ArtistController;
