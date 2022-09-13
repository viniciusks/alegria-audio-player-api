import { Router, Request, Response } from "express";
import { AlbumsRepository } from "../repositories/AlbumsRepository";

const albumsRoutes = Router();
const albumRepository = new AlbumsRepository();

albumsRoutes.post("/", (request: Request, response: Response) => {
  const { name, owner, musics, link } = request.body;

  let albumAlreadyExists = albumRepository.findByName(name);

  if (albumAlreadyExists) {
    return response.status(400).json({
      message: "Album already exists.",
    });
  }

  albumRepository.create({ name, owner, musics, link });

  return response.status(201).json({
    message: "Album created!",
  });
});

albumsRoutes.get("/", (request: Request, response: Response) => {
  return response.status(200).json({
    data: albumRepository.get(),
  });
});

export { albumsRoutes };
