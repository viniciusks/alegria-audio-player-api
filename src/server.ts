import express from "express";
import { albumsRoutes } from "./routes/albums.routes";
import { connectToDatabase } from "./services/database.service";
import { log } from "./services/log.service";
import cors from "cors";

const allowedOrigins = ["http://localhost:5500"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

// Middleware
app.use(express.json());
app.use(cors(options));

connectToDatabase()
  .then(() => {
    // Routes
    app.use("/albums", albumsRoutes);

    app.listen(3000, () => log.info("Server is running!"));
  })
  .catch((error: Error) => {
    log.error("Database connection failed", error);
    process.exit();
  });
