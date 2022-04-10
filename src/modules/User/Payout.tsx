import React, { FC } from "react";
import Base from "modules/DAOS/Base";
import TokenBalance from "components/TokenBalances";
import Transfer from "components/Tables/Transfer1";

const Payout: FC<{ user: any }> = ({ user }) => {
  // const { publicAddress } = user;
  let publicAddress = "54fVYrPmDRB4P3Xa5yeHzPqU6sm7tLjZWf6Tc32rcxYX";
  return (
    <div className="flex flex-col gap-10">
      <TokenBalance publicAddress={publicAddress} />
      <Transfer publicAddress={publicAddress} />
    </div>
  );
};

export default Payout;
