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
    createCenterOfInterest(name: String!): CenterOfInterest!
    setCentersOfInterest(userId: Int!, centerOfInterestIds: [Int!]!): [UserInterest!]!
  }

  type Query {
    users: [User!]!
    user(id: String!): User!
    posts: [Post!]!
    post(id: String!): Post!
    centersOfInterest: [CenterOfInterest!]!
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
`;
