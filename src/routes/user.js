const express = require("express");
const userAuth = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");
const { USER_SAFE_DATA } = require("../../utils/constants");
const User = require("../models/user");

//Get all the pending connection request for loggedIn User
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "like",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.send(connectionRequests);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Get all the list of connections you are matched with and friends with
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((request) => {
      return request.fromUserId._id.equals(loggedInUser._id)
        ? request.toUserId
        : request.fromUserId;
    });
    res.json({ data: data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Get feed for users
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
  
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page-1)*limit;
    limit = limit>50 ? 50 : limit;

    //Find all the connection requests of user (sent + received)
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    }).select(["fromUserId", "toUserId"]);

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = userRouter;
