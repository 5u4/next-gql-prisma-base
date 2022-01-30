import type { NextPage } from "next";
import { gql } from "urql";
import { usePingQuery } from "~/graphql/codegen.generated";

const Home: NextPage = () => {
  const [result] = usePingQuery();

  return <div>Hello world! {result.data?.ping ?? "pinging"}</div>;
};

export default Home;

gql`
  query Ping {
    ping
  }
`;
