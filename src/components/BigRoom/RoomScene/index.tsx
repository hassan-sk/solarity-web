import React, { FC } from "react";
import Image from "next/image";
import { VR } from "components/Icons";
import { RoomSceneType } from "modal/experience";

const RoomScene = ({
    data: bgImage,
}: {
    data: string;
}) => {
  return (
    <div className="relative w-full h-full">
        <Image
          src={bgImage}
          alt={"VR Image"}
          layout="fill"
          priority={true}
          objectFit="cover"
          className="rounded-2xl"
        />
    </div>
  );
};

export default RoomScene;
