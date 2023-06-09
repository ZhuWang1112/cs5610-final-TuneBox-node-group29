import * as commentDao from "../dao/comment-dao.js";
import * as playlistDao from "../dao/playlist-dao.js";
import * as userDao from "../dao/user-dao.js";

// create a comment record
const createComment = async (req, res) => {
  const newComment = req.body;
  const { rating, playlist, newAvgRating } = newComment;
  const insertedComment = await commentDao.createComment(newComment);
  await playlistDao.updatePlaylist({ _id: playlist, rating: newAvgRating });
  res.json(insertedComment);
};

// find the comments belongs to the user
// also get the playlistname and artist name for displaying in Profile page
const findComments = async (req, res) => {
  const uid = req.params.uid;
  const comments = await commentDao.findCommentsByUserId(uid);
  const playlistIds = comments.map((c) => c.playlist);
  const playlists = await playlistDao.findPlaylistByIds(playlistIds);
  const userIds = playlists.map((p) => p.user);
  const artistsOfPlaylists = await userDao.findUserByIds(userIds);
  console.log("all playlists: ", playlists);
  console.log("all comments:", comments);
  //for each comment, find the playlist details
  const commentsWithDetails = comments.map((c) => {
    const playlistObj = playlists.filter(
      (p) => p._id.toString() == c.playlist.toString()
    )[0];
    console.log("pid from comment: ", c.playlist.toString());
    console.log("playlistObj in findComments", playlistObj);
    const pName = playlistObj.playListName;
    const pCover = playlistObj.img;
    const userObj = artistsOfPlaylists.filter(
      (u) => u._id.toString() == playlistObj.user.toString()
    )[0];
    return {
      _id: c._id,
      playlist: c.playlist,
      user: c.user,
      content: c.content,
      playListName: pName,
      rating: c.rating,
      userName: userObj.userName,
      userImg: pCover,
    };
  });
  res.json(commentsWithDetails);
};

// delete comment by commentId(_id in comment schema)
const deleteComments = async (req, res) => {
  const commentObj = req.body.commentObj;
  const playlistObj = await playlistDao.findPlaylistById(commentObj.playlist);
  const number = await commentDao.findCommentNumberByPlaylist(
    commentObj.playlist
  );
  if (number === 1) {
    playlistObj.rating = 0;
  } else {
    playlistObj.rating =
      ((playlistObj.rating * number - commentObj.rating) * 1.0) / (number - 1);
  }
  await playlistDao.updatePlaylist(playlistObj);
  const status = await commentDao.deleteComment({ _id: commentObj._id });
  res.json(status);
};

const findCommentsByPlaylist = async (req, res) => {
  const pid = req.params.pid;
  const comments = await commentDao.findCommentsByPlaylist(pid);
  res.json(comments);
};

export default (app) => {
  app.post("/api/comment", createComment);
  app.get("/api/comment/:uid", findComments);
  app.get("/api/comment/playlist/:pid", findCommentsByPlaylist);
  app.delete("/api/comment", deleteComments);
};