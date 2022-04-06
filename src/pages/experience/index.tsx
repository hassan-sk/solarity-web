import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Layout from "components/Layout";
import Experience from "modules/Experience";

import ACTIONS from '../../config/actions';

import { setName, addPeer, setRooms, addMsg, removePeer, setMsg } from '../../redux/slices/chatSlice';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    
    // When a user click f5 key, it helps to forget a user's name.
    if(localStorage.getItem('name')) {
      dispatch(setName(localStorage.getItem('name')));
    }
    
    // This part is main for socket.
    if(!window.socket) {
      return;
    }
    window.socket.on(ACTIONS.ADD_PEER, data => {
      dispatch(addPeer(data));
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
  }, []);

  // useEffect(() => {
  //   return () => {
  //     if(window.socket) {
  //       window.socket.disconnect();
  //     }
  //   }
  // })

  return (
    <Layout>
      <Experience />
    </Layout>
  );
};

export default Index;
