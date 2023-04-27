import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import HomeController from "./controllers/home-controller.js";
import PlaylistController from "./controllers/playlist-controller.js";
import UserController from "./controllers/user-controller.js";
import FollowController from "./controllers/follow-controller.js";
import CommentController from "./controllers/comment-controller.js";
import winston from "winston";
// import LikedSongsController from "./controllers/like-controller.js";
import SongController from "./controllers/song-controller.js";
import SongPlaylistController from "./controllers/songPlaylist-controller.js";
import session from "express-session";
import SessionController from "./controllers/session-controller.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import RemoteApiController from "./controllers/remoteApi-controller.js";
import ArtistController from "./controllers/artist-controller.js"

const app = express();


// log requests
// app.use(morgan("dev"));

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'my-app' },
//     transports: [
//         new winston.transports.File({ filename: 'error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'combined.log' })
//     ]
// });


// log requests
// app.use((req, res, next) => {
//     logger.info(`${req.method} ${req.url}`);
//     res.on('finish', () => {
//         logger.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
//     });
//     next();
// });

// log uncaught exceptions
// process.on('uncaughtException', (error) => {
//     logger.error('An unhandled exception was caught:', error);
//     process.exit(1);
// });

// log unhandled rejections
// process.on('unhandledRejection', (error) => {
//     logger.error('An unhandled rejection was caught:', error);
//     process.exit(1);
// });

app.use(express.json());
// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: process.env.CORS || "http://localhost:3000",
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

// detect memory usage
// setInterval(() => {
//     const memoryUsage = process.memoryUsage();
//     const memoryUsageMB = {
//         rss: (memoryUsage.rss / (1024 * 1024)).toFixed(2),
//         heapTotal: (memoryUsage.heapTotal / (1024 * 1024)).toFixed(2),
//         heapUsed: (memoryUsage.heapUsed / (1024 * 1024)).toFixed(2),
//         external: (memoryUsage.external / (1024 * 1024)).toFixed(2),
//         arrayBuffers: (memoryUsage.arrayBuffers / (1024 * 1024)).toFixed(2),
//     };
//     console.log('Memory usage (MB):', memoryUsageMB);
// }, 5000); // every 5 seconds

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
RemoteApiController(app);
PlaylistController(app);
UserController(app);
FollowController(app);
CommentController(app);
// LikedSongsController(app);
SongController(app);
SessionController(app);
SongPlaylistController(app);
HomeController(app);
ArtistController(app);
app.listen(process.env.PORT || 4000)
// app.listen(4000)