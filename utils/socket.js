const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../src/models/chat");
const ConnectionRequestModel = require("../src/models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  //unique and hashed to prevent the chats from leaking
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //creating room for 2 people to chat from their id's.
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      //creates a connection through room and each room has a unique room id
      //sorting as roomId should be same for both the users who want to interact
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, txt }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);

          let friend = await ConnectionRequestModel.findOne({
            $or: [
              {fromUserId: userId, toUserId: targetUserId, status: "accepted"},
              {fromUserId: targetUserId, toUserId: userId, status: "accepted"}
            ],
          });

          if(!friend){
            return;
          }

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            txt,
          });

          await chat.save();

          //now emitting msg received from the sender to the reciver through messagereceived.
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            txt,
          });
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
