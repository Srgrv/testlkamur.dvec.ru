import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../index";

export interface ChargeDetail {
  ChargeDetailId: number;
  GroupName: string;
  Name: string;
  Quantity: number;
  Tariff: number;
  UnitName: string;
  Total: number;
  Amount: number;
  Recalc: number;
  ImpSaldoInfo: string;
}

export interface Charge {
  ChargeId: number;
  SubscrId: number;
  Period: number;
  PeriodName: string;
  DebtByBeginMonth: number;
  Amount: number;
  Payment: number;
  AmountToPay: number;
  ChargeDetails: ChargeDetail[];
}

export interface Payment {
  PaymenId: number;
  SubscrId: number;
  Date: string;
  PostDate: string;
  Period: number;
  PeriodName: string;
  ServiceGroupName: string;
  PaymentSource: string;
  Amount: number;
}

interface PaymentsState {
  charges: Charge[];
  payments: Payment[];
  loadingCharges: boolean;
  loadingPayments: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  charges: [],
  payments: [],
  loadingCharges: false,
  loadingPayments: false,
  error: null,
};

interface FetchChargesArgs {
  selectedFromYear: string;
  selectedFromPeriod: string;
  selectedToYear: string;
  selectedToPeriod: string;
}

export const fetchCharges = createAsyncThunk<Charge[], FetchChargesArgs>(
  "payments/fetchCharges",
  async (
    {
      selectedFromYear,
      selectedFromPeriod,
      selectedToYear,
      selectedToPeriod,
    }: {
      selectedFromYear: string;
      selectedFromPeriod: string;
      selectedToYear: string;
      selectedToPeriod: string;
    },

    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      if (!token) {
        return rejectWithValue({
          success: false,
          msg: "Требуется авторизация",
        });
      }

      const response = await fetch(`/api/Ext/GetChargesExt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ExtToken: token,
          PeriodBegin: `${selectedFromYear + selectedFromPeriod}`,
          PeriodEnd: `${selectedToYear + selectedToPeriod}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.results;
      } else {
        return rejectWithValue(data.msg);
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        msg: "Ошибка сети. Пожалуйста, проверьте подключение к интернету.",
      });
    }
  }
);

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (
    {
      subscrId,
      selectedFromYear,
      selectedFromPeriod,
      selectedToYear,
      selectedToPeriod,
    }: {
      subscrId: number;
      selectedFromYear: string;
      selectedFromPeriod: string;
      selectedToYear: string;
      selectedToPeriod: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      if (!token) {
        return rejectWithValue("Требуется авторизация");
      }

      const response = await fetch(`/api/Ext/GetPaymentsExt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ExtToken: token,
          subscrId: subscrId.toString(),
          PeriodBegin: `${selectedFromYear + selectedFromPeriod}`,
          PeriodEnd: `${selectedToYear + selectedToPeriod}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.msg || "Ошибка получения истории платежей");
      }

      return data.result;
    } catch (error) {
      return rejectWithValue(
        "Ошибка сети. Пожалуйста, проверьте подключение к интернету."
      );
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearPaymentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharges.pending, (state) => {
        state.loadingCharges = true;
        state.error = null;
      })
      .addCase(fetchCharges.fulfilled, (state, action) => {
        state.loadingCharges = false;
        state.charges = action.payload;
      })
      .addCase(fetchCharges.rejected, (state, action) => {
        state.loadingCharges = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPayments.pending, (state) => {
        state.loadingPayments = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loadingPayments = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loadingPayments = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPaymentsError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
