import Image from "next/image";
import twitterLogo from "assets/images/brand-logos/twitter.png";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { linkAccounts, unlinkAccounts } from "redux/slices/profileSlice";

const TWITTER_LINK =
  process.env.NODE_ENV === "development"
    ? "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MENrR095Mkl6WFdKWGZEV0VLTkg6MTpjaQ&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fprofile%3Fview%3Dlink_accounts%26link%3Dtwitter&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain"
    : "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MENrR095Mkl6WFdKWGZEV0VLTkg6MTpjaQ&redirect_uri=https://solarity-web-git-master-hassan-sk.vercel.app&scope=tweet.read%20users.read%20offline.access&state=twitter&code_challenge=challenge&code_challenge_method=plain";

const twitterLink: FC<{ resetUrl: Function }> = ({ resetUrl }) => {
  const { twitterConnected, twitterUsername } = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    query: { link, code },
  } = router;
  useEffect(() => {
    if (link === "twitter") {
      setLoading(true);
      dispatch(
        linkAccounts({
          data: {
            link: "twitter",
            code,
          },
          finalFunction: () => {
            setLoading(false);
            // resetUrl();
          },
        })
      );
    }
  }, [code, link]);
  return (
    <div className="border border-brandblack rounded-3xl p-5 flex items-center space-x-4">
      {twitterConnected && (
        <button
          className={`btn btn-primary bg-[#1DA1F2] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          onClick={() => {
            setLoading(true);
            dispatch(
              unlinkAccounts({
                data: {
                  link: "twitter",
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
          <Image src={twitterLogo} height="25" width="25" objectFit="contain" />
          <span>UNLINK TWITTER</span>
        </button>
      )}
      {!twitterConnected && (
        <a
          className={`btn btn-primary bg-[#1DA1F2] flex space-x-2 ${
            loading ? "loading" : ""
          }`}
          href={TWITTER_LINK}
        >
          <Image src={twitterLogo} height="25" width="25" objectFit="contain" />
          <span>LINK TWITTER</span>
        </a>
      )}
      {twitterConnected ? (
        <p className="text-gray-950">
          You account is linked with twitter username:{" "}
          <span className="font-bold text-green-500	">{twitterUsername}</span>
        </p>
      ) : (
        <p className="text-gray-950">
          You account is not linked with any twitter account
        </p>
      )}
    </div>
  );
};

export default twitterLink;
