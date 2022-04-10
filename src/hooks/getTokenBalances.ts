import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import Promise from "bluebird";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiCaller } from "utils/fetcher";
import solanaLogo from "../assets/images/solana-logo.png";
import axios from "axios";

export const getTokenBalances = (
  publicAddress?: string
): [tokenBalance: any[], loading: Boolean, error: Boolean] => {
  const [tokenBalances, setTokenBalances] = <any[]>useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profileData: state.profile.data,
  }));

  if (!publicAddress && logged) {
    publicAddress = profileData.publicAddress;
  }

  if (!publicAddress) {
    setLoading(true);
  }

  const getData = async (publicAddress: string) => {
    let {
      data: { tokenAddresses },
    } = await apiCaller("/daos/tokenAddresses");
    const publicKey = new PublicKey(publicAddress);
    const tokenKeys = (<[{ tokenAddress: string }]>tokenAddresses).map(
      ({ tokenAddress }) => ({
        tokenKey: new PublicKey(tokenAddress),
        tokenAddress,
      })
    );
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const results = await Promise.map(
      tokenKeys,
      async ({ tokenKey, tokenAddress }) => {
        try {
          const info = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            {
              mint: tokenKey,
            }
          );
          const { value } = info;
          const balance =
            value[0].account.data.parsed.info.tokenAmount.uiAmountString;
          if (balance) {
            const {
              data: {
                data: { value: price },
              },
            } = await axios.get(
              "https://public-api.birdeye.so/public/price?address=" +
                tokenAddress
            );
            return {
              balance: balance.toString(),
              usdValue: (price * balance).toFixed(4),
            };
          } else return { balance: "0" };
        } catch {
          return { balance: "0" };
        }
      }
    );
    const balances = (<
      [{ token: string; image: string; tokenAddress?: string }]
    >tokenAddresses).map(({ token, image, tokenAddress }, index) => {
      return {
        token,
        image,
        tokenAddress,
        ...results[index],
      };
    });
    const solBalance = await connection.getBalance(
      new PublicKey(publicAddress)
    );
    let solUsdValue;
    if (solBalance > 0) {
      let {
        data: {
          solana: { usd: price },
        },
      } = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );
      solUsdValue = ((solBalance / 1000000000) * price).toFixed(4);
    }
    balances.unshift({
      token: "SOL",
      usdValue: solUsdValue,
      tokenAddress: "",
      balance: (solBalance / 1000000000).toString(),
      image: solanaLogo.src,
    });
    setLoading(false);
    setTokenBalances(balances.filter(({ balance }) => balance > 0));
  };

  useEffect(() => {
    try {
      if (publicAddress) {
        getData(publicAddress);
      }
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);
  return [tokenBalances, loading, error];
};
