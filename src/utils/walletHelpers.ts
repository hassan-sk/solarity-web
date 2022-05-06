import base58 from "bs58";
import Web3 from "web3";

export const signMessage = async (
  type: "solana" | "ethereum",
  message: string,
  provider: any,
  walletAddress: string
) => {
  let signature;
  if (type === "solana") {
    const messageToSign = new TextEncoder().encode(message);
    let signatureEncoded: Uint8Array;
    signatureEncoded = await provider.signMessage(messageToSign);
    signature = base58.encode(signatureEncoded);
  } else {
    let web3 = new Web3(provider);
    signature = await web3.eth.personal.sign(message, walletAddress, "");
  }
  return signature;
};
