import React from "react";
import { Typography } from "@mui/material";
import "./style.css"; // Assurez-vous que le chemin est correct

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <Typography variant="h2">Contact</Typography>
        <div className="info">
          <Typography variant="body1">
            <strong>Adresse :</strong> 17 Place de la Solidarité, 59000, Lille
          </Typography>
          <Typography variant="body1">
            <strong>Téléphone :</strong> +33 785 485 964
          </Typography>
          <Typography variant="body1">
            <strong>Email :</strong> contact@swissfrenchgroup.com
          </Typography>
          <Typography variant="body1">
            <strong>Horaires :</strong> Lun-Ven: 9h00-18h00, Sam-Dim: Fermé
          </Typography>
        </div>
      </div>
      
      <div className="map">
        {/* Intégration de la carte */}
        <iframe
          title="Localisation de Swiss French Group"
          width="100%"
          height="450"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158884.41640602267!2d3.051704616681633!3d50.62276798665647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d5d52597136b%3A0xd2564f1df580cecd!2s17%20Pl.%20de%20la%20Solidarit%C3%A9%2C%2059000%20Lille!5e0!3m2!1sfr!2sfr!4v1620902610720!5m2!1sfr!2sfr"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
