import Image from "next/image";
import discordLogo from "assets/images/brand-logos/ethereum.png";
import { FC, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";
import EthWalletConnectionPopup from "components/EthWalletConnectionPopup";
import { minifyAddress } from "utils";

const EthereumLink: FC = () => {
  const {
    ethereumWalletAddress,
    ethereumConnected,
    _id: userId,
  } = useSelector((state: RootStateOrAny) => state.profile.data);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <EthWalletConnectionPopup
        open={show}
        onClose={() => setShow(false)}
        onProviderFetch={async (web3, walletAddress) => {
          let signature = await web3.eth.personal.sign(userId, walletAddress);
          dispatch(
            linkAccounts({
              data: {
                link: "ethereum",
                signature,
                walletAddress,
              },
              finalFunction: () => {
                setShow(false);
                setLoading(false);
              },
            })
          );
        }}
      />
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
            <Image
              src={discordLogo}
              height="25"
              width="25"
              objectFit="contain"
            />
            <span>UNLINK ETHEREUM</span>
          </button>
        )}
        {!ethereumConnected && (
          <a
            className={`btn btn-primary bg-[#c99d66] flex space-x-2 ${
              loading ? "loading" : ""
            }`}
            onClick={() => setShow(true)}
          >
            <Image
              src={discordLogo}
              height="25"
              width="25"
              objectFit="contain"
            />
            <span>LINK ETHEREUM</span>
          </a>
        )}
        {ethereumConnected ? (
          <p className="text-gray-950">
            You account is linked with ethereum address:{" "}
            <span className="font-bold text-green-500	">
              {minifyAddress(ethereumWalletAddress, 5)}
            </span>
          </p>
        ) : (
          <p className="text-gray-950">
            You account is not linked with any ethereum address
          </p>
        )}
      </div>
    </>
  );
};

export default EthereumLink;
