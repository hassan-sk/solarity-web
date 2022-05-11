import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import Promise from "bluebird";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiCaller } from "utils/fetcher";
import solanaLogo from "../assets/images/solana-logo.png";
import axios from "axios";

export const getWalletBalances = ({
  solanaAddress,
  ethereumAddress,
}: {
  solanaAddress?: string;
  ethereumAddress?: string;
}): [tokens: any[], coins: any[], loading: Boolean, error: Boolean] => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profileData: state.profile.data,
  }));

  if ((!solanaAddress || !ethereumAddress) && logged) {
    solanaAddress = profileData.solanaAddress;
    ethereumAddress = profileData.ethereumAddress;
  }

  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const getTokens = async () => {
    if (!solanaAddress) return;
    let {
      data: { tokenAddresses },
    } = await apiCaller("/daos/tokens");
    const publicKey = new PublicKey(String(solanaAddress));
    const tokenKeys = (<[{ tokenAddress: string }]>tokenAddresses).map(
      ({ tokenAddress }) => ({
        tokenKey: new PublicKey(tokenAddress),
        tokenAddress,
      })
    );
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
    setTokens(balances);
  };

  const getCoins = async () => {
    if (!solanaAddress && !ethereumAddress) return;
    const coins = [];
    const solBalance = await connection.getBalance(
      new PublicKey(solanaAddress)
    );
    const web3 = new Web3("https://cloudflare-eth.com/");
    const rawBalance = await web3.eth.getBalance(address);
    balance = Number(Web3.utils.fromWei(rawBalance));
    balance = Number(balance.toFixed(4));
    let solUsdValue = 0;
    if (solBalance > 0) {
      let {
        data: {
          solana: { usd: price },
        },
      } = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );
      solUsdValue = Number(((solBalance / 1000000000) * price).toFixed(4));
    }
    coins.unshift({
      token: "SOL",
      usdValue: solUsdValue,
      tokenAddress: "",
      balance: (solBalance / 1000000000).toString(),
      image: solanaLogo.src,
    });
    setCoins(coins);
  };

  const getAllData = async () => {
    setLoading(true);
    setError(false);
    try {
      await Promise.all([getTokens(), getCoins()]);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return [tokens, coins, loading, error];
};
