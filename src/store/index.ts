import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";
import accountsReducer from "./slices/accounts-slice";
import paymentsReducer from "./slices/payments-slice";
import periodReducer from "./slices/period-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    payments: paymentsReducer,
    period: periodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
