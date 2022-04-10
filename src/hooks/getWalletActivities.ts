import axios from "axios";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const getWalletActivities = (
  publicAddress?: string
): [tokenBalance: any[], loading: Boolean, error: Boolean] => {
  const [walletActivities, setWalletActivities] = <any[]>useState([]);
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
        axios
          .get(
            `https://api-mainnet.magiceden.dev/v2/wallets/${publicAddress}/activities?offset=0&limit=100`
          )
          .then(({ data }) => {
            setLoading(false);
            setWalletActivities(data);
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
          });
      }
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);
  return [walletActivities, loading, error];
};
