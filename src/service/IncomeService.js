import IncomeRepository from './../repository/IncomeRepository.js';
import Income from './../entity/Income.js';
import { currencies, currenciesLanguages } from '../config/currency.js';

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString, delimiter = ';') {
    const [position, expectationValue] = incomeString.split(delimiter);

    if (!position)
      throw new Error(
        'Position is a required field. Please make sure you are providing a position.'
      );

    if (!expectationValue || isNaN(expectationValue))
      throw new Error(
        'A valid Expectation is required. Please note that only numbers are allowed.'
      );

    const currenyOptions = Object.keys(currencies.options);
    const conversions = await this.incomeRepository.getConversions();

    const normalizedConversions = currenyOptions.reduce(
      (acc, opt) => ({
        ...acc,
        [opt]: {
          currency: currencies.options[opt],
          language: currenciesLanguages.options[opt],
          value: +expectationValue * conversions[currencies.options[opt]],
        },
      }),
      {}
    );

    const expectation = {
      currency: currencies.expectation,
      language: currenciesLanguages.expectation,
      value: +expectationValue,
    };

    const income = new Income({
      position,
      expectation,
      ...normalizedConversions,
    });

    return income;
  }
}

export default IncomeService;
