import DevisCar from "../models/deviscar";
import AuthenticationService from "./AuthenticationService";

class DevisCarService {
  static async save(newDevisCar: DevisCar): Promise<DevisCar> {
    return fetch(`http://localhost:8080/deviscar/`, {
      method: "POST",
      body: JSON.stringify(newDevisCar),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((deviscar) => deviscar.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default DevisCarService;
