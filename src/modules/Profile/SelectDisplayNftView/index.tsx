import { Button, Input, Stack } from "components/FormComponents";
import React, { useEffect, useState } from "react";
import AframeEditRoom from "components/AframeEditRoom";
import { getNfts } from "hooks";
import { NftCardSelect } from "modules/User/NftCardSelect";
const SelectDisplayNftView = () => {

  const [nfts, nftLoading, nftError] = getNfts();
  const [loading, setLoading] = useState<Boolean>(false);
  const [selected, setSelected] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState<string | Boolean>(false);
  const [picNo, setPicNo] = useState<string>('0');
  const [chooseFlag, setChooseFlag] = useState<string | Boolean>(false);

  if (loading) {
    return (
      <div className="alert alert-warning shadow-lg w-full">
        <span>Loading NFTs...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-error shadow-lg w-full">
        <span>Error While Loading NFTs</span>
      </div>
    );
  }
  if (nfts.length == 0) {
    return (
      <div className="alert alert-info shadow-lg w-full">
        <span>
          You don't own any NFTs so you will not be able to set your profile pic
        </span>
      </div>
    );
  }
  var chooseNft = () => {
    setChooseFlag(true);
  }

  return (
    <div>
      <span className="font-bold text-2xl">Select NFTs to Display in Room.</span>
      <Stack spacing={3}>
        <div className="relative w-full h-[229px] rounded-2xl mt-4">
          <AframeEditRoom 
            chooseFlag={chooseFlag} 
            setChooseFlag={setChooseFlag} 
            picNo={picNo} 
            setPicNo={setPicNo}
            imageUrl={imageUrl}
          />
        </div>
        <div className="p-2">
          <div className="h-[110px] rounded-xl border border-brandblack flex flex-wrap items-center overflow-x-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
          {nfts.map(({ mint, data: { name, uri } }, index) => (
            <NftCardSelect
              mint={mint}
              uri={uri}
              name={name}
              key={index}
              selected={mint == selected}
              onClick={(mint: any, uri: any) => {setSelected(mint);setImageUrl(uri)}}
            />
          ))}
          </div>
          <div className="mt-2">
            { picNo != '0' ? (
              <div className="float-left">
                <Button wrap onClick={chooseNft}>Choose</Button>
              </div>) : (<div></div>)
            }
            <div className="float-right">
              <Button wrap>Update</Button>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default SelectDisplayNftView;
