import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { DataSourceContext } from "./context";

const server = new ApolloServer<DataSourceContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    return {
      dataSources: {},
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
