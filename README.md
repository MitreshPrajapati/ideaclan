# Social Media API

The Social Media API is a GraphQL-based backend service that simulates basic functionalities of a social media platform. It allows users to register, log in, post content

## Overview

## FEATURES

- User registration and authentication (login)
- User can post content as a Post
- Retrieving Posts
- GraphQL Integrated

# To use this in your local system

## REQUIREMENTS

- Node.js
- npm or yarn package manager
- MongoDB database

### Installation Steps:

1. Clone the repository using
   `git clone https://github.com/MitreshPrajapati/ideaclan`

2. Navigate to the project directory by running `cd ideaclan` command on terminal.

3. Install the dependencies of the application by running `npm install` or `yarn install`.

4. Create `.env` file at the root of the project folder and add following environment variables

- JWT_SECRET = 'YOUR_SECRETKEY'
- MONGODB_URL = 'mongodb-url' or 'mongodb://localhost:27017/IdeaClan'

5. Access the GraphQL Playground at http://localhost:8080/graphql in your web browser.
6. Use the provided queries and mutations to interact with the API.

### Queries and Mutations

- Register a User:

```javascript

mutation registration($registerInput: RegisterInput){
 register(registerInput : $registerInput) {
   name
   email
   password
   followers
 }
}

Variables:
{
  "registerInput":{
    "name":"User4",
    "email":"user4@gmail.com",
    "password":"1234"
  }
}
```

- Login a user:

```javascript

mutation loginUser($loginInput: LoginInput){
  login(loginInput: $loginInput)
}

Variables:
{
  "loginInput":{
    "email": "user1@gmail.com",
    "password": "1234"
   }
}
```

- Create a Post:

```javascript

mutation loginUser($postInput: PostInput){
  createPost(postInput: $postInput){
    content
  }
}

Variables:
{
   "postInput":{
     "userId": "65f68f6a5bbe32d67e4984fe",
     "content":"Post 2 by User2",
    }
}

Headers:
  Authorization = token
```

- Retrieve User's Posts:

```javascript
    query getPosts ($userId: ID!){
    posts(userId: $userId) {
        content
        createdAt
        userId
    }
    }
 Variables:
 {
  "userId":"65f68f6a5bbe32d67e4984fe"
 }

 Headers:
 Authorization = token
```

# Dependencies
- Node.js
- Express.js
- Graphql
- apollo-server-express
- MongoDb
- bcrypt
- jsonwebtoken
- mongoose
