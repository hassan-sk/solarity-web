import Image from "next/image";
import discordLogo from "assets/images/brand-logos/ethereum.png";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";

const EthereumLink: FC = () => {
  const { ethereumWallet, ethereumConnected } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="border border-brandblack rounded-3xl p-5 flex items-center space-x-4">
      {ethereumConnected && (
        <button
          className={`btn btn-primary bg-[#c99d66] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          onClick={() => {
            setLoading(true);
            dispatch(
              unlinkAccounts({
                data: {
                  link: "ethereum",
                },
                finalFunction: () => {
                  setLoading(false);
                },
              })
            );
          }}
        >
          <Image src={discordLogo} height="25" width="25" objectFit="contain" />
          <span>UNLINK ETHEREUM</span>
        </button>
      )}
      {!ethereumConnected && (
        <a
          className={`btn btn-primary bg-[#c99d66] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
        >
          <Image src={discordLogo} height="25" width="25" objectFit="contain" />
          <span>LINK ETHEREUM</span>
        </a>
      )}
      {ethereumConnected ? (
        <p className="text-gray-950">
          You account is linked with ethereum address:{" "}
          <span className="font-bold text-green-500	">{ethereumWallet}</span>
        </p>
      ) : (
        <p className="text-gray-950">
          You account is not linked with any ethereum address
        </p>
      )}
    </div>
  );
};

export default EthereumLink;
