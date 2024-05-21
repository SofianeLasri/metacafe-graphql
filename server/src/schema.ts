import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
    createPost(title: String!, content: String!): Post!
    likePost(id: String!): Post!
    commentPost(id: String!, comment: String!): Post!
    login(email: String!, password: String!): 
  }

  type Query {
    users: [User!]!
    user(id: String!): User!
    posts: [Post!]!
    post(id: String!): Post!
  }

  type LoginResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }
`;
