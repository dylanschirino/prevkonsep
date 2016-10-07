

import initServer from "./core/express";

import initDB from "./core/mongodb";

import zouti from "zouti";

zouti.spacer( 2 ); // pour avoir 2 ligne vide

zouti.log( "Starting...", "Dylan/prevkonsep" ); // pour afficher un message

initDB()
    .then( () => {
        initServer( 12345 );
    } )
    .catch( ( oError ) => {
        zouti.error( oError, "Dylan/prevkonsep" );
    } );
