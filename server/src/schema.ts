import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
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
  }

  type Query {
    users: [User!]!
    user(id: String!): User!
    posts: [Post!]!
    post(id: String!): Post!
  }
`;
