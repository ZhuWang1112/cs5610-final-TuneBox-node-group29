import axios from "axios";


const getTrack = async (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/tracks/',
        params: {ids: req.params.apiSongId},
        headers: {
            'X-RapidAPI-Key': '230ac653ebmsh094464f7969dbdbp1121a1jsnc05a7bf66309',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    res.json(response.data);
}

export default (app) => {
    app.get("/api/remoteApi/songs/:apiSongId", getTrack);
}