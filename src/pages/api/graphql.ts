import Cors from "micro-cors";
import { PageConfig } from "next";
import { server, startServer } from "~/graphql/server";

export const config: PageConfig = { api: { bodyParser: false } };

const cors = Cors();

const handler = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  return server.createHandler({ path: "/api/graphql" })(req, res);
});

export default handler;
