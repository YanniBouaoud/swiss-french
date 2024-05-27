import {
  AppBar,
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import "./style.css";
import { Logout } from "@mui/icons-material";
import AuthenticationService from "../../services/AuthenticationService";
import { Link } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
}

const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const {  i18n } = useTranslation();

  const toggleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    AuthenticationService.logout();
    window.location.href = ''; 

  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#00171F",
        top: 0,
        bottom: "auto",
        height: "60px",
      }} // Ajuster la hauteur ici
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin="0 1em"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="text-3d"
          sx={{ flex: 0.3 }} // Ajout de cette ligne pour que le titre prenne toute la largeur disponible
        >
          <Typography
            variant="h2"
            className="neon-title" // Ajoutez la classe neon-title ici
            sx={{
              fontFamily: "Exo",
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "15px", // Ajoutez la marge top ici
            }}
          >
            <Link to="/" className="link-no-style">
              Swiss French Group
            </Link>
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          className="menu"
          marginTop="1em"
        >
          <Box>
            <ToggleButtonGroup
              value={i18n.language}
              exclusive
              size="small"
              onChange={toggleLanguage}
            >
              <ToggleButton value="fr">
                <Typography
                  fontSize="small"
                  sx={{ width: "20px", height: "20px" }}
                  color="white"
                >
                  FR
                </Typography>
              </ToggleButton>
              <ToggleButton value="en">
                <Typography
                  fontSize="small"
                  sx={{ width: "20px", height: "20px" }}
                  color="white"
                >
                  EN
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {isAuthenticated && (
            <>
              <Box>
                
              <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    title="logout"
                  >
                  <Logout />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
