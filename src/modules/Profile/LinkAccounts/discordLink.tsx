import Image from "next/image";
import discordLogo from "assets/images/brand-logos/discord.png";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";

const DISCORD_LINK =
  process.env.NODE_ENV === "development"
    ? "https://discord.com/api/oauth2/authorize?client_id=963209278146117632&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile%3Fview%3Dlink_accounts%26link%3Ddiscord&response_type=code&scope=identify"
    : "https://discord.com/api/oauth2/authorize?client_id=963209278146117632&redirect_uri=https%3A%2F%2Fsolarity-web-git-master-hassan-sk.vercel.app%2Fprofile%3Fview%3Dlink_accounts%26link%3Ddiscord&response_type=code&scope=identify";

const DiscordLink: FC<{ resetUrl: Function }> = ({ resetUrl }) => {
  const { discordConnected, discordUsername } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    query: { link, code },
  } = router;
  useEffect(() => {
    if (link === "discord") {
      setLoading(true);
      dispatch(
        linkAccounts({
          data: {
            link: "discord",
            code,
          },
          finalFunction: () => {
            setLoading(false);
            resetUrl();
          },
        })
      );
    }
  }, [code, link]);
  return (
    <div className="border border-brandblack rounded-3xl p-5 flex items-center space-x-4">
      {discordConnected && (
        <button
          className={`btn btn-primary bg-[#6a0dad] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          onClick={() => {
            setLoading(true);
            dispatch(
              unlinkAccounts({
                data: {
                  link: "discord",
                  code,
                },
                finalFunction: () => {
                  setLoading(false);
                  resetUrl();
                },
              })
            );
          }}
        >
          <Image src={discordLogo} height="25" width="25" objectFit="contain" />
          <span>UNLINK DISCORD</span>
        </button>
      )}
      {!discordConnected && (
        <a
          className={`btn btn-primary bg-[#6a0dad] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          href={DISCORD_LINK}
        >
          <Image src={discordLogo} height="25" width="25" objectFit="contain" />
          <span>LINK DISCORD</span>
        </a>
      )}
      {discordConnected ? (
        <p className="text-gray-950">
          You account is linked with discord username:{" "}
          <span className="font-bold text-green-500	">{discordUsername}</span>
        </p>
      ) : (
        <p className="text-gray-950">
          You account is not linked with any discord account
        </p>
      )}
    </div>
  );
};

export default DiscordLink;