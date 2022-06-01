import languageConfig from '../config/language.js';

const defaultLanguage = languageConfig.default;

class Income {
  constructor({
    position,
    expectation,
    conversion01,
    conversion02,
    conversion03,
  }) {
    this.position = position;
    this.expectation = expectation || {
      currency: currencies.expectation,
      language: currencies_languages.expectation,
    };
    this.conversion01 = conversion01 || {
      currency: currencies.options.conversion01,
      language: currencies_languages.options.conversion01,
    };
    this.conversion02 = conversion02 || {
      currency: currencies.options.conversion02,
      language: currencies_languages.options.conversion02,
    };
    this.conversion03 = conversion03 || {
      currency: currencies.options.conversion03,
      language: currencies_languages.options.conversion03,
    };
  }

  format() {
    return {
      id: this.id,
      position: this.position,
      expectation: Income.formatCurrency(this.expectation),
      conversion01: Income.formatCurrency(this.conversion01),
      conversion02: Income.formatCurrency(this.conversion02),
      conversion03: Income.formatCurrency(this.conversion03),
    };
  }

  static formatCurrency({ currency, value, language }) {
    const _language = language || defaultLanguage;

    return new Intl.NumberFormat(_language, {
      style: 'currency',
      currency,
    }).format(value);
  }
}

export default Income;
