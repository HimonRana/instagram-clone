const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  bio: {
    type: String
  },

  imgUrl: {
    type: String
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
