import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/User/Hero";
import PayOut from "modules/User/Payout";
import RightSidebar from "modules/User/Sidebar/Home";
import { UserPageProps, getServerSideProps } from "modules/User";
import NoUserView from "modules/User/NoUserView";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) return <NoUserView />;
  return (
    <Layout
      rightSidebar={<RightSidebar />}
      heroContent={<Hero user={user || {}} />}
    >
      <PayOut />
    </Layout>
  );
};

export { getServerSideProps };

export default ProfileIndex;
