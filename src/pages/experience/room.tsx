import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "components/Layout";
import ChatModule from "modules/ChatModule";
import ACTIONS from '../../config/actions';
import { setName, addPeer, setRooms, addMsg, removePeer, setMsg } from '../../redux/slices/chatSlice';


import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Room = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { rid } = router.query;
  const {  } = useAppSelector(state => state.chat);

  useEffect(() => {
    if(!window.socket) {
      return;
    }
    window.socket.on(ACTIONS.SEND_MSG, data => {
      dispatch(addMsg(data));
    })
  }, []);

  return (
      <ChatModule />
  );
};

export default Room;
