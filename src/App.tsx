import React, { useState } from "react";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "./pages/welcome";
import AuthenticationService from "./services/AuthenticationService";
import VehiculePage from "./pages/VehiculePage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import CompanyInfoPage from "./pages/CompanyInfoPage";
import BatimentPage from "./pages/BatimentPage";
import AppartementPage from "./pages/AppartementPage";

const App = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated()
  );

  return (
    <div className="App">
      <div className="striped-background"></div>

      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <main>
        <Routes>
          {/* Route accessible sans authentification */}
          <Route path="/RegisterPage" element={<RegisterPage />} />

          {/* Routes protégées */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Welcome />} />
              <Route path="/VehiculePage" element={<VehiculePage />} />
              <Route path="/ContactPage" element={<ContactPage />} />
              <Route path="/BatimentPage" element={<BatimentPage />} />
              <Route path="/CompanyInfoPage" element={<CompanyInfoPage />} />
              <Route path="/AppartementPage" element={<AppartementPage />} />
            </>
          ) : (
            <Route
              path="/"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  onRegisterClick={() => navigate("/RegisterPage")}
                />
              }
            />
          )}
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
