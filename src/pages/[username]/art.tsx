import React, { FC } from "react";
import Layout from "components/Layout";
import Hero from "modules/Profile/Hero";
import Art from "modules/Profile/Art";

import { getServerSideProps, UserPageProps } from "modules/Profile";

const ProfileIndex: FC<UserPageProps> = ({ user, success }) => {
  if (!success) {
    return <div>No User found</div>;
  }
  return (
    <Layout heroContent={<Hero user={user || {}} />}>
      <Art publicAddress={(user && user.publicAddress) || ""} />
    </Layout>
  );
};

export { getServerSideProps };

export default ProfileIndex;
