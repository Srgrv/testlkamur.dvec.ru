import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@/config";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  isInitialized: false,
};

export const initializeAuth = createAsyncThunk("auth/initialize", async () => {
  console.log("initail");
  const token = localStorage.getItem("token");
  return token;
});

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/Ext/LogOnExt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*", // Разрешить все домены
          // "Access-Control-Allow-Methods": "POST, GET, OPTIONS", // Разрешить методы
          // "Access-Control-Allow-Headers": "Content-Type", // Разрешить заголовки
        },
        body: JSON.stringify({ Username: username, Password: password }),
      });

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        return rejectWithValue(data.msg || "Ошибка авторизации");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        "Ошибка сети. Пожалуйста, проверьте подключение к интернету."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isInitialized = true;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.extToken;
        localStorage.setItem("token", action.payload.extToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;

        if (
          typeof action.payload === "string" &&
          action.payload.includes("повторите авторизацию")
        ) {
          state.token = null;
          localStorage.removeItem("token");
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
