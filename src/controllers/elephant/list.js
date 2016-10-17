import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {

    db.collection( "elephants" )
    .find( {} )
      .toArray()
      .then( ( aElephant = [ ] ) => {
          oResponse.json( aElephant );
      } )
      .catch( ( oError ) => {
          oResponse.status( 500 ).json( {
              "errors": [ oError.toString() ],
          } );
      } );
}
