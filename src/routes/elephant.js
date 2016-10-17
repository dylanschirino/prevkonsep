import { Router } from "express";

let oRouter = new Router();

import list from "../controllers/elephant/list";
import add from "../controllers/elephant/add";
import update from "../controllers/elephant/update";
import destroy from "../controllers/elephant/destroy";
import details from "../controllers/elephant/details";


oRouter.get( "/elephants", list );

oRouter.get( "/elephants/:slug", details );

oRouter.post( "/elephants", add );

oRouter.put( "/elephants/:slug", update );

oRouter.delete( "/elephants/:slug", destroy );


export default oRouter;
