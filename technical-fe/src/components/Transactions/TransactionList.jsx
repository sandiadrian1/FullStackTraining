import { useState } from 'react';
import { useEffect } from 'react';
import { getTransactions } from '../../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await getTransactions();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            Item: {transaction.item.nama} | Quantity: {transaction.kuantitas} | Total: {transaction.totalHarga}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
