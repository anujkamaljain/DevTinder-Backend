const express = require("express");
const app = express();

app.get("/user", (req, res) => {
    res.send({ firstname: "John", lastname: "Doe" });
});

app.post("/user", (req, res) => {
    console.log("Save user data to database");
    res.send({ message: "User data saved successfully!" });
});

app.delete("/user", (req, res) => {
    res.send({ message: "User data deleted successfully!" });
});

app.use("/test", (req, res) => {
    res.send("Hello from testing server!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
