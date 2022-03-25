import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/Profile/Hero";
import PayOut from "modules/Profile/Payout";
import RightSidebar from "modules/Profile/Sidebar/Home";
import { UserPageProps, getServerSideProps } from "modules/Profile";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) {
    return <div>No User found</div>;
  }
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
