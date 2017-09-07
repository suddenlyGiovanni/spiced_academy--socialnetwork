// ROUTE: --> /api
const router = require( 'express' ).Router(),
    db = require( '../modules/dbQuery' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    multer = require( 'multer' ),
    uidSafe = require( 'uid-safe' ),
    knox = require( 'knox' );


//_ MUTER & UIDSAFE_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const diskStorage = multer.diskStorage( {
    // path.resolve;
    destination: ( req, file, callback ) => {
        callback( null, `${ path.dirname( __dirname ) }/uploads` );
    },


    filename: ( req, file, callback ) => {
        uidSafe( 24 )
            .then( ( uid ) => {
                callback( null, uid + path.extname( file.originalname ) );
            } );
    }
} );

const uploader = multer( {
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
} );

//_ KNOX_ _ _ _ _ __ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
let secrets;
if ( process.env.NODE_ENV == 'production' ) {
    secrets = process.env;
    // in prod the secrets are environment variables
} else {
    secrets = require( '../config/secrets.json' );
    // secrets.json is in .gitignore
}

const client = knox.createClient( {
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'spicedsocialnetwork'
} );

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

// ROOT OF THE API
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


// SET USER PROFILE PICTURE PROFILE
router.post( '/user/:uid/profile_pic', uploader.single( 'file' ), ( req, res ) => {
    console.log( 'API: ', 'method: POST ', `/api/user/${req.session.user.uid}/profile_pic` );
    console.log( req.file );

    if ( req.file ) {
        /*
            You can call the put method of the client you've created to create a request
            object using the data in the file object that multer added to the req.
                *   The first argument to put is the name you want the file to have in
                    the bucket
                *   The second argument is an object with additional parameters.
                    The Content-Type and Content-Length parameters are the headers you
                    want S3 to use when it serves the file. The x-amz-acl parameter
                    tells S3 to serve the file to anybody who requests it
                    (the default is for files to be private)
        */
        const s3Request = client.put( req.file.filename, {
            'Content-Type': req.file.size,
            'Content-Length': req.file.size,
            'x-amz-acl': 'public-read'
        } );
        /*  You can now create a read stream out of the file and pipe it to the
            request you've created.
        */
        const readStream = fs.createReadStream( req.file.path );

        readStream.pipe( s3Request );

        s3Request.on( 'response', ( s3Response ) => {

            const wasSuccessful = s3Response.statusCode == 200;

            if ( wasSuccessful ) {

                const profilePic = req.file.filename;
                const uid = req.session.user.uid;

                return db.saveUserProfilePic( uid, profilePic )

                    .then( ( userData ) => {
                        res.json( {
                            success: wasSuccessful,
                            userData: userData
                        } );
                        // remove image from server/uploads
                        fs.unlink( req.file.path, () => {} );
                    } );
            }
        } );
    } else {
        res.json( {
            success: false
        } );
    }

} );


/* MODULE EXPORTS */
module.exports = router;
