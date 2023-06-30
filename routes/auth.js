import express from "express";

const router = express.Router();

import { loginControler, registerControler} from '../controler/authControler.js'

//REGISTER

router.post("/register", registerControler)

//LOGIN

router.post("/login", loginControler);

export default router;
