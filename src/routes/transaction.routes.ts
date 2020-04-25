import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionRepository = new TransactionsRepository();

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepository.all();
    const balance = transactionRepository.getBalance();
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  try {
    const transactionService = new CreateTransactionService(
      transactionRepository,
    );
    const transaction = transactionService.execute({ title, value, type });
    response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
