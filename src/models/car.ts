export default class Car {
  id: number;
  name: string;
  description: string;
  image: string;
  image2: string;
  image3: string;
  price: number;

  constructor(
    id: number,
    name: string,
    description: string,
    image: string,
    image2: string,
    image3: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.image2 = image2;
    this.image3 = image3;
    this.price = price;
  }
}
