const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User", //reference to the user collection used to get the user details when getting the pending connection requests of user
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["like", "pass", "accepted", "rejected"],
        message: "status can be like, pass, accepted or rejected",
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});

//pre middleware which checks if the user isnt trying to send the request to himself
connectionRequestSchema.pre("save", function(next){
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("You cannot send connection request to yourself");
  }
  next();
})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;