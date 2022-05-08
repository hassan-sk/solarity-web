import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiCaller } from "utils/fetcher";

export const getNfts = (
  publicAddress?: string
): [nfts: any[], loading: Boolean, error: Boolean] => {
  const [nfts, setNfts] = <any[]>useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profileData: state.profile.data,
  }));
  if (!publicAddress && logged) {
    publicAddress = profileData.publicAddress;
  }
  useEffect(() => {
    if (publicAddress) {
      const connection = new Connection(clusterApiUrl("mainnet-beta"));
      getParsedNftAccountsByOwner({
        publicAddress,
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
  }, []);
  return [nfts, loading, error];
};

export const getEthereumNfts = (username: string, limited?: boolean) => {
  const [nfts, setNfts] = <any[]>useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCaller
      .get("/nfts/eth?owner=" + username)
      .then(({ data: { nfts } }) => {
        if (limited) {
          console.log(nfts);
          try {
            const _nfts = nfts
              .map(({ title, media, metadata }: any) => {
                return {
                  name: title,
                  image: media.length > 0 ? media[0].gateway : "",
                  mint: metadata.mintTransactionHash,
                  collection: metadata.collection,
                };
              })
              .filter(({ image }: any) => image);
            setNfts(_nfts);
          } catch {
            setNfts(nfts);
          }
        } else {
          setNfts(nfts);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [nfts, loading, error];
};
