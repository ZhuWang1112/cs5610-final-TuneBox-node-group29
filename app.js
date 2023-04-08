import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import PlaylistController from "./controllers/playlist-controller.js";
import UserController from "./controllers/user-controller.js";
import {DB_CONNECTION_STRING} from "./env.js";
const app = express();
const CONNECTION_STR = DB_CONNECTION_STRING

app.use(cors());
app.use(express.json());
const CONNECTION_STRING = CONNECTION_STR || 'mongodb://localhost:27017';
mongoose.connect(CONNECTION_STRING);

app.get('/hello', (req, res) => {res.send('Hello World!')})

PlaylistController(app);
UserController(app);
app.listen(process.env.PORT || 4000,() => {
    // connect();
    console.log("Connected to backend!");
})