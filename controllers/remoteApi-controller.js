import axios from "axios";

const cache = new Map();

const cacheRequest = async (key, requestFunc) => {
    if (cache.has(key)) {
        console.log("Cache hit:", key);
        return cache.get(key);
    } else {
        console.log("Cache miss:", key);
        const result = await requestFunc();
        cache.set(key, result);
        return result;
    }
};

const apiKey = 'dc311bd25dmshc09f7a2a7c55b75p166c09jsnaf5f5287a4e0';

// ms to "minutes : seconds"
function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
const getTrack = async (req,res) => {
    const key = `track:${req.params.apiSongId}`;
    const requestFunc = async () => {
        const options = {           // tracks/Get tracks
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/tracks/',
            params: {ids: req.params.apiSongId},
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        return response.data;
    };
    const track = await cacheRequest(key, requestFunc);

    res.json(track);
}

const getAlbumsByArtistId = async (req,res) => {
    const key = `albums:${req.params.apiArtistId}`;
    const requestFunc = async () => {
        const options = {           // Artists/Artist albums
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/artist_albums/',
            params: {id: req.params.apiArtistId, offset: '0', limit: '100'},
            headers: {
                'X-RapidAPI-Key': apiKey,
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
                    'X-RapidAPI-Key': apiKey,
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
        return albums;
    };

    const albums = await cacheRequest(key, requestFunc);
    res.json(albums);
}

const getTracksByAlbumId = async (req,res) => {
    const key = `tracks:${req.params.apiAlbumId}`;
    const requestFunc = async () => {
        const options = {          // Albums/Get album
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/albums/',
            params: {ids: req.params.apiAlbumId},
            headers: {
                'X-RapidAPI-Key': apiKey,
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
                artistName: response.data.albums[0].tracks.items[i].artists[0].name,
                apiArtistId: response.data.albums[0].tracks.items[i].artists[0].id,
                songName: response.data.albums[0].tracks.items[i].name,
                duration: formatTime(response.data.albums[0].tracks.items[i].duration_ms),
                img:response.data.albums[0].images[0].url,
            }
        }
        return tracks;
    };
    const tracks = await cacheRequest(key, requestFunc);
    res.json(tracks);
}

const getArtistInfoByArtistId = async (req,res) => {
    const key = `artistInfo:${req.params.apiArtistId}`;
    const requestFunc = async () => {
        const options = {       // Artists/Artist overview
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/artist_overview/',
            params: {id: req.params.apiArtistId},
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        const artistInfo = {
            artistName: response.data.data.artist.profile.name,
            img: response.data.data.artist.visuals.avatarImage.sources[0].url,
            bannerImg: response.data.data.artist.visuals.headerImage ? response.data.data.artist.visuals.headerImage.sources[0].url : null,
        }
        return artistInfo;
    };
    const artistInfo = await cacheRequest(key, requestFunc);
    res.json(artistInfo);
}

const getAlbumInfoByAlbumId = async (req,res) => {
    const key = `albumInfo:${req.params.apiAlbumId}`;
    const requestFunc = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/album_metadata/',
            params: {id: req.params.apiAlbumId},
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        const albumInfo = {
            albumName: response.data.data.album.name,
        }
        return albumInfo;
    };
    const albumInfo = await cacheRequest(key, requestFunc);
    res.json(albumInfo);
}

const searchAlbums = async (req,res) => {
    const key = `searchAlbums:${req.params.albumName}`;
    const requestFunc = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: req.params.albumName,
                type: 'albums',
                offset: '0',
                limit: '70',
                numberOfTopResults: '5'
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        let albums = [];
        let n = response.data.albums.totalCount;
        if (n > 70) n = 70;
        for (let i = 0; i < n; i++) {
            albums[i] = {
                apiAlbumId: response.data.albums.items[i].data.uri.split(':')[2],
                title: response.data.albums.items[i].data.name,
                img: response.data.albums.items[i].data.coverArt.sources[0].url,
                date: response.data.albums.items[i].data.date.year,
                artistName: response.data.albums.items[i].data.artists.items[0].profile.name,
                apiArtistId: response.data.albums.items[i].data.artists.items[0].uri.split(':')[2],
            }
        }
        return albums;
    }
    const albums = await cacheRequest(key, requestFunc);
    res.json(albums);
}

const searchArtists = async (req,res) => {
    const key = `searchArtists:${req.params.artistName}`;
    const requestFunc = async () => {
        const options = {
            method: "GET",
            url: "https://spotify23.p.rapidapi.com/search/",
            params: {
                q: req.params.artistName,
                type: "artists",
                offset: "0",
                limit: "70",
                numberOfTopResults: "5",
            },
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);
        console.log("response in getartist", response.data.artists);
        let n = response.data.artists.totalCount;
        if (n > 70) n = 70;
        const artists = response.data.artists.items.slice(0, n).map((item) => {
            return {
                apiArtistId: item.data.uri.split(":")[2],
                artistName: item.data.profile.name,
                img:
                    item.data.visuals &&
                    item.data.visuals.avatarImage &&
                    item.data.visuals.avatarImage.sources &&
                    item.data.visuals.avatarImage.sources.length > 0
                        ? item.data.visuals.avatarImage.sources[0].url
                        : "",
            };
        });
        return artists;
    }
    const artists = await cacheRequest(key, requestFunc);
    res.json(artists);
}

const searchTracks = async (req,res) => {
    const key = `searchTracks:${req.params.trackName}`;
    const requestFunc = async () => {
        const options = {
            method: "GET",
            url: "https://spotify23.p.rapidapi.com/search/",
            params: {
                q: req.params.trackName,
                type: "tracks",
                offset: "0",
                limit: "70",
                numberOfTopResults: "5",
            },
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            },
        };
        const response = await axios.request(options);
        let n = response.data.tracks.totalCount
        if (n > 70) n = 70;
        let tracks = [];
        for(let i = 0; i < n; i++){
            tracks[i] = {
                apiSongId: response.data.tracks.items[i].data.uri.split(':')[2],
                artistName: response.data.tracks.items[i].data.artists.items[0].profile.name,
                apiArtistId: response.data.tracks.items[i].data.artists.items[0].uri.split(':')[2],
                songName: response.data.tracks.items[i].data.name,
                duration: formatTime(response.data.tracks.items[i].data.duration.totalMilliseconds),
                img: response.data.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
            }
        }
        return tracks;
    }
    const tracks = await cacheRequest(key, requestFunc);
    res.json(tracks);
}

export default (app) => {
    // get Track
    app.get("/api/remoteApi/songs/:apiSongId", getTrack);
    // get Albums
    app.get("/api/remoteApi/albums/:apiArtistId", getAlbumsByArtistId);
    // get Tracks
    app.get("/api/remoteApi/tracks/:apiAlbumId", getTracksByAlbumId);

    app.get("/api/remoteApi/artistInfo/:apiArtistId", getArtistInfoByArtistId);
    app.get("/api/remoteApi/albumInfo/:apiAlbumId", getAlbumInfoByAlbumId);


    app.get("/api/remoteApi/searchAlbums/:albumName", searchAlbums);
    app.get("/api/remoteApi/searchArtists/:artistName", searchArtists);
    app.get("/api/remoteApi/searchTracks/:trackName", searchTracks);

}