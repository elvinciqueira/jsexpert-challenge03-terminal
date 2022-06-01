import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  console.log('🚀 Running...\n');
  try {
    terminal.draftTable();

    const answer = await terminal.readLine(
      'Qual seu cargo e pretensão salarial em BRL? (position; expectation)\n Insira: '
    );

    if (answer === VOCABULARY.STOP) {
      terminal.close();
      console.info('finishing terminal instance!');
      return;
    }

    const income = await service.generateIncomeFromString(answer);

    terminal.addDataToPrint(income.format());

    terminal.printSuccess('Register successfully inserted');
  } catch (error) {
    terminal.printError(`Error@mainLoop: ${error.message} \n`);
  }
  return mainLoop();
}

await mainLoop();
