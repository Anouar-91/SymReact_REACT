import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <div className="pt-10 pl-10">
        <Routes>
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/invoice" element={<InvoicePage />} />

          <Route path="/" element={<HomePage />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
