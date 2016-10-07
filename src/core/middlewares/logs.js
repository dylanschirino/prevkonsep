import zouti from "zouti";

export default function( { method, url }, oResponse, fNext ) {
    zouti.log( `${ method } ${ url }`, "Dylan/prevkonsep" ); // eslint-disable-line no-console
    fNext();
}
