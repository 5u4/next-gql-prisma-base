import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { persistedFetchExchange } from "@urql/exchange-persisted-fetch";
import { createClient, dedupExchange, errorExchange, fetchExchange, ssrExchange } from "urql";
import schema from "~/graphql/codegen.generated";
import { getBaseUrl } from "~/utils/getBaseUrl";

export const GRAPHQL_ENDPOINT = `${getBaseUrl()}/api/graphql`;

const isServerSide = typeof window === "undefined";
export const ssrCache = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
});

const exchanges = [
  devtoolsExchange,
  dedupExchange,
  cacheExchange({ schema }),
  ssrCache,
  errorExchange({
    onError(error) {
      console.error(error);
    },
  }),
  persistedFetchExchange({ preferGetForPersistedQueries: true }),
  fetchExchange,
];

export const urlqClient = createClient({ url: GRAPHQL_ENDPOINT, exchanges });
