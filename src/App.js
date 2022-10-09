import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from "./pages/InvoicePage";
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import {useState} from "react";


AuthAPI.setup();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (

    <BrowserRouter>
            <Navbar isAuthenticated={isAuthenticated}   onLogout={setIsAuthenticated}  />
      <div className="pt-10 pl-10">
        <Routes>
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} />} />


          <Route path="/" element={<HomePage />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
