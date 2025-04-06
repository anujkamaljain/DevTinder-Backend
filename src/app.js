const express = require("express");
const app = express();

app.get("/user/:userId", (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({ firstname: "John", lastname: "Doe" });
});

app.use("/test", (req, res) => {
    res.send("Hello from testing server!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
