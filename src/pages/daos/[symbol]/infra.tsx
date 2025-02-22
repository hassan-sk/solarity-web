import Infra from "modules/DAOS/Infra";
import React, { FC } from "react";
import Layout from "components/Layout";
import Home from "modules/DAOS/Home";
import RightSidebar from "modules/DAOS/Sidebar/Home";
import Hero from "modules/DAOS/Hero";
import { getServerSideProps } from "modules/DAOS";

const Index: FC<{ dao: any; success: Boolean }> = ({ dao, success }) => {
  if (!success) {
    return <div>404 DAO not found</div>;
  }
  return (
    <Layout
      rightSidebar={<RightSidebar dao={dao} />}
      heroContent={<Hero dao={dao} />}
    >
      <Infra />
    </Layout>
  );
};

export { getServerSideProps };

export default Index;
