import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const getNfts = (publicAddress?: string): [any[], Boolean, Boolean] => {
  const [nfts, setNfts] = <any[]>useState([]);
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
  useEffect(() => {
    try {
      if (publicAddress) {
        const connection = new Connection(clusterApiUrl("mainnet-beta"));
        getParsedNftAccountsByOwner({
          publicAddress: "31W6QazPT8dSXvWLCg8yPktLga5nSg6cXysbwnuSQPPu",
          connection,
        })
          .then((nfts) => {
            setNfts(nfts);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      }
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);
  return [nfts, loading, error];
};
