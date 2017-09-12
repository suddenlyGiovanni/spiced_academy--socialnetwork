// dbQuery.js

// REQUIRED MODULES_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
const spicedPg = require( 'spiced-pg' );
const db = spicedPg( process.env.DATABASE_URL || require( '../config/secrets.json' )
    .psqlConfig );
const {
    hashPassword,
    checkPassword
} = require( './hasher' );

const s3Url = require( '../config/secrets.json' ).s3Url;




// CREATE NEW USER
module.exports.createUser = ( firstName, lastName, email, password ) => {
    console.log( 'dbQuery.js - fn: "postUser"' );
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
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




// AUTHENTICATE USER
module.exports.checkUser = ( email, password ) => {

    console.log( 'dbQuery.js - fn: "checkUser"' );

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
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




// GET LOGGED IN USER DATA
module.exports.getUserInfo = ( uid ) => {
    console.log( 'dbQuery.js - fn: "getUserData"' );

    const query = `SELECT   uid,
                            "firstName",
                            "lastName",
                            email,
                            bio,
                            "profilePic"
                    FROM users
                    WHERE uid = $1;`;

    return db.query( query, [ uid ] )

        .then( ( results ) => {
            if ( !results.rows[ 0 ].profilePic ) {
                const defProfilePic =
                    `def_profilePic_${(Math.floor(Math.random()*(12-1+1)+1))}.svg`;
                results.rows[ 0 ].profilePic = s3Url + 'def_profilePic/' + defProfilePic;
            } else {
                results.rows[ 0 ].profilePic = s3Url + results.rows[ 0 ].profilePic;
            }
            return results.rows[ 0 ];
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




// GET OTHER USER'S DATA
module.exports.getOtherUserInfo = ( uid ) => {
    console.log( 'dbQuery.js - fn: "getOtherUserInfo"' );
    const query = `SELECT   uid,
                            "firstName",
                            "lastName",
                            email,
                            bio,
                            "profilePic"
                    FROM users
                    WHERE uid = $1;`;
    return db.query( query, [ uid ] )

        .then( ( results ) => {
            if ( !results.rows[ 0 ].profilePic ) {
                const defProfilePic =
                    `def_profilePic_${(Math.floor(Math.random()*(12-1+1)+1))}.svg`;
                results.rows[ 0 ].profilePic = s3Url + 'def_profilePic/' + defProfilePic;
            } else {
                results.rows[ 0 ].profilePic = s3Url + results.rows[ 0 ].profilePic;
            }
            return results.rows[ 0 ];
        } )


        .catch( ( err ) => {
            console.error( err.stack );
        } );
};
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




// SET USER PROFILE PICTURE PROFILE
module.exports.saveUserProfilePic = ( uid, profilePic ) => {
    console.log( 'dbQuery.js - fn: "saveUserProfilePic"' );

    const query = `UPDATE users SET "profilePic" = $2
                    WHERE uid = $1
                    RETURNING   uid,
                                "firstName",
                                "lastName",
                                email,
                                bio,
                                "profilePic"`;

    return db.query( query, [ uid, profilePic ] )

        .then( ( resp ) => {
            // console.log( resp.rows[ 0 ] );
            resp.rows[ 0 ].profilePic = s3Url + resp.rows[ 0 ].profilePic;
            return resp.rows[ 0 ];
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




//  SET USER BIO
module.exports.saveUserBio = ( uid, bio ) => {
    console.log( 'dbQuery.js - fn: "saveUserBio"' );

    const query = `UPDATE users SET bio = $2
                    WHERE uid = $1
                    RETURNING   uid,
                                "firstName",
                                "lastName",
                                email,
                                bio,
                                "profilePic";`;
    return db.query( query, [ uid, bio ] )
        .then( ( resp ) => {
            // console.log( resp.rows[ 0 ] );
            resp.rows[ 0 ].profilePic = s3Url + resp.rows[ 0 ].profilePic;
            return resp.rows[ 0 ];
        } )

        .catch( ( err ) => {
            console.error( err.stack );
        } );
};
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




// READ ALL fromUserId FRIENDS
module.exports.readAllFriends = ( fromUserId ) => {
    console.log( `dbQuery.js - fn: "readAllFriends" - params: fromUserId[${fromUserId}]` );

    const query = '';

    return db.query( query, [ fromUserId ] )

        .then( resp => resp.rows[ 0 ] )

        .catch( err => console.error( err.stack ) );
};




// READ FRIENDSHIP STATUS OF fromUserId AND toUserId
module.exports.readFriendshipStatus = ( fromUserId, toUserId ) => {
    console.log( `dbQuery.js - fn: "readFriendshipStatus" - params:
    fromUserId[${fromUserId}] toUserId[${toUserId}]` );

    const query = `SELECT  "fromUserId",
                            status,
                            "toUserId"
                    FROM friendships
                    WHERE ("fromUserId" = $1 AND "toUserId" = $2)
                    OR	("fromUserId" = $2 AND "toUserId" = $1);`;

    return db.query( query, [ fromUserId, toUserId ] )

        .then( ( result ) => {
            console.log( 'dbQuery.js - fn: "readFriendshipStatus" - result', result.rows );
            return result.rows;
        } )

        .catch( err => console.error( err.stack ) );
};




// CREATE FRIENDSHIP between fromUserId AND toUserId
module.exports.createFriendship = ( fromUserId, toUserId ) => {
    console.log( `dbQuery.js - fn: "createFriendship" - params:
    fromUserId[${fromUserId}] toUserId[${toUserId}]` );

    const query = `INSERT INTO friendships
                    ("fromUserId", "toUserId", status)
                    VALUES ($1, $2, 'ACCEPTED')`;

    return db.query( query, [ fromUserId, toUserId ] )

        .then( () => {
            return { success: true };
        } )

        .catch( err => console.error( err.stack ) );
};




// UPDATE FREINDSHIP STATUS between fromUserId AND toUserId
module.exports.updateFriendshipStatus = ( fromUserId, toUserId, status ) => {
    console.log( `dbQuery.js - fn: "updateFriendshipStatus" - params:
    fromUserId[${fromUserId}] toUserId[${toUserId}] status:${status}` );

    const query = ` UPDATE friendships
                    SET "fromUserId" = $1,
                        "toUserId" = $2,
                        status = $3
                    WHERE ("fromUserId" = $1 AND "toUserId" = $2)
                    OR ("fromUserId" = $2 and "toUserId" = $1)
                    RETURNING status;`;


    return db.query( query, [ fromUserId, toUserId, status ] )

        .then( ( result ) => {
            console.log( 'dbQuery.js - fn: "updateFriendshipStatus" - result', result.rows );
            return { success: true };
        } )

        .catch( err => console.error( err.stack ) );
};




// DELETE FREINDSHIP between fromUserId AND toUserId
module.exports.deleteFriendship = ( fromUserId, toUserId, status ) => {
    console.log( `dbQuery.js - fn: "deleteFriendship" - params:
    fromUserId[${fromUserId}] toUserId[${toUserId}] - status ${status}` );

    const newStatus = status === 'TERMINATE' ? 'TERMINATED' : 'CANCELED';

    const query = ` UPDATE friendships
                    SET "fromUserId" = $1,
                        "toUserId" = $2,
                        status = $3
                    WHERE ("fromUserId" = $1 AND "toUserId" = $2)
                    OR ("fromUserId" = $2 and "toUserId" = $1)
                    RETURNING status;`;

    return db.query( query, [ fromUserId, toUserId, newStatus ] )

        .then( result => {
            console.log( 'dbQuery.js - fn: "deleteFriendship" - result', result.rows );
            return { success: true };
        } )

        .catch( err => console.error( err.stack ) );
};







//
