import express from "express";
import { createAlbum } from "./routes";

const app = express();

app.get("/", createAlbum);

app.listen(3000, () => {
  console.log("Listing in 3000");
});
