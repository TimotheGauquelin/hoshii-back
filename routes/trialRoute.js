import express from "express";
import { getAllTrialsDoneByAGroupControler } from "../controler/trialControler.js";

const ROUTER = express.Router();

//Retrieve all trials done by a group

ROUTER.get('/getAllTrialsDoneByAGroup/:id', getAllTrialsDoneByAGroupControler);

export default ROUTER