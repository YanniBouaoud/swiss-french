import React, { useEffect, useState } from "react";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import the Search icon
import CarService from "../../services/CarService";
import { t } from "i18next";
import Car from "../../models/car";
import DevisCarService from "../../services/DevisCarService";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const VehiculePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [showCartDetails, setShowCartDetails] = useState<boolean>(false);
  const [cartCommentaires, setCartCommentaires] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
  const [showSearch, setShowSearch] = useState<boolean>(false); // State to toggle search input visibility

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
        const commentaire = cartCommentaires[i].trim();

        if (commentaire.trim() !== "") {
          return {
            car_id: carIndex + 1,
            commentaire: commentaire,
          };
        } else {
          throw new Error("Le commentaire de la voiture ne peut pas être vide.");
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

      alert("Notre équipe vous recontacteras dans les 24h concernant votre demande !");
    } catch (error) {
      console.error("Erreur dans votre demande", error);
      alert("Erreur dans votre demande. Veuillez réessayer.");
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter cars based on the search term
  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm) ||
    car.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <IconButton onClick={handleShowCartDetails} className="cart-icon">
        <SendIcon />
        <Typography>Votre devis</Typography>
      </IconButton>

      <div className={`cart-details ${showCartDetails ? "show-cart-details" : ""}`}>
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

      {/* Search Icon */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <IconButton onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon />
        </IconButton>
        {/* Conditional rendering of the search input field */}
        {showSearch && (
          <TextField
            size="small" // Smaller size for aesthetics
            label="Rechercher"
            variant="outlined"
            onChange={handleSearchChange}
            style={{ marginLeft: '8px', width: '200px' }} // Adjust width and margin as needed
          />
        )}
      </Box>

      <div className="car-container">
        {filteredCars.length > 0 ? (
          <ul className="car-list">
            {filteredCars.map((car, index) => (
              <li
                key={index}
                className={`car-item ${selectedCars.includes(index) ? "selected" : ""}`}
                onClick={() => handleToggleSelection(index)}
              >
                <div className="car-info">
                  <img
                    src={car.image}
                    alt={car.image}
                    style={{ maxWidth: '300px', height: 'auto', marginRight: '1em' }}
                  />
                  <img
                    src={car.image2}
                    alt={car.image2}
                    style={{ maxWidth: '300px', height: 'auto', marginRight: '1em' }}
                  />
                  <img
                    src={car.image3}
                    alt={car.image3}
                    style={{ maxWidth: '250px', height: 'auto', marginRight: '1em' }}
                  />
                  <Box display="flex" flexDirection="column" alignItems="flex-start">
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
