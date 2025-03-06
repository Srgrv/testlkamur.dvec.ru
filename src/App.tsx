import { Route, Routes } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// layout
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { initializeAuth } from "./store/slices/auth-slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import AccountPage from "./pages/AccountPage";
import ChargesPage from "./pages/ChargesPage";
import PaymentsPage from "./pages/PaymentsPage";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  });

  return (
    <div className="min-h-screen ">
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="charges" element={<ChargesPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
