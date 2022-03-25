import { apiCaller } from "utils/fetcher";

export type UserPageProps = {
  user?: UserType;
  success: Boolean;
};

export type UserType = {
  profileImageLink: string;
  username: string;
  publicAddress: string;
};

export const getServerSideProps = async (context: any) => {
  const { username } = context.query;
  try {
    const {
      data: { user },
    } = await apiCaller.get(`/users/${username}`);
    return { props: { user, success: true } };
  } catch {
    return { props: { success: false } };
  }
};
