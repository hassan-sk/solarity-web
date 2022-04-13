import React, { useEffect } from "react";
import { Button, Input, Stack } from "components/FormComponents";
import { FC } from "react";
import { useState } from "react";
import UpdateInfoView from "./UpdateInfoView";
import UpdateProfilePicView from "./UpdateProfilePicView";
import SelectDisplayNftView from "./SelectDisplayNftView";
import LinkAccounts from "./LinkAccounts";
import { useRouter } from "next/router";

const PROFILE_TABS = [
  {
    label: "Update Info",
    id: "info",
  },
  {
    label: "Update Profile Pic",
    id: "profile_pic",
  },
  {
    label: "Select NFTs to Display in Room",
    id: "nft_selection",
  },
  {
    label: "Link Accounts",
    id: "link_accounts",
  },
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
            {val.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const ProfileView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const updateUrl = (index: number) => {
    const view = PROFILE_TABS[index].id;
    router.push(
      {
        pathname: "/profile",
        query: { view },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    let { view } = router.query;
    const defaultId = PROFILE_TABS[0].id;
    const viewIds = PROFILE_TABS.map(({ id }) => id);
    let reset = false;
    if (view) {
      if (!viewIds.includes(String(view))) {
        reset = true;
      }
    } else {
      reset = true;
    }
    if (reset) {
      router.push(
        {
          pathname: "/profile",
          query: { view: defaultId },
        },
        undefined,
        { shallow: true }
      );
      view = defaultId;
    }
    const index = viewIds.findIndex((i) => i == view);
    setActiveTab(index);
  }, []);

  return (
    <>
      <Menu
        active={activeTab}
        onClick={(index) => {
          setActiveTab(index);
          updateUrl(index);
        }}
      />
      <div className="flex flex-col gap-4 p-10 mb-10 border border-brandblack rounded-3xl">
        {activeTab == 0 && <UpdateInfoView />}
        {activeTab == 1 && <UpdateProfilePicView />}
        {activeTab == 2 && <SelectDisplayNftView />}
        {activeTab == 3 && <LinkAccounts resetUrl={() => updateUrl(3)} />}
      </div>
    </>
  );
};
