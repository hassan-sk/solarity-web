import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import Promise from "bluebird";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiCaller } from "utils/fetcher";
import solanaLogo from "../assets/images/solana-logo.png";

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
      ({ tokenAddress }) => new PublicKey(tokenAddress)
    );
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const results = await Promise.map(tokenKeys, async (tokenKey) => {
      try {
        const data = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: tokenKey,
        });
        const { value } = data;
        return value[0].account.data.parsed.info.tokenAmount.uiAmountString;
      } catch {
        return 0;
      }
    });
    const balances = (<[{ token: string; image: string }]>tokenAddresses).map(
      ({ token, image }, index) => {
        return {
          token,
          image,
          balance: results[index],
        };
      }
    );
    const solBalance = await connection.getBalance(
      new PublicKey(publicAddress)
    );
    balances.unshift({
      token: "SOL",
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
