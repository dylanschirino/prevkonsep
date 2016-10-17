import { db } from "../../core/mongodb";

import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {

    db.collection( "elephants" )
  .findOne( {
      "slug": slugify( oRequest.params.slug ),
  } )
  .then( ( oElephant ) => {
      if ( !oElephant ) {
          return oResponse.sendStatus( 404 );
      }
      db.collection( "elephants" )
      .deleteOne( {
          "_id": oElephant._id,
      } )
      .then( ( { deletedCount } ) => {
          if ( deletedCount === 1 ) {
              return oResponse.sendStatus( 204 );
          }

          return oResponse.status( 500 ).json( {
              "errors": [ "Unknow deletion error" ],
          } );
      } )
      .catch( ( oError ) => {
          oResponse.status( 500 ).json( {
              "errors": [ oError ],
          } );
      } );

  } )
      .catch( ( oError ) => {
          oResponse.status( 500 ).json( {
              "errors": [ oError ],
          } );
      } );

}
