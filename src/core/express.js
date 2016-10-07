

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/logs";


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

    oApp.get( "/", ( oRequest, oResponse ) => {
        oResponse.send( "Hello, HEPL!" );
    } );

    oApp.listen( iAppPort, () => {
        console.log( `Server is listening  on port ${ iAppPort }` ); // eslint-disable-line no-console
    } );
}
