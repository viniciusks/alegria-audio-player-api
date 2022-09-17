import express from "express";
import { albumsRoutes } from "./routes/albums.routes";
import { connectToDatabase } from "./services/database.service";

const app = express();

// Middleware
app.use(express.json());

connectToDatabase()
  .then(() => {
    // Routes
    app.use("/albums", albumsRoutes);

    app.listen(3000, () => console.log("Server is running!"));
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
