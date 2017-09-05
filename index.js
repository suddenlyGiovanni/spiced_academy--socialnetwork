// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const express = require( 'express' );
const path = require( 'path' );
const morgan = require( 'morgan' );
// const session = require( 'express-session' );
const bodyParser = require( 'body-parser' );


const compression = require( 'compression' );

// EXPRESS
const app = express();

// MIDDLEWARE __________________________________________________________________

// HTTP request logger middleware
app.use( morgan( 'dev' ) );
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

// compression gZip response before sending them
app.use( compression() );
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

// BODY PARSER
app.use( bodyParser.json() );
// app.use( bodyParser.urlencoded( {extended: false} ) );
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


if ( process.env.NODE_ENV != 'production' ) {
    app.use( require( './build' ) );
}

// set the public folder where client stuff lives
// app.use( express.static( './public' ) );
app.use( express.static( path.join( __dirname, '/public' ) ) );



// ROUTING _____________________________________________________________________
//  Connect all our routes to our application
app.use( '/', require( './routes/shell' ) );
app.use( '/api/', require( './routes/api' ) );




// SERVER ______________________________________________________________________
const listener = app.listen( process.env.PORT || 8080, () => {
    console.log( `listening on port ${listener.address().port}.` );
} );
