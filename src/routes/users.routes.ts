import { Router, Request, Response } from "express";
import app from "../services/firebase.service";
import { log } from "../services/log.service";
import { User } from "../model/User";

const usersRoutes = Router();

usersRoutes.post("/", async (request: Request, response: Response) => {
  const user = request.body as User;

  log.info("Creating a new user");
  await app
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then( async (authResponse: any) => {
      let uid = authResponse.user.uid;

      await app.firestore().collection('users').doc(uid).set({
        name: user.name,
        birthday: user.birthday,
        country: user.country,
        state: user.state,
        city: user.city,
        role: user.role,
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
        instruments: user.instruments
      })
      response.status(201).json({
        message: "Created with success a new user",
      });
    })
    .catch((error: any) => {
      log.error(`Error on created a user, ${error.code}.`);
      response.status(400).json({
        message: error.code,
      });
    });
});

export { usersRoutes };
