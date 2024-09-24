import {
  AppBar,
  Box,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Logout } from "@mui/icons-material";
import AuthenticationService from "../../services/AuthenticationService";
import "./style.css";
import { Link } from 'react-router-dom'; // Import the Link component


interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
}

const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    AuthenticationService.logout();
    setIsAuthenticated(false);
    // Redirige vers la page d'accueil ou de login
  };

  return (
 <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#00171F",
                color: "#fff",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 1201,
      }}
    >     <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 16px", // Ajustez le padding si nécessaire
        }}
      >
        {/* Logo central */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <Link to="/"> {/* Wrap the img with the Link component */}

          <img
            src="/logo1.png"
            alt="Logo"
            style={{ maxHeight: "80px", marginLeft: "35px" }} // Adjust the size and margin as necessary
            />
              </Link>

        </Box>

        {/* Section droite : Boutons de langue et de déconnexion */}
        <Box display="flex" alignItems="center">
          <ToggleButtonGroup
            value={i18n.language}
            exclusive
            size="small"
            onChange={toggleLanguage}
            className="ToggleButtonGroup"
          >
            <Tooltip title="Français" arrow>
              <ToggleButton value="fr" className="ToggleButton"    style={{ color: 'white' }}   // Make text and border white
              >
                FR
              </ToggleButton>
            </Tooltip>
            <Tooltip title="English" arrow>
              <ToggleButton value="en" className="ToggleButton"     style={{ color: 'white' }}    // Make text and border white
              >
                EN
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          {isAuthenticated && (
            <Tooltip title="Logout" arrow>
              <IconButton onClick={handleLogout} className="LogoutButton"         style={{ color: 'white' }} // Make icon color white
              >
                <Logout />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
