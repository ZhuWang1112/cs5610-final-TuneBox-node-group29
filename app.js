import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import PlaylistController from "./controllers/playlist-controller.js";
import UserController from "./controllers/user-controller.js";
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
mongoose.set("strictQuery", false);
const CONNECTION_STRING = process.env.DB_CONNECTION || 'mongodb://localhost:27017';
mongoose.connect(CONNECTION_STRING);

app.get('/hello', (req, res) => {res.send('Hello World!')})

PlaylistController(app);
UserController(app);
app.listen(process.env.PORT || 4000)