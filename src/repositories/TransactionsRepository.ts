import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type == 'income',
    );
    const totalIncome = incomeTransactions.reduce(
      (total, transaction) => total + transaction.value,
      0,
    );
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type == 'outcome',
    );
    const totalOutcome = outcomeTransactions.reduce(
      (total, transaction) => total + transaction.value,
      0,
    );
    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    } as Balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
