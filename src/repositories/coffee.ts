import { serializeResponse } from "../apis/apiHelper";
import { Coffee } from "../models/coffee";

export interface CoffeeRepository {
  getCoffeeListing(): Promise<Coffee[]>;
}

class RealCoffeeRepository implements CoffeeRepository {
  async getCoffeeListing() {
    return fetch(
      "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json"
    ).then(serializeResponse<Coffee[]>());
  }
}

export const NewCoffeeRepository: () => CoffeeRepository = () =>
  new RealCoffeeRepository();

export default CoffeeRepository;
