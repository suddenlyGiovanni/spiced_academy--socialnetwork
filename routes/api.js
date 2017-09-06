// ROUTE: --> /api
const router = require( 'express' ).Router();
const db = require( '../modules/dbQuery' );



router.get( '/', ( req, res ) => {
    console.log( 'API: ', 'method: GET ', '/api/' );
    res.json( { message: 'api route working fine' } );
} );


// REGISTER USER
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
                    req.session.user = {
                        uid: resp.uid,
                        firstName: resp.firstName,
                        lastName: resp.lastName,
                        email: resp.email
                    };
                    // log user session
                    console.log( 'succesfuly set thye session', req.session.user );

                    res.json( { success: true } );

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


// LOGIN USER
router.post( '/login', ( req, res ) => {
    console.log( 'API: ', 'method: POST ', '/api/login' );

    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();

    if ( email && password ) {

        return db.checkUser( email, password )

            .then( ( resp ) => {

                if ( resp ) {
                    // set the session to be true
                    req.session.user = {
                        uid: resp.uid,
                        firstName: resp.firstName,
                        lastName: resp.lastName,
                        email: resp.email
                    };

                    res.json( { success: true } );

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


// GET USER DATA
router.get( '/getUserInfo', ( req, res ) => {
    console.log( 'API: ', 'method: GET ', `/api/getUserInfo/${req.session.user.uid}` );

    if ( req.session.user ) {
        return db.getUserInfo( req.session.user.uid )

            .then( ( resp ) => {

                return res.json( resp );
            } )

            .catch( ( err ) => {
                console.error( err.stack );
            } );

    }
} );




/* MODULE EXPORTS */
module.exports = router;
