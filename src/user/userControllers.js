// userControllers.js

const Players = require("./userModels");
const path = require("path");
const express = require("express");
const server = express();
// Serve static files from the 'public' directory
server.use(express.static("public"));
// get all players
const getAllPlayers = async (req, res) => {
  const players = await Players.find();
  res.status(200).json({ players });
};
// create new player
const createNewPlayer = async (req, res) => {
  const playerFormData = req.body;

  try {
    const newPlayerData = new Players({
      name: playerFormData.name,
      role: playerFormData.role,
      ranking: playerFormData.ranking,
      image: playerFormData.image,
      route: playerFormData.route,
    });
    await newPlayerData.save();
  } catch (error) {
    console.error("Error saving form data to MongoDB:", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
};
///get by id
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Players.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(201).send({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
};
////root
const rootRoute = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
};
//edit by delete
const editById = async (req, res, next) => {
  const id = req.params.id;
  const user = await Players.findOneAndUpdate({ _id: id }, { $set: req.body });
  res.status(201).send({
    message: "Thankyou",
  });
};
///delete by id
const deleteById = async (req, res, next) => {
  const id = req.params.id;
  const user = await Players.findOneAndDelete({ _id: id });
  res.status(201).send({
    message: "Thankyou",
  });
};
module.exports = {
  getAllPlayers,
  createNewPlayer,
  rootRoute,
  getUser,
  editById,
  deleteById,
};
