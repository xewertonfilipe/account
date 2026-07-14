import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "../../http";
import type { AccountBalanceResponse } from "../../interfaces";

type AccountStatus = "idle" | "loading" | "succeeded" | "failed";

interface AccountState {
  balance: number;
  status: AccountStatus;
  error: string | null;
}

interface AccountSliceState {
  account: AccountState;
}

const initialState: AccountState = {
  balance: 0,
  status: "idle",
  error: null,
};

export const fetchBalance = createAsyncThunk<
  AccountBalanceResponse,
  void,
  { rejectValue: string }
>("account/fetchBalance", (_, { rejectWithValue }) => {
  return http
    .get<AccountBalanceResponse>("/transactions/balance")
    .then((response) => response.data)
    .catch(() => rejectWithValue("Nao foi possivel carregar o saldo."));
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.balance = 0;
        state.error = action.payload ?? "Nao foi possivel carregar o saldo.";
      });
  },
});

export const selectBalance = (state: AccountSliceState) =>
  state.account.balance;
export const selectAccountStatus = (state: AccountSliceState) =>
  state.account.status;
export const selectAccountError = (state: AccountSliceState) =>
  state.account.error;

export default accountSlice.reducer;
