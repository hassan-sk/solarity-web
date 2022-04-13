import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTIONS from "config/actions";
import { showErrorToast, showSuccessToast } from "utils";
import { apiCaller, getErrorMessage } from "utils/fetcher";

const initialState = {
  data: {},
  nfts: [],
  nftsLoaded: false,
};

export const addInfo = createAsyncThunk(
  "profile/addInfo",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup/info", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const claimDaos = createAsyncThunk(
  "profile/claimDaos",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup/claimDaos", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const setProfilePic = createAsyncThunk(
  "profile/setProfilePic",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/setup/setProfilePic", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const updateProfileInfo = createAsyncThunk(
  "profile/updateProfileInfo",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.patch("/profile", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const updateNftCard = createAsyncThunk(
  "profile/updateNftCard",
  async ({
    data,
    successFunction,
    errorFunction,
    finalFunction,
  }: {
    data: Object;
    successFunction: () => void;
    errorFunction: (error: string) => void;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/selectNftsForRoom", data);
      successFunction();
      returnValue = profile;
    } catch (err) {
      errorFunction(getErrorMessage(err));
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const linkAccounts = createAsyncThunk(
  "profile/linkAccounts",
  async ({
    data,
    finalFunction,
  }: {
    data: Object;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/linkAccounts", data);
      returnValue = profile;
      showSuccessToast("Account successfully linked");
    } catch (err) {
      showErrorToast("Account was unable to be linked");
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const unlinkAccounts = createAsyncThunk(
  "profile/unlinkAccounts",
  async ({
    data,
    finalFunction,
  }: {
    data: Object;
    finalFunction: () => void;
  }) => {
    let returnValue = null;
    try {
      const {
        data: { profile },
      } = await apiCaller.post("/profile/unlinkAccounts", data);
      returnValue = profile;
      showSuccessToast("Account successfully unlinked");
    } catch (err) {
      showErrorToast("Account was unable to be unlinked");
      returnValue = false;
    }
    finalFunction();
    return returnValue;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>) {
      const {
        payload,
        payload: { publicAddress },
      } = action;
      payload.shortPublicAddress =
        publicAddress.substring(0, 4) +
        "..." +
        publicAddress.substring(publicAddress.length - 4, publicAddress.length);
      state.data = action.payload;
    },
    loadNFTs() {},
  },
  extraReducers: (builder) => {
    builder.addCase(addInfo.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(claimDaos.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(setProfilePic.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(updateNftCard.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(linkAccounts.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
    builder.addCase(unlinkAccounts.fulfilled, (state, action) => {
      if (action.payload) {
        profileSlice.caseReducers.setProfile(state, action);
      }
    });
  },
});

export const { setProfile, loadNFTs } = profileSlice.actions;

export default profileSlice.reducer;
