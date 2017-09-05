// ROUTE: --> /api
const router = require( 'express' )
    .Router();
const db = require( '../modules/dbQuery' );

router.get( '/', ( req, res ) => {
    console.log( 'API: ', 'method: GET ', '/api/' );
    res.json( {
        message: 'test'
    } );
} );

// REGISTER
router.post( '/register', ( req, res ) => {
    console.log( 'API: ', 'method: POST ', '/api/register' );

    const firstName = req.body.firstName.toLowerCase();
    const lastName = req.body.lastName.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();

    if ( firstName && lastName && email && password ) {

        return db.createUser( firstName, lastName, email, password )

            .then( ( resp ) => {
                if ( resp ) {
                    // set the session to be true
                    req.session.user = true;

                    res.json( {
                        success: true,
                        userData: resp
                    } );
                } else {
                    res.json( { error: true } );
                }
            } )

            .catch( ( err ) => {
                console.log( err.stack );
            } );
    } else {
        res.json( { error: true } );
    }
} );


// LOGIN
router.post( '/login', ( req, res ) => {
    console.log( 'API: ', 'method: POST ', '/api/login' );

    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();

    if ( email && password ) {
        return db.checkUser( email, password )
            .then( ( resp ) => {
                if ( resp ) {
                    // set the session to be true
                    req.session.user = true;

                    res.json( {
                        success: true,
                        userData: resp
                    } );
                } else {
                    res.json( { error: true } );
                }
            } )

            .catch( ( err ) => {
                console.log( err.stack );
            } );
    } else {
        res.json( { error: true } );
    }
} );


/* MODULE EXPORTS */
module.exports = router;
