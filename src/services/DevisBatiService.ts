import DevisBati from "../models/devisbati";
import AuthenticationService from "./AuthenticationService";

class DevisBatiService {
  static async save(newDevisBati: DevisBati): Promise<DevisBati> {
    const jwt = AuthenticationService.getJwt();

    const cspHeaderValue = "default-src 'self'; script-src 'none'";
    const headers = {
      "Content-Type": "application/json",
      authorization: jwt,
      "Content-Security-Policy": cspHeaderValue,
    };
  

    return fetch(`http://localhost:8080/devisbati/`, {
      method: "POST",
      body: JSON.stringify(newDevisBati),
      headers: headers,
    })
      .then((devisbati) => devisbati.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default DevisBatiService;
