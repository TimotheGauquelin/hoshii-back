import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

import authRoute from "./routes/auth.js";
import listRoute from "./routes/list.js";
import userRoute from "./routes/user.js";
import errorHandler from "./error/errorHandler.js"

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("La connexion à la BDD est un succès"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/list", listRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `L'API du projet Hoshii tourne sur le port ${process.env.PORT || 5000}`
  );
});
