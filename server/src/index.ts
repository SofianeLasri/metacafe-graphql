import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { DataSourceContext } from "./context.js";
import db from "./datasources/db.js";

const server = new ApolloServer<DataSourceContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    return {
      dataSources: {
        db,
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
