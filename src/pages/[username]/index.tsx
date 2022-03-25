import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/Profile/Hero";
import Home from "modules/Profile/Home";
import RightSidebar from "modules/Profile/Sidebar/Home";
import { getServerSideProps, UserPageProps } from "modules/Profile";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) {
    return <div>No User found</div>;
  }
  return (
    <Layout
      rightSidebar={<RightSidebar />}
      heroContent={<Hero user={user || {}} />}
    >
      <Home />
    </Layout>
  );
};

export { getServerSideProps };

export default ProfileIndex;
