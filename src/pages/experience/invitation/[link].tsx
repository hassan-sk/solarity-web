import { useDispatch } from 'react-redux';
import React, { FC, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from "components/Layout";
import Base from "components/Modals/Base";
import Hero from "modules/User/Hero";
import Home from "modules/User/Home";
import RightSidebar from "modules/User/Sidebar";
import { getServerSideProps, InvitationPageProps } from "modules/experience/Invitation";
import NoInvitationView from "modules/experience/NoInvitationView";
import { Xicon, Revert, Accept } from "components/Icons";
import { setModel, setName, addPeer, addMsg, removePeer, setRooms, setMsg } from '../../../redux/slices/chatSlice';
import ACTIONS from '../../../config/actions';
const ProfileIndex: FC<InvitationPageProps> = ({ invitation, success }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  if (!success) return <NoInvitationView />;
  useEffect(() => {
    // When a user click f5 key, it helps to forget a user's name.
    if(localStorage.getItem('name')) {
      dispatch(setName(localStorage.getItem('name')));
    }
    
    // This part is main for socket.
    if(!window.socket) {
      return;
    }
    if(!window.listen) {
      window.socket.on(ACTIONS.ADD_PEER, data => {
        dispatch(addPeer(data));
      })
      window.socket.on(ACTIONS.SEND_MSG, (data: any) => {
        dispatch(addMsg(data));
      })
      window.socket.on(ACTIONS.REMOVE_PEER, data => {
        dispatch(removePeer(data));
      })

      window.socket.on(ACTIONS.ROOM_LIST, data => {
        dispatch(setRooms(data.rooms));
      })

      window.socket.on(ACTIONS.CREATE_ROOM, data => {
        dispatch(setMsg(data.msgs));
      })

      window.socket.on(ACTIONS.ROOM_READY, data => {
        router.push(`experience/room?rid=${data.roomId}`);
      })
      window.listen = true;
    }

    window.socket.emit(ACTIONS.ROOM_LIST, {});
  }, [])
  const accept = () => {
    if(!!window.socket){
      window.socket.emit(ACTIONS.ACEEPT_INVITATION, {roomId: invitation.roomId, username: invitation.name});
      dispatch(setModel(1));
      dispatch(setName(invitation.name));
      router.push('/experience/room?rid=' + invitation.roomId);
    }
  }

  const deny = () => {
    if(!!window.socket){
      window.socket.emit(ACTIONS.ACEEPT_INVITATION, {roomId: invitation.roomId, username: invitation.name});
    }
    router.push('/');
  }

  const back = () => {
    router.push('/');

  }
  return (
    <div className="absolute top-[30vh] left-[70vh] w-[60vh]">
      <div className="bg-brandblack rounded-3xl w-full">
        <div className="border-borderwidget p-10">
          <div className="flex flex-col mb-10">
            <div className="text-lg font-bold text-center">Room Invitation</div>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-semibold">Room Name</span>
            <span className="font-thin text-secondary">{invitation.roomName}</span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-semibold">Room Number</span>
            <span className="font-thin text-secondary">{invitation.roomId}</span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="font-semibold">Invited By</span>
            <span className="font-thin text-secondary">{invitation.name}</span>
          </div>
          {invitation.state ? (
            <div>
              <div className="text-secondary">The Invitation is expired.</div>
              <div className="w-full flex justify-end">
                <button className="gap-2 text-xs normal-case rounded-full btn btn-primary px-6" onClick={back}>
                  <Revert />
                  Back
                </button>
              </div>
            </div>
          ): (
            <div className="flex gap-4 justify-between px-16">
              <button className="gap-2 text-xs normal-case rounded-full btn btn-primary px-6" onClick={accept}>
                <Accept />
                Accept
              </button>
              <button className="gap-2 text-xs normal-case rounded-full btn btn-primary px-6" onClick={deny}>
                <Xicon />
                Deny
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { getServerSideProps };

export default ProfileIndex;