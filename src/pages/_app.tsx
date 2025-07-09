import FeedbackMessage from "@/components/shared/FeedbackMessage";
import { FeedbackContextProvider } from "@/context/FeedbackContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FeedbackContextProvider>
      <FeedbackMessage />
      <div className={`${roboto.variable}`}>
        <Component {...pageProps} />
      </div>
    </FeedbackContextProvider>
  );
}
