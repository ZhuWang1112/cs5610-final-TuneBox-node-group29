const cache = new Map();

const cacheMiddleware = (cacheKeyBuilder) => {
    return async (req, res, next) => {
        const key = cacheKeyBuilder(req);
        if (cache.has(key)) {
            console.log("Cache hit:", key);
            res.locals.cacheResult = cache.get(key);
            return next();
        } else {
            console.log("Cache miss:", key);
            res.locals.cacheMiss = async (result) => {
                cache.set(key, result);
            };
            return next();
        }
    };
};
// app.get("/track/:apiSongId", cacheMiddleware((req) => `track:${req.params.apiSongId}`), async (req, res) => {
//     if (res.locals.cacheResult) {
//         res.json(res.locals.cacheResult);
//     } else {
//         const options = {
//             method: 'GET',
//             url: 'https://spotify23.p.rapidapi.com/tracks/',
//             params: { ids: req.params.apiSongId },
//             headers: {
//                 'X-RapidAPI-Key': apiKey,
//                 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//             }
//         };
//         const response = await axios.request(options);
//         await res.locals.cacheMiss(response.data);
//         res.json(response.data);
//     }
// });

export default cacheMiddleware;