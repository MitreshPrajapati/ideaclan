const { gql } = require('apollo-server-express')
module.exports = gql`
    type User{
            # username: String!
            name: String!
            email: String!
            password: String!
            followers: [String]
            following: [String]
        }

        type Post {
            id: ID!
            userId: ID!
            content: String!
            createdAt: String!
        }

        input RegisterInput {
            # username: String!
            name: String!
            email: String!
            password: String!
            followers: [String!]
            following: [String!]
        }
        input LoginInput {
            email: String!
            password: String!
        }

        input PostInput {
            userId: ID
            content: String!
            createdAt: String
        }

        type Query {
            users: [User]
            posts(userId: ID!): [Post]
        }

        type Mutation {
            register(registerInput: RegisterInput): User
            login(loginInput: LoginInput): String
            createPost(postInput: PostInput): Post
            follow(userId: ID!): User
            unFollow(userId: ID!): User
        }

`