import Appart from "../models/appart";
import AuthenticationService from "./AuthenticationService";


class AppartService {
  static async getAll(): Promise<Appart[]> {
    return fetch("http://localhost:8080/appart/", {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((apparts) => apparts.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static async save(newAppart: Appart): Promise<Appart> {
    const jwt = AuthenticationService.getJwt();

    const cspHeaderValue = "default-src 'self'; script-src 'none'";
    const headers = {
      "Content-Type": "application/json",
      authorization: jwt,
      "Content-Security-Policy": cspHeaderValue,
    };
  

    return fetch(`http://localhost:8080/appart/`, {
      method: "POST",
      body: JSON.stringify(newAppart),
      headers: headers,
    })
      .then((appart) => appart.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default AppartService;
