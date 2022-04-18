import { apiCaller } from "utils/fetcher";

export type InvitationPageProps = {
  invitation?: InvitationType;
  success: Boolean;
};

export type InvitationType = {
  profileImageLink: string;
};

export const getServerSideProps = async (context: any) => {
  const { link } = context.query;
  try {
    const {
      data: { invitation },
    } = await apiCaller.get(`/users/getLinkInfo/${link}`);
    console.log(invitation);
    return { props: { invitation, success: true } };
  } catch (err) {
    return { props: { success: false } };
  }
};
