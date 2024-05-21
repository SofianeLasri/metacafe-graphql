import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    users: (_, __, { dataSources }) => dataSources.db.user.findMany(),
    posts: (_, __, { dataSources }) => dataSources.db.post.findMany(),
  },
  Mutation: {
    createUser: async (_, data, { dataSources }) => {
      const user = await dataSources.db.user.create({
        data,
      });

      return user;
    },
  },
};
