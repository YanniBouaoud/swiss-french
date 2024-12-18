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
              Avec une présence solide dans plusieurs industries, le Swiss
              French Group se distingue par son engagement envers l'excellence
              et la satisfaction de ses clients. Ses activités s'étendent de
              l'ingénierie à l'immobilier, en passant par les technologies de
              l'information et les énergies renouvelables. Sous la direction
              visionnaire de Nawar Al Saedi, l'entreprise a su s'adapter aux
              évolutions du marché et anticiper les besoins futurs. Grâce à une
              approche axée sur l'innovation et la durabilité, le Swiss French
              Group contribue non seulement à la croissance économique locale,
              mais aussi à la création d'emplois et à la promotion de pratiques
              commerciales responsables.
            </p>
          </div>
        </div>

        <div className="sectors">
          <h2>Nos Secteurs d'Activité</h2>
          Automobile Immobilier Finance
        </div>
        <div className="markets">
          <h2>Marchés</h2>
          <p>
            Suiss French Group est un acteur polyvalent, présent sur divers
            marchés économiques. Spécialisé dans le secteur immobilier, il
            propose des services de vente, d'achat et de gestion de biens
            immobiliers en Suisse et en France. En parallèle, l'entreprise opère
            sur le marché de l'automobile en négociant des véhicules d'occasion.
            Elle joue également un rôle sur le marché du commerce international
            en facilitant l'import-export de produits non réglementés, et elle
            fournit des services financiers en assurant des transferts d'argent
            mondiaux via des prestataires renommés comme Western Union et
            MoneyGram.
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
