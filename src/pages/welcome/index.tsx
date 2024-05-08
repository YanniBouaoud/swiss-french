import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box role="menubar" display="flex" justifyContent="center">
        <Tabs>
          <Tab label={t("common.importExport")} component={NavLink} to="/import-export" />
          <Tab label={t("common.vehiculeEnVente")} component={NavLink} to="/VehiculePage" />
          <Tab label={t("common.appartementDisponible")} component={NavLink} to="/appartement-disponible" />
          <Tab label={t("common.activiteBatiment")} component={NavLink} to="/activite-batiment" />
          <Tab label={t("common.histoireSociete")} component={NavLink} to="/histoire-societe" />
          <Tab label={t("common.contacts")} component={NavLink} to="/contacts" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Welcome;
