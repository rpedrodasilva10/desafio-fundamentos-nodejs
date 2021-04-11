import Transaction from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /** Solution using Array.reduce() for test purposes */
    // let balance = this.transactions.reduce(
    //   (acc: Balance, transaction: Transaction) => {
    //     if (transaction.type === 'outcome') {
    //       acc.outcome += transaction.value;
    //     } else {
    //       acc.income += transaction.value;
    //     }

    //     return acc;
    //   },
    //   {
    //     income: 0,
    //     outcome: 0,
    //     total: 0,
    //   },
    // );
    // balance.total = balance.income - balance.outcome;

    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'outcome') {
        outcome += transaction.value;
      } else {
        income += transaction.value;
      }
    });

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
