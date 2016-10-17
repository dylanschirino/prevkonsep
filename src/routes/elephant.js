import { Router } from "express";

let oRouter = new Router();

import list from "../controllers/elephant/list";


oRouter.get( "/elephants", list );


export default oRouter;
