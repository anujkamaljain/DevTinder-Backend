const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../src/models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("40 13 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const pendingRequests = await ConnectionRequestModel.find({
      status: "like",
      createdAt: {
        $gte: yesterdayStart,
        $lte: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log(listOfEmails);

    for (const email of listOfEmails) {
      try {
        const response = await sendEmail.run("Friend Requests Pending for " + email, "There are so many friend requests pending, please login to your devTinder account and accept or reject the requests.");
        console.log(response);
      } catch(err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
