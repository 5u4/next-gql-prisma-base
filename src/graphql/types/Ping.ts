import { extendType } from "nexus";

export const PingQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.string("ping", {
      resolve() {
        return "pong";
      },
    });
  },
});
