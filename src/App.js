import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route, BrowserRouter , Navigate, Outlet} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from "./pages/InvoicePage";
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import { useState } from "react";


AuthAPI.setup();

const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
  if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  return (

    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
      <div className="pt-10 pl-10">
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
          </Route>
          <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} />} />


          <Route path="/" element={<HomePage />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
