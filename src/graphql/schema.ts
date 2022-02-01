import { makeSchema } from "nexus";
import { join } from "path";
import { ajvValidatePlugin } from "./plugins/ajvValidatePlugin";
import * as types from "./types";

export const schema = makeSchema({
  types,
  plugins: [ajvValidatePlugin()],
  outputs: {
    typegen: join(process.cwd(), "types", "nexus-typegen.generated.d.ts"),
    schema: join(process.cwd(), "src", "graphql", "schema.generated.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "src", "graphql", "context.ts"),
  },
});
