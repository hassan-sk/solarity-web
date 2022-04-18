import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Layout from "components/Layout";
import Home from "modules/Home";
import ACTIONS from "config/actions";

import RightSidebar from "modules/Home/RightSidebar";
import InvitationListModal from "components/Modals/InvitationListModal"


const Index = () => {
  const [invitations, setInvitations] = useState([]);
  const [iniviteFriendModal, setIniviteFriendModal] = useState(false);
  const { data } = useAppSelector((state: any) => state.profile);
  useEffect(() => {
    if(!window.socket) {
      return;
    }
    if(!!window.listen1) {
      return;
    }
    window.socket.on(ACTIONS.GET_INVITATIONS, (data: any) => {
      if(data.invitations.length != 0) {
        setInvitations(data.invitations);
        handleInviteFriendToggle();
      }
    })
    window.listen1 = true;
  }, [])
  
  useEffect(() => {
    if(!window.socket) {
      return;
    }
    if(data)
      window.socket.emit(ACTIONS.GET_INVITATIONS, {username: data.username});
  }, [data])

  const handleInviteFriendToggle = () => {
    setIniviteFriendModal(!iniviteFriendModal);
  }

  return (
    <Layout
      rightSidebar={<RightSidebar />}
    >
      <Home />
      <InvitationListModal invitations={invitations} open={iniviteFriendModal} onClose={handleInviteFriendToggle}/>
    </Layout>
  );
};

export default Index;
