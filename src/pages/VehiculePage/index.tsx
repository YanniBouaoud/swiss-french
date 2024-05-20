import React, { useEffect, useState } from "react";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import CarService from "../../services/CarService";
import { t } from "i18next";
import Car from "../../models/car";
import DevisCarService from "../../services/DevisCarService";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const VehiculePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [cart, setCart] = useState<number>(0);
  const [showCartDetails, setShowCartDetails] = useState<boolean>(false);
  const [cartCommentaires, setCartCommentaires] = useState<string[]>([]);

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
        const commentaire = cartCommentaires[i].trim(); // Récupérer le commentaire correspondant à la voiture actuelle

        if (commentaire.trim() !== "") {
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

      // Réinitialisation du panier après avoir sauvegardé la commande
      setSelectedCars([]);
      setCartCommentaires([]);
      setCart(0);

      alert("Commande enregistrée avec succès ! 30 minutes de délai d'attente");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la commande :", error);
      alert(
        "Erreur lors de l'enregistrement de la commande. Veuillez réessayer."
      );
    }
  };

  return (
    <div>
      <IconButton onClick={handleShowCartDetails} className="cart-icon">
        <SendIcon />
        <Typography>Votre devis</Typography>
      </IconButton>

      <div
        className={`cart-details ${showCartDetails ? "show-cart-details" : ""}`}
      >
        {selectedCars.map((carIndex, i) => (
          <div key={i} className="car-comment-container">
            <div className="car-info">
              <Typography variant="h6">{cars[carIndex].name}</Typography>
            </div>
            <TextField
              label="Commentaire"
              variant="outlined"
              value={cartCommentaires[i]}
              onChange={(e) => {
                const newCommentaires = [...cartCommentaires];
                newCommentaires[i] = e.target.value;
                setCartCommentaires(newCommentaires);
              }}
            />
          </div>
        ))}
        


        <IconButton onClick={handleSaveDevisCar} className="cart-icon">
  <AddCircleOutlineIcon />
</IconButton>
      </div>

      <Typography variant="h4" gutterBottom className="left-align">
        {t("common.choose")}
      </Typography>

      <div className="car-container">
        {cars.length > 0 ? (
          <ul className="car-list">
            {cars.map((car, index) => (
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
                    style={{ width: 200, marginRight: "1em" }}
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {car.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        fontStyle: "italic",
                        color: "grey",
                        marginBottom: "0.5em",
                      }}
                    >
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
          <p>Aucune car disponible.</p>
        )}
      </div>
    </div>
  );
};

export default VehiculePage;
