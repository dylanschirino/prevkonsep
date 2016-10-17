
import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {

    db.collection( "elephants" )
    .findOne( {
        "slug": slugify( oRequest.params.slug ),
    } )
    .then( ( oElephant ) => {
        if ( oElephant ) {
            return oResponse.json( oElephant );
        }

        oResponse.sendStatus( 404 );
    } )
    .catch( ( oError ) => {
        oResponse.status( 500 ).json( {
            "errors": [ oError ],
        } );
    } );
}
