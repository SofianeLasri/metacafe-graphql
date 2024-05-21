import {Resolvers} from "./types";

export const resolvers: Resolvers = {
  Query: {
    users: (_, __, { dataSources }) => dataSources.db.user.findMany(),
    posts: (_, __, { dataSources }) => dataSources.db.post.findMany(),
    centersOfInterest: (_, __, { dataSources }) => dataSources.db.centerOfInterest.findMany(),
    centersOfInterestOfUser: async (_, { userId }, { dataSources }) => {
        const userInterests = await dataSources.db.userInterest.findMany({
            where: { userId },
            include: { centerOfInterest: true },
        });

        return userInterests.map((ui: { centerOfInterest: any; }) => ui.centerOfInterest);
    },
  },
  Mutation: {
    createUser: async (_, data, { dataSources }) => {
      const user = await dataSources.db.user.create({
        data,
      });

      return user;
    },
      createCenterOfInterest: async (_, data, { dataSources }) => {
          const centerOfInterest = await dataSources.db.centerOfInterest.create({
              data,
          });

          return centerOfInterest;
      },
      setCentersOfInterest: async (_, { userId, centerOfInterestIds }, { dataSources }) => {
          // Supprime les centres d'intérêts existants pour l'utilisateur
          await dataSources.db.userInterest.deleteMany({
              where: { userId },
          });

          // Ajoute les nouveaux centres d'intérêts
          return await Promise.all(
              centerOfInterestIds.map(centerOfInterestId =>
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
