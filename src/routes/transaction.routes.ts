import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsService from '../services/GetTransactionsService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

const getTransactionsService = new GetTransactionsService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = getTransactionsService.getTransactionsWithBalance();

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type }: Omit<Transaction, 'id'> = request.body;

    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
