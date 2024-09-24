import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./style.css"; // Ensure this is imported if needed

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" role="menubar">
      <Tabs variant="scrollable" scrollButtons="auto">
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ flexGrow: 1 }}>
          <div className="image-container">
            <img src="/car1.png" alt="Véhicule" style={{ width: "160px", height: "90px" }} />
          </div>
          <Tab
            label={t("common.vehiculeEnVente")}
            component={NavLink}
            to="/VehiculePage"
            className="nav-link"
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" sx={{ flexGrow: 1 }}>
          <div className="image-container">
            <img src="/appart1.png" alt="Appartement" style={{ width: "91px", height: "91px" }} />
          </div>
          <Tab
            label={t("common.appartementDisponible")}
            component={NavLink}
            to="/AppartementPage"
            className="nav-link"
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" sx={{ flexGrow: 1 }}>
          <div className="image-container">
            <img src="/btp1.png" alt="Bâtiment" style={{ width: "91px", height: "91px" }} />
          </div>
          <Tab
            label={t("common.activiteBatiment")}
            component={NavLink}
            to="/BatimentPage"
            className="nav-link"
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" sx={{ flexGrow: 1 }}>
          <div className="image-container">
            <img src="/logo3.png" alt="Société" style={{ width: "96px", height: "91px" }} />
          </div>
          <Tab
            label={t("common.histoireSociete")}
            component={NavLink}
            to="/CompanyInfoPage"
            className="nav-link"
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" sx={{ flexGrow: 1 }}>
          <div className="image-container">
            <img src="/contact1.png" alt="Contacts" style={{ width: "91px", height: "91px" }} />
          </div>
          <Tab
            label={t("common.contacts")}
            component={NavLink}
            to="/ContactPage"
            className="nav-link"
          />
        </Box>
      </Tabs>
    </Box>
  );
};

export default Welcome;
