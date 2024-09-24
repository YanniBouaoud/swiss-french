import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./style.css"; // Ensure your CSS file is imported
import DevisBatiService from "../../services/DevisBatiService";
import DevisBati from "../../models/devisbati";

const BatimentPage = () => {
  const [budget, setBudget] = useState(0);
  const [delais, setDelais] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newDevisBati = new DevisBati(budget, delais, description);
      await DevisBatiService.save(newDevisBati);
      alert("Devis enregistré avec succès !");
      setBudget(0);
      setDelais("");
      setDescription("");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du devis :", error);
      alert("Une erreur s'est produite lors de l'enregistrement du devis.");
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h4" gutterBottom className="form-title">
        Formulaire de Devis Bâtiment
      </Typography>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          className="text-field"
          label="Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          className="text-field"
          label="Délais"
          type="text"
          value={delais}
          onChange={(e) => setDelais(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          className="text-field"
          label="Description du Projet"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <Button className="button" variant="contained" type="submit" fullWidth>
          Demandez un devis
        </Button>
      </form>
    </Box>
  );
};

export default BatimentPage;
