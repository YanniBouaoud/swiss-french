import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import AppartService from "../../services/AppartService";
import Appart from "../../models/appart";

const AppartementPage = () => {
  const [appartements, setAppartements] = useState<Appart[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newAppart, setNewAppart] = useState({
    price: 0,
    adresse: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchAppartements = async () => {
      try {
        const data = await AppartService.getAll();
        setAppartements(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des appartements:",
          error
        );
      }
    };

    fetchAppartements();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppart({ ...newAppart, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { price, adresse, image, description } = newAppart;
    const newAppartment = new Appart(price, adresse, image, description);

    try {
      await AppartService.save(newAppartment);
      setIsPopupVisible(false);
      const data = await AppartService.getAll();
      setAppartements(data);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'appartement:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="intro-appart">
        <p>
          Intéresser par un bien, <a href="ContactPage">contactez-nous</a> ! Vous
          pouvez également nous confier le soin de trouver un acheteur pour
          votre Maison, Appartement, Immeuble, Hangar, en le postant via le
          bouton +. Votre bien sera affiché puis notre équipe vous contactera
          dans les 24 heures suivantes.
        </p>
      </div>

      <button
        id="ajouter-appartement-btn"
        onClick={() => setIsPopupVisible(true)}
      >
        +{/* Icône de plus */}
      </button>

      <div id="appartements-container">
        {appartements.map((appart, index) => (
          <div key={index} className="appartement">
            <p>Prix: {appart.price} €</p>
            <p>Adresse: {appart.adresse}</p>
            <img
              src={appart.image}
              alt={appart.image}
              style={{ width: 300, marginRight: "2em", borderRadius: 15 }}
            />

            <p>Description: {appart.description}</p>
          </div>
        ))}
      </div>

      {isPopupVisible && (
        <>
          <div
            className="overlay"
            onClick={() => setIsPopupVisible(false)}
          ></div>
          <div id="popup-formulaire" className="popup">
            <form
              id="ajouter-appartement-formulaire"
              onSubmit={handleFormSubmit}
            >
              <label htmlFor="price">Prix :</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newAppart.price}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="adresse">Adresse :</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={newAppart.adresse}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="description">Description :</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newAppart.description}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setIsPopupVisible(false)}>
                Annuler
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AppartementPage;

ReactDOM.render(<AppartementPage />, document.getElementById("root"));
