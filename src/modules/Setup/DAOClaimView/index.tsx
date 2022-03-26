import { FC, useEffect, useState } from "react";
import SearchInput from "components/SearchInput";
import { apiCaller } from "utils/fetcher";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const claimDao = () => {};

type DAOCardProps = {
  name: string;
  imageLink: string;
};

const DAOCard: FC<DAOCardProps> = ({ name, imageLink }) => {
  return (
    <div className="btn rounded-xl h-16 w-full">
      <div className="flex items-center w-full">
        <img src={imageLink} height="40" width="40" className="rounded-full" />
        <div className="w-full pl-5">
          <p className="font-semibold text-sm text-left text-secondary capitalize">
            {name}
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-sm h-10 rounded-3xl px-6 capitalize"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

const FindDAO = () => {
  return (
    <div className="pt-4">
      <p className="text-sm">Can't find your DAO? Search here</p>
      <div className="pt-4">
        <SearchInput />
      </div>
    </div>
  );
};

const NoDaoMessage = () => {
  return (
    <div className="alert alert-error shadow-lg w-full">
      <span>You are not part of any DAOs</span>
    </div>
  );
};

const LoadingMessage = () => {
  return (
    <div className="alert alert-warning shadow-lg w-full">
      <span>Loading DAOs...</span>
    </div>
  );
};

const DAOClaimView = () => {
  try {
    return (
      <div className="flex flex-1 container justify-center pt-12">
        <div className="flex-1 max-w-lg ">
          <h3 className="text-3xl font-semibold pb-4">
            DAOs you are already in:
          </h3>
        </div>
      </div>
    );
  } catch (err) {
    <div className="flex flex-1 container justify-center pt-20">
      <div className="flex-1 max-w-lg ">
        <div className="alert alert-info shadow-lg">
          <span>Error loading the setup page</span>
        </div>
      </div>
    </div>;
  }
  return (
    <div className="flex flex-1 container justify-center pt-20">
      <div className="flex-1 max-w-lg">
        <div className="w-10/12	">
          <h3 className="text-3xl font-semibold pb-10">
            DAOs you are already in:
          </h3>
          <div className="flex flex-col pb-4 items-start space-y-5 ">
            {!loaded && <LoadingMessage />}
            {daos.length == 0 && loaded && <NoDaoMessage />}
            {daos.map(({ image, name }) => (
              <DAOCard name={name} imageLink={image} />
            ))}
          </div>
          <FindDAO />
          <div className="flex justify-end pt-5">
            <button
              disabled={!loaded}
              type="button"
              className="btn btn-secondary btn-sm h-10 rounded-3xl px-6 capitalize"
              onClick={() =>
                dispatch(
                  claimDao(
                    {},
                    () => {
                      router.push("/profile");
                    },
                    () => {}
                  )
                )
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAOClaimView;
