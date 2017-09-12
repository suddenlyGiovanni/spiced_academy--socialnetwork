DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    "firstName" VARCHAR(200) NOT NULL,
    "lastName" VARCHAR (200) NOT NULL,
    "profilePic" VARCHAR(300),
    bio VARCHAR(300),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
    "fId" SERIAL PRIMARY KEY,
    "fromUserId" INTEGER NOT NULL REFERENCES users(uid),
    status VARCHAR (200) NOT NULL,
    "toUserId" INTEGER NOT NULL REFERENCES users(uid)
)
