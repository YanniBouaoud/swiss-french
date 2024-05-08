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
  const { t, i18n } = useTranslation();

  const toggleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#BBB193", top: 0, bottom: "auto" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin="0 1em"
      >
        <Box display="flex" alignItems="center">
          <img src="logoSFG.png" alt="Logo" className="logo" />
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="text-3d"
        >
       <Typography
  variant="h2"
  className="neon-title" // Ajoutez la classe neon-title ici
  sx={{
    fontFamily: "Arial",
    fontSize: "40px",
    textAlign: "center",
    fontWeight: "bold",
  }}
>
  <Link to="/" className="link-no-style"> 
    Swiss French Group
  </Link>
</Typography>

        </Box>

        <Box display="flex" alignItems="center" className="menu">
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
              <ToggleButton value="nl">
                <Typography
                  fontSize="small"
                  sx={{ width: "20px", height: "20px" }}
                  color="white"
                >
                  NL
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {isAuthenticated && (
            <>
              <Box>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    AuthenticationService.logout();
                  }}
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
