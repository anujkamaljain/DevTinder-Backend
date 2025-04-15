const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");

//send connection request
requestRouter.post("/sendConnectRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(
    user.firstName + " " + user.lastName + " sent a connection request."
  );
});

module.exports = requestRouter;
