import "@/styles/globals.css";
import myAuthProvider from "@/utils/authProvider";
import type { AppProps } from "next/app";
myAuthProvider.initInterceptor();
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
