const express = require("express");
const bp = require("body-parser");
const app = express();
const connectDB = require("./config/db.js");

app.use(express.json({ extended: false }));

connectDB();

//using the routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.get("/", (req, res) => res.send("server is running"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`hi there , the server is running in ${PORT}`)
);
