import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./scenes/dashboard/index"
import Layout from "./scenes/layout/index"
import './App.scss';
import { useMemo } from "react";
import Products from "./scenes/products/index";
import Customers from "./scenes/customers/index";
import Transactions from "./scenes/transactions/index";
import Geography from "./scenes/geography/index";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily/index";
import Monthly from "./scenes/monthly/index";
import Breakdown from "./scenes/breakdown/index";
import Admin from "./scenes/admin/index";
import Performance from "./scenes/performance/index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/sign-in" replace />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={< Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}