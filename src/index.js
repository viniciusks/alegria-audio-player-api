const express = require("express");

const app = express();

// Middlewares
app.use(express.json());

/**
 * Album Structure
 * ID - uuid
 * Name - string
 * Artist - string
 * musics - String's list
 */
app.post("/album", (req, res) => {});

// Routes
app.get("/", (req, res) => {
  return res.json({
    message: "Hello, I'm Alegria Player API",
    version: "1.0.0",
  });
});

app.listen(3000, () => {
  console.log("Listening in port 3000");
});
