import express from "express";
import { albumsRoutes } from "./routes/albums.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/albums", albumsRoutes);

app.listen(3000, () => console.log("Server is running!"));
