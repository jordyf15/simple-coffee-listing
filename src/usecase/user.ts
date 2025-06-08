import { Coffee } from "../models/coffee";
import CoffeeRepository from "../repositories/coffee";

interface CoffeeUsecase {
  coffeeRepo: CoffeeRepository;
  getCoffeeListing: () => Promise<Coffee[]>;
}

class RealCoffeeUsecase implements CoffeeUsecase {
  coffeeRepo: CoffeeRepository;

  constructor(coffeeRepo: CoffeeRepository) {
    this.coffeeRepo = coffeeRepo;
  }

  async getCoffeeListing() {
    const resp = await this.coffeeRepo.getCoffeeListing();
    return resp;
  }
}

export const NewCoffeeUsecase: (
  coffeeRepository: CoffeeRepository
) => CoffeeUsecase = (coffeeRepository) =>
  new RealCoffeeUsecase(coffeeRepository);

export default CoffeeUsecase;
