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
    likePost(id: Int!): Post!
    commentPost(postId: Int!, body: String!): Comment!
    createCenterOfInterest(name: String!): CenterOfInterest!
    setCentersOfInterest(
      userId: Int!
      centerOfInterestIds: [Int!]!
    ): [UserInterest!]!
    login(email: String!, password: String!): LoginResponse!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User!
    posts: [Post!]!
    post(id: Int!): Post!
    userPosts(userId: Int!): [Post!]!
    postComments(postId: Int!): [Comment!]!
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

  type Comment {
    id: Int!
    user: User!
    post: Post!
    body: String!
  }

  type LoginResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
    token: String
  }
`;
