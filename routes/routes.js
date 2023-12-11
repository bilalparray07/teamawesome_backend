///routes.js
const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  createNewPlayer,
  rootRoute,
  getUser,
  editById,
  deleteById,
} = require("../src/user/userControllers");
////
router.route("/api/players").get(getAllPlayers);
router.route("/api/create").post(createNewPlayer);
router.route("/").get(rootRoute);
router.route("/api/players/:id").get(getUser);
router.route("/api/players/:id").put(editById);
router.route("/api/players/:id").delete(deleteById);
module.exports = router;
