import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
      // validate
    gender: { type: String, required: true, enum: ['male', 'female', 'non-binary']},
    isAdmin: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    playlistsCount: { type: Number, default: 1 },
    createTime: { type: Date, default: Date.now },
      isDeleted: { type: Boolean, default: false },
    // playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" }],
  },
  { collection: "users" }
);

userSchema.method.generateAuthToken = function () {
    // return token
    return jwt.sign(
        {_id: this._id, name: this.name, isAdmin: this.isAdmin},
        process.env.JWTPRIVATEKEY,
        {expiresIn: "7d"});
}
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