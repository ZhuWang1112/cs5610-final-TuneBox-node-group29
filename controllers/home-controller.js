const TopMusic = require('../TopMusic/TopMusic.json')
const getTopMusic = (req, res) => {
    res.json(TopMusic);
}
export default (app) => {
    app.get('/api/topMusic', getTopMusic);
}