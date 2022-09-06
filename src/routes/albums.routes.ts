import { Router, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { Album } from "../model/Album";

const albumsRoutes = Router();

const albums: Album[] = [];

albumsRoutes.post("/", (request: Request, response: Response) => {
  const { name, owner, musics, link } = request.body;
  const album: Album = {
    id: uuidV4(),
    name,
    owner,
    musics,
    link,
    createdAt: new Date(),
  };

  albums.push(album);

  return response.status(201).json({
    message: "Album created!",
  });
});

export { albumsRoutes };
