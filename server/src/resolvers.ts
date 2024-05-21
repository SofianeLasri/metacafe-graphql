import { createUser } from "./mutations/create-user.js";
import { login } from "./mutations/login.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    users: (_, __, { dataSources }) => dataSources.db.user.findMany(),
    posts: (_, __, { dataSources }) => dataSources.db.post.findMany(),
  },
  Mutation: {
    createUser,
    login,
  },
};
