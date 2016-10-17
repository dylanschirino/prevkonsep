import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";


export default function( oRequest, oResponse ) {

    const GENDERS = [ "male", "female" ],
        POST = oRequest.body;
        
    db.collection( "cats" )
  .findOne( {
      "slug": slugify( oRequest.params.slug ),
  } )
  .then( ( oCat ) => {
      if ( !oCat ) {
          return oResponse.sendStatus( 404 );
      }

      let iAge = +POST.age,
          sGender = POST.gender,
          sColor = ( POST.color || "" ).trim(),
          aModifiedProperties = {};// on va vérifier qu'on a bien des truc a modifier

      if ( !isNaN( iAge ) ) {
          aModifiedProperties.age = iAge;
      }

      if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oCat.gender ) {
          aModifiedProperties.gender = sGender;
      }

      if ( sColor !== "" && sColor !== oCat.color ) {
          aModifiedProperties.color = sColor;
      }

      if ( Object.keys( aModifiedProperties ).length === 0 ) {
          return oResponse.sendStatus( 204 );
      }

      aModifiedProperties.update = new Date();


      db.collection( "cats" )
        .updateOne( {

            "_id": oCat._id,

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
