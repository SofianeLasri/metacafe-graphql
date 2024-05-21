import { createPost } from "./mutations/create-post.js";
import { createUser } from "./mutations/create-user.js";
import { login } from "./mutations/login.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    users: async (_, __, { dataSources }) =>
      await dataSources.db.user.findMany(),
    posts: async (_, __, { dataSources }) =>
      await dataSources.db.post.findMany({
        include: { author: true },
      }),
    user: async (_, { id }, { dataSources }) =>
      await dataSources.db.user.findUnique({ where: { id } }),
    post: async (_, { id }, { dataSources }) =>
      await dataSources.db.post.findUnique({ where: { id } }),
    userPosts: async (_, { userId }, { dataSources }) =>
      await dataSources.db.post.findMany({
        where: {
          authorId: userId,
        },
      }),
  },
  Mutation: {
    createUser,
    login,
    createPost,
  },
};
