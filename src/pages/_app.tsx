import type { AppProps } from "next/app";
import { Provider } from "urql";
import { ssrCache, urlqClient } from "~/graphql/urqlClient";
import "~/styles/main.css";

function App({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) ssrCache.restoreData(pageProps.urqlState);

  return (
    <Provider value={urlqClient}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
