import DevisCarLine from "./DevisCarLine";

export default class DevisCar {
  devisCarLines: DevisCarLine[]; // Lignes de commande associées à la commande

  
    constructor(
      devisCarLines: DevisCarLine[],
  
    ) {
      this.devisCarLines = devisCarLines;

    }
  }
  