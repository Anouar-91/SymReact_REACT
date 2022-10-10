import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route, BrowserRouter , Navigate, Outlet} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from "./pages/InvoicePage";
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import { useState, useContext } from "react";
import AuthContext from './contexts/AuthContext';



AuthAPI.setup();

const ProtectedRoute = ({  redirectPath = '/login' }) => {
  const {isAuthenticated} = useContext(AuthContext);
  if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
};
  return (
    <AuthContext.Provider value={contextValue}>

    <BrowserRouter>
      <Navbar />
      <div className="pt-10 pl-10">
        <Routes>
          <Route element={<ProtectedRoute  />}>
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />


          <Route path="/" element={<HomePage />} />

        </Routes>

      </div>
    </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
