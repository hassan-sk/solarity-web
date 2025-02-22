import React, { FC } from "react";
import SelectInput from "components/SelectInput";
import { getWalletActivities } from "hooks";
import moment from "moment";
import { minifyAddress } from "utils";

export interface TransferTableProps1 {
  // rows: {
  //   date: string;
  //   source: string;
  //   reference: string;
  //   amount: string;
  //   type: "plus" | "minus";
  // }[];
}

const Transfer1: FC<{ solanaAddress: string }> = ({ solanaAddress }) => {
  return (
    <div className="flex flex-col gap-8 p-8 mb-10 bg-brandblack">
      <div className="flex justify-between">
        <span className="text-lg font-bold">Pay Rolls</span>
        <div className="flex gap-4">
          <SelectInput
            title="Type"
            className="rounded-full bg-base-100 btn-primary btn-sm"
          />

          <SelectInput
            title="Token"
            className="rounded-full bg-base-100 btn-primary btn-sm"
          />

          <button className="gap-2 normal-case btn btn-primary btn-sm">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6479 3.91481L7.89788 0.164812C7.67813 -0.0549383 7.32188 -0.0549382 7.10288 0.164812L3.35288 3.91481C3.13238 4.13456 3.13238 4.49081 3.35288 4.70981C3.57338 4.92881 3.92813 4.93031 4.14788 4.70981L6.93788 1.91981L6.93788 9.56231C6.93788 9.87281 7.18988 10.1248 7.50038 10.1248C7.81088 10.1248 8.06288 9.87281 8.06288 9.56231L8.06288 1.91981L10.8529 4.70981C10.9624 4.82006 11.1064 4.87481 11.2504 4.87481C11.3944 4.87481 11.5384 4.82081 11.6479 4.70981C11.8676 4.49006 11.8676 4.13456 11.6479 3.91481Z"
                fill="#8899A6"
              />
              <path
                d="M13.281 14.7712H1.719C0.771 14.7712 0 14.0002 0 13.0522V8.81323C0 8.50273 0.252 8.25073 0.5625 8.25073C0.873 8.25073 1.125 8.50273 1.125 8.81323V13.0522C1.125 13.38 1.39125 13.6462 1.719 13.6462H13.281C13.6088 13.6462 13.875 13.38 13.875 13.0522V8.81323C13.875 8.50273 14.127 8.25073 14.4375 8.25073C14.748 8.25073 15 8.50273 15 8.81323V13.0522C15 14.0002 14.229 14.7712 13.281 14.7712Z"
                fill="#8899A6"
              />
            </svg>
            Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 text-xs text-gray-950">
        <div> Date </div>
        <div> Source/Recipient </div>
        <div className="col-span-2 ">Action</div>
        <div>Amount</div>
        <div></div>
      </div>
      <TransferDisplay solanaAddress={solanaAddress} />
    </div>
  );
};

const TransferDisplay: FC<{ solanaAddress: string }> = ({ solanaAddress }) => {
  solanaAddress = "4wejSnr97csngztZ5SU7A6iZRXJD7B3Y1R1koCQ5NjmD";
  const [walletActivities, loading, error] = getWalletActivities(solanaAddress);
  const formattedWalletActivities = walletActivities.map(
    ({ blockTime, price, type, buyer, tokenMint }) => {
      let data = {
        date: moment(blockTime * 1000).format("MM/DD/YYYY"),
        amount: price > 0 ? parseFloat(price.toFixed(4)) + " SOL" : "",
        type,
        source: minifyAddress(type == "buyNow" ? buyer : "-"),
        action: `${type.toUpperCase()}: ${minifyAddress(tokenMint)}`,
      };
      return data;
    }
  );

  if (loading) {
    return (
      <div className="alert alert-info">Fetching your wallet activities</div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-error">
        Error fetching your wallet activities
      </div>
    );
  }
  if (!loading && walletActivities.length == 0) {
    return (
      <div className="alert alert-warning">
        {"User doesn't have any wallet activities balance"}
      </div>
    );
  }

  return (
    <>
      {formattedWalletActivities.map((row, index) => (
        <div key={index} className="grid grid-cols-5 text-sm">
          <div>{row.date}</div>
          <div>{row.source}</div>
          <div className="col-span-2 ">{row.action}</div>
          <div
            className={
              row.type === "buyNow" ? "text-[#11C278]" : "text-[#FFFF00]"
            }
          >
            {row.amount}
          </div>
        </div>
      ))}
    </>
  );
};

export default Transfer1;
