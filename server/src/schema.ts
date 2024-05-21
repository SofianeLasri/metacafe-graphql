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
    createUser(
      email: String!
      username: String!
      password: String!
    ): LoginResponse!
    createPost(title: String!, content: String!): Post!
    likePost(id: String!): Post!
    commentPost(id: String!, comment: String!): Post!
    createCenterOfInterest(name: String!): CenterOfInterest!
    setCentersOfInterest(userId: Int!, centerOfInterestIds: [Int!]!): [UserInterest!]!
    login(email: String!, password: String!): LoginResponse!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User!
    posts: [Post!]!
    post(id: Int!): Post!
    userPosts(userId: Int!): [Post!]!
    centersOfInterest(name: String): [CenterOfInterest!]!
    centerOfInterest(id: Int!): CenterOfInterest!
    centersOfInterestOfUser(userId: Int!): [CenterOfInterest!]!
  }
  
  type CenterOfInterest {
    id: Int!
    name: String!
  }
  
  type UserInterest {
    id: Int!
    user: User!
    centerOfInterest: CenterOfInterest!
  }

  type LoginResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
    token: String
  }
`;
