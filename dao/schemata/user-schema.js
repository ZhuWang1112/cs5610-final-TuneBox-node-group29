import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, default: "empty-email" },
    cellphone: { type: String, default: "000000000" },
    password: { type: String, required: true },
    // validate
    gender: {
      type: String,
      required: true,
      default: "male",
      enum: ["male", "female", "non-binary"],
    },
    isAdmin: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    playlistsCount: { type: Number, default: 0 },
    img: { type: String, default: "/images/profile-avatar.jpeg" },
    createTime: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    // likedList: {type: Array, default: []},
    // followeeList: {type: Array, default: []}
    // playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" }],
  },
  { collection: "users" }
);


// userSchema.method.generateAuthToken = function () {
//     // return token
//     return jwt.sign(
//         {_id: this._id, name: this.name, isAdmin: this.isAdmin},
//         process.env.JWTPRIVATEKEY,
//         {expiresIn: "7d"});
// }
    /**
     * When creating a new user, create a default playlist for the user.
     */
//
// userSchema.pre("save", async function (next) {
//     if (this.isNew) { // when creating a new user
//         const defaultPlaylist = new Playlist({
//             user: this._id,
//             playListName: "Default Playlist",
//             description: "This is your default playlist.",
//             isDefault: true,
//             songs: [],
//             img: "", // default img
//         });
//
//         await defaultPlaylist.save(); // save the default playlist to the database
//         this.playlists.push(defaultPlaylist._id); // add the default playlist to the user's playlist list
//     }
//     next();
// });


export default userSchema;