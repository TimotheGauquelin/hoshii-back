import express from "express";

const ROUTER = express.Router();

import { loginControler, registerControler} from '../controler/authControler.js'

//REGISTER

ROUTER.post("/register", registerControler)

//LOGIN

ROUTER.post("/login", loginControler);

export default ROUTER;
