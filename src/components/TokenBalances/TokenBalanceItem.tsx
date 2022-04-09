import React, { FC } from "react";
import Image from "next/image";

export interface TokenBalanceItemProps {
  token: string;
  balance: string;
  amount?: string;
  image: string;
}

const TokenBalanceItem: FC<TokenBalanceItemProps> = ({
  token,
  balance,
  amount,
  image,
}) => {
  return (
    <div className="flex flex-col items-center px-8 py-4 border select-none border-base-100 rounded-3xl max-w-[158px]">
      <div>
        <img
          src={image}
          alt={`${token} logo`}
          className="rounded-full w-[42px] h-[42px]"
        />
      </div>
      <span className="mt-1 text-sm">{token}</span>
      <span className="mt-3 text-xl font-bold">
        {balance.split(".")[0]}
        {balance.split(".")[1] && (
          <span className="text-lg ">.{balance.split(".")[1]}</span>
        )}
      </span>
      {/* 
      <span className="text-xs text-gray-950">
        {amount ? `${amount}` : "-"}
      </span> */}
    </div>
  );
};

export default TokenBalanceItem;
