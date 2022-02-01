import { booleanArg, extendType } from "nexus";
import { validate } from "~/validations/PingQueryValidation";

export const PingQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.string("ping", {
      args: { withTimestamp: booleanArg() },
      validate,
      resolve(_, { withTimestamp }) {
        return withTimestamp ? Date.now().toString() : "pong";
      },
    });
  },
});
