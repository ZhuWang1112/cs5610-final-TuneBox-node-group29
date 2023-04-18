import axios from "axios";

// ms to "minutes : seconds"
function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
const getTrack = async (req,res) => {
    const options = {           // tracks/Get tracks
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

const getAlbumsByArtistId = async (req,res) => {
    const options = {           // Artists/Artist albums
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/artist_albums/',
        params: {id: req.params.apiArtistId, offset: '0', limit: '100'},
        headers: {
            'X-RapidAPI-Key': '230ac653ebmsh094464f7969dbdbp1121a1jsnc05a7bf66309',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    let response = await axios.request(options);
    let n = response.data.data.artist.discography.albums.totalCount;
    if (n > 10) n = 10;     //due to remoteAPI pagination,  max 10 tracks
    let albums = [];

    // The remote api is too foolish,
    // Some singers do not have an album, so if n === 0, we need to check the discography
    if (n === 0) {
        const options2 = {      // Artists/Artist overview
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/artist_overview/',
            params: {id: req.params.apiArtistId},
            headers: {
                'X-RapidAPI-Key': '230ac653ebmsh094464f7969dbdbp1121a1jsnc05a7bf66309',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        response = await axios.request(options2);
        n = response.data.data.artist.discography.popularReleases.totalCount;
        if (n > 10) n = 10;     //due to remoteAPI pagination,  max 10 tracks
        for(let i = 0; i < n; i++){
            albums[i] = {
                apiAlbumId: response.data.data.artist.discography.popularReleases.items[i].releases.items[0].id,
                title: response.data.data.artist.discography.popularReleases.items[i].releases.items[0].name, // album name
                img: response.data.data.artist.discography.popularReleases.items[i].releases.items[0].coverArt.sources[0].url,
                date: response.data.data.artist.discography.popularReleases.items[i].releases.items[0].date.year,
                tracksNum: response.data.data.artist.discography.popularReleases.items[i].releases.items[0].tracks.totalCount,
            }
        }
    } else {
        // If the singer has  at least one album, we can get the album information directly
        for(let i = 0; i < n; i++){
            albums[i] = {
                apiAlbumId: response.data.data.artist.discography.albums.items[i].releases.items[0].id,
                title: response.data.data.artist.discography.albums.items[i].releases.items[0].name, // album name
                img: response.data.data.artist.discography.albums.items[i].releases.items[0].coverArt.sources[0].url,
                date: response.data.data.artist.discography.albums.items[i].releases.items[0].date.year,
                tracksNum: response.data.data.artist.discography.albums.items[i].releases.items[0].tracks.totalCount,
            }
        }
    }

    res.json(albums);
}

const getTracksByAlbumId = async (req,res) => {
    const options = {          // Albums/Get album
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/albums/',
        params: {ids: req.params.apiAlbumId},
        headers: {
            'X-RapidAPI-Key': '230ac653ebmsh094464f7969dbdbp1121a1jsnc05a7bf66309',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    let n = response.data.albums[0].total_tracks;
    if (n > 10) n = 10;         //due to remoteAPI pagination,  max 10 tracks
    let tracks = [];
    for(let i = 0; i < n; i++){
        tracks[i] = {
            apiSongId: response.data.albums[0].tracks.items[i].id,
            mp3Url: response.data.albums[0].tracks.items[i].preview_url,
            artist: response.data.albums[0].tracks.items[i].artists[0].name,
            apiArtistId: response.data.albums[0].tracks.items[i].artists[0].id,
            songName: response.data.albums[0].tracks.items[i].name,
            duration: formatTime(response.data.albums[0].tracks.items[i].duration_ms),
            img:response.data.albums[0].images[0].url,
        }
    }
    res.json(tracks);
}

export default (app) => {
    // get Track
    app.get("/api/remoteApi/songs/:apiSongId", getTrack);
    // get Albums
    app.get("/api/remoteApi/albums/:apiArtistId", getAlbumsByArtistId);
    // get Tracks
    app.get("/api/remoteApi/tracks/:apiAlbumId", getTracksByAlbumId);
}