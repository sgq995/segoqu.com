import "../styles/globals.css";
import type { AppProps } from "next/app";

import { CacheProvider, EmotionCache } from "@emotion/react";

import Layout from "../components/Layout";

import createEmotionCache from "../createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps, ...props }: MyAppProps) {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  );
}

export default MyApp;
