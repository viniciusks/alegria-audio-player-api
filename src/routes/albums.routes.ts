import { Router, Request, Response } from "express";
import { collections } from "../services/database.service";
import { Album } from "../model/Album";
import { log } from "../services/log.service"

const albumsRoutes = Router();

albumsRoutes.post("/", async (request: Request, response: Response) => {
  try {
    const newAlbum = request.body as Album;
    const album = await collections.albums.findOne({ name: newAlbum.name });

    if (album) {
      throw new Error("Album already exists!");
    } else {
      const result = await collections.albums.insertOne(newAlbum);

      if (result) {
        log.info(
          `Successfully created a new album with id ${result.insertedId}`
        );
        response.status(201).json({
          message: `Successfully created a new album with id ${result.insertedId}`,
        });
      } else {
        log.error("Failed to create a new album.");
        response.status(500).json({
          message: "Failed to create a new album.",
        });
      }
    }
  } catch (error) {
    log.fatal(error);
    response.status(400).json({
      message: error.message,
    });
  }
});

albumsRoutes.get("/", async (request: Request, response: Response) => {
  try {
    const albums = (await collections.albums.find({}).toArray()) as Album[];

    response.status(200).json({
      message: "Action executed!",
      data: albums,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: error.message,
    });
  }
});

export { albumsRoutes };
