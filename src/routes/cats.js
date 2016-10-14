
import { Router } from "express";

let oRouter = new Router();
import list from "../controllers/cats/list";
import add from "../controllers/cats/add";
import details from "../controllers/cats/details";

oRouter.get( "/cats", list );

oRouter.get( "/cats/:slug", details );

oRouter.post( "/cats", add );

// oRouter.put( "/cats/:name", update );

// oRouter.delete( "/cats/:name", destroy );

export default oRouter;
