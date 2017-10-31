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
![social_network-register]
![social_network-login]

> As a user, I can **personalize my page** by adding a bio and profile picture.
> I can also update this information whenever I want.

![social_network-profile_pic]
![social_network-profile_edit]

> As a user, I can **see who is online** now.

![social_network-online_users]

> As a user, I can **see a list of all of my friends**. I can also **manage friendship status**: 
> I can send a friendship request,
> I can cancel ann erroneous friendship request,
> I can accept friends requests,
> I can terminate friendships

![social_network-friend_list]

> As a user, I can **use the group chat** feature to chat with everyone that is online.

![social_network-public_chat]

>As a user, I can **use the private chat** to talk to other friends that can be **either online or offline**.

## Todos of additional features:
 - [ ] **User Search:**
> This should be implemented as an incremental search field. Input events should result in ajax requests and the route hit should do database queries with pattern matching to find matches. Note that if the users gives more input before the previous request is complete, you should probably abort it. You probably also should come up with a way to throttle the requests to avoid overloading your server if you have fast typers. It would be real nice if the results did not just show matching users' names but their profile pics as well.
- [x] **Private Messages:**
> Use [socket.io] to allow users to conduct private, one-on-one chats with other users who are their friends (but disallow private chats between two users who are not friends).
 - [ ] **Wall Posts:**
> Allow users to add textual messages to their own and their friends' profile screens. These should be shown in reverse chronological order and should only be visible to friends of the user whose profile the post appears on. Posts should show the author of the post, the time and date it was created, and the text. You can take this even further by allowing users to post images or links. For link posts you could crawl the submitted url to find the page's title and an image to display. Yet another enhancement would be to allow friends to comment on posts.
 - [ ] **Friend Request Notifications:**
> Use socket.io to alert users when they receive a friend request if the request occurs while they are using the site. You could modify the Friends link in your navigation to show in parentheses the number of open requests and increment this number every time a friend request happens. Alternatively, you could make some sort of pop up message appear.
 - [ ] **Friends on Profile Pages:**
> When users view the profile page of a user with whom they are friends, show them a selection of other users that are also friends with the user whose profile is being viewed.
 - [ ] **Extend the use of Redux to all the application:**
> If you do this, you'll have to create a whole bunch of new actions, and your reducer will get a lot bigger. It would be a good time to try [splitting up your reducer logic].

## Contact
* e-mail: ravalico.giovanni@gmail.com
* Twitter: [@superspacezova](https://twitter.com/superspacezova "twitterhandle on twitter")
* LinkdeIn: [/giovanni-ravalico]
License
----
MIT © [suddenlyGiovanni] 
**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[//]: # (Contact references:)
   [Spiced Academy]: <https://www.spiced-academy.com/>
   [suddenlyGiovanni]: <https://github.com/suddenlyGiovanni/>
   [/giovanni-ravalico]: <https://www.linkedin.com/in/giovanni-ravalico/>
   [@superspacezova]: <https://twitter.com/superspacezova>
   
[//]: # (Context references:)
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
 
[//]: # (Tech Stack references:)
   [React.js]: <https://reactjs.org/docs/installation.html>
   [Node.js]: <https://nodejs.org/dist/latest-v8.x/docs/api/>
   [PostgreSQL]: <https://www.postgresql.org/docs/10/static/index.html>
   [Redux.js]: <http://redux.js.org/>
   [Express.js]: <http://expressjs.com/en/4x/api.html>
   [AWS S3]: <https://aws.amazon.com/documentation/s3/>
   [Socket.io - client]: <https://socket.io/docs/server-api/>
   [Socket.io - server]: <https://socket.io/docs/server-api/>
   [splitting up your reducer logic]: <http://redux.js.org/docs/recipes/reducers/SplittingReducerLogic.html>

[//]: # (Picture references:)
   [social_network_structure]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network_structure.png>
   [social_network-register]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-register.png>
   [social_network-login]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-login.png>
   [social_network-profile_pic]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-profile_pic.png>
   [social_network-profile_edit]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-profile_edit.png>
   [social_network-online_users]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-online_users.png>
   [social_network-friend_list]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-friend_list.png>
   [social_network-public_chat]: <https://github.com/suddenlyGiovanni/socialnetwork/blob/master/readme/social_network-public_chat.png>
