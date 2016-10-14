
import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "cats" )
      .find( {} )
      .toArray()
        .then( ( aCats = [ ] ) => {
            oResponse.json( aCats );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
