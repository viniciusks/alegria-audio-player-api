const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({
    message: "Hello, I'm Alegria Player API",
    version: "1.0.0",
  });
});

app.listen(3000, () => {
  console.log("Listening in port 3000");
});
