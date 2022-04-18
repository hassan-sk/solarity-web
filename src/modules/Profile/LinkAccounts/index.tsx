import { FC } from "react";
import DiscordLink from "./discordLink";

const LinkAccounts: FC<{ resetUrl: Function }> = ({ resetUrl }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-2xl pb-5">Link Accounts</h3>
      <DiscordLink resetUrl={resetUrl} />
    </div>
  );
};

export default LinkAccounts;
