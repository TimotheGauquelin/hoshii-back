import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import trialRoute from "./routes/trialRoute.js";

const APP = express();

APP.use(cors());
APP.use(express.json());

APP.use("/api/auth", authRoute);
APP.use("/api/trials", trialRoute);

APP.get("/", (req, res) => {
  res.json(
    "Bienvenue sur l'API d'HOSHII"
  )
})

APP.listen(process.env.PORT || 5000, () => {
  console.log(
    `L'API du projet Hoshii tourne sur le port ${process.env.PORT || 5000}`
  );
});