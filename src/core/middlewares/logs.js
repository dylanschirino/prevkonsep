export default function( { method, url }, oResponse, fNext ) {
    console.log( `${ method } ${ url }` ); // eslint-disable-line no-console
    fNext();
}
