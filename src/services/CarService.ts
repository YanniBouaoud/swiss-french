import Car from "../models/car";
import AuthenticationService from "./AuthenticationService";

class CarService {
  static async getAll(): Promise<Car[]> {
    return fetch("http://localhost:8080/car/", {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((cars) => cars.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default CarService;
