import { NewCoffeeRepository } from "./repositories/coffee";
import CoffeeUsecase, { NewCoffeeUsecase } from "./usecase/user";

interface Usecases {
  coffee: CoffeeUsecase;
}

interface Dependencies {
  usecases: Usecases;
}

const coffeeRepo = NewCoffeeRepository();

const coffeeUsecase = NewCoffeeUsecase(coffeeRepo);

const dependencies: Dependencies = {
  usecases: {
    coffee: coffeeUsecase,
  },
};

export default dependencies;
