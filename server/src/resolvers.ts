import { commentPost } from "./mutations/comment-post.js";
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
    postComments: async (_, { postId }, { dataSources }) =>
      await dataSources.db.comment.findMany({
        where: {
          postId,
        },
        include: { user: true, post: { include: { author: true } } },
      }),
    centersOfInterest: (_, __, { dataSources }) =>
      dataSources.db.centerOfInterest.findMany(),
    centersOfInterestOfUser: async (_, { userId }, { dataSources }) => {
      const userInterests = await dataSources.db.userInterest.findMany({
        where: { userId },
        include: { centerOfInterest: true },
      });

      return userInterests.map(
        (ui: { centerOfInterest: any }) => ui.centerOfInterest
      );
    },
  },
  Mutation: {
    createUser,
    login,
    createPost,
    commentPost,
    createCenterOfInterest: async (_, data, { dataSources }) => {
      return await dataSources.db.centerOfInterest.create({
        data,
      });
    },
    setCentersOfInterest: async (
      _,
      { userId, centerOfInterestIds },
      { dataSources }
    ) => {
      // Supprime les centres d'intérêts existants pour l'utilisateur
      await dataSources.db.userInterest.deleteMany({
        where: { userId },
      });

      // Ajoute les nouveaux centres d'intérêts
      return await Promise.all(
        centerOfInterestIds.map((centerOfInterestId) =>
          dataSources.db.userInterest.create({
            data: {
              userId,
              centerOfInterestId,
            },
          })
        )
      );
    },
  },
};
