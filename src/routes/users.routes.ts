import { Router, Request, Response } from "express";
import app from "../services/firebase.service";
import { log } from "../services/log.service";
import { User } from "../model/User";

const usersRoutes = Router();

usersRoutes.post("/login", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  await app
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((signResponse: any) => {
      let uid = signResponse.user.uid;
      let email = signResponse.user.email;

      log.info(`User ${uid} signed!`);

      response.status(200).json({
        message: `User ${uid} signed!`,
        data: {
          uid,
          email,
        },
      });
    })
    .catch((error: any) => {
      log.error(`Error on signed user, error: ${error}`);

      response.status(400).json({
        message: error.message,
      });
    });
});

usersRoutes.post("/", async (request: Request, response: Response) => {
  const user = request.body as User;

  log.info("Creating a new user");
  await app
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(async (authResponse: any) => {
      let uid = authResponse.user.uid;

      await app
        .firestore()
        .collection("users")
        .doc(uid)
        .set({
          name: user.name,
          birthday: user.birthday,
          email: user.email,
          country: user.country,
          state: user.state,
          city: user.city,
          role: user.roles,
          action: user.action,
          artisticFormation: user.artisticFormation,
          professionalArt: user.professionalArt,
          englishLevel: user.englishLevel,
          spanishLevel: user.spanishLevel,
          spiritCenter: user.spiritCenter,
          otherLanguages: user.otherLanguages,
          whatsapp: user.whatsapp,
          isWorker: user.isWorker,
          isPlayer: user.isPlayer,
          isTheater: user.isTheater,
          isLiterature: user.isLiterature,
          isDancer: user.isDancer,
          isEFASCoordinator: user.isEFASCoordinator,
          isCONCAFRASCoordinator: user.isCONCAFRASCoordinator,
          isVisualArt: user.isVisualArt,
          isActive: user.isActive,
          instruments: user.instruments,
          image: user.image || "",
        })
        .then(() => {
          log.info(`User inserted with uid ${uid} success!`);
          response.status(201).json({
            message: "Created with success a new user",
          });
        })
        .catch((error: any) => {
          log.error(`Error on inserted user with uid ${uid}`);
          response.status(400).json({
            message: error,
          });
        });
    })
    .catch((error: any) => {
      log.error(`Error on created a user, ${error.code}.`);
      response.status(400).json({
        message: error.code,
      });
    });
});

usersRoutes.get("/:uid", (request: Request, response: Response) => {
  let uid = request.params.uid;

  app
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        response.status(200).json(doc.data());
      }
    });
});

export { usersRoutes };
