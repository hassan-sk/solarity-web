import React, { FC } from "react";
import Image from "next/image";

const SolanaBalanceCard = () => {
  return (
    <div className=" border border-gray-700 rounded-xl px-5 py-2">
      <p className="text-xs text-gray-950">Solana Balance</p>
      <p className="text-2xl font-bold">$34500.23</p>
    </div>
  );
};

const BalanceView = () => {
  return (
    <div className="flex flex-col gap-4 p-8 bg-brandblack rounded-3xl">
      {/* <SolanaBalanceCard /> */}
    </div>
  );
};

export default BalanceView;
