import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTIONS from "config/actions";
import { apiCaller, getErrorMessage } from "utils/fetcher";

export interface MarketplaceState {
  roomName: string;
}

const initialState: MarketplaceState = {
  roomName: '',
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  extraReducers: (builder) => {
  }
});

export const { } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
