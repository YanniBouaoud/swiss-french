import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CompanyInfoPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (

    <div className="car-container">

    <div className="company-info-container">
      <div
        className={`company-info ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="info-text">
          <h2>Qui sommes-nous ?</h2>
          <p>
            Le Suiss French Group est une entreprise diversifiée qui opère
            dans plusieurs secteurs d'activité en Suisse et en France. Fondée
            sur des valeurs telles que l'innovation, la qualité et la
            durabilité, l'entreprise cherche à offrir des solutions adaptées
            aux besoins de ses clients tout en contribuant au développement
            économique et social des régions où elle est présente.
          </p>

          <p>
            Vestibulum sed dignissim nisi. Mauris id est arcu. Pellentesque
            consequat viverra nulla, non fermentum mi faucibus vitae. Nunc
            pharetra magna quis tempor hendrerit. Nam condimentum quam non
            felis aliquam eleifend. Cras fringilla convallis dui, id faucibus
            turpis finibus vel.
          </p>
        </div>
      
      </div>


      <div className="sectors">
        <h2>Nos Secteurs d'Activité</h2>
          Automobile
          Immobilier
          Finance
      </div>
      <div className="markets">
        <h2>Marchés</h2>
        <p>
          En 2019, carVertical a lancé le premier registre mondial sur
          l'historique des voitures. Au cours de cette période, nous avons
          réussi à établir une présence sur 28 marchés, et nous continuons à
          nous développer, élevant le niveau de transparence sur le marché
          mondial des voitures d'occasion.
        </p>
      </div>
      <div className="contact-button-container">
        <Link to="/ContactPage" className="contact-button">
          Contactez-nous
        </Link>
      </div>
    </div>
    </div>

  );
};

export default CompanyInfoPage;
