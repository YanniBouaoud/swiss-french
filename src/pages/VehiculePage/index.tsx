import React, { useEffect, useState } from "react";
import "./style.css";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CarService from "../../services/CarService";
import { t } from "i18next";
import Car from "../../models/car";
import DevisCarService from "../../services/DevisCarService";

const VehiculePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [showCartDetails, setShowCartDetails] = useState<boolean>(false);
  const [cartCommentaires, setCartCommentaires] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCars() {
      try {
        const fetchedCars = await CarService.getAll();
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    }
    fetchCars();
  }, []);

  const handleToggleSelection = (index: number) => {
    const isSelected = selectedCars.includes(index);
    if (isSelected) {
      setSelectedCars(selectedCars.filter((item) => item !== index));
    } else {
      setSelectedCars([...selectedCars, index]);
    }
  };

  const handleShowCartDetails = () => {
    setShowCartDetails(!showCartDetails);
  };

  const handleSaveDevisCar = async () => {
    try {
      if (selectedCars.length === 0) {
        throw new Error("Veuillez sélectionner au moins une voiture.");
      }

      const devisCarLines = selectedCars.map((carIndex, i) => {
        const commentaire = cartCommentaires[i]?.trim() || "";

        if (commentaire !== "") {
          return {
            car_id: carIndex + 1,
            commentaire: commentaire,
          };
        } else {
          throw new Error(
            "Le commentaire de la voiture ne peut pas être vide."
          );
        }
      });

      const deviscarData = {
        devisCarLines: devisCarLines,
      };

      console.log("Order before saving:", deviscarData);
      const savedDevisCar = await DevisCarService.save(deviscarData);
      console.log("Saved order:", savedDevisCar);

      setSelectedCars([]);
      setCartCommentaires([]);

      alert(
        "Notre équipe vous recontactera dans les 24h concernant votre demande !"
      );
    } catch (error) {
      console.error("Erreur dans votre demande", error);
      alert("Erreur dans votre demande. Veuillez réessayer.");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm) ||
      car.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <IconButton
        onClick={handleShowCartDetails}
        className="cart-icon"
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
          zIndex: 1000,
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
          padding: "1rem",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <DescriptionIcon fontSize="large" />
      </IconButton>

      {showCartDetails && (
        <Paper
          elevation={4}
          className={`cart-details ${showCartDetails ? "show-cart-details" : ""}`}
          sx={{
            position: "fixed",
            bottom: 120,
            right: 50,
            width: "400px",
            padding: "2rem",
            borderRadius: "15px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: showCartDetails ? "translateY(0)" : "translateY(50px)",
            opacity: showCartDetails ? 1 : 0,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            color="#1976d2"
          >
            Demande de devis
          </Typography>

          <Box>
            {selectedCars.map((carIndex, i) => (
              <Box
                key={i}
                sx={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {cars[carIndex]?.name}
                </Typography>
                <TextField
                  label="Ajouter un commentaire"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={cartCommentaires[i] || ""}
                  onChange={(e) => {
                    const newCommentaires = [...cartCommentaires];
                    newCommentaires[i] = e.target.value;
                    setCartCommentaires(newCommentaires);
                  }}
                />
              </Box>
            ))}
          </Box>

          <Button
            onClick={handleSaveDevisCar}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: "1rem",
              padding: "0.8rem",
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Envoyer
          </Button>
        </Paper>
      )}

      <Typography variant="h4" gutterBottom className="left-align">
        {t("common.choose")}
      </Typography>

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <IconButton onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon />
        </IconButton>
        {showSearch && (
          <TextField
            size="small"
            label="Rechercher"
            variant="outlined"
            onChange={handleSearchChange}
            style={{ marginLeft: "8px", width: "200px" }}
          />
        )}
      </Box>

      <div className="car-container">
        {filteredCars.length > 0 ? (
          <ul className="car-list">
            {filteredCars.map((car, index) => (
              <li
                key={index}
                className={`car-item ${
                  selectedCars.includes(index) ? "selected" : ""
                }`}
                onClick={() => handleToggleSelection(index)}
              >
                <div className="car-info">
                <img
                    src={car.image}
                    alt={car.image}
                    style={{
                      maxWidth: "300px",
                      height: "auto",
                      marginRight: "1em",
                    }}
                  />
                  <img
                    src={car.image2}
                    alt={car.image2}
                    style={{
                      maxWidth: "300px",
                      height: "auto",
                      marginRight: "1em",
                    }}
                  />
                  <img
                    src={car.image3}
                    alt={car.image3}
                    style={{
                      maxWidth: "220px",
                      height: "auto",
                      marginRight: "1em",
                    }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {car.name}
                    </Typography>
                    <Typography className="cart-desc">
                      {car.description}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography className="car-price">
                        {car.price + " €"}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune voiture disponible.</p>
        )}
      </div>
    </div>
  );
};

export default VehiculePage;
