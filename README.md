# Social Network
Mock social network project for superheros and villans. 
## Context
Social Network was **the third Full Stack Project** that I had to build at **[Spiced Academy]**, a 12 week intensive Full Stack Web Development boot camp in Berlin.
###### Time frame:  _**Three weeks**_
###### New Technologies:  
- React.js
- Redux
- Socket.io

## Summary:
temp.

### Tech Stack:
| **Frontend** | **Backend** | **Database** |
| ------ | ------ | ------ |
**[React.js]** | **[Node.js]** |  **[PostgreSQL]**
**[Redux.js]** | **[Express.js]** | **[AWS S3]**
**[Socket.io - client]** | **[Socket.io - server]**  
## Installation
```bash
$ npm install suddenlyGiovanni/socialnetwork
$ cd socialnetwork/config
$ touch secrets.json
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

### Features: 
- Registration | Authentication | Login
- Users can personalize their page by adding bio and profile picture.
- Users can see who is online.
- Users can use the group chat feature to chat with everyone that is online.
- Users can use the private chat to talk to individual online and offline users.
- Users can see a list of friends as well as make, cancel, end, and receive friend requests.

### Todos of additional features:
 - User Search
 - Wall Posts
 - Friend Request Notifications
 - Friends on Profile Pages
 - Reduxyfication of all the application.

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
