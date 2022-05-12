import React, { FC, useEffect, useState } from "react";
import Select from "../../components/SelectInput";
import { getNfts } from "../../hooks";
import { Loader } from "../../components/Loader";
import placeholder from "../../assets/images/placeholder/avatar.png";
import solanaIcon from "../../assets/images/icons/solana.png";
import ethereumIcon from "../../assets/images/icons/ethereum.png";

type ArtProps = {
  solanaAddress: string;
  username: string;
};

export type NftCardProps = {
  name: string;
  collectionName: string;
  type: string;
  image: string;
  onClick?: (mintAddress: string) => void;
  selected?: boolean;
};

export const NftCard: FC<NftCardProps> = ({
  name,
  collectionName,
  type,
  image,
  onClick,
  selected,
}) => {
  const clickable = Boolean(onClick);
  const isSol = type === "Solana";
  const icon = isSol ? solanaIcon.src : ethereumIcon.src;
  return (
    <div
      className={`relative flex flex-col gap-2 p-4 ${
        selected ? "bg-secondary" : "bg-brandblack"
      } rounded-3xl ${!selected && "hover:bg-black"} ${
        clickable && "cursor-pointer"
      } `}
      onClick={() => {}}
    >
      <img src={icon} className="w-10 object-contain absolute top-5 left-5" />
      <div className="flex justify-center rounded-xl overflow-hidden">
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = placeholder.src;
          }}
          className="bg-base-100"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            border: "none",
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{name}</span>
          <span
            className={`flex items-center gap-2 text-${
              selected ? "white" : "secondary"
            }`}
          >
            {collectionName}
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

