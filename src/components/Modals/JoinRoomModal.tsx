import React, { FC, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Image from "next/image";
import { toast } from 'react-toastify';
import Base from "components/Modals/Base";
import BlackInput from "components/Inputs/BlackInput";
import AvatarPanel from "components/AvatarPanel";
import { useRouter } from 'next/router'
import { models } from "data/experience";
import { setModel } from "redux/slices/chatSlice";

const JoinRoomModal: FC<any> = ({
  open,
  onClose,
  roomname,
  creator,
  avatars,
}: {
  open: boolean;
  onClose: () => void;
  roomname: string;
  creator: string;
  avatars: string[];
}) => {
  const [name, setName] = useState('');
  const [modelIndex, setModelIndex] = useState(0);
  const [addOnsIndex, setAddOnsIndex] = useState(0);
  const { profileData, selectedIndex, rooms } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
    selectedIndex: state.chat.selectedIndex,
    rooms: state.chat.rooms,
  }));
  const dispatch = useDispatch();
  const router = useRouter();

  const joinRoom = () => {
    dispatch(setModel(modelIndex));
    if(!!window.socket)
      router.push(`experience/room?rid=${rooms[selectedIndex].roomId}`);
  }

  return (
    <Base open={open} onClose={onClose} title="Join a Game">
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="col-span-1 flex justify-between py-4 px-7 bg-primary rounded-xl">
          <AvatarPanel modelPath={models[modelIndex].modelUrl} position={models[modelIndex].position} rotation={models[modelIndex].rotation} scale={models[modelIndex].scale} />
        </div>
        <div className="flex justify-between py-4 px-7 rounded-xl">
          <div className="gap-2">
            <h2 className="text-lg font-light">Plaza</h2>
            {/* <span className="text-md text-gray-950">Created by {'Spider'}</span><br/>
            <span className="text-md text-gray-950">Members {3}</span><br /> */}
            <div className="text-xs text-gray-950 mt-6">your name.</div>
              <div className="mt-2">
                <div className="relative w-full text-gray-100 focus-within:text-gray-400">
                  <h3>{profileData.username}</h3>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="avatarlist">
          <div className="flex gap-1 avatar-2d-list">
            {!!models && models.length !=0 && models.map((model, index) => (
              <div className={`avatar-2d-item hover:border border border-transparent hover:border-gray-400 `+ (modelIndex == index ? `border-gray-100`: ``)} onClick={() => setModelIndex(index)} key={index}>
                <img src={model.imageUrl} width={50} height={50} alt={model.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="addOnslist">
          <div className="flex gap-1 addOns-2d-list">
            {[0,1,2,3,4,5].map((num, index) =>(
              <div className={`addOns-2d-item hover:border border border-transparent hover:border-gray-400 `+ (addOnsIndex == num ? `border-gray-100`: ``)} onClick={() => setAddOnsIndex(num)} key={index}>
                <img src="images/addOns/addOn.jpg" width={40} height={40} alt="AddOns" />
              </div> 
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="rounded-full btn btn-sm btn-secondary" onClick={joinRoom}>
          Join
        </button>
      </div>
    </Base>
  );
};

export default JoinRoomModal;
