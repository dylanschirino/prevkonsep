import { Router } from "express";

let oRouter = new Router();

import list from "../controllers/elephant/list";
import add from "../controllers/elephant/add";


oRouter.get( "/elephants", list );
oRouter.post( "/elephants", add );


export default oRouter;
