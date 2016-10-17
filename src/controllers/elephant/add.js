
import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const RELATION = [ "single", "group" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;
    // On définit les propriété de l'éléphant

    let sName = ( POST.name || " " ).trim(),
        iDefense = +POST.defense,
        sRelation = POST.relation,
        sCountry = ( POST.country || "" ).trim(),
        aErrors = [],
        sSlug,
        oElephant;

    // On checke les erreurs ici
    if ( !sName ) {
        aErrors.push( "Name can't be empty" );
    }
    if ( isNaN( iDefense ) ) {
        aErrors.push( "Defense enter isn't a Number !" );
    }
    if ( RELATION.indexOf( sRelation ) === -1 ) {
        aErrors.push( `invalid gender: must be "single" or "group"!` );
    }
    if ( !sCountry ) {
        aErrors.push( "Country can't be empty" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    // On slugify le nom de l'éléphant
    sSlug = slugify( sName );

    db.collection( "elephants" )
    .findOne( {
        "name": sName,
    } )
    .then( ( oElephantFromDB ) => {
        if ( oElephantFromDB ) {
            return oResponse.status( 409 ).json( {
                "errors": [ `A elephant with the name "${ sName }" already exist` ],
            } );
        }

        oElephant = {
            "slug": sSlug,
            "name": sName,
            "defense": Math.abs( iDefense ),
            "relation": sRelation,
            "country": sCountry,
            "create": new Date(),
            "update": new Date(),
        };

        db.collection( "elephants" ).insertOne( oElephant )
    .then( () => {
        oResponse.status( 201 ).json( oElephant );
    } )
    .catch( ( oError ) => {
        oResponse.status( 500 ).json( {
            "errors": [ oError.toString() ],
        } );
    } );

    } );
}
