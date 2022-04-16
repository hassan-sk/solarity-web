import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Image from "next/image";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Base from "components/Modals/Base";
import BlackInput from "components/Inputs/BlackInput";
import { setName } from "redux/slices/chatSlice";
import { Join } from "components/Icons";
import ACTIONS from "config/actions";

const InviteFriendModal: FC<any> = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [modelIndex, setModelIndex] = useState(0);
  const [userlist, setUserlist] = useState<any[]>([]);
  const { rooms } = useSelector((state: RootStateOrAny) => ({
    rooms: state.chat.rooms
  }));
  const dispatch = useDispatch();
  const router = useRouter();
  const { rid } = router.query;

  const joinRoom = () => {
  }

  useEffect(() => {
      if(open)
        getUsers();
  }, [open])

  const getUsers = () => {
      window.socket.on(ACTIONS.GET_USERS, (users: any[]) => {
        if(!!rooms) {
            var userFilter = [];
            var userData = users.find(s => rooms[0].speakers.findIndex((ss: string) => ss == s.username) == -1);
            if(typeof userData == "object") {
                userFilter.push(userData);
                setUserlist(userFilter);
            } else {
                setUserlist(userData);
            }
        }
      })
      window.socket.emit(ACTIONS.GET_USERS, {});
  }

  return (
    <Base open={open} onClose={onClose} title={"Invitation Panel"}>
      <div className="grid gap-8 mt-8 min-h-[250px]">
        <table className="w-full">
            <thead className="text-secondary text-center">
                <tr className="py-2 border-b border-gray-500">
                    <td className="w-1/6">No</td>
                    <td className="w-2/6">Name</td>
                    <td className="w-1/6">State</td>
                    <td className="w-2/6">Action</td>
                </tr>
            </thead>
            <tbody className="text-center h-[220px] overflow-auto">
                {userlist && userlist.map((user, index) => (
                    <tr className="py-2 border-b border-gray-800" key={index}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{!user.state ? 'idle': user.state}</td>
                        <td>
                            <button className="rounded-full btn btn-sm btn-secondary px-8">
                                <Join />&nbsp;<span>Invite</span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </Base>
  );
};

export default InviteFriendModal;
