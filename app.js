import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import HomeController from "./controllers/home-controller.js";
import PlaylistController from "./controllers/playlist-controller.js";
import UserController from "./controllers/user-controller.js";
import FollowController from "./controllers/follow-controller.js";
import CommentController from "./controllers/comment-controller.js";
import LikedSongsController from "./controllers/like-controller.js";
import SongController from "./controllers/song-controller.js";
import SongPlaylistController from "./controllers/songPlaylist-controller.js";
import session from "express-session";
import SessionController from "./controllers/session-controller.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();


// log requests
app.use(morgan("dev"));


app.use(express.json());
// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);


// catch exceptions
process.on('uncaughtException', (error) => {
    console.error('An unhandled exception was caught:', error);

    //close server
    server.close(() => {
        console.log('server down');

        // quit process
        process.exit(1);
    });

    // force quit after 10 seconds
    setTimeout(() => {
        console.log('Forcing server down');
        process.exit(1);
    }, 10000).unref(); // unref() to allow the program to exit if this is the only active handle.
});

app.use(cookieParser());
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        // cookie: { secure: false },
    })
);
dotenv.config();
// mongoose.set("strictQuery", false);
const CONNECTION_STRING = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
mongoose.connect(CONNECTION_STRING);

app.get('/hello', (req, res) => {res.send('Hello World!')})
// app.use((req, res, next) => {
//     console.log("Request cookies:", req.cookies);
//     console.log("Session ID:", req.session.id);
//     next();
// });
PlaylistController(app);
UserController(app);
FollowController(app);
CommentController(app);
LikedSongsController(app);
SongController(app);
SessionController(app);
SongPlaylistController(app);
HomeController(app);
app.listen(process.env.PORT || 4000)
// app.listen(4000)