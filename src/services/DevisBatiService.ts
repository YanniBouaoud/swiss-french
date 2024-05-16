import DevisBati from "../models/devisbati";
import AuthenticationService from "./AuthenticationService";

class DevisBatiService {
  static async save(newDevisBati: DevisBati): Promise<DevisBati> {
    return fetch(`http://localhost:8080/devisbati/`, {
      method: "POST",
      body: JSON.stringify(newDevisBati),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((devisbati) => devisbati.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default DevisBatiService;
