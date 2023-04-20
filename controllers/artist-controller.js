import * as artistDao from "../dao/artist-dao.js"


const ArtistController = (app) => {


    const findArtistByName = async (req, res) => {
        const searchObj = req.body;
        const foundArtists = await artistDao.findArtistByName(searchObj);
        if (foundArtists) {
            res.json(foundArtists);
        } else {
            res.sendStatus(404);
        }
    };




    // app.get("/api/artists/:name",  findArtistByName);

    app.post("/api/artists", findArtistByName);



}

export default ArtistController;


