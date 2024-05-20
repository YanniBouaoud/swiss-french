export default class Appart {
    price: number;
    adresse: string;
    image: string;

    description: string;
    constructor(price: number, adresse: string, image: string, description: string) {
      this.price = price;
      this.adresse = adresse;
      this.image = image;

      this.description = description;
    }
  }