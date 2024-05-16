export default class DevisBati {
  budget: number;
  delais: string;
  description: string;
  constructor(budget: number, delais: string, description: string) {
    this.budget = budget;
    this.delais = delais;
    this.description = description;
  }
}
