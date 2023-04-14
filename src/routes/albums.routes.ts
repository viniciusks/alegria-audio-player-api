import { Router, Request, Response } from "express";
import { collections } from "../services/database.service";
import { Album } from "../model/Album";
import { log } from "../services/log.service";
import { ObjectId } from "mongodb";

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
        log.info("Post albums route");
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

// TODO: Terminar updateOne
albumsRoutes.put("/", async (request: Request, response: Response) => {
  try {
    // Preciso separar o _id do body para realizar o update
    const existAlbum = request.body as Album;
    const existAlbumId = new ObjectId(existAlbum._id);
    const album = await collections.albums.findOne({ _id: existAlbumId });

    const result = collections.albums.updateOne(
      album,
      { $set: existAlbum },
      function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      }
    );
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

    log.info("Get albums route");
    response.status(200).json({
      message: "Action executed!",
      data: albums,
    });
  } catch (error) {
    log.error("Failed to get the albums.");
    console.error(error);
    response.status(500).json({
      message: error.message,
    });
  }
});

export { albumsRoutes };
