import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    friends: [User!]!
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
    likePost(postId: Int!): LikeResponse!
    commentPost(postId: Int!, body: String!): Comment!
    createCenterOfInterest(name: String!): CenterOfInterest!
    setCentersOfInterest(
      userId: Int!
      centerOfInterestIds: [Int!]!
    ): [UserInterest!]!
    login(email: String!, password: String!): LoginResponse!
    addFriend(userId: Int!, friendId: Int!): User!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User!
    posts: [Post!]!
    post(id: Int!): Post!
    userPosts(userId: Int!): [Post!]!
    postComments(postId: Int!): [Comment!]!
    postLikesCount(postId: Int!): LikesCountResponse!
    currentUserLikedPost(postId: Int!): CurrentUserLikedPostResponse!
    centersOfInterest(name: String): [CenterOfInterest!]!
    centerOfInterest(id: Int!): CenterOfInterest!
    centersOfInterestOfUser(userId: Int!): [CenterOfInterest!]!
    userByEmail(email: String!): User
  }

  type LikesCountResponse {
    count: Int!
  }

  type CurrentUserLikedPostResponse {
    currentUserlikedPost: Boolean!
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

  type LikeResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
`;
