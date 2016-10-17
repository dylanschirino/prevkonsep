import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {

    const RELATION = [ "single", "group" ],
        POST = oRequest.body;

    db.collection( "elephants" )
  .findOne( {
      "slug": slugify( oRequest.params.slug ),
  } )
  .then( ( oElephant ) => {
      if ( !oElephant ) {
          return oResponse.sendStatus( 404 );
      }

      let iDefense = +POST.defense,
          sRelation = POST.relation,
          sCountry = ( POST.country || "" ).trim(),
          aModifiedProperties = {};

      if ( !isNaN( iDefense ) ) {
          aModifiedProperties.defense = iDefense;
      }

      if ( RELATION.indexOf( sRelation ) > -1 && sRelation !== oElephant.relation ) {
          aModifiedProperties.relation = sRelation;
      }

      if ( sCountry !== "" && sCountry !== oElephant.country ) {
          aModifiedProperties.country = sCountry;
      }
      if ( Object.keys( aModifiedProperties ).length === 0 ) {
          return oResponse.sendStatus( 204 );
      }

      aModifiedProperties.update = new Date();

      db.collection( "elephants" )
  .updateOne( {

      "_id": oElephant._id,

  },
          {
              "$set": aModifiedProperties,
          } )
  .then( ( { matchedCount, modifiedCount } ) => {
      if ( matchedCount !== 1 || modifiedCount !== 1 ) {
          return oResponse.status( 500 ).json( {
              "errors": [ "Unknow update error" ],
          } );
      }
      oResponse.sendStatus( 204 );
  } )
  .catch( ( oError ) => {
      oResponse.status( 500 ).json( {
          "errors": [ oError.toString() ],
      } );
  } );
  } );
}
