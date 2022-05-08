import React, { FC, useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import Select from "components/SelectInput";
import { getEthereumNfts, getNfts } from "hooks";

type ArtProps = {
  publicAddress: string;
  username: string;
};

export type NftCardProps = {
  name: string;
  mint: string;
  uri?: string;
  onClick?: (mintAddress: string) => void;
  selected?: boolean;
  image?: string;
  collection?: string;
};

export const NftCard: FC<NftCardProps> = ({
  name,
  mint,
  uri,
  onClick,
  image,
  collection,
  selected,
}) => {
  const [details, setDetails] = useState<{
    collection?: { name: string };
    image?: string;
  }>({});
  const getDetails = async () => {
    if (uri) {
      const details = await fetch(uri, {
        mode: "cors",
        credentials: "omit",
      });
      setDetails(await details.json());
    } else {
      setDetails({
        collection: { name: collection || "-" },
        image,
      });
    }
  };
  useEffect(() => {
    getDetails();
  }, []);
  const clickable = Boolean(onClick);
  return (
    <div
      className={`flex flex-col gap-2 p-4 ${
        selected ? "bg-secondary" : "bg-brandblack"
      } rounded-3xl ${!selected && "hover:bg-black"} ${
        clickable && "cursor-pointer"
      } `}
      onClick={() => onClick && onClick(mint)}
    >
      <div className="flex justify-center rounded-xl overflow-hidden">
        {details.image && (
          <img
            src={details.image}
            className="bg-base-100"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              border: "none",
            }}
          />
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{name}</span>
          <span
            className={`flex items-center gap-2 text-${
              selected ? "white" : "secondary"
            }`}
          >
            {(details.collection && details.collection.name) || "loading..."}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99935 18.3334C14.5827 18.3334 18.3327 14.5834 18.3327 10C18.3327 5.41669 14.5827 1.66669 9.99935 1.66669C5.41602 1.66669 1.66602 5.41669 1.66602 10C1.66602 14.5834 5.41602 18.3334 9.99935 18.3334Z"
                stroke={selected ? "white" : "#6163FF"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.45898 10L8.81732 12.3583L13.5423 7.64166"
                stroke={selected ? "white" : "#6163FF"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

const Art: FC<ArtProps> = ({ publicAddress, username }) => {
  const [nfts, loading, error] = getNfts(publicAddress);
  const [ethNfts, ethLoading, ethError] = getEthereumNfts(username, true);
  if (loading || ethLoading) {
    return (
      <div className="alert alert-warning shadow-lg w-full mb-5">
        <span>Loading NFTs...</span>
      </div>
    );
  }

  if (error || ethError) {
    return (
      <div className="alert alert-error shadow-lg w-full mb-5">
        <span>Error Loading NFTs...</span>
      </div>
    );
  }

  if (!loading && !ethLoading && nfts.length + ethNfts.lenght == 0) {
    return (
      <div className="alert alert-info shadow-lg w-full mb-5">
        <span>This user doesn't own any NFTs...</span>
      </div>
    );
  }

  const allNfts = [
    ...ethNfts,
    ...nfts.map(({ data: { name, uri }, mint }) => ({ name, uri, mint })),
  ];
  console.log(allNfts);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Select title="All Collections" className="rounded-full font-[19px]" />
      </div>
      <div className="grid grid-cols-3 gap-3 my-4 ">
        {allNfts.map((data, index) => (
          <NftCard key={"nftCard-" + index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Art;
