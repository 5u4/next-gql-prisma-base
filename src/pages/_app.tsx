import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "urql";
import { ssrCache, urlqClient } from "~/graphql/urqlClient";
import "~/styles/main.css";

function App({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) ssrCache.restoreData(pageProps.urqlState);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <Provider value={urlqClient}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
