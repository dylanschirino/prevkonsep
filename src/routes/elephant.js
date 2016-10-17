import { Router } from "express";

let oRouter = new Router();

import list from "../controllers/elephant/list";
import add from "../controllers/elephant/add";
import update from "../controllers/elephant/update";


oRouter.get( "/elephants", list );
oRouter.post( "/elephants", add );
oRouter.put( "/elephants/:slug", update );


export default oRouter;
