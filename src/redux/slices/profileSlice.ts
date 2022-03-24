import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTIONS from "config/actions";

const initialState = {
  data: {},
  nfts: [],
  nftsLoaded: false,
};
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
});

export const { setProfile, loadNFTs } = profileSlice.actions;

export default profileSlice.reducer;
