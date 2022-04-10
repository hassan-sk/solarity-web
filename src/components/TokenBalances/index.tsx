import React, { FC, useState } from "react";
import CreateContract from "components/Modals/CreateContract";

import TokenBalanceItem, {
  TokenBalanceItemProps,
} from "components/TokenBalances/TokenBalanceItem";
import { getTokenBalances } from "hooks";

export interface TokenBalancesProps {
  title: string;
  tokens: TokenBalanceItemProps[];
}

const TokenBalance: FC<{ publicAddress: string }> = ({ publicAddress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex flex-col gap-8 py-8 bg-brandblack">
        <div className="flex items-center justify-between px-8">
          <span className="text-lg font-bold">Token Balances</span>
          <button
            className="rounded-full btn btn-secondary"
            onClick={toggleModal}
          >
            Create Contract
          </button>
        </div>
        <div className="flex gap-4 pb-5 pl-8 overflow-x-auto scrollbar-thin scrollbar-thumb-black track-white">
          <TokenBalanceDisplay publicAddress={publicAddress} />
        </div>
      </div>
      <CreateContract open={isOpen} onClose={toggleModal} />
    </>
  );
};

const TokenBalanceDisplay: FC<{ publicAddress: string }> = ({
  publicAddress,
}) => {
  const [tokenBalances, loading, error] = getTokenBalances(publicAddress);

  if (loading) {
    return <div className="alert alert-info">Fetching your token balances</div>;
  }
  if (error) {
    return (
      <div className="alert alert-error">
        Error fetching your tokens balance
      </div>
    );
  }
  if (!loading && tokenBalances.length == 0) {
    return (
      <div className="alert alert-warning">
        {"User doesn't have any token balance"}
      </div>
    );
  }

  return (
    <>
      {tokenBalances.map((item, index) => (
        <TokenBalanceItem key={index} {...item} />
      ))}
    </>
  );
};

export default TokenBalance;
