import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

type Props = {
  onUseWalletClick: () => void;
};

export const SelectAndConnectWalletButton: FC<Props> = ({
  onUseWalletClick,
}) => {
  const { setVisible } = useWalletModal();
  const { wallet, connect, connecting, publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey && wallet) {
      try {
        connect();
      } catch (error) {
        console.log("Error connecting to the wallet: ", (error as any).message);
      }
    }
  }, [wallet]);

  const handleWalletClick = () => {
    try {
      if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
      onUseWalletClick();
    } catch (error) {
      console.log("Error connecting to the wallet: ", (error as any).message);
    }
  };

  return (
    <button
      className="gap-3 font-normal normal-case btn rounded-3xl btn-secondary"
      onClick={handleWalletClick}
      disabled={connecting}
    >
      {publicKey ? <div>Login With Wallet</div> : <div>Connect Wallet</div>}
    </button>
  );
};
