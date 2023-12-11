const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Name must be entered"],
  },
  role: {
    type: String,
    // required: [true, "Role must be entered"],
  },
  ranking: {
    type: Number,
    // required: [true, "Ranking must be entered"],
  },
  image: {
    type: String,
    // required: [true, "Image Url must be entered"],
  },
  route: {
    type: String,
    // required: [true, "Route must be entered"],
  },
});

module.exports = mongoose.model("Player", playerSchema);
