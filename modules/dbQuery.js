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
            }
            //
            else {
                results.rows[ 0 ].profilePic = s3Url + results.rows[ 0 ].profilePic;
            }
            //
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
            }
            //
            else {
                results.rows[ 0 ].profilePic = s3Url + results.rows[ 0 ].profilePic;
            }
            //
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




// READ ALL USERS FROM THIS ARRYS OF IDs
module.exports.readAllUsersByIds = ( arrayOfIds ) => {
    console.log( 'dbQuery.js - fn: "readAllUsersByIds"' );
    const query =   `SELECT uid,
                            "firstName",
                            "lastName"
                    FROM users
                    WHERE uid = ANY($1)`;
    return db.query( query, [ arrayOfIds ] )
        .then( results => {
            console.log( results.rows );
            return results.rows;
        } )

        .catch( err => console.log( err ) );
};
//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _




// READ ALL fromUserId FRIENDS
module.exports.readAllFriends = ( fromUserId ) => {
    // console.log( 'dbQuery.js - fn: "readAllFriends"' );
    const query = `SELECT   users.uid,
                            users."firstName",
                            users."lastName",
                            users."profilePic",
                            users.bio,
                            friendships.status
                    FROM friendships
                    INNER JOIN users
                    ON (friendships.status = 'PENDING' AND "toUserId" = $1 AND "fromUserId" = users.uid)
                    OR (friendships.status = 'ACCEPTED' AND "fromUserId" = $1 AND "toUserId" = users.uid)
                    OR (friendships.status = 'ACCEPTED' AND "toUserId" = $1 AND "fromUserId" = users.uid)
                    OR (friendships.status = 'TERMINATED' AND "fromUserId" = $1 AND "toUserId" = users.uid)
                    OR (friendships.status = 'TERMINATED' AND "toUserId" = $1 AND "fromUserId" = users.uid);`;

    return db.query( query, [ fromUserId ] )

        .then( friends => {
            console.log( 'dbQuery.js - fn: "readAllFriends"', friends.rows );

            var s3mappedFriends = friends.rows.map( friend => {
                if ( !friend.profilePic ) {
                    const defProfilePic =
                        `def_profilePic_${(Math.floor(Math.random()*(12-1+1)+1))}.svg`;
                    friend.profilePic = s3Url + 'def_profilePic/' + defProfilePic;
                } else {
                    friend.profilePic = s3Url + friend.profilePic;
                }
                return friend;
            } );
            return { friends: s3mappedFriends };
        } )

        .catch( err => console.error( err.stack ) );
};




// READ FRIENDSHIP STATUS OF fromUserId AND toUserId
const readFriendshipStatus = ( fromUserId, toUserId ) => {
    console.log( 'dbQuery.js - fn: "readFriendshipStatus"' );

    const query = `SELECT  "fId",
                            "fromUserId",
                            status,
                            "toUserId"
                    FROM friendships
                    WHERE ("fromUserId" = $1 AND "toUserId" = $2)
                    OR	("fromUserId" = $2 AND "toUserId" = $1);`;

    return db.query( query, [ fromUserId, toUserId ] )

        .then( ( result ) => {
            console.log( 'dbQuery.js - fn: "readFriendshipStatus" - result', result.rows );

            if ( result.rows.length == 0 ) {
                return;
            } else if ( result.rows.length > 1 ) {
                const fId = result.rows[ ( result.rows.length - 1 ) ].fId;
                const query = `DELETE FROM friendships
                                WHERE "fId" = $1`;
                return db.query( query, [ fId ] )

                    .then( () => readFriendshipStatus( fromUserId, toUserId ) )

                    .catch( err => console.error( err.stack ) );
            } else {
                return result.rows[ 0 ];
            }
        } )

        .catch( err => console.error( err.stack ) );
};
module.exports.readFriendshipStatus = readFriendshipStatus;



// CREATE FRIENDSHIP between fromUserId AND toUserId
module.exports.createFriendshipReq = ( fromUserId, toUserId, status ) => {
    console.log( 'dbQuery.js - fn: "createFriendship"' );

    const query = `INSERT INTO friendships
                    ("fromUserId", "toUserId", status)
                    VALUES ($1, $2, $3)
                    RETURNING "fId", "fromUserId", status, "toUserId";`;

    return db.query( query, [ fromUserId, toUserId, status ] )

        .then( result => Object.assign( result.rows[ 0 ], { success: true } ) )

        .catch( err => console.error( err.stack ) );
};




// UPDATE FREINDSHIP STATUS between fromUserId AND toUserId
module.exports.updateFriendshipStatus = ( fromUserId, toUserId, status ) => {
    console.log( 'dbQuery.js - fn: "updateFriendshipStatus"' );

    const query = ` UPDATE friendships
                    SET "fromUserId" = $1,
                        "toUserId" = $2,
                        status = $3
                    WHERE ("fromUserId" = $1 AND "toUserId" = $2)
                    OR ("fromUserId" = $2 and "toUserId" = $1)
                    RETURNING "fId", "fromUserId", status, "toUserId";`;


    return db.query( query, [ fromUserId, toUserId, status ] )

        .then( result => Object.assign( result.rows[ 0 ], { success: true } ) )

        .catch( err => console.error( err.stack ) );
};




// DELETE FREINDSHIP between fromUserId AND toUserId
module.exports.deleteFriendship = ( fromUserId, toUserId ) => {
    console.log( 'dbQuery.js - fn: "deleteFriendship"' );

    const query = '';

    return db.query( query, [ fromUserId, toUserId ] )

        .then( result => Object.assign( result.rows[ 0 ], { success: true } ) )

        .catch( err => console.error( err.stack ) );
};
