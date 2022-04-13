import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "components/Layout";
import ChatModule from "modules/ChatModule";
import ACTIONS from '../../config/actions';

import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const Room = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { rid } = router.query;
  const {  } = useAppSelector(state => state.chat);

  return (
      <ChatModule />
  );
};

export default Room;
