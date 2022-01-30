import { ApolloServer } from "apollo-server-micro";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { createContext } from "~/graphql/context";
import { schema } from "~/graphql/schema";

export const server = new ApolloServer({
  schema,
  context: createContext,
  plugins: [responseCachePlugin()],
});

export const startServer = server.start();
