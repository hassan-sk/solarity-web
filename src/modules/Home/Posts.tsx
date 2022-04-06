import React, { FC, useEffect, useState } from "react";
import PostComp from "components/Post";
import { useRouter } from "next/router";
import { apiCaller } from "utils/fetcher";
import { Post, AccountType } from "modal/post";
import { POSTS } from "data/home";
import ago from "s-ago";

interface IProps {
  user?: any;
  accountType: AccountType;
  dao?: any;
}

const Posts: FC<IProps> = ({ accountType, user, dao }) => {
  const [tweets, setTweets] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const router = useRouter();
  let id = "";
  let image = "";
  const { query } = router;
  if (query) {
    if (accountType == "user" && query.username) {
      id = String(query.username);
      image = user.profileImageLink;
    }
    if (accountType == "dao" && query.symbol) {
      id = String(query.symbol);
      image = dao.profileImageLink;
    }
  }

  const fetchTweets = async (queryString: string) => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await apiCaller("/tweets?" + queryString);

      const tweets = (data as [any]).map(
        ({
          full_text,
          favorite_count,
          created_at,
          retweet_count,
          retweeted_status,
          entities: { media },
        }) => ({
          title: retweeted_status ? "#Retweet" : "#Tweet",
          subtitle: () => (
            <div>
              {(retweeted_status ? retweeted_status.full_text : full_text)
                .split("\n")
                .map((t: string) => (
                  <p>{t}</p>
                ))}
              {media && media.length > 0 && (
                <img className="pt-2 rounded-3xl" src={media[0].media_url} />
              )}
            </div>
          ),
          likes: favorite_count,
          retweets: retweet_count,
          type: "tweet",
          id,
          time: ago(new Date(created_at)),
          accountType,
          user: {
            name: id,
            avatar: image,
          },
        })
      );
      setTweets(tweets);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    let queryString = "";
    if (id && !loading && accountType !== "none") {
      queryString = `${accountType === "user" ? "username" : "symbol"}=${id}`;
      if (tweets.length == 0) {
        fetchTweets(queryString);
      }
    }
  }, [id]);

  if (loading) {
    return <div className="alert alert-info">Loading Posts...</div>;
  }

  if (error) {
    return <div className="alert alert-error">Error loading posts</div>;
  }

  if (accountType !== "none" && tweets.length == 0) {
    return (
      <div className="alert alert-warning">
        {accountType == "user" ? "User" : "DAO"} has not posts to show
      </div>
    );
  }
  try {
    let posts = POSTS;
    if (accountType !== "none") posts = tweets as Post[];
    return (
      <div className="flex flex-col gap-1 pb-5">
        {posts.map((post, index) => (
          <PostComp key={index} data={post} accountType={accountType} />
        ))}
      </div>
    );
  } catch (err) {
    setError(true);
    return <div></div>;
  }
};

export default Posts;
