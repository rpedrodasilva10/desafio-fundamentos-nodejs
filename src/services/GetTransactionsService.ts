import TransactionsRepository, {
  Balance,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}
  public getTransactionsWithBalance(): TransactionsWithBalance {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    const transactionsWithBalance: TransactionsWithBalance = {
      transactions,
      balance,
    };

    return transactionsWithBalance;
  }
}

export default GetTransactionsService;
