import express from "express";
import { loginControler, registerControler } from "../controler/authControler.js";

const ROUTER = express.Router();

//REGISTER

ROUTER.post('/register', registerControler);

//LOGIN

ROUTER.post("/login", loginControler);

export default ROUTER;
