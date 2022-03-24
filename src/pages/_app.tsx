import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";

// For redux
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/App.css";
import { checkSession } from "redux/slices/authSlice";

// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
const endpoint = "https://ssc-dao.genesysgo.net";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

function MyApp({ children }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>{children}</WalletProvider>
    </ConnectionProvider>
  );
}

function ReduxWrapped({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MyApp>
        <Component {...pageProps} />
      </MyApp>
    </Provider>
  );
}

export default ReduxWrapped;
