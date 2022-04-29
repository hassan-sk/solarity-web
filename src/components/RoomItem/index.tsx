import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setActiveRoomNo } from "../../redux/slices/profileSlice";
import { apiCaller } from "utils/fetcher";
import { useRouter } from "next/router";

const RoomItem = ({
  room,
  activeIndex,
  setActiveIndex,
}: {
  room: any;
  activeIndex: number;
  setActiveIndex: any;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { username } = router.query;
    const setActive = async () => {
        setActiveIndex(room.roomNo)
        dispatch(setActiveRoomNo(room.roomNo));
        await apiCaller.post(`/profile/setActiveRoom`, {
            roomNo: room.roomNo,
        });
    }
    return (
        <div className="col-span-1 m-2 w-1/3">
            <div 
                className={"cursor-pointer border border-transparent hover:border-gray-400  rounded-2xl " + (room.roomNo == activeIndex ? "border-gray-200 ": " ") + (activeIndex == -1 && room.active == true ? "border-gray-200 ": " ")}
                onClick={setActive}
            >
                <Image 
                    src={"/assets/images/roomItems/item" + room.roomNo + ".png"}
                    width="100%" 
                    height="100%" 
                    layout="responsive" 
                    objectFit="contain"
                />
            </div>
            <div className="flex justify-center">
                <Link href={`/${username}/room/${room.roomNo}`} passHref>
                    <a  target="_blank" className="hover:text-secondary text-sm cursor-pointer mt-2">View Room</a>
                </Link>
            </div>
        </div>
    );
};

export default RoomItem;