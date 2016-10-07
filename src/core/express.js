

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/logs";
import mainRoutes from "../routes/main";
import zouti from "zouti";


const APP_PORT = 8080;


let oApp;

export default function( iAppPort = APP_PORT ) {

    if ( oApp ) {
        return oApp;
    }

    oApp = express();
    oApp.use( simpleLog );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( {
        "extended": true,
    } ) );

    oApp.use( mainRoutes );

    oApp.listen( iAppPort, () => {
        zouti.log( `Server is listening  on port ${ iAppPort }`, "Dylan/prevkonsep" );
    } );
}
