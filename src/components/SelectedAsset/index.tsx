import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { Button } from "components/FormComponents";
import { TickCircle, VR } from "components/Icons";
import AframeComp1 from "components/AframeComp1";
import AframeComp2 from "components/AframeComp2";
import { GalleryItem } from "modal/Gallery";
import ErrorMessage from "components/ErrorMessage";
import { placeBid } from "redux/slices/profileSlice";

export interface HeroProps {
}

const SelectedAsset: FC<HeroProps> = ({}) => {
	const [ selectedAsset, setSelectedAsset ] = useState<GalleryItem>();
	const [ errorMessage, setErrorMessage ] = useState<String>("");
  	const [ error, setError ] = useState<Boolean>(false);
	const [loadingButton, setLoadingButton] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);

	const { selectedTagIndex, selectedIndex, assets } = useAppSelector(state => state.marketplace);
    const { publicKey, sendTransaction } = useWallet();
    const connection = new Connection(clusterApiUrl('testnet'));
	const dispatch = useAppDispatch();

	useEffect(() => {
		if(selectedIndex != -1) {
			setSelectedAsset(assets.rows[selectedTagIndex].items[selectedIndex]);
		}
		setError(false);
	}, [selectedIndex])

	const placeBidAction = async () => {
        if (!publicKey) {
            toast.error("connect wallet please", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        };
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey("6BnAzdBGmUdgcRaTaFGBvMAiAgC2cELiU5q12hBYb8YN"),
                lamports: LAMPORTS_PER_SOL * selectedAsset.currentBid,
            })
        );
		setLoadingButton(true);
        dispatch(placeBid({
            data: { selectedAsset, selectedIndex, transaction, connection, sendTransaction },
            successFunction: () => {
                toast.success('You got a room successfully. You can create a room and also decorate a room with own nfts in the profile', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setError(false);
				setLoadingButton(false);
            },
            errorFunction: (err) => {
                setError(true);
                if(!!err){
                    setErrorMessage(err);
				}
				setLoadingButton(false);
            },
            finalFunction: () => {
                setLoading(false);
				setLoadingButton(false);
            },
        }))
    }

	return(
		<div>
			<div className="relative w-full h-[314px] rounded-2xl -mt-5">
				{selectedIndex == 0 ? (
					<AframeComp1 />
				) : (
					<AframeComp2 user={{rooms: []}} permitionFlag={true}/>
				)}
			</div>
			{selectedAsset && (
				<div className="flex justify-between my-6">
					<div className="flex flex-col max-w-4xl ">
						<span className="text-[15px] text-secondary">{selectedAsset.title}</span>
						<span className="mt-3 text-sm text-gray-950">
						{selectedAsset.description}
						</span>
						<span>
							<div className="flex">
								<div className="mt-[7px]"><TickCircle /></div>
								<span className="text-[12px] text-secondary mt-1">&nbsp;{selectedAsset.collection}</span>
							</div>
							<div className="flex mt-1">
								<span className="text-xs text-gray-950 mt-1">Current bid:&nbsp;&nbsp;&nbsp;</span>
								<div className="flex">
									<div className="h-[16px] w-[16px]">
										<Image
												src="/images/icons/sol.png"
												alt="sol-icon"
												height={16}
												width={16}
										/>
									</div>

									<span className="text-xs text-white mt-[3px]">
										&nbsp;&nbsp;{selectedAsset.currentBid} SOL
									</span>
								</div>
							</div>
							<div className="flex mt-2">
								<span className="text-xs text-gray-950">Ending in:&nbsp;&nbsp;</span>
								<span className="text-xs text-white">{selectedAsset.endingIn}</span>
							</div>
							{error && <ErrorMessage errorMessage={errorMessage} />}
						</span>
					</div>
					<div className="flex flex-col justify-between min-w-[150px]">
						<div></div>
						<Button 
							className="rounded-full btn btn-xl btn-secondary float-right" 
							disableOnLoading
							loading={loadingButton} onClick={placeBidAction}
						>
							Buy Now
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SelectedAsset;