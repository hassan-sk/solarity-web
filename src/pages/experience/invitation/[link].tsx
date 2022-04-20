import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import JoinRoomModal from "components/Modals/JoinRoomModal";
import { getServerSideProps, InvitationPageProps } from "modules/Experience/Invitation";
import NoInvitationView from "modules/Experience/NoInvitationView";
import { Xicon, Revert, Accept } from "components/Icons";
import ACTIONS from "../../../config/actions"; 
import {
  setModel,
  setName,
  addPeer,
  addMsg,
  removePeer,
  setRooms,
  setMsg,
  setRoomIndex
} from "../../../redux/slices/chatSlice";

const ProfileIndex: FC<InvitationPageProps> = ({ invitation, success }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { rooms } = useAppSelector(state => state.chat);
  const  [joinModalOpen,setJoinModalOpen] = useState(false)
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(-1);
  const handleJoinModalToggle = () => {
    if(selectedRoomIndex != -1){
      setJoinModalOpen(!joinModalOpen)
    }
  }
  if (!success) return <NoInvitationView />;
  useEffect(() => {
    // When a user click f5 key, it helps to forget a user's name.
    if (localStorage.getItem("name")) {
      dispatch(setName(localStorage.getItem("name")));
    }

    // This part is main for socket.
    if (!window.socket) {
      return;
    }
    if (!window.listen) {
      window.socket.on(ACTIONS.ADD_PEER, (data: any) => {
        dispatch(addPeer(data));
      });
      window.socket.on(ACTIONS.SEND_MSG, (data: any) => {
        dispatch(addMsg(data));
      });
      window.socket.on(ACTIONS.REMOVE_PEER, (data: any) => {
        dispatch(removePeer(data));
      });

      window.socket.on(ACTIONS.ROOM_LIST, (data: any) => {
        dispatch(setRooms(data.rooms));
      });

      window.socket.on(ACTIONS.CREATE_ROOM, (data: any) => {
        dispatch(setMsg(data.msgs));
      });

      window.socket.on(ACTIONS.ROOM_READY, (data: any) => {
        router.push(`experience/room?rid=${data.roomId}`);
      });
      window.listen = true;
    }

    window.socket.emit(ACTIONS.ROOM_LIST, {});
  }, []);

  useEffect(() => {
    if(rooms && rooms.length != 0) {
      const roomIndex = rooms.findIndex(s => s.roomId == invitation.roomId);
      if(roomIndex != -1) {
        setSelectedRoomIndex(roomIndex);
        dispatch(setRoomIndex(roomIndex));
      }
    }
  }, [rooms]);

  const deny = () => {
    if (!!window.socket) {
      window.socket.emit(ACTIONS.ACEEPT_INVITATION, {
        roomId: invitation.roomId,
        username: invitation.name,
      });
    }
    router.push("/");
  };

  const back = () => {
    router.push("/");
  };
  return (
    <div className="absolute top-[30vh] left-[70vh] w-[60vh]">
      <div className="bg-brandblack rounded-3xl w-full">
        <div className="border-borderwidget p-10">
          <div className="flex flex-col mb-10">
            <div className="text-lg font-bold text-center">Room Invitation</div>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-semibold">Room Name</span>
            <span className="font-thin text-secondary">
              {invitation.roomName}
            </span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-semibold">Room Number</span>
            <span className="font-thin text-secondary">
              {invitation.roomId}
            </span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-semibold">Invited By</span>
            <span className="font-thin text-secondary">{invitation.name}</span>
          </div>
          {invitation.state ? (
            <div>
              <div className="text-secondary">The Invitation is expired.</div>
              <div className="w-full flex justify-end">
                <button
                  className="gap-2 text-xs normal-case rounded-full btn btn-primary px-6"
                  onClick={back}
                >
                  <Revert />
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 justify-between px-16">
              <button
                className="gap-2 text-xs normal-case rounded-full btn btn-primary px-6"
                onClick={handleJoinModalToggle}
              >
                <Accept />
                Accept
              </button>
              <button
                className="gap-2 text-xs normal-case rounded-full btn btn-primary px-6"
                onClick={deny}
              >
                <Xicon />
                Deny
              </button>
            </div>
          )}
        </div>
      </div>
      <JoinRoomModal 
        open={joinModalOpen} 
        onClose={handleJoinModalToggle} 
        roomName={invitation.roomName}
        creator={invitation.name}
        speakers={(rooms && rooms.length != 0 && rooms[selectedRoomIndex] != undefined) ? rooms[selectedRoomIndex].speakers : []}
      />
    </div>
  );
};

export { getServerSideProps };

export default ProfileIndex;
