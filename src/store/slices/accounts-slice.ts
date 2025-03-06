import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../index";

export interface Account {
  SubscrId: number;
  OrgId: number;
  SubscrCode: string;
  FIO: string;
  Address: string;
}

interface AccountsState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
};

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;

      if (!token) {
        return rejectWithValue("Требуется авторизация");
      }

      const response = await fetch(`/api/Ext/GetSubscrsExt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ExtToken: token }),
      });

      const data = await response.json();

      if (data.success) {
        return data.results;
      } else {
        return rejectWithValue(data.msg);
      }
    } catch (error) {
      return rejectWithValue(
        "Ошибка сети. Пожалуйста, проверьте подключение к интернету."
      );
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    clearAccountsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAccountsError } = accountsSlice.actions;
export default accountsSlice.reducer;
