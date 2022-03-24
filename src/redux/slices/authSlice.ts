import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import base58 from "bs58";
import ACTIONS from "config/actions";
import { apiCaller } from "utils/fetcher";
import { setProfile } from "./profileSlice";

export interface CounterState {
  roomName: string;
  userName: string;
}

const initialState = {
  logged: false,
  loading: false,
};

type loginProps = {
  publicKey: any;
  signMessage: Function;
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ publicKey, signMessage }: loginProps, { dispatch }) => {
    try {
      const publicAddress = publicKey.toString();
      const {
        data: { nonce },
      } = await apiCaller.post("/auth/login", {
        requestNonce: true,
        publicAddress,
      });
      const messageToSign = new TextEncoder().encode(nonce);
      let signatureEncoded: Uint8Array;
      if (signMessage) {
        signatureEncoded = await signMessage(messageToSign);
        const signature = base58.encode(signatureEncoded);
        const {
          data: { profile },
        } = await apiCaller.post("/auth/login", {
          publicAddress,
          requestNonce: false,
          signature,
        });
        dispatch(setProfile(profile));
        return true;
      } else {
        return false;
        throw new Error("Unable to sign the nonce");
      }
    } catch (err) {
      return false;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_) => {
  try {
    await apiCaller.post("/auth/logout");
    return true;
  } catch {
    return false;
  }
});

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { dispatch }) => {
    try {
      const { data } = await apiCaller.get("/auth/check");
      dispatch(setProfile(data.profile));
      return true;
    } catch {
      return false;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.logged = action.payload;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.logged = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload) {
        window.location.reload();
        state.logged = false;
      }
    });
  },
});

export default authSlice.reducer;
