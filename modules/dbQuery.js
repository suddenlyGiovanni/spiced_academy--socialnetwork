// dbQuery.js

// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const spicedPg = require( 'spiced-pg' );
const db = spicedPg( process.env.DATABASE_URL || require( '../config/secrets.json' )
    .psqlConfig );
const {
    hashPassword,
    checkPassword
} = require( './hasher' );



// CREATE NEW USER
module.exports.createUser = ( firstName, lastName, email, password ) => {
    console.log( 'fn: "postUser"' );
    // hash user password with bcrypt ( hashPassword ) before saving
    return hashPassword( password )

        .then( ( hashedPass ) => {

            const query = 'INSERT INTO users ( "firstName", "lastName", email, password) VALUES ($1, $2, $3, $4) RETURNING uid, "firstName", "lastName"';

            return db.query( query, [
                firstName,
                lastName,
                email,
                hashedPass
            ] );
        } )

        .then( ( userData ) => {
            return userData.rows[ 0 ];
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};


// AUTHENTICATE USER
module.exports.checkUser = ( email, password ) => {

    console.log( 'fn: "checkUser"' );

    // step 1 - search on db for matching email.
    return db.query( 'SELECT EXISTS ( SELECT email FROM users WHERE email = $1 )', [ email ] )


        .then( ( checkOut ) => {
            if ( checkOut.rows[ 0 ].exists ) {
                // step 1.5 - retrieve the data but do not send anything back yet.
                const query = `SELECT uid, "firstName", "lastName", email, password
                        FROM users
                        WHERE email = $1;`;
                return db.query( query, [ email ] )

                    .then( ( dbUser ) => {
                        return {
                            uid: dbUser.rows[ 0 ].uid,
                            firstName: dbUser.rows[ 0 ].firstName,
                            lastName: dbUser.rows[ 0 ].lastName,
                            email: dbUser.rows[ 0 ].email,
                            hashedPass: dbUser.rows[ 0 ].password
                        };
                    } )

                    .then( ( dbUser ) => {
                        // step 2 - convert provided password and checkPassword
                        // step 3 - checkPassword returns either true or false.
                        return checkPassword( password, dbUser.hashedPass )
                            .then( ( doesMatch ) => {
                                if ( !doesMatch ) {
                                    throw 'wrong email and password';
                                }
                                return {
                                    uid: dbUser.uid,
                                    firstName: dbUser.firstName,
                                    lastName: dbUser.lastName,
                                };
                            } );
                    } );
            } else {
                // step 1.2 - if there's no matching mail in db then inform the route
                return;
            }
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};

// GET USER DATA
module.exports.getUserInfo = ( uid ) => {
    console.log( 'fn: "getUserData"' );

    const query = `SELECT   uid,
                            "firstName",
                            "lastName",
                            email,
                            "profilePic"
                    FROM users
                    WHERE uid= $1;`;

    return db.query( query, [ uid ] )

        .then( ( results ) => {
            return results.rows[ 0 ];
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};









//
