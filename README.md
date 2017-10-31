# Social Network
Mock social network for superheroes and villains.

### Table of contents
* [Context](#context)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Features](#features)
* [Todos](#todos-of-additional-features)
* [Contact && License](#contact)


## Context
Between July and October 2017, I attend **[SPICED Academy]**, an intensive 12-week coding program focused on Full Stack JavaScript Web Development in Berlin.
During this program, I built a portfolio of web applications.
1. **[Reichstag]** - a static landing page
2. **[Kitty Carousel]** - a carousel/slideshow element that displays kitties picture
3. **[Resizable Panes]** - an element to display before and after photos
4. **[Incremental Search]** - search field that allows users to select matching results
5. **[Connect Four]** - the vertical checkers game
6. **[Spotify API Search]**
7. **[Github API Search]**
8. **[Ticker Twitter API]** - a sliding twitter news feed element
9. **[Petition]** - A server-side render app for collecting signatures for a pledge.
10. **[Imageboard]** - An app that allows users to upload images, comment, and like images.
11. **[Social Network]** - Mock social network project for superheroes and villains.
12. Final Project - one-week coding challenge - **[P2P Chat]**

**Social Network** was my last big full stack project before the graduation coding challenge. This project taught me how to build single page applications with React, Redux and Socket.Io.
###### Time frame:  _**Three weeks**_
###### New Technologies:  
- React.js
- Redux
- Socket.io

## Tech Stack:
| **Frontend** | **Backend** | **Database** |
| ------ | ------ | ------ |
**[React.js]** | **[Node.js]** |  **[PostgreSQL]**
**[Redux.js]** | **[Express.js]** | **[AWS S3]**
**[Socket.io - client]** | **[Socket.io - server]**  


## Installation
```bash
$ git clone https://github.com/suddenlyGiovanni/socialnetwork.git
$ cd socialnetwork
$ npm install
$ cd config && touch secrets.json
```
##### Secret.json
Paste in the following code and remember to configure it accordingly... 
```javascript
{
    "psqlConfig": "postgres:postgres:postgres@localhost:5432/socialnetwork",
    "sessionSecret": "this is a secret!!",
    "bcryptSalt": "this is a secret!!",
    "AWS_KEY": "XXXXXXX",
    "AWS_SECRET": "XXXXXXX/XXXXXXX/",
    "AWS_BUCKET": "socialnetwork",
    "s3Url": "https://s3.amazonaws.com/XXXXXXX/"
}
```
##### Map of client-side compoinents:
![social_network_structure]

## Features: 
> As a user, I can **register and login**. If I am already login, I can skip this step.

The user can create or submit its credentials: Passwords are hashed using the bcrypt library.
Forms include CSRF protection using the csurf npm package.

> As a user, I can **personalize my page** by adding a bio and profile picture.
> I can also update this information whenever I want. 

> As a user, I can **see who is online** now.

> As a user, I can **see a list of all of my friends**. I can also **manage friendship status**: 
> I can send a friendship request,
> I can cancel ann erroneous friendship request,
> I can accept friends requests,
> I can terminate friendships, 

> As a user, I can **use the group chat** feature to chat with everyone that is online.

>As a user, I can **use the private chat** to talk to other friends that can be **either online or offline**.
## Todos of additional features:
 - [ ] User Search
 - [ ] Wall Posts
 - [ ] Friend Request Notifications
 - [ ] Friends on Profile Pages
 - [ ] Reduxyfication of all the application.

## Contact
* e-mail: ravalico.giovanni@gmail.com
* Twitter: [@superspacezova](https://twitter.com/superspacezova "twitterhandle on twitter")
* LinkdeIn: [/giovanni-ravalico]
License
----
MIT © [suddenlyGiovanni] 
**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Spiced Academy]: <https://www.spiced-academy.com/>
   [suddenlyGiovanni]: <https://github.com/suddenlyGiovanni/>
   [/giovanni-ravalico]: <https://www.linkedin.com/in/giovanni-ravalico/>
   [@superspacezova]: <https://twitter.com/superspacezova>
   [React.js]: <https://reactjs.org/docs/installation.html>
   [Node.js]: <https://nodejs.org/dist/latest-v8.x/docs/api/>
   [PostgreSQL]: <https://www.postgresql.org/docs/10/static/index.html>
   [Redux.js]: <http://redux.js.org/>
   [Express.js]: <http://expressjs.com/en/4x/api.html>
   [AWS S3]: <https://aws.amazon.com/documentation/s3/>
   [Socket.io - client]: <https://socket.io/docs/server-api/>
   [Socket.io - server]: <https://socket.io/docs/server-api/>
   [Reichstag]: <https://github.com/suddenlyGiovanni/reichstag>
   [Kitty Carousel]: <https://github.com/suddenlyGiovanni/kitty_carousel>
   [Resizable Panes]: <https://github.com/suddenlyGiovanni/resizable_panes>
   [Incremental Search]: <https://github.com/suddenlyGiovanni/incremental_search>
   [Connect Four]: <https://github.com/suddenlyGiovanni/connect_four>
   [Spotify API Search]: <https://github.com/suddenlyGiovanni/spotify_api_search>
   [Github API Search]: <https://github.com/suddenlyGiovanni/github_api_search>
   [Ticker Twitter API]: <https://github.com/suddenlyGiovanni/ticker_twitter_api>
   [Petition]: <https://github.com/suddenlyGiovanni/petition>
   [Imageboard]: <https://github.com/suddenlyGiovanni/imageboard>
   [Social Network]: <https://github.com/suddenlyGiovanni/socialnetwork>
   [P2P Chat]: <https://github.com/suddenlyGiovanni/p2p-chat>
   
   [social_network_structure]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/social_network_structure.png>
   
