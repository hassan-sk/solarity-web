import React from "react";
import Image from "next/image";
import Link from "next/link";

import placeholder from "assets/images/placeholder/avatar.png";

import { SelectAndConnectWalletButton } from "components/SelectAndConnectWalletButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { login } from "redux/slices/authSlice";
// import { authLogin } from "actions";

const ButtonWallet = () => {
  const dispatch = useDispatch();

  const { logged, profileData } = useSelector((state: RootStateOrAny) => ({
    logged: state.auth.logged,
    profileData: state.profile.data,
  }));

  const { publicKey, signMessage } = useWallet();

  if (!logged) {
    return (
      <SelectAndConnectWalletButton
        onUseWalletClick={() => {
          dispatch(login({ publicKey, signMessage }));
        }}
      />
    );
  }

  return (
    <Link href={`/${profileData.username}`} passHref>
      <a className="gap-3 pr-1 font-normal normal-case btn rounded-3xl btn-secondary ">
        <span>{profileData.shortPublicAddress}</span>
        <div className="w-[1px]  h-2/3 bg-[#5153F0]" />
        <img
          height="34"
          width="34"
          className="rounded-full"
          style={{ outline: "2px solid white" }}
          src={
            (profileData.profileImage && profileData.profileImage.link) ||
            placeholder.src
          }
          alt="user avatar"
        />
      </a>
    </Link>
  );
};

export default ButtonWallet;
