import { Router, Request, Response } from "express";
import { collections } from "../services/database.service";
import { Album } from "../model/Album";
import { log } from "../services/log.service";
import { ObjectId } from "mongodb";
import app from "../services/firebase.service";
import { getHash } from "../services/utils.service";

const albumsRoutes = Router();

albumsRoutes.get("/", async (request: Request, response: Response) => {
  let albums = [];

  await app
    .firestore()
    .collection("albums")
    .get()
    .then((query) => {
      query.forEach((doc) => {
        albums.push(doc.data());
      });
      response.status(200).json({
        message: "Get all albums!",
        data: albums,
      });
    })
    .catch((error) => {
      log.error(error);
      response.status(400).json({
        message: error,
      });
    });
});

albumsRoutes.post("/", async (request: Request, response: Response) => {
  const newAlbum = request.body as Album;

  let id = getHash(newAlbum.name);

  await app
    .firestore()
    .collection("albums")
    .doc(id)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        response.status(400).json({
          message: "Album already exists!",
        });
      } else {
        await app
          .firestore()
          .collection("albums")
          .doc(id)
          .set({
            name: newAlbum.name,
            owner: newAlbum.owner,
            musics: newAlbum.musics,
            link: newAlbum.link,
          })
          .then(() => {
            response.status(201).json({
              message: `Album inserted with id ${id}`,
            });
          });
      }
    });
});

// albumsRoutes.post("/", async (request: Request, response: Response) => {
//   try {
//     const newAlbum = request.body as Album;
//     const album = await collections.albums.findOne({ name: newAlbum.name });

//     if (album) {
//       throw new Error("Album already exists!");
//     } else {
//       const result = await collections.albums.insertOne(newAlbum);

//       if (result) {
//         log.info("Post albums route");
//         response.status(201).json({
//           message: `Successfully created a new album with id ${result.insertedId}`,
//         });
//       } else {
//         log.error("Failed to create a new album.");
//         response.status(500).json({
//           message: "Failed to create a new album.",
//         });
//       }
//     }
//   } catch (error) {
//     log.fatal(error);
//     response.status(400).json({
//       message: error.message,
//     });
//   }
// });

albumsRoutes.put("/", async (request: Request, response: Response) => {
  try {
    const existAlbum = request.body as Album;
    const album = await collections.albums.findOne({
      _id: new ObjectId(existAlbum._id),
    });

    // Executando update dentro do MongoDB
    collections.albums.updateOne(
      album,
      {
        $set: {
          name: existAlbum.name,
          owner: existAlbum.owner,
          musics: existAlbum.musics,
          link: existAlbum.link,
        },
      },
      function (err, res) {
        if (err) throw err;
        log.info(`Document updated: ${JSON.stringify(existAlbum)}`);
      }
    );

    // Rertono da api - PUT
    response.status(200).json({
      message: "Document update success!",
      data: existAlbum,
    });
  } catch (error) {
    log.fatal(error);
    response.status(400).json({
      message: error.message,
    });
  }
});

// albumsRoutes.get("/", async (request: Request, response: Response) => {
//   try {
//     const albums = (await collections.albums.find({}).toArray()) as Album[];

//     log.info("Get albums route");
//     response.status(200).json({
//       message: "Action executed!",
//       data: albums,
//     });
//   } catch (error) {
//     log.error("Failed to get the albums.");
//     console.error(error);
//     response.status(500).json({
//       message: error.message,
//     });
//   }
// });

export { albumsRoutes };
