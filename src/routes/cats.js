
import { Router } from "express";

let oRouter = new Router();
import list from "../controllers/cats/list";

 oRouter.get( "/cats", list );

// oRouter.get( "/cats/:name", details );

// oRouter.post( "/cats", add );

// oRouter.put( "/cats/:name", update );

// oRouter.delete( "/cats/:name", destroy );

export default oRouter;
