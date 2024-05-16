import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "./pages/welcome";
import AuthenticationService from "./services/AuthenticationService";
import PizzaListPage from "./pages/VehiculePage";
import RegisterPage from "./pages/RegisterPage";
import VehiculePage from "./pages/VehiculePage";
import ContactPage from "./pages/ContactPage";
import CompanyInfoPage from "./pages/CompanyInfoPage";

const App = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated()
  );

  return (
    <div className="App">
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <main>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/VehiculePage" element={<VehiculePage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/CompanyInfoPage" element={<CompanyInfoPage />} />

            <Route path="/PizzaListPage/:filter" element={<PizzaListPage />} />
          </Routes>
        ) : (
          <Login
          setIsAuthenticated={setIsAuthenticated}
          onRegisterClick={() => navigate("/RegisterPage")} 
        />
        
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
