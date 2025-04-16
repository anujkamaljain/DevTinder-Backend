const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

//send connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      allowedStatus = ["like", "pass"];

      //no other request status other than like and pass are allowed
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: `Invalid status type "${status}".` });
      }

      //If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exists." });
      }

      //checking if toUserId exists or is it a fake id
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found." });
      }
      const connectionRequest = new ConnectionRequestModel({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

//review connection request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error(`Invalid request status "${status}."`);
      }
      const connectionRequest = await ConnectionRequestModel.findById({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "like",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found." });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: `Connection request ${status}.`, data: data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
