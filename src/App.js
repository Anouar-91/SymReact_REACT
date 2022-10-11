import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from "./pages/InvoicePage";
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import { useState } from "react";
import AuthContext from './contexts/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import AddCustomerPage from './pages/AddCustomerPage';
import AddInvoicePage from './pages/AddInvoicePage';
import RegisterPage from './pages/RegisterPage';

AuthAPI.setup();


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated,
      setIsAuthenticated: setIsAuthenticated
  }}>

    <BrowserRouter>
      <Navbar />
      <div className="pt-10 pl-10 pr-10">
        <Routes>
          <Route element={<ProtectedRoute  />}>
          <Route path="/customer/:id" element={<AddCustomerPage />} />
          <Route path="/invoice/:id" element={<AddInvoicePage />} />

            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage  />} />
          <Route path="/" element={<HomePage />} />

        </Routes>

      </div>
    </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
