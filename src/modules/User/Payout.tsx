import React, { FC } from "react";
import Base from "modules/DAOS/Base";
import TokenBalance from "components/TokenBalances";
import Transfer from "components/Tables/Transfer1";

const Payout: FC<{ user: any }> = ({ user }) => {
  const { publicAddress } = user;
  return (
    <div className="flex flex-col gap-10">
      <TokenBalance publicAddress={publicAddress} />
      <Transfer publicAddress={publicAddress} />
    </div>
  );
};

export default Payout;
