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


export default function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={< Customers />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}