const Art: FC<ArtProps> = ({ solanaAddress, username }) => {
  // const [nfts, loading, error] = getNfts(username, solanaAddress);
  // if (error) {
  //   return (
  //     <div className="alert alert-error shadow-lg w-full mb-5">
  //       <span>Error Loading NFTs...</span>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="pb-5">
  //       <Loader text="fetching the NFTs" />
  //     </div>
  //   );
  // }

  // if (nfts.length == 0) {
  //   return (
  //     <div className="alert alert-info shadow-lg w-full mb-5">
  //       <span>This user doesn't own any NFTs...</span>
  //     </div>
  //   );
  // }

  const nfts = [
    {
      name: "falòaf",
      uri: "https://arweave.net/76Y5l-WLTdstMyH9oZ7CW-jra1VGHayvV-J8aZu5kAo",
      mintAddress: "EVjLnaHKp2tWh5TnMCcBXYmU9orSx8acu2Pe8W9UZW6V",
      type: "Solana",
      image:
        "https://www.arweave.net/kEe8POLKXtGVMbyt46cyPjPTAuGgDtpYbw3TrgS8zlo?ext=jpg",
      collectionName: "-",
    },
    {
      name: "Pia e Pio",
      uri: "https://arweave.net/aZpIoZ_vt-8ApvXQFw-nBQkUrj2R-dpa0muee7ISwas",
      mintAddress: "9kDBa44kz8rXu7pfutQT7FVfjwp9BJ8pcGf3PN4H6Ngq",
      type: "Solana",
      image:
        "https://www.arweave.net/f_jzp84xrH3uGXfEnsHGQJSvCHaFfx7z6YvOow9c6S4?ext=jpg",
      collectionName: "-",
    },
    {
      name: "Pia e Pio",
      uri: "https://arweave.net/aZpIoZ_vt-8ApvXQFw-nBQkUrj2R-dpa0muee7ISwas",
      mintAddress: "7sZdjCPHo6mZQq4NKny3acdwxXW3NbDRCTYYRuBZEzGJ",
      type: "Solana",
      image:
        "https://www.arweave.net/f_jzp84xrH3uGXfEnsHGQJSvCHaFfx7z6YvOow9c6S4?ext=jpg",
      collectionName: "-",
    },
    {
      name: "Solarity's pass",
      uri: "https://arweave.net/5tcDropk5GN-oV-6sx_V549MSSo82Usi3BjpzrFserc",
      mintAddress: "FpBjvCS1CAKSCZoDGc61ShMMVFG3LQXgdsgUxh5WUEFN",
      type: "Solana",
      image:
        "https://www.arweave.net/eM_e4wxgVv6kUh-yb9R6TR3ENKh9DEpWoo75xnOH0Xk?ext=jpg",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #1964",
      uri: "https://arweave.net/Nxri2TcA7hRZGe6ed6Ned9UY_kda6dsde_9JE7iMneg",
      mintAddress: "8PdzQAGo5bmVf357Aw1dYCqGagdwgvDEJqWCPjcsdB9T",
      type: "Solana",
      image:
        "https://www.arweave.net/7JUAy0vgB3hoYOC1AqZ9idvrWLzAQNMKKGIODUU9KX4?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1953",
      uri: "https://arweave.net/umqMP5cH6Kaq5s5hA5bPfByAj3zpRyM9LrUn-BT1YbE",
      mintAddress: "6UvBJexDiy9toqoyithubjM6xSYpesaUNKrJSu3QSzoP",
      type: "Solana",
      image:
        "https://www.arweave.net/u1KdynlLQ5Za8j4YLc7AWvs59IscQcO_UuBl9hMDVrw?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1955",
      uri: "https://arweave.net/uA2CUC3sdVyWfVSaC1rZm1JqFqFQgtkkLO3-xNX89yY",
      mintAddress: "5NLTP7zQVr6EVSeski7zg4rRTiiycULF8riBLBWSAm5Q",
      type: "Solana",
      image:
        "https://www.arweave.net/vVpWeM5KLyFVh_PGnj2xn3S9kmAR-ayy7mdo5LAa2kw?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1958",
      uri: "https://arweave.net/ivUZ7sQz2-acmIq_5L0aipbT-3L_go1EdEAiKlr8H-w",
      mintAddress: "2dbgKCJW9nsLYLZLShehdyZWhnvzbMEpSb7DDoLhpfav",
      type: "Solana",
      image:
        "https://www.arweave.net/Yj5Y6haz2GLs88TpOw5I_3-vuuzZSJvkch3Zd0AjSk0?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1959",
      uri: "https://arweave.net/DpmeNFKlbOqsHH9LWgKkKs6j7z00TrL31JVzWcdR7Fk",
      mintAddress: "AU8xwe9asLrm5LEHpWJb3nA52YZcdZGEbL2SDFgXJnjU",
      type: "Solana",
      image:
        "https://www.arweave.net/kEuqQ_qC2WE9UykiIuFRMgbhxz2YHs5i3nGBvlHs7_0?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1963",
      uri: "https://arweave.net/dzEaT1jq7HeBRp9OxYVvpf_K5R6gqKMpVePNXeToBIg",
      mintAddress: "AShuaEYH66uLk6aFdrckX3AuM8HV4y4evaycztxJvyeu",
      type: "Solana",
      image:
        "https://www.arweave.net/23uklLAul1vNEYYAUyX6azkWNaLAxipOtQDbcFt_wlo?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1957",
      uri: "https://arweave.net/Fe_1rLlO4O-rusQr2_vjul0Og2O__OTVuAjKEnNq9QQ",
      mintAddress: "sFpoW64JgepKEf1q5FM7KGBS1B4i7BCFLkDS7J9M8iV",
      type: "Solana",
      image:
        "https://www.arweave.net/B7KbMt4R_6zmVGYFStk8s4LYFHvnHf1B9Jhe6LZ7vmA?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1952",
      uri: "https://arweave.net/9ZW0VKNL3S-Zm9cMWPFIr_FcTQLcm76PqBpsCopmfPg",
      mintAddress: "BvxkX8xto2tBDPHzEMutHBJc97ESjuGRXERjnPFGs4z5",
      type: "Solana",
      image:
        "https://www.arweave.net/Oja35aq0eO4YGGnHFAc9qUSzjQn_g0pe6rJ56845GY0?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1962",
      uri: "https://arweave.net/Ylk3TnHIskhimI44EXCzatkHR1X3SOdv4nfgyV6OKfo",
      mintAddress: "3jaAqTxyTynV6XBB1Ghzckd8ZFcENkgMjAveChWERQSd",
      type: "Solana",
      image:
        "https://www.arweave.net/p3ILpUZslnn0tvTkcOja1Hs9gpa5jU7zNDt_QXBrVcQ?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #1945",
      uri: "https://arweave.net/vrPr4GY3u0uemhQwHXsx_3dL_aX7_AGuRQKgEErkSdo",
      mintAddress: "6njE73u2FadZ2vuMLTAuThBYu9JFJzU6X6nhAjbRDVxX",
      type: "Solana",
      image:
        "https://www.arweave.net/UKTC_2CsLrotVreZywaswIOwxaCMo-QcmsxNWn9LU-w?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Official Solana NFT",
      uri: "https://solscannft.online/uri.txt",
      mintAddress: "EYwnq7q276WVZYpBwPapHGP5DxHJyRr77nGbTQAhLJSi",
      type: "Solana",
      image: "/_next/static/media/avatar.bf9812f9.png",
      collectionName: "Loading...",
    },
    {
      name: "Official SOL NFT ✔️",
      uri: "https://6382653487163742.com/nft.txt",
      mintAddress: "5fyNFeKb61wSasWjkQyq2MMFPrmigrnrDpUnPGV99zgC",
      type: "Solana",
      image: "/_next/static/media/avatar.bf9812f9.png",
      collectionName: "Loading...",
    },
    {
      name: "Solana Money Girls #264",
      uri: "https://arweave.net/AU8fLxoxKriFbdXEYFXQonH9MHu8hshvhfuBF2HWGx0",
      mintAddress: "GPLgcPUAQ2EQuWVwxD3HCGwqkY2cZEKEt3xB5Timc8u3",
      type: "Solana",
      image:
        "https://arweave.net/0taQdROjAJwh5jVlPJMAt5hqhkUT7wTQCMLexvyhYaQ?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Girls #1540",
      uri: "https://arweave.net/UTuBy_JQU9fUhwzANoUdLb_nFkyLIGvd9zT81DHeHso",
      mintAddress: "WJKjZj7btuCsgqiRjFZ9tvEfvWd21xHfbqWAuqyCyux",
      type: "Solana",
      image:
        "https://arweave.net/inH9_LLd7oejNRdvuin-wVbOT9WVwO6sX2M2Mv_XBuc?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #2903",
      uri: "https://arweave.net/r3ySD1g1u_MWG5GLbrDKVb0elFnK-shLdIiym3V8lPc",
      mintAddress: "71tdCoiLeasQPnndWLtWrRNgfjRfzYnzcYDxeRMjhMtB",
      type: "Solana",
      image:
        "https://www.arweave.net/QfIzJp6JIUeMu7rgOFOxClH7ULfRXoFy7xP5J3Tlg_o?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #2899",
      uri: "https://arweave.net/8mJ67YiP4c3KEZdbB9mL1RFLRzgKUpRavUma_3I_qxs",
      mintAddress: "EtVVymVgmFPTa8MWA8mvwtVmNyYPrWy5aUNvfbbYgAWm",
      type: "Solana",
      image:
        "https://www.arweave.net/3xiFP6hx-aDXFOxnxAjrB8ZLmLJMveYUBj_JmX51o_0?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Girls #312",
      uri: "https://arweave.net/lVOtQWKTRU2wsyNcjqrTRGu49Yc8JhQEefnT7yo_UlQ",
      mintAddress: "Hs1pzKB1q31HJEvzj7PBRq3ZbFJwrzTPcAqR5X9z2xWZ",
      type: "Solana",
      image:
        "https://arweave.net/0mybfK2gpI8CAW4WWokuhRhotiPAnftI7Ahga4gDbAg?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Girls #466",
      uri: "https://arweave.net/ofoSIryqOYD1ZAeOwgYX6z8xdgG-NGA9DzT0s_JEEIo",
      mintAddress: "8e9gc6XJF14ePEHi3uZx6A2nc9j9zbVRHB8kt9J8LyEa",
      type: "Solana",
      image:
        "https://arweave.net/FS5ygFEOo7-jqPFaUOOgAdnv1vwyaHooG4KfheVqHgc?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Girls #846",
      uri: "https://arweave.net/2k3_cUg096xi1gX7UlbBS8AeIt4zw6ToTIi-8jDsEzY",
      mintAddress: "5ymnd5NQAuEzuyaMC6FFH6JMQQjRkZtaRbG6jyJA38c3",
      type: "Solana",
      image:
        "https://arweave.net/V48TG6F4ZtJp_ClrJcQliZRl43hP5LQq_792MTLjIy8?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Girls #406",
      uri: "https://arweave.net/JgSmGqXM80ptP3dTi5QmfIgw32N8aSS6lTjNDcV8hP8",
      mintAddress: "EixtATQcmZAXPLRUBjAhoZ3YWfgZYtxA2cebG5Gk74SW",
      type: "Solana",
      image:
        "https://arweave.net/QR5bmPoaYh2rCgh8_JV3bEUCquInX7YNFhoC_kg-rYg?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Girls #1073",
      uri: "https://arweave.net/CiSFhP8NtGd-JkfUAY5ftIorWq2YFNXw0wJW-ByfB9E",
      mintAddress: "4wvAMxceR7CjtikXMmDvfEjuD94yPWFg1MEqgXbbpcgt",
      type: "Solana",
      image:
        "https://arweave.net/BCqQIoliG1bFV-awzLms9UlksYaULnchGC0cVnsm3QU?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #3029",
      uri: "https://arweave.net/Al2wS9Tngfg7OEQ2uKHItIVWb21Z_ELJzID6TsrDWpo",
      mintAddress: "GEt1reN82N4vijBVf3JUu761ekv5v4iTPXEHGhw3V5am",
      type: "Solana",
      image:
        "https://www.arweave.net/ji_fiG8NurBXQNm0Znmn-e64j5CwpMRuKfxZnaru6i8?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #2891",
      uri: "https://arweave.net/dHEf5A7ea22Gxfn7oP-FYeccCXnclDyC1F81C_Qny5I",
      mintAddress: "Dx6U79JE9U8asCGdL1pCgW2MVKEUQtHkrwP4aSaSrCAM",
      type: "Solana",
      image:
        "https://www.arweave.net/nBIU7N5ViAn52LNLGVY7I-VA_Ev6QS2GvXxw8N0OPnI?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #3031",
      uri: "https://arweave.net/Ginx3UXScbsKNqOG8pUKJfktpODQJ7CTibUcUHMRvDk",
      mintAddress: "4sXnaTDSpBp7eU7oifS31g9aMADfdc3JwXdrhbobjeNo",
      type: "Solana",
      image:
        "https://www.arweave.net/uswMblx0ZuU6KZW_WFKS-3Eng5ltby5T1oYfIq6X7Y0?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Girls #713",
      uri: "https://arweave.net/__feBo1nc_wJWQYykxQ2M08Rx-CvPdR8MHKHxIpBAD4",
      mintAddress: "8fZfrMgvcaziwDvLhDYwxAsUWzMewDYXZsng5mBEFyJ2",
      type: "Solana",
      image:
        "https://arweave.net/ubELDmjF2-f9VYcgw6mLgRAD7jkbVbhNMPVvOBKTWWw?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #2894",
      uri: "https://arweave.net/2Ikkz0Xz9ZFTIpLLAl_JgwYLUJ37i9e1_-h6gWP8rOY",
      mintAddress: "4fshdEjuHbN6piJUzBoSW5hWFRj75MExUdMEMSo3Soiq",
      type: "Solana",
      image:
        "https://www.arweave.net/NAWEw2wjxV4LCzscqs7rRCkH9cRpOqkiDQSBtbVmUg4?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Girls #1970",
      uri: "https://arweave.net/YzWSEAXAuTkjipgBxrjOYaFEld_I3nOhLFeESa0OaVk",
      mintAddress: "9cVUQ3uhbRnvyA9FMpEx4sUkjhasyvrHtHEPj2SxH85a",
      type: "Solana",
      image:
        "https://arweave.net/OhbLDpz0p-4PTWxYd19Orv_gRwMdd73itPR4czU2YLY?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #3027",
      uri: "https://arweave.net/PO6WRKrPNAg2l35kMyH0xlUrXWU5VSMXokqubGHepnQ",
      mintAddress: "A9E811grTyaKmvk9cqY3rNJ8d598U7hnACW9dwiRhAcs",
      type: "Solana",
      image:
        "https://www.arweave.net/JfGJjVNgSK7MMIspVH4WL3BLcZ-3mHqnHLiOsNFZdIM?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #3036",
      uri: "https://arweave.net/koXA2Jkl_h707gnAps6fkME8tW3MummPIiVJOp9GjFY",
      mintAddress: "9yUCpFmhuiNNMtnhKKpAhwXNNPBGYfXW5aigudUTc1qu",
      type: "Solana",
      image:
        "https://www.arweave.net/AImG_jljIDee64vPDKOrQ1ZVleV-LpTGMNA7A1wqZIU?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Girls #1987",
      uri: "https://arweave.net/PgT-wHat77BoniGCqd6GW90uPu7SHAJVpBC3EZLtNjs",
      mintAddress: "GDocQdU1BYFwdzGB1jCYaSb3KMdGCgfLQmmEiq6xeTXx",
      type: "Solana",
      image:
        "https://arweave.net/Mh2ZuPnAyH2wymZ6nPO6A1rXUyqhH4t6ClwfFMDK-X0?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #2893",
      uri: "https://arweave.net/69xp5s7LLfeLgSoo4DjSBOqJ-2A-aj2UZkTfdnh3YuA",
      mintAddress: "96Mp1SkhjY6yxw8KsBaKojBUsLmEkEnNvjNaPu7kHNBJ",
      type: "Solana",
      image:
        "https://www.arweave.net/ndZC8SjcGmJ6DblW422GJCnykpiA-qDMHZlIvE7s2gw?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Boy #2887",
      uri: "https://arweave.net/Ij08TsvedSftCvVJzdEdNQouex_NZRBX9kLoXpN8fVg",
      mintAddress: "G84mBEd89FugtSm6eAqfMo5NKrm5MPkc2nCBYDtb3ZVc",
      type: "Solana",
      image:
        "https://www.arweave.net/tyek3upGXmznbXv8ptW4aCnlA33lq5w6tVuFLPBoUBc?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Solana Money Girls #2018",
      uri: "https://arweave.net/KkTKHymP-UfRMmXC5Vcqy4EwPTFRRSOKFYmd6Ek2KTQ",
      mintAddress: "GW4ni6C3WxCU4euqTxDUZvqhqQ4AeZpBc3fCppYPR9RE",
      type: "Solana",
      image:
        "https://arweave.net/nlcIuydwqm5ASbuaIeoGnbbkS8BivYYcMdaL2GRrYjo?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Girls #852",
      uri: "https://arweave.net/-eQKqlhdD5hFnmU8OHADIXnZZz_2xpKJWSB7XjVMkDc",
      mintAddress: "DCiMe7HeKrYCNqMQmUcFC68m6bNC5tmpm1d4iHwFkCyX",
      type: "Solana",
      image:
        "https://arweave.net/jE-bldR5SprzQqCtwxOWe_7G9l-hOOLapY_8xTEarfU?ext=png",
      collectionName: "-",
    },
    {
      name: "Solana Money Boy #3037",
      uri: "https://arweave.net/-eSmzlIZLzOyix-9jaDwSLZpeU6LdEJz7o-XAp6J9Sc",
      mintAddress: "5BgbHRZ4k6JtdhSzpqwpWmsrRWxGspfEMjzbPMjxDB8T",
      type: "Solana",
      image:
        "https://www.arweave.net/wP-WgnL78K31o_kxHOGVXcgz9-4Xg3CmdSFOLn8JGz8?ext=png",
      collectionName: "The Solana Money Boys",
    },
    {
      name: "Money Key #1262",
      uri: "https://arweave.net/f_8V3JO5AMopKeDqM94GHlobxJ7Hm0c-BcWi8W8LP-o",
      mintAddress: "ExcWu8j1yysAf5yMpYfc1mpmndEgBQcywvSXLpHLy3M6",
      type: "Solana",
      image:
        "https://arweave.net/YbtD_7nQAfOHGxPTyjvFwzvTEGBy7qB40uW-sE2mt8Q?ext=png",
      collectionName: "Money Keys",
    },
    {
      name: "SolMee #6769",
      uri: "https://www.arweave.net/incpEd7D4hK49mR0QUx4zESq9J0m28kMmVVLtP3LsPs",
      mintAddress: "4CNPwnGsR88QNrM31r9uYcQjfzJFbsRUsxKv7mCkUmvV",
      type: "Solana",
      image:
        "https://www.arweave.net/CdO12spTWprJGEjP8I_-ReFfzjavpC4pPS3n8ingoN0?ext=jpg",
      collectionName: "Solana Mees",
    },
    {
      name: "SolMee #19692",
      uri: "https://www.arweave.net/p1HIdlxF0LHxcw6VSfi4fugYxdniTWIfrbhrJezuzQw",
      mintAddress: "GqvGpXtuUmTrHuv1KLbc8br5MxxY8E3NGFx9fehEWJef",
      type: "Solana",
      image:
        "https://www.arweave.net/zKJVXF30V66nYSVOFqBYE06q5KzNwt2n5PJDTRLeJzA?ext=jpg",
      collectionName: "Solana Mees",
    },
    {
      contractAddress: "0x2e2691819d3441994e9709e776bd77d08cd9e89b",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000213",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmYLhZagGeApcxFM1xhWRPzPYyx5USHk8PgyAFuL8ti1Vy",
      collectionName: "Genseng: An Infinite Regress",
      name: "Genseng 103",
    },
    {
      contractAddress: "0x2e2691819d3441994e9709e776bd77d08cd9e89b",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000225",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmSA6VdTKXzPw6SRUEYMbHP9Zv59Ni6g1RFBJxuNL2U6HW",
      collectionName: "Genseng: An Infinite Regress",
      name: "Genseng 121",
    },
    {
      contractAddress: "0x2e2691819d3441994e9709e776bd77d08cd9e89b",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000227",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmZz2JJPNzBRp9PSX9LmxFsgdBxhJ6Q8QQmjsyMY3RiX4h",
      collectionName: "Genseng: An Infinite Regress",
      name: "Genseng 123",
    },
    {
      contractAddress: "0x2e2691819d3441994e9709e776bd77d08cd9e89b",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000283",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmTKJvyZJL2h2Cm5YLWoziFKUw8XtmQcKYB9Qkd8vzHGrA",
      collectionName: "Genseng: An Infinite Regress",
      name: "Genseng 215",
    },
    {
      contractAddress: "0x2e2691819d3441994e9709e776bd77d08cd9e89b",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000034e",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmXdgokfZ9omBSKjEmozvkWRQgw7tbNZCR1wxXUCW44N2h",
      collectionName: "Genseng: An Infinite Regress",
      name: "Genseng 418",
    },
    {
      contractAddress: "0x2fb6a7747f52ee559e9fe0fa8ba4608fdbf1d541",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007db",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmaHKGbbtxivn1TKQepvWV4yQPaKaU5GtUcuJMp6MhL86z/2011.png",
      collectionName: "4096 #2011",
      name: "4096 #2011",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000744",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmPxL5wDbweQFcZYAqPZ6txi4qCEGLFYaU4uWkx5rkBeR3",
      collectionName: "Fly Frog 1860",
      name: "Fly Frog 1860",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000745",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmNxi9eGeeFVGjiyK4hXDjib5QoQ3WHMTfTDfMrBvfHyJd",
      collectionName: "Fly Frog 1861",
      name: "Fly Frog 1861",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000077c",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmU9d1HNsiQHk88FyytVWSt65xiBBjLxrUzN2BEyrAugZo",
      collectionName: "Fly Frog 1916",
      name: "Fly Frog 1916",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000077e",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmbUmvDEv53CMwidREwkrXam3PH3KUGmMhDc44JChWmXFz",
      collectionName: "Fly Frog 1918",
      name: "Fly Frog 1918",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007bf",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmUG8J4xAuqQLZhV7XXT4p8Vrr5TB8WB7CMZkeJ3FW63RG",
      collectionName: "Fly Frog 1983",
      name: "Fly Frog 1983",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007c0",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmSBxSivtZ2PKkRZjPSQnVcX5PXSWaDNv5oPWs8KntqceM",
      collectionName: "Fly Frog 1984",
      name: "Fly Frog 1984",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000811",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmWRksnoPiq1pszE4R6rc5WZFrBbj6t8tkwBxUaMuy1Hkn",
      collectionName: "Fly Frog 2065",
      name: "Fly Frog 2065",
    },
    {
      contractAddress: "0x31d4da52c12542ac3d6aadba5ed26a3a563a86dc",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000a00",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmbYUsPTsyfW12YapvgKAbT49aXpyRxxiTecXfFDW92igJ",
      collectionName: "Fly Frog 2560",
      name: "Fly Frog 2560",
    },
    {
      contractAddress: "0x385edc73dd943b6135e5dd2fcefd7311c58e8710",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000666",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcXET59P2M7AvMQK6wvcR3QzV1d2jKFW5gihD75ntx1oQ",
    },
    {
      contractAddress: "0x43b31fa35672c844f5dab60f2fb72474955292cd",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000bdc",
      type: "Ethereum",
      image: "https://mint.revolab.org/api/images/MrCrypto3036.png",
      collectionName: "Mr Crypto #3036",
      name: "Mr Crypto #3036",
    },
    {
      contractAddress: "0x43b31fa35672c844f5dab60f2fb72474955292cd",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000bde",
      type: "Ethereum",
      image: "https://mint.revolab.org/api/images/MrCrypto3038.png",
      collectionName: "Mr Crypto #3038",
      name: "Mr Crypto #3038",
    },
    {
      contractAddress: "0x43b31fa35672c844f5dab60f2fb72474955292cd",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000bdf",
      type: "Ethereum",
      image: "https://mint.revolab.org/api/images/MrCrypto3039.png",
      collectionName: "Mr Crypto #3039",
      name: "Mr Crypto #3039",
    },
    {
      contractAddress: "0x43b31fa35672c844f5dab60f2fb72474955292cd",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000be0",
      type: "Ethereum",
      image: "https://mint.revolab.org/api/images/MrCrypto3040.png",
      collectionName: "Mr Crypto #3040",
      name: "Mr Crypto #3040",
    },
    {
      contractAddress: "0x54f3d69a19a8db554a85688704c7f19f4be111d3",
      tokenId: "0x01",
      type: "Ethereum",
      image: "https://exodia.io/nft/1.mp4",
      collectionName: "Lifetime Access",
      name: "Lifetime Access",
    },
    {
      contractAddress: "0x623be6b50746ca627f5f9399a5fc0e07baf304eb",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000003e4",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmYzAx18iEMgpRoHCrngBJHuS7TPdhThnrYrXLgKmEwt1R",
      collectionName: "Jail Turtle #996",
      name: "Jail Turtle #996",
    },
    {
      contractAddress: "0x623be6b50746ca627f5f9399a5fc0e07baf304eb",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000003e5",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmfAmFBhQEAMv9jvesQtbHYUfUjDgicoqGn9JL3qewhYuP",
      collectionName: "Jail Turtle #997",
      name: "Jail Turtle #997",
    },
    {
      contractAddress: "0x7f4dd825f2e9cb89ae1091134c65356ba36dd50e",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007af",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/Qmdhw56h9qGxhfcUstiiy29ExKNAbtDRXeatMEvAGpj9d1/image/3d0dc43e7d47786647cd6a558913426e11eb2db93fc4cc96866ef1345380138a.png",
    },
    {
      contractAddress: "0x7f4dd825f2e9cb89ae1091134c65356ba36dd50e",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007b1",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/Qmdhw56h9qGxhfcUstiiy29ExKNAbtDRXeatMEvAGpj9d1/image/3d15fbafad0c725d61ab14cc4a4cb46164a0c7e2806d559e5c1cefe442be0a44.png",
    },
    {
      contractAddress: "0x7f4dd825f2e9cb89ae1091134c65356ba36dd50e",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007b2",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/Qmdhw56h9qGxhfcUstiiy29ExKNAbtDRXeatMEvAGpj9d1/image/3d16ea46dd601f4dc00b2c2c076ca724c5c49bd0bc0d1909257df0b42ff44c65.png",
    },
    {
      contractAddress: "0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab",
      tokenId:
        "0x000000000000000000000000000000000000000000000000004f29b614319191",
      type: "Ethereum",
      image: "https://ipfs.io/ipfs//s:evmetadata/unframed22282385159721361",
      collectionName: "SICKPEPE RARE Series 33, Card 7",
      name: "SICKPEPE RARE Series 33, Card 7",
    },
    {
      contractAddress: "0x90f87748c68c4b3e63256831717365b1f45f55f4",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000fb4",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcqafzRQhbfeSxKPQgamEPBWG9taAsztaoCbYcA8xtGVe/4020.png",
      collectionName: "Cuddles Bears Daycare #4020",
      name: "Cuddles Bears Daycare #4020",
    },
    {
      contractAddress: "0x90f87748c68c4b3e63256831717365b1f45f55f4",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000fb5",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcqafzRQhbfeSxKPQgamEPBWG9taAsztaoCbYcA8xtGVe/4021.png",
      collectionName: "Cuddles Bears Daycare #4021",
      name: "Cuddles Bears Daycare #4021",
    },
    {
      contractAddress: "0x90f87748c68c4b3e63256831717365b1f45f55f4",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000fb8",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcqafzRQhbfeSxKPQgamEPBWG9taAsztaoCbYcA8xtGVe/4024.png",
      collectionName: "Cuddles Bears Daycare #4024",
      name: "Cuddles Bears Daycare #4024",
    },
    {
      contractAddress: "0x90f87748c68c4b3e63256831717365b1f45f55f4",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000fb9",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcqafzRQhbfeSxKPQgamEPBWG9taAsztaoCbYcA8xtGVe/4025.png",
      collectionName: "Cuddles Bears Daycare #4025",
      name: "Cuddles Bears Daycare #4025",
    },
    {
      contractAddress: "0x90f87748c68c4b3e63256831717365b1f45f55f4",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000fba",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcqafzRQhbfeSxKPQgamEPBWG9taAsztaoCbYcA8xtGVe/4026.png",
      collectionName: "Cuddles Bears Daycare #4026",
      name: "Cuddles Bears Daycare #4026",
    },
    {
      contractAddress: "0x9388926eca492e867f9cbe0630243f9595df958f",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000120e",
      type: "Ethereum",
      image:
        "https://hlcb64ao3k.execute-api.us-east-2.amazonaws.com/image/4622",
      collectionName: "Prediction #4622",
      name: "Prediction #4622",
    },
    {
      contractAddress: "0x9388926eca492e867f9cbe0630243f9595df958f",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000120f",
      type: "Ethereum",
      image:
        "https://hlcb64ao3k.execute-api.us-east-2.amazonaws.com/image/4623",
      collectionName: "Prediction #4623",
      name: "Prediction #4623",
    },
    {
      contractAddress: "0x9cda227147684fc93850d596e13e82ba6599beee",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000908",
      type: "Ethereum",
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogODBweDsgfTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyNTI0OCIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC13ZWlnaHQ9ImJvbGQiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJiYXNlIj4yMzEyPC90ZXh0Pjwvc3ZnPg==",
      collectionName: "Player #2312",
      name: "Player #2312",
    },
    {
      contractAddress: "0x9cda227147684fc93850d596e13e82ba6599beee",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000a03",
      type: "Ethereum",
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogODBweDsgfTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyNTI0OCIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC13ZWlnaHQ9ImJvbGQiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJiYXNlIj4yNTYzPC90ZXh0Pjwvc3ZnPg==",
      collectionName: "Player #2563",
      name: "Player #2563",
    },
    {
      contractAddress: "0xbee3eeeb8ba59f0a3b3e0a302ef921d6d01e64d2",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000044e",
      type: "Ethereum",
      image: "https://gojuonft.io/img/1102.png",
      collectionName: "GojuoNFT #1102",
      name: "GojuoNFT #1102",
    },
    {
      contractAddress: "0xd07e72b00431af84ad438ca995fd9a7f0207542d",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000007ef",
      type: "Ethereum",
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48ZGVmcz48ZmlsdGVyIGlkPSJmMSIgeD0iMCIgeT0iMCIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjgiIC8+PC9maWx0ZXI+PC9kZWZzPjxzdHlsZT4uYmFzZSB7IGZpbGw6IGJsYWNrOyBmb250LWZhbWlseTogY291cmllcjsgZm9udC1zaXplOiA4cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IndoaXRlIiAgLz48dGV4dCB4PSIxMCIgeT0iMjAiIGNsYXNzPSJiYXNlIj4weDA0OTc2ZGQ4MTY0YTg2NzI3ZGY2Nzg3OTIxMTViNzA0YTkwMWFkYTRlYjYzYWY3ODEyZTA5MmVlOWRkMzA2YmI8L3RleHQ+PC9zdmc+",
      collectionName: "Hashes ID #2031",
      name: "Hashes ID #2031",
    },
    {
      contractAddress: "0xd1e1bf85823602fe60b7937f3eb7fd7a8abdb9e9",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000037a",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcrCtGwuHS99aeWbsVDRtfxCGko1mYa6rAzH9mj6UewUD/890.png",
      collectionName: "CryptoMaze #890",
      name: "CryptoMaze #890",
    },
    {
      contractAddress: "0xd1e1bf85823602fe60b7937f3eb7fd7a8abdb9e9",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000003b8",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcrCtGwuHS99aeWbsVDRtfxCGko1mYa6rAzH9mj6UewUD/952.png",
      collectionName: "CryptoMaze #952",
      name: "CryptoMaze #952",
    },
    {
      contractAddress: "0xd84a9715eb2695ece72856aee3bf3f8901112005",
      tokenId:
        "0x000000000000000000000000000000000000000000000000000000000000011f",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/Qmd9JRL28MSiNcWUEHJCqkYrBG3xChed8j6tRoLWoDQh6o",
      collectionName: "Chillblocks #287",
      name: "Chillblocks #287",
    },
    {
      contractAddress: "0xde1ba923233fa1736992f7d5824c3b086b86f67c",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000383",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/bafybeihzikmaaonmvgdwr5aqmtordyhw5cv5iydc4k3id6mzrttpttivga/899.png",
      collectionName: "Marinela - Miss Metaverse #899",
      name: "Marinela - Miss Metaverse #899",
    },
    {
      contractAddress: "0xde1ba923233fa1736992f7d5824c3b086b86f67c",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000000389",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/bafybeihzikmaaonmvgdwr5aqmtordyhw5cv5iydc4k3id6mzrttpttivga/905.png",
      collectionName: "Rikke - Miss Metaverse #905",
      name: "Rikke - Miss Metaverse #905",
    },
    {
      contractAddress: "0xef3a81ab22c53f054332344971a745b8f270cb55",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000000da",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmVwDpinKnJ3GZ23QqEm1Q5GEGAHw8f9uAXTxwjX3wsG9L/805.png",
      collectionName: "Trashcan #218",
      name: "Trashcan #218",
    },
    {
      contractAddress: "0xf80ce420a75ee93cbb1af9d9c16e9c2f12b92cd3",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000000be",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcBTyPyDEiDmm29G9r2u1A41wBdV1iMDNWYiNx85BtwvN",
      collectionName: "190",
      name: "190",
    },
    {
      contractAddress: "0xf80ce420a75ee93cbb1af9d9c16e9c2f12b92cd3",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000000bf",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmQiSNWgT18uNqUsrVWPB2fnzKoqoKd1qZkwH52B37PGCF",
      collectionName: "191",
      name: "191",
    },
    {
      contractAddress: "0xf80ce420a75ee93cbb1af9d9c16e9c2f12b92cd3",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000000c0",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmeAQKeXvswnLpm6aBEikMDMYMbvBg6CQq31x6ARPP8M7K",
      collectionName: "192",
      name: "192",
    },
    {
      contractAddress: "0xf80ce420a75ee93cbb1af9d9c16e9c2f12b92cd3",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000000c1",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmQ3ddLdmAB4b12VCYiJDWr8Xm2gozxcWpKV2zkWV7WRBn",
      collectionName: "193",
      name: "193",
    },
    {
      contractAddress: "0xf80ce420a75ee93cbb1af9d9c16e9c2f12b92cd3",
      tokenId:
        "0x00000000000000000000000000000000000000000000000000000000000000c2",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmcX9Vj3BT1FXi2FupzNGXfio6kLABTvwJUgKeUkFGghEt",
      collectionName: "194",
      name: "194",
    },
    {
      contractAddress: "0xfb7d186e24e128be1f1339fb9c2ba6fdbd87c6f9",
      tokenId:
        "0x0000000000000000000000000000000000000000000000000000000000002ea9",
      type: "Ethereum",
      image:
        "https://ipfs.io/ipfs/QmPLkTXEPE5pubAf8saKNf5vX6DvFbfye7ZPxhARG8bjDo",
      collectionName: "GRILLZ GANG TICKET #11945",
      name: "GRILLZ GANG TICKET #11945",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Select title="All Collections" className="rounded-full font-[19px]" />
      </div>
      <div className="grid grid-cols-3 gap-3 my-4 ">
        {nfts.map((data, index) => (
          <NftCard key={"nftCard-" + index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Art;
