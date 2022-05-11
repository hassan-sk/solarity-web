import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { RootStateOrAny, useSelector } from "react-redux";
import solanaIcon from "../../../assets/images/icons/solana.png";
import ethereumIcon from "../../../assets/images/icons/ethereum.png";
import { getWalletBalances } from "hooks";
import { Loader } from "components/Loader";

const CoinBalanceCard: FC<{ type: "sol" | "eth"; address: string }> = ({
  type,
  address,
}) => {
  const isSol = type === "sol";
  const image = isSol ? solanaIcon.src : ethereumIcon.src;
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const getBalance = async () => {
    setLoading(true);
    // const balance = await getCoinBalance(type, address);
    setBalance(balance);
    setLoading(false);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="px-5 flex justify-center items-center">
      <Image src={image} objectFit={"contain"} height="40px" width="40px" />
      <div className="flex-1 pl-3">
        <p className="text-xs text-gray-950">
          {isSol ? "Solana" : "Ethereum"} Balance
        </p>
        {loading ? (
          <Loader noText={true} center={false} size={4} />
        ) : (
          <p className="text-2xl font-bold">
            {balance} {isSol ? "SOL" : "ETH"}
          </p>
        )}
      </div>
    </div>
  );
};

const TokenBalances: FC<{}> = () => {
  return <></>;
};

const BalanceView = () => {
  const { solanaAddress, ethereumAddress } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );

  const [coins, tokens] = getWalletBalances({});

  console.log(coins);
  console.log(tokens);

  return (
    <div className="flex flex-col gap-3 p-4 bg-brandblack rounded-3xl">
      {solanaAddress && <CoinBalanceCard type="sol" address={solanaAddress} />}
      {ethereumAddress && (
        <CoinBalanceCard type="eth" address={ethereumAddress} />
      )}
      <TokenBalances />
    </div>
  );
};

export default BalanceView;
