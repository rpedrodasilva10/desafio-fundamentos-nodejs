import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type === 'outcome' && this.wouldNegativateBalance(value)) {
      throw Error(`There is no available balance to allow this operation`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }

  /**
   * Check if this new outcome value would lead the user to a negative balance
   * @param outcome value being tested to create a transaction
   * @return 'true' if the outcome value is greater than the current balance;
   */
  private wouldNegativateBalance(newOutcome: number): boolean {
    const balance = this.transactionsRepository.getBalance();

    return balance.total - newOutcome < 0;
  }
}

export default CreateTransactionService;
