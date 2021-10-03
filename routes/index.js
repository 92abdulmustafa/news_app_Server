const express = require("express");
const router = express.Router();
const userRoutes = require("./users");

router.get("/", async (_, res) => {
  res.send("Server is in running state!");
});

router.post("/login", async (req, res, next) => {
  userRoutes.login(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  userRoutes.signUp(req, res, next);
});

router.post("/editProfile", async (req, res, next) => {
  userRoutes.editProfile(req, res, next);
});

router.post("/userFavourite", async (req, res, next) => {
  userRoutes.userFavourite(req, res, next);
});

module.exports = router;
