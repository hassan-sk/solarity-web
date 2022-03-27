import React from "react";
import { Button, Input, Stack } from "components/FormComponents";
import { FC } from "react";
import { useState } from "react";
import UpdateInfoView from "./UpdateInfoView";
import UpdateProfilePicView from "./UpdateProfilePicView";
import SelectDisplayNftView from "./SelectDisplayNftView";

const PROFILE_TABS = [
  "Update Info",
  "Update Profile Pic",
  "Select NFTs to Display in Room",
];

const Menu: FC<{ active: number; onClick: (index: number) => void }> = ({
  active,
  onClick,
}) => {
  return (
    <ul className="menu menu-compact menu-vertical lg:menu-horizontal bg-darkcharcoal rounded-box mb-5">
      {PROFILE_TABS.map((val, index) => (
        <li key={index}>
          <a
            onClick={() => onClick(index)}
            className={active === index ? "bg-secondary" : ""}
          >
            {val}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const ProfileView = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Menu active={activeTab} onClick={(index) => setActiveTab(index)} />
      <div className="flex flex-col gap-4 p-10 mb-10 border border-brandblack rounded-3xl">
        {activeTab == 0 && <UpdateInfoView />}
        {activeTab == 1 && <UpdateProfilePicView />}
        {activeTab == 2 && <SelectDisplayNftView />}
      </div>
    </>
  );
};